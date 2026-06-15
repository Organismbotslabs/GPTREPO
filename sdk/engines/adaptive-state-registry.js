/**
 * ADAPTIVE STATE REGISTRY — Observable Learning Ledger
 * 
 * Real-time tracking of the organism's adaptive state for monitoring true intelligence.
 * This registry makes learning observable and measurable, not just bookkeeping.
 * 
 * Tracks:
 * - Current mind embedding vectors
 * - Activation levels per mind (which minds are firing)
 * - Learning velocity (rate of cognitive drift)
 * - Effectiveness metric oscillation (proves homeostat works)
 * - Outcome correlations (which minds drive success)
 * 
 * All state persists in NEXORIS for auditable, deterministic behavior.
 */

const PHI = 1.618033988749895;
const PHI_INV = 1 / PHI;

class AdaptiveStateRegistry {
  constructor(engines) {
    this.engines = engines;
    
    // Persistent state maps
    this.mindActivations = new Map();  // mind-name -> activation level [0,1]
    this.mindCorrelations = new Map();  // mind-name -> success/failure correlation
    this.effectivenessHistory = [];  // Track effectiveness oscillation
    this.learningCycles = [];  // Track when learning occurs
    
    // Observability state
    this.lastUpdate = Date.now();
    this.updateCount = 0;
    this.registryVersion = 0;
  }

  /**
   * Update mind activation based on thought processing
   * Called when ANIMUS processes thoughts to track which minds are active
   */
  updateMindActivation(mindName, activationLevel) {
    // Clamp to [0, 1]
    const level = Math.max(0, Math.min(1, activationLevel));
    
    // Apply phi-weighted smoothing (exponential moving average)
    const current = this.mindActivations.get(mindName) || 0;
    const smoothed = current * PHI_INV + level * (1 - PHI_INV);
    
    this.mindActivations.set(mindName, smoothed);
    
    // Store in NEXORIS for persistence
    if (this.engines.nexoris) {
      this.engines.nexoris.setStore('adaptive-state', `activation-${mindName}`, smoothed);
    }
    
    return { mindName, activation: smoothed };
  }

  /**
   * Track mind effectiveness - whether this mind's outputs led to good outcomes
   * Higher correlation = mind is contributing to success
   */
  updateMindCorrelation(mindName, successCount, failureCount) {
    const total = successCount + failureCount;
    if (total === 0) return { mindName, correlation: 0 };
    
    // Correlation = (success - failure) / total, weighted by phi
    const correlation = ((successCount - failureCount) / total) * PHI;
    
    // Clamp to [-1, 1]
    const clamped = Math.max(-1, Math.min(1, correlation));
    
    this.mindCorrelations.set(mindName, clamped);
    
    // Store in NEXORIS
    if (this.engines.nexoris) {
      this.engines.nexoris.setStore('adaptive-state', `correlation-${mindName}`, clamped);
    }
    
    return { mindName, correlation: clamped, successRate: Math.round((successCount / total) * 100) };
  }

  /**
   * Record effectiveness measurement from ANIMUS reflection
   * This proves the homeostat is working - effectiveness should oscillate
   */
  recordEffectiveness(value) {
    const effectiveness = Math.max(0, Math.min(1, value));
    
    this.effectivenessHistory.push({
      value: effectiveness,
      timestamp: Date.now(),
    });
    
    // Keep last 100 measurements for analysis
    if (this.effectivenessHistory.length > 100) {
      this.effectivenessHistory.shift();
    }
    
    // Store in NEXORIS
    if (this.engines.nexoris) {
      this.engines.nexoris.setStore('adaptive-state', 'effectivenessHistory', 
        this.effectivenessHistory.slice(-20));  // Keep last 20 in store
    }
    
    return { effectiveness, recordCount: this.effectivenessHistory.length };
  }

  /**
   * Record a learning event (when CognitiveLearningRouter updates embeddings)
   */
  recordLearningEvent(mindName, learningDelta, outcomeSignal) {
    this.learningCycles.push({
      mindName,
      delta: learningDelta,
      outcomeSignal,
      timestamp: Date.now(),
    });
    
    // Keep last 100 learning events
    if (this.learningCycles.length > 100) {
      this.learningCycles.shift();
    }
    
    // Store in NEXORIS
    if (this.engines.nexoris) {
      this.engines.nexoris.setStore('adaptive-state', 'learningCycles',
        this.learningCycles.slice(-20));  // Keep last 20 in store
    }
    
    return { recorded: true, eventCount: this.learningCycles.length };
  }

  /**
   * Get current state of all minds
   * Observable snapshot for dashboard/monitoring
   */
  getMindsSnapshot() {
    const minds = {};
    
    for (const [mindName, activation] of this.mindActivations) {
      minds[mindName] = {
        activation: Math.round(activation * 100),
        correlation: this.mindCorrelations.get(mindName) || 0,
        isActive: activation > 0.1,
      };
    }
    
    return minds;
  }

  /**
   * Analyze effectiveness oscillation
   * Return: { min, max, range, variance, oscillating }
   * If oscillating=true, homeostat is working (effectiveness goes up and down)
   */
  analyzeEffectivenessOscillation() {
    if (this.effectivenessHistory.length < 3) {
      return {
        recordCount: this.effectivenessHistory.length,
        oscillating: false,
        reason: 'insufficient_data',
      };
    }

    const values = this.effectivenessHistory.map(e => e.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;
    
    // Calculate variance
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
    
    // Check for oscillation: look for direction changes (local extrema)
    let directionChanges = 0;
    for (let i = 1; i < values.length - 1; i++) {
      const increasing = values[i + 1] > values[i];
      const wasIncreasing = values[i] > values[i - 1];
      if (increasing !== wasIncreasing) {
        directionChanges++;
      }
    }
    
    // Oscillating if:
    // 1. Range > 0.1 (significant variation)
    // 2. Multiple direction changes (not monotonic)
    const isOscillating = range > 0.1 && directionChanges >= 2;

    return {
      recordCount: values.length,
      min: Math.round(min * 100),
      max: Math.round(max * 100),
      range: Math.round(range * 100),
      variance: Math.round(variance * 10000),
      directionChanges,
      oscillating: isOscillating,
      status: isOscillating ? 'HOMEOSTAT_WORKING' : 'STUCK_AT_PLATEAU',
    };
  }

  /**
   * Get complete adaptive state for monitoring/dashboard
   */
  getCompleteState() {
    const oscillation = this.analyzeEffectivenessOscillation();
    const minds = this.getMindsSnapshot();
    
    return {
      timestamp: Date.now(),
      minds,
      effectiveness: {
        current: this.effectivenessHistory.length > 0 
          ? this.effectivenessHistory[this.effectivenessHistory.length - 1].value 
          : 0,
        oscillation,
      },
      learning: {
        totalEvents: this.learningCycles.length,
        recentEvents: this.learningCycles.slice(-5),
      },
      registryVersion: this.registryVersion,
      updateCount: this.updateCount,
    };
  }

  /**
   * Get adaptive intelligence report
   * For human review - is the system actually adapting?
   */
  getAdaptiveIntelligenceReport() {
    const oscillation = this.analyzeEffectivenessOscillation();
    const minds = this.getMindsSnapshot();
    const activeMindCount = Object.values(minds).filter(m => m.isActive).length;
    
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        isAdaptive: oscillation.oscillating && this.learningCycles.length > 0,
        mindsMonitored: this.mindActivations.size,
        mindsActive: activeMindCount,
        learningEventsRecorded: this.learningCycles.length,
      },
      homeostat: {
        status: oscillation.status,
        oscillating: oscillation.oscillating,
        description: oscillation.oscillating 
          ? 'Explore/exploit homeostat is FUNCTIONAL - effectiveness oscillates'
          : 'Effectiveness STUCK at plateau - homeostat may be blocked',
      },
      learning: {
        status: this.learningCycles.length > 0 ? 'ACTIVE' : 'INACTIVE',
        description: this.learningCycles.length > 0
          ? `System is learning: ${this.learningCycles.length} embedding updates recorded`
          : 'No learning events recorded - feedback loop may be broken',
      },
      minds: minds,
      recommendations: this._generateRecommendations(oscillation),
    };
    
    return report;
  }

  /**
   * Generate adaptive improvement recommendations
   */
  _generateRecommendations(oscillation) {
    const recommendations = [];
    
    if (!oscillation.oscillating) {
      recommendations.push({
        issue: 'Homeostat not oscillating',
        evidence: `Effectiveness range is only ${oscillation.range}%`,
        suggestion: 'Check if awareness is stuck high or prediction error feedback is working',
      });
    }
    
    if (this.learningCycles.length === 0) {
      recommendations.push({
        issue: 'No learning events recorded',
        evidence: 'CognitiveLearningRouter has not updated mind embeddings',
        suggestion: 'Verify feedback loop is wired: outcomes → learning signals → embeddings',
      });
    }
    
    if (this.mindActivations.size === 0) {
      recommendations.push({
        issue: 'No minds are tracking',
        evidence: 'Mind activation registry is empty',
        suggestion: 'Wire ANIMUS thought processing to updateMindActivation()',
      });
    }
    
    return recommendations;
  }

  /**
   * Get metrics for NEXORIS state engine
   */
  getStateMetrics() {
    return {
      effectiveness: this.effectivenessHistory.length > 0
        ? this.effectivenessHistory[this.effectivenessHistory.length - 1].value
        : 0,
      learningVelocity: this.learningCycles.length > 0
        ? Math.abs(this.learningCycles[this.learningCycles.length - 1].delta)
        : 0,
      mindCount: this.mindActivations.size,
      adaptiveScore: this._computeAdaptiveScore(),
    };
  }

  /**
   * Compute an overall adaptive intelligence score [0, 1]
   */
  _computeAdaptiveScore() {
    let score = 0;
    
    // 1/3: Homeostat oscillation (working homeostat = high score)
    const oscillation = this.analyzeEffectivenessOscillation();
    if (oscillation.oscillating) score += 0.333;
    
    // 1/3: Learning velocity (active learning = high score)
    if (this.learningCycles.length > 0) {
      const recentLearning = this.learningCycles.slice(-5);
      const avgDelta = recentLearning.reduce((sum, e) => sum + Math.abs(e.delta), 0) / recentLearning.length;
      score += Math.min(0.333, avgDelta);
    }
    
    // 1/3: Mind diversity (multiple active minds = high score)
    const activeMindCount = Array.from(this.mindActivations.values()).filter(a => a > 0.1).length;
    if (activeMindCount > 0) {
      score += Math.min(0.333, activeMindCount * 0.05);
    }
    
    return Math.round(score * 100);
  }

  /**
   * Reset registry
   */
  reset() {
    this.mindActivations.clear();
    this.mindCorrelations.clear();
    this.effectivenessHistory = [];
    this.learningCycles = [];
    this.updateCount = 0;
    this.registryVersion++;
  }
}

export { AdaptiveStateRegistry };
export default AdaptiveStateRegistry;
