package org.organism;

import java.io.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.logging.Logger;

/**
 * Python Bridge — enables embedding Python runtime within Java organism.
 * Acts as the nervous system coordinator, connecting Java components via Python.
 */
public final class PythonBridge {
    private static final Logger LOGGER = Logger.getLogger(PythonBridge.class.getName());
    
    private Process pythonProcess;
    private BufferedWriter pythonInput;
    private BufferedReader pythonOutput;
    private BufferedReader pythonError;
    private final ExecutorService executor;
    private final Map<String, Object> sharedState;
    private volatile boolean running;
    
    public PythonBridge() {
        this.executor = Executors.newFixedThreadPool(3);
        this.sharedState = new ConcurrentHashMap<>();
        this.running = false;
    }
    
    /**
     * Initialize Python runtime with organism modules.
     */
    public void initialize(String pythonExecutable) throws IOException {
        LOGGER.info("Initializing Python Bridge...");
        
        ProcessBuilder pb = new ProcessBuilder(
            pythonExecutable != null ? pythonExecutable : "python3",
            "-u",  // Unbuffered output
            "-m", "organism"
        );
        pb.redirectErrorStream(false);
        
        pythonProcess = pb.start();
        pythonInput = new BufferedWriter(new OutputStreamWriter(pythonProcess.getOutputStream()));
        pythonOutput = new BufferedReader(new InputStreamReader(pythonProcess.getInputStream()));
        pythonError = new BufferedReader(new InputStreamReader(pythonProcess.getErrorStream()));
        
        running = true;
        
        // Start output readers
        executor.submit(this::readPythonOutput);
        executor.submit(this::readPythonErrors);
        
        LOGGER.info("Python Bridge initialized successfully");
    }
    
    /**
     * Execute Python code and return result.
     */
    public String executePython(String code) throws IOException {
        if (!running) {
            throw new IllegalStateException("Python Bridge not initialized");
        }
        
        synchronized (pythonInput) {
            pythonInput.write(code);
            pythonInput.newLine();
            pythonInput.write("__END_OF_COMMAND__");
            pythonInput.newLine();
            pythonInput.flush();
        }
        
        return readResponse();
    }
    
    /**
     * Call Python function with arguments.
     */
    public Object callPythonFunction(String module, String function, Object... args) throws IOException {
        StringBuilder sb = new StringBuilder();
        sb.append(String.format("import %s\n", module));
        sb.append(String.format("result = %s.%s(", module, function));
        
        for (int i = 0; i < args.length; i++) {
            if (i > 0) sb.append(", ");
            sb.append(formatArg(args[i]));
        }
        
        sb.append(")\n");
        sb.append("print(result)\n");
        
        return executePython(sb.toString());
    }
    
    /**
     * Share state from Java to Python.
     */
    public void shareState(String key, Object value) {
        sharedState.put(key, value);
        
        try {
            String pythonCode = String.format(
                "import json\n" +
                "__java_state__['%s'] = json.loads('%s')\n",
                key, toJson(value)
            );
            executePython(pythonCode);
        } catch (IOException e) {
            LOGGER.severe("Failed to share state: " + e.getMessage());
        }
    }
    
    /**
     * Get state from Python into Java.
     */
    public Object getState(String key) throws IOException {
        String result = executePython(String.format(
            "import json\n" +
            "print(json.dumps(__java_state__.get('%s')))\n",
            key
        ));
        return parseJson(result);
    }
    
    /**
     * Coordinate organism heartbeat across languages.
     */
    public void syncHeartbeat(long beatNumber, double phiPhase) throws IOException {
        String code = String.format(
            "from organism import Heartbeat\n" +
            "__heartbeat__.sync_from_java(%d, %.6f)\n",
            beatNumber, phiPhase
        );
        executePython(code);
    }
    
    /**
     * Bridge sensor data to Python analytics.
     */
    public Map<String, Double> analyzeSensors(Map<String, Double> sensorData) throws IOException {
        String code = String.format(
            "from organism import EdgeSensor\n" +
            "import json\n" +
            "data = json.loads('%s')\n" +
            "result = EdgeSensor.analyze_patterns(data)\n" +
            "print(json.dumps(result))\n",
            toJson(sensorData)
        );
        
        String result = executePython(code);
        return parseJsonMap(result);
    }
    
    /**
     * Enable cross-organism resonance via Python.
     */
    public void enableResonance(String organismId) throws IOException {
        String code = String.format(
            "from organism import CrossOrganismResonance\n" +
            "__resonance__ = CrossOrganismResonance(self_id='%s')\n" +
            "__resonance__.connect()\n",
            organismId
        );
        executePython(code);
    }
    
    /**
     * Shutdown Python runtime gracefully.
     */
    public void shutdown() {
        LOGGER.info("Shutting down Python Bridge...");
        running = false;
        
        try {
            if (pythonInput != null) {
                executePython("exit()\n");
                pythonInput.close();
            }
            if (pythonOutput != null) pythonOutput.close();
            if (pythonError != null) pythonError.close();
            if (pythonProcess != null) {
                pythonProcess.waitFor(5, TimeUnit.SECONDS);
                pythonProcess.destroyForcibly();
            }
        } catch (Exception e) {
            LOGGER.severe("Error during shutdown: " + e.getMessage());
        } finally {
            executor.shutdown();
        }
        
        LOGGER.info("Python Bridge shutdown complete");
    }
    
    // ── Private helpers ──
    
    private void readPythonOutput() {
        try {
            String line;
            while (running && (line = pythonOutput.readLine()) != null) {
                LOGGER.info("[Python] " + line);
            }
        } catch (IOException e) {
            if (running) {
                LOGGER.severe("Error reading Python output: " + e.getMessage());
            }
        }
    }
    
    private void readPythonErrors() {
        try {
            String line;
            while (running && (line = pythonError.readLine()) != null) {
                LOGGER.warning("[Python Error] " + line);
            }
        } catch (IOException e) {
            if (running) {
                LOGGER.severe("Error reading Python errors: " + e.getMessage());
            }
        }
    }
    
    private String readResponse() throws IOException {
        StringBuilder response = new StringBuilder();
        String line;
        
        while ((line = pythonOutput.readLine()) != null) {
            if (line.equals("__END_OF_RESPONSE__")) break;
            response.append(line).append("\n");
        }
        
        return response.toString().trim();
    }
    
    private String formatArg(Object arg) {
        if (arg instanceof String) {
            return "'" + arg + "'";
        } else if (arg instanceof Number || arg instanceof Boolean) {
            return String.valueOf(arg);
        } else {
            return "'" + toJson(arg) + "'";
        }
    }
    
    private String toJson(Object obj) {
        // Simple JSON conversion - in production use a proper JSON library
        if (obj instanceof Map) {
            StringBuilder sb = new StringBuilder("{");
            Map<?, ?> map = (Map<?, ?>) obj;
            int i = 0;
            for (Map.Entry<?, ?> entry : map.entrySet()) {
                if (i++ > 0) sb.append(",");
                sb.append("\\\"").append(entry.getKey()).append("\\\":");
                sb.append(toJson(entry.getValue()));
            }
            sb.append("}");
            return sb.toString();
        } else if (obj instanceof Number) {
            return String.valueOf(obj);
        } else if (obj instanceof String) {
            return "\\\"" + obj + "\\\"";
        } else {
            return "null";
        }
    }
    
    private Object parseJson(String json) {
        // Simple JSON parsing - in production use a proper JSON library
        if (json == null || json.equals("null")) return null;
        if (json.startsWith("\"") && json.endsWith("\"")) {
            return json.substring(1, json.length() - 1);
        }
        try {
            return Double.parseDouble(json);
        } catch (NumberFormatException e) {
            return json;
        }
    }
    
    private Map<String, Double> parseJsonMap(String json) {
        // Simple map parsing - in production use a proper JSON library
        Map<String, Double> map = new HashMap<>();
        if (json == null || !json.startsWith("{")) return map;
        
        String content = json.substring(1, json.length() - 1);
        String[] pairs = content.split(",");
        
        for (String pair : pairs) {
            String[] kv = pair.split(":");
            if (kv.length == 2) {
                String key = kv[0].trim().replaceAll("\"", "");
                try {
                    Double value = Double.parseDouble(kv[1].trim());
                    map.put(key, value);
                } catch (NumberFormatException ignored) {}
            }
        }
        
        return map;
    }
}
