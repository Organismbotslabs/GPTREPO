/**
 * COGNITIVE LEARNING ROUTER — Feedback to Embedding Bridge
 * 
 * Closes the feedback loop by translating outcome signals into mind embedding updates.
 * This is the critical missing link: feedback → cognition.
 * 
 * When an outcome is recorded (success/failure/quality score), this router:
 * 1. Analyzes the outcome quality and confidence
 * 2. Generates learning signals for each relevant mind
 * 3. Updates mind embeddings proportional to outcome quality
 * 4. Tracks learning velocity for the adaptive state registry
 * 
 * This enables genuine behavioral adaptation: good outcomes reinforce
 * successful cognitive patterns, bad outcomes drive exploration.
 */

const PHI = 1.618033988749895;
const PHI_INV = 1 / PHI;

class CognitiveLearningRouter {
  constructor(engines) {
    this.engines = engines;
    
    // Learning state
    this.outcomes = [];
    this.mindEmbeddings = new Map();  // mind-name -> embedding vector
    this.learningVelocities = new Map();  // mind-name -> velocity scalar
    this.cumulativeLearning = new Map();  // track total learning per mind
    
    // Metrics
    this.totalOutcomes = 0;
    this.successfulOutcomes = 0;
    this.failedOutcomes = 0;
    this.averageQuality = 0.5;
    this.learningEpoch = 0;
    
    // Learning rate
    this.baseLearningRate = 0.05;  // Base update magnitude
    this.confidenceThreshold = 0.3;  // Minimum confidence to apply learning
  }

  /**
   * Record an outcome and propagate learning signals
   * Called after tool invocation completes with results
   */
  recordOutcome(outcomData) {
    const {
      toolId,
      status,  // 'success' | 'failure' | 'partial'
      quality = 0.5,  // 0-1 quality score
      confidence = 0.8,  // 0-1 confidence in this assessment
      relevantMinds = [],  // which minds were involved
      duration = 0,
      metadata = {},
    } = outcomData;

    // Skip if insufficient confidence
    if (confidence < this.confidenceThreshold) {
      return { applied: false, reason: 'below_confidence_threshold' };
    }

    this.totalOutcomes++;
    
    // Compute outcome signal
    let outcomeSignal = 0;
    if (status === 'success') {
      this.successfulOutcomes++;
      outcomeSignal = quality * PHI;  // Successful outcomes amplified by phi
    } else if (status === 'failure') {
      this.failedOutcomes++;
      outcomeSignal = -quality * PHI_INV;  // Failures discounted
    } else {
      // Partial success
      outcomeSignal = (quality - 0.5) * PHI;  // Neutral zero at 0.5
    }

    // Update running average quality
    this.averageQuality = (this.averageQuality * (this.totalOutcomes - 1) + quality) / this.totalOutcomes;

    // Generate learning signals for each involved mind
    const learningSignals = [];
    for (const mindName of relevantMinds) {
      const signal = this._generateLearningSignal(mindName, outcomeSignal, confidence);
      learningSignals.push(signal);
      this._updateMindEmbedding(mindName, signal, outcomeSignal);
    }

    // Record in history
    this.outcomes.push({
      toolId,
      status,
      quality,
      confidence,
      outcomeSignal,
      relevantMinds,
      learningSignals,
      timestamp: Date.now(),
    });
    if (this.outcomes.length > 500) this.outcomes.shift();

    return {
      applied: true,
      outcomeSignal,
      learningSignals,
      averageQuality: this.averageQuality,
    };
  }

  /**
   * Generate a learning signal for a specific mind
   * Higher quality outcomes → larger update vectors
   * Failure outcomes → opposite direction updates (exploration signal)
   */
  _generateLearningSignal(mindName, outcomeSignal, confidence) {
    const magnitude = Math.abs(outcomeSignal) * confidence;
    const direction = Math.sign(outcomeSignal);
    
    return {
      mindName,
      magnitude,
      direction,
      learningRate: this.baseLearningRate * magnitude,
      timestamp: Date.now(),
    };
  }

  /**
   * Update a mind's embedding vector based on outcome
   * This is where feedback actually shapes cognition
   */
  _updateMindEmbedding(mindName, signal, outcomeSignal) {
    if (!this.mindEmbeddings.has(mindName)) {
      // Initialize embedding if not exists
      this.mindEmbeddings.set(mindName, this._initializeEmbedding(mindName));
      this.learningVelocities.set(mindName, 0);
      this.cumulativeLearning.set(mindName, 0);
    }

    const embedding = this.mindEmbeddings.get(mindName);
    
    // Compute embedding delta
    // Outcome signal direction × learning rate × embedding decay
    const delta = signal.direction * signal.learningRate * PHI_INV;
    
    // Update embedding dimensions with phi-weighted interpolation
    for (let i = 0; i < embedding.length; i++) {
      const oldValue = embedding[i];
      // Smooth transition using phi-weighted blending
      embedding[i] = oldValue * PHI_INV + (oldValue + delta) * (1 - PHI_INV);
      // Clamp to valid range
      embedding[i] = Math.max(-1, Math.min(1, embedding[i]));
    }

    // Update learning velocity (rate of change)
    const velocity = this.learningVelocities.get(mindName);
    const newVelocity = Math.abs(delta);
    this.learningVelocities.set(mindName, velocity * PHI_INV + newVelocity * (1 - PHI_INV));

    // Track cumulative learning
    const cumulative = this.cumulativeLearning.get(mindName);
    this.cumulativeLearning.set(mindName, cumulative + Math.abs(delta));

    // Push learning signal to NEXORIS for persistent state
    if (this.engines.nexoris) {
      this.engines.nexoris.setStore(`mind-${mindName}`, 'embedding', embedding);
      this.engines.nexoris.setStore(`mind-${mindName}`, 'learningVelocity', newVelocity);
    }

    return { updated: true, delta, newVelocity };
  }

  /**
   * Initialize a mind embedding vector
   * 4D vector: [awareness, coherence, resonance, entropy]
   */
  _initializeEmbedding(mindName) {
    return [1.0, 1.0, PHI_INV, 0.0];
  }

  /**
   * Get mind embedding state
   */
  getMindEmbedding(mindName) {
    return this.mindEmbeddings.get(mindName) || this._initializeEmbedding(mindName);
  }

  /**
   * Get learning velocity for a mind
   */
  getLearningVelocity(mindName) {
    return this.learningVelocities.get(mindName) || 0;
  }

  /**
   * Get all minds and their current state
   */
  getMindsState() {
    const minds = {};
    for (const [mindName, embedding] of this.mindEmbeddings) {
      minds[mindName] = {
        embedding,
        velocity: this.learningVelocities.get(mindName),
        cumulativeLearning: this.cumulativeLearning.get(mindName),
      };
    }
    return minds;
  }

  /**
   * Get comprehensive learning metrics
   */
  getMetrics() {
    const successRate = this.totalOutcomes > 0 
      ? this.successfulOutcomes / this.totalOutcomes 
      : 0;
    
    const avgVelocity = this.learningVelocities.size > 0
      ? Array.from(this.learningVelocities.values()).reduce((a, b) => a + b, 0) / this.learningVelocities.size
      : 0;

    return {
      totalOutcomes: this.totalOutcomes,
      successfulOutcomes: this.successfulOutcomes,
      failedOutcomes: this.failedOutcomes,
      successRate: Math.round(successRate * 100),
      averageQuality: Math.round(this.averageQuality * 100),
      mindsTraining: this.mindEmbeddings.size,
      averageLearningVelocity: avgVelocity,
      learningEpoch: this.learningEpoch,
      recentOutcomes: this.outcomes.slice(-10),
      mindsState: this.getMindsState(),
      phi: PHI,
    };
  }

  /**
   * Reset learning state
   */
  reset() {
    this.outcomes = [];
    this.mindEmbeddings.clear();
    this.learningVelocities.clear();
    this.cumulativeLearning.clear();
    this.totalOutcomes = 0;
    this.successfulOutcomes = 0;
    this.failedOutcomes = 0;
    this.averageQuality = 0.5;
    this.learningEpoch++;
  }
}

export { CognitiveLearningRouter };
export default CognitiveLearningRouter;
