"""Python-Java Bridge — nervous system coordinator for multi-language organism.

This module enables bidirectional communication between Python and Java runtimes,
acting as the central nervous system that coordinates all language components.
"""
from __future__ import annotations

import json
import sys
import threading
from typing import Any, Dict, Optional, Callable
from queue import Queue
import logging

logger = logging.getLogger(__name__)

class JavaBridge:
    """Bridge enabling Python to communicate with Java organism components."""
    
    def __init__(self):
        self._state: Dict[str, Any] = {}
        self._callbacks: Dict[str, Callable] = {}
        self._message_queue: Queue = Queue()
        self._running = False
        self._lock = threading.Lock()
        
    def initialize(self) -> None:
        """Initialize the Java bridge."""
        logger.info("Initializing Python-Java Bridge...")
        self._state = {
            '__java_state__': {},
            '__heartbeat__': None,
            '__resonance__': None,
        }
        self._running = True
        logger.info("Python-Java Bridge initialized")
        
    def register_callback(self, name: str, callback: Callable) -> None:
        """Register a callback function that Java can invoke."""
        self._callbacks[name] = callback
        logger.debug(f"Registered callback: {name}")
        
    def set_state(self, key: str, value: Any) -> None:
        """Set shared state accessible from Java."""
        with self._lock:
            self._state[key] = value
            
    def get_state(self, key: str) -> Any:
        """Get shared state."""
        with self._lock:
            return self._state.get(key)
            
    def send_to_java(self, message_type: str, payload: Dict[str, Any]) -> None:
        """Send message to Java runtime."""
        message = {
            'type': message_type,
            'payload': payload,
            'timestamp': self._get_timestamp()
        }
        self._message_queue.put(message)
        logger.debug(f"Sent to Java: {message_type}")
        
    def execute_callback(self, name: str, *args, **kwargs) -> Any:
        """Execute registered callback."""
        if name in self._callbacks:
            return self._callbacks[name](*args, **kwargs)
        else:
            logger.warning(f"Callback not found: {name}")
            return None
            
    def shutdown(self) -> None:
        """Shutdown the bridge."""
        self._running = False
        logger.info("Python-Java Bridge shutdown")
        
    @staticmethod
    def _get_timestamp() -> float:
        """Get current timestamp."""
        import time
        return time.time()


class NervousSystemCoordinator:
    """Coordinates organism activity across all languages.
    
    Acts as the central nervous system, routing signals between Java, Python,
    TypeScript, and other language runtimes.
    """
    
    def __init__(self, organism_id: str = "multi-lang-organism-0"):
        self.organism_id = organism_id
        self.java_bridge = JavaBridge()
        self._runtimes: Dict[str, Any] = {}
        self._coordination_active = False
        self._beat_count = 0
        self._phi_phase = 0.0
        
    def initialize(self) -> None:
        """Initialize the nervous system coordinator."""
        logger.info("╔════════════════════════════════════════════════╗")
        logger.info("║   NERVOUS SYSTEM COORDINATOR (Python)         ║")
        logger.info("║   Connecting all languages & runtimes         ║")
        logger.info("╚════════════════════════════════════════════════╝")
        
        self.java_bridge.initialize()
        self._register_default_callbacks()
        self._coordination_active = True
        
        logger.info("Nervous System Coordinator initialized")
        
    def register_runtime(self, language: str, runtime_info: Dict[str, Any]) -> None:
        """Register a language runtime with the coordinator."""
        self._runtimes[language] = runtime_info
        logger.info(f"Registered runtime: {language}")
        
    def coordinate_heartbeat(self, beat: int, phi_phase: float) -> None:
        """Coordinate heartbeat across all runtimes."""
        self._beat_count = beat
        self._phi_phase = phi_phase
        
        # Broadcast to all registered runtimes
        for lang, runtime in self._runtimes.items():
            try:
                if 'heartbeat_callback' in runtime:
                    runtime['heartbeat_callback'](beat, phi_phase)
            except Exception as e:
                logger.error(f"Failed to sync heartbeat to {lang}: {e}")
                
        # Sync back to Java
        self.java_bridge.send_to_java('heartbeat_sync', {
            'beat': beat,
            'phi_phase': phi_phase,
            'runtimes': list(self._runtimes.keys())
        })
        
    def process_complex_computation(
        self, 
        computation_type: str, 
        data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Process computationally complex tasks using Python's capabilities.
        
        This leverages Python's scientific computing ecosystem (NumPy, SciPy, etc.)
        for tasks that require increased computational complexity and capacity.
        """
        logger.info(f"Processing computation: {computation_type}")
        
        if computation_type == "pattern_recognition":
            return self._pattern_recognition(data)
        elif computation_type == "neural_processing":
            return self._neural_processing(data)
        elif computation_type == "sensor_analytics":
            return self._sensor_analytics(data)
        elif computation_type == "vitality_analysis":
            return self._vitality_analysis(data)
        else:
            logger.warning(f"Unknown computation type: {computation_type}")
            return data
            
    def route_message(
        self, 
        source: str, 
        target: str, 
        message: Dict[str, Any]
    ) -> None:
        """Route message between different language runtimes."""
        logger.debug(f"Routing message: {source} -> {target}")
        
        if target == "java":
            self.java_bridge.send_to_java(message['type'], message['payload'])
        elif target in self._runtimes:
            runtime = self._runtimes[target]
            if 'message_handler' in runtime:
                runtime['message_handler'](message)
        else:
            logger.warning(f"Unknown target runtime: {target}")
            
    def get_coordination_status(self) -> Dict[str, Any]:
        """Get current coordination status."""
        return {
            'organism_id': self.organism_id,
            'active': self._coordination_active,
            'beat_count': self._beat_count,
            'phi_phase': self._phi_phase,
            'registered_runtimes': list(self._runtimes.keys()),
            'runtime_count': len(self._runtimes)
        }
        
    def shutdown(self) -> None:
        """Shutdown the coordinator."""
        logger.info("Shutting down Nervous System Coordinator...")
        self._coordination_active = False
        self.java_bridge.shutdown()
        logger.info("Nervous System Coordinator shutdown complete")
        
    # ── Private methods ──
    
    def _register_default_callbacks(self) -> None:
        """Register default callbacks for Java to invoke."""
        self.java_bridge.register_callback(
            'sync_heartbeat', 
            self.coordinate_heartbeat
        )
        self.java_bridge.register_callback(
            'process_computation', 
            self.process_complex_computation
        )
        self.java_bridge.register_callback(
            'route_message', 
            self.route_message
        )
        
    def _pattern_recognition(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Perform pattern recognition on sensor data."""
        # Placeholder for advanced pattern recognition
        # In production, this would use ML libraries like scikit-learn
        
        result = {}
        for key, value in data.items():
            if isinstance(value, (int, float)):
                # Simple pattern detection
                result[f"{key}_trend"] = "increasing" if value > 0.5 else "stable"
                result[f"{key}_anomaly_score"] = abs(value - 0.5)
        
        return result
        
    def _neural_processing(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Perform neural network-style processing."""
        # Placeholder for neural processing
        # In production, this would use PyTorch, TensorFlow, or JAX
        
        import math
        
        result = {}
        for key, value in data.items():
            if isinstance(value, (int, float)):
                # Apply non-linear transformation (phi-encoded)
                phi = 1.618033988749895
                transformed = math.tanh(value * phi)
                result[f"{key}_transformed"] = transformed
                result[f"{key}_activation"] = 1.0 / (1.0 + math.exp(-transformed))
        
        return result
        
    def _sensor_analytics(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze sensor data with statistical methods."""
        result = {
            'mean': 0.0,
            'variance': 0.0,
            'min': float('inf'),
            'max': float('-inf'),
            'count': 0
        }
        
        values = [v for v in data.values() if isinstance(v, (int, float))]
        
        if values:
            result['mean'] = sum(values) / len(values)
            result['variance'] = sum((x - result['mean']) ** 2 for x in values) / len(values)
            result['min'] = min(values)
            result['max'] = max(values)
            result['count'] = len(values)
            result['range'] = result['max'] - result['min']
            
        return result
        
    def _vitality_analysis(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze organism vitality across all systems."""
        from .constants import PHI
        
        # Calculate weighted vitality using phi ratios
        weights = {
            'cognitive': PHI,
            'affective': PHI ** 2,
            'somatic': PHI ** 3,
            'sovereign': PHI ** 4
        }
        
        weighted_sum = 0.0
        weight_total = 0.0
        
        for key, value in data.items():
            if isinstance(value, (int, float)):
                for register, weight in weights.items():
                    if register in key.lower():
                        weighted_sum += value * weight
                        weight_total += weight
                        break
        
        vitality = weighted_sum / weight_total if weight_total > 0 else 0.0
        
        return {
            'vitality_score': vitality,
            'phi_harmony': vitality * PHI,
            'system_health': 'optimal' if vitality > 0.7 else 'normal' if vitality > 0.4 else 'degraded'
        }


# Global coordinator instance
_global_coordinator: Optional[NervousSystemCoordinator] = None

def get_coordinator() -> NervousSystemCoordinator:
    """Get global coordinator instance."""
    global _global_coordinator
    if _global_coordinator is None:
        _global_coordinator = NervousSystemCoordinator()
        _global_coordinator.initialize()
    return _global_coordinator
