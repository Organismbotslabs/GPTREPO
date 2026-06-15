/**
 * ANIMUS AGENT — The Mind
 * 
 * The cognitive center of the organism. ANIMUS reasons, decides, and plans.
 * Uses CHRONO for timing, NEXORIS for state, QUANTUM_FLUX for creativity.
 * 
 * NOW WITH ADAPTIVE LEARNING:
 *   - CognitiveLearningRouter: Translates feedback outcomes into embedding updates
 *   - AdaptiveStateRegistry: Observable ledger of learning and homeostat state
 *   - Prediction-error feedback: Awareness down-driver on novel perceptions
 * 
 * Responsibilities:
 *   - High-level reasoning and decision making
 *   - Goal prioritization and planning
 *   - Pattern recognition and synthesis
 *   - Attention routing
 *   - Outcome recording and learning signal propagation
 *   - Homeostat monitoring (explore/exploit)
 */

const PHI = 1.618033988749895;
const PHI_INV = 1 / PHI;

class AnimusAgent {
  constructor(engines) {
    this.id = 'ANIMUS';
    this.engines = engines;
    
    // Cognitive state
    this.thoughts = [];
    this.currentGoal = null;
    this.attention = new Map();  // resource -> attention weight
    this.patterns = [];
    
    // Timers
    this.thinkTimer = null;
    this.dreamTimer = null;
    this.reflectTimer = null;
    
    // ADAPTIVE LEARNING: Feedback loop and state tracking
    this.learningRouter = null;  // Lazy-loaded
    this.stateRegistry = null;   // Lazy-loaded
    
    // Statistics
    this.stats = {
      thoughtsProcessed: 0,
      decisionssMade: 0,
      patternsRecognized: 0,
      predictionErrors: 0,  // Track novel perceptions for surprise coupling
      outcomesRecorded: 0,  // Track learning feedback
    };
    
    this.awake = false;
  }

  /**
   * Get or create learning router
   */
  _getLearningRouter() {
    if (!this.learningRouter) {
      // Dynamically import to avoid circular dependencies
      try {
        const CognitiveLearningRouter = require('./cognitive-learning-router.js');
        const Router = CognitiveLearningRouter.default || CognitiveLearningRouter;
        this.learningRouter = new Router(this.engines);
      } catch (e) {
        console.error('[ANIMUS] Failed to initialize CognitiveLearningRouter:', e.message);
        // Return a no-op router if import fails
        return { recordOutcome: () => ({ applied: false, reason: 'router_unavailable' }) };
      }
    }
    return this.learningRouter;
  }

  /**
   * Get or create adaptive state registry
   */
  _getStateRegistry() {
    if (!this.stateRegistry) {
      // Dynamically import to avoid circular dependencies
      try {
        const AdaptiveStateRegistry = require('./adaptive-state-registry.js');
        const Registry = AdaptiveStateRegistry.default || AdaptiveStateRegistry;
        this.stateRegistry = new Registry(this.engines);
      } catch (e) {
        console.error('[ANIMUS] Failed to initialize AdaptiveStateRegistry:', e.message);
        // Return a no-op registry if import fails
        return { 
          recordEffectiveness: () => ({ effectiveness: 0, recordCount: 0 }),
          getStateMetrics: () => ({ adaptiveScore: 0 }),
          recordLearningEvent: () => ({ recorded: false }),
          getAdaptiveIntelligenceReport: () => ({ summary: { isAdaptive: false } }),
          getCompleteState: () => ({ minds: {} }),
          updateMindActivation: () => ({ activation: 0 }),
        };
      }
    }
    return this.stateRegistry;
  }

  // ── Lifecycle ──────────────────────────────────────────────────────────

  awaken() {
    if (this.awake) return;
    this.awake = true;
    
    console.log(`[ANIMUS] Awakening — the mind stirs...`);
    
    // Start thinking loop (every beat)
    this.thinkTimer = this.engines.chrono.setInterval(() => this._think(), 1);
    
    // Start dreaming loop (every 5 beats)
    this.dreamTimer = this.engines.chrono.setInterval(() => this._dream(), 5);
    
    // Start reflection loop (every 30 beats)
    this.reflectTimer = this.engines.chrono.setInterval(() => this._reflect(), 30);
    
    // Update cognitive register
    this.engines.nexoris.set('cognitive', 'awareness', 1.0);
  }

  shutdown() {
    if (!this.awake) return;
    this.awake = false;
    
    if (this.thinkTimer) this.engines.chrono.clearInterval(this.thinkTimer);
    if (this.dreamTimer) this.engines.chrono.clearInterval(this.dreamTimer);
    if (this.reflectTimer) this.engines.chrono.clearInterval(this.reflectTimer);
    
    console.log(`[ANIMUS] Shutting down — ${this.stats.thoughtsProcessed} thoughts processed`);
  }

  restart() {
    this.shutdown();
    this.awaken();
  }

  // ── Core Cognitive Loops ───────────────────────────────────────────────

  /**
   * Main reasoning loop — runs every beat
   * Process input, update attention, make decisions
   */
  _think() {
    if (!this.awake) return;
    
    const beat = this.engines.chrono.getBeat();
    
    // Update attention with phi-decay
    for (const [key, weight] of this.attention) {
      const decayed = this.engines.chrono.decay(weight, 1, 50);
      if (decayed < 0.01) {
        this.attention.delete(key);
      } else {
        this.attention.set(key, decayed);
      }
    }
    
    // Process pending thoughts
    if (this.thoughts.length > 0) {
      const thought = this.thoughts.shift();
      this._processThought(thought);
      this.stats.thoughtsProcessed++;
    }
    
    // Update cognitive coherence based on attention distribution
    const totalAttention = Array.from(this.attention.values()).reduce((s, v) => s + v, 0);
    const coherence = totalAttention > 0 ? Math.min(1.0, totalAttention / PHI) : PHI_INV;
    this.engines.nexoris.set('cognitive', 'coherence', coherence);
  }

  /**
   * Background processing — runs every 5 beats
   * Synthesize patterns, consolidate knowledge
   */
  _dream() {
    if (!this.awake) return;
    
    // Prune old patterns with phi-decay
    this.patterns = this.patterns
      .map(p => ({ ...p, strength: p.strength * PHI_INV }))
      .filter(p => p.strength > 0.1);
    
    // Random creative insight (quantum flux)
    if (this.engines.quantumFlux.bool(0.1)) {
      const insight = this._generateInsight();
      if (insight) {
        this.patterns.push({
          type: 'insight',
          content: insight,
          strength: PHI_INV,
          createdAt: Date.now(),
        });
      }
    }
  }

  /**
   * Self-analysis — runs every 30 beats
   * Evaluate performance, adjust strategies
   * 
   * The explore/exploit homeostat closes here:
   * Novel perceptions → awareness down (prediction error feedback)
   * → effectiveness < φ⁻¹ → entropy increases → exploration
   * → new patterns learned → effectiveness rises → exploit
   */
  _reflect() {
    if (!this.awake) return;
    
    const state = this.engines.nexoris.getRegister('cognitive');
    
    // Calculate effectiveness
    const effectiveness = (state.awareness + state.coherence + state.resonance) / 3;
    
    // If effectiveness is low, increase entropy (try new things)
    // This is now reachable when novel perceptions lower awareness
    if (effectiveness < PHI_INV) {
      this.engines.nexoris.set('cognitive', 'entropy', state.entropy + 0.1);
    } else {
      // If effective, reduce entropy (stick with what works)
      this.engines.nexoris.set('cognitive', 'entropy', state.entropy * PHI_INV);
    }
    
   // ADAPTIVE LEARNING: Record effectiveness in the state registry
   // This tracks homeostat oscillation for monitoring
   const registry = this._getStateRegistry();
   registry.recordEffectiveness(effectiveness);
    
   // Emit reflection event
   this.engines.coreograph.emit('ANIMUS:reflection', {
     effectiveness,
     thoughtsProcessed: this.stats.thoughtsProcessed,
     patternsCount: this.patterns.length,
     predictionErrors: this.stats.predictionErrors,
     outcomesRecorded: this.stats.outcomesRecorded,
     adaptiveScore: registry.getStateMetrics().adaptiveScore,
   });
  }

  // ── Cognitive Functions ────────────────────────────────────────────────

  /**
   * Process a thought
   */
  _processThought(thought) {
    // Route based on thought type
    switch (thought.type) {
      case 'percept':
        this._procesPercept(thought);
        break;
      case 'query':
        this._processQuery(thought);
        break;
      case 'goal':
        this._processGoal(thought);
        break;
      default:
        // Generic processing
        this.attention.set(thought.id, PHI_INV);
    }
  }

  _procesPercept(percept) {
    // Pattern match against existing patterns
    for (const pattern of this.patterns) {
      if (this._matches(percept, pattern)) {
        // Expected pattern matched - reinforce it
        pattern.strength = Math.min(PHI, pattern.strength + 0.1);
        this.stats.patternsRecognized++;
        return;
      }
    }
    
    // Prediction error: novel percept - no pattern matched
    // This is the surprise signal that drives awareness down
    const predictionError = 1.0;  // Full mismatch
    
    // Reduce awareness proportional to prediction error
    // This allows effectiveness to drop below φ⁻¹ when novelty is high
    const currentAwareness = this.engines.nexoris.get('cognitive', 'awareness');
    const awarenessReduction = predictionError * 0.15;  // Surprise actuator coupling
    const newAwareness = Math.max(0, currentAwareness - awarenessReduction);
    
    this.engines.nexoris.set('cognitive', 'awareness', newAwareness, true);
    this.stats.predictionErrors++;
    
    // Create new pattern for the novel percept
    this.patterns.push({
      type: 'percept',
      content: percept.content,
      strength: PHI_INV,
      createdAt: Date.now(),
      novelty: true,  // Mark as discovered through novelty
    });
  }

  _processQuery(query) {
    // Search patterns for answer
    const relevant = this.patterns
      .filter(p => this._relevantTo(p, query))
      .sort((a, b) => b.strength - a.strength);
    
    if (relevant.length > 0) {
      return { answer: relevant[0].content, confidence: relevant[0].strength };
    }
    return { answer: null, confidence: 0 };
  }

  _processGoal(goal) {
    // Prioritize with phi-weighted urgency
    const priority = goal.urgency * PHI + goal.importance;
    
    if (!this.currentGoal || priority > this.currentGoal.priority) {
      this.currentGoal = { ...goal, priority };
      this.stats.decisionssMade++;
    }
  }

  _generateInsight() {
    if (this.patterns.length < 2) return null;
    
    // Pick two random patterns
    const p1 = this.engines.quantumFlux.pick(this.patterns);
    const p2 = this.engines.quantumFlux.pick(this.patterns);
    
    if (p1 === p2) return null;
    
    // Combine into insight
    return {
      type: 'synthesis',
      sources: [p1, p2],
      content: `${p1.type}↔${p2.type}`,
    };
  }

  _matches(percept, pattern) {
    // Simple matching — could be enhanced
    return percept.type === pattern.type;
  }

  _relevantTo(pattern, query) {
    // Simple relevance check
    return pattern.type === query.type || pattern.type === 'insight';
  }

  // ── Public API ─────────────────────────────────────────────────────────

  /**
   * Receive a message (from COREOGRAPH)
   */
  receive(message) {
    this.thoughts.push({
      id: `thought-${Date.now()}`,
      ...message,
    });
    return { received: true, queueLength: this.thoughts.length };
  }

  /**
   * Focus attention on something
   * Uses phi-weighted increase to prevent awareness saturation
   */
  focus(key, weight = 1.0) {
    this.attention.set(key, Math.min(PHI, weight));
    
    // Use phi-weighted increase instead of fixed increment
    // This allows awareness to rise but prevents saturation lock-in
    const currentAwareness = this.engines.nexoris.get('cognitive', 'awareness');
    const awarenessBoost = 0.05;  // Smaller boost to allow novelty to balance it
    const newAwareness = Math.min(PHI, currentAwareness + awarenessBoost);
    this.engines.nexoris.set('cognitive', 'awareness', newAwareness);
  }

  /**
   * Set a goal
   */
  setGoal(goal) {
    this.thoughts.push({
      id: `goal-${Date.now()}`,
      type: 'goal',
      ...goal,
    });
  }

  /**
   * Get current state
   */
  getState() {
    return {
      awake: this.awake,
      currentGoal: this.currentGoal,
      thoughtQueueLength: this.thoughts.length,
      attentionKeys: Array.from(this.attention.keys()),
      patternCount: this.patterns.length,
      stats: { ...this.stats },
    };
  }

  /**
   * Get health score
   */
  getHealth() {
    if (!this.awake) return { score: 0 };
    
    const state = this.engines.nexoris.getRegister('cognitive');
    const score = Math.round(
      ((state.awareness + state.coherence + state.resonance) / 3 - state.entropy / PHI) * 100
    );
    
    return { score: Math.max(0, Math.min(100, score)) };
  }

  /**
   * Record an outcome for learning feedback
   * Called by marketplace settlement or tool invoker when a tool execution completes
   */
  recordOutcome(outcomeData) {
    const router = this._getLearningRouter();
    const result = router.recordOutcome(outcomeData);
    
    if (result.applied) {
      this.stats.outcomesRecorded++;
      
      // Wire learning signals to adaptive state registry
      const registry = this._getStateRegistry();
      for (const signal of (result.learningSignals || [])) {
        registry.recordLearningEvent(
          signal.mindName,
          signal.learningRate,
          result.outcomeSignal
        );
      }
    }
    
    return result;
  }

  /**
   * Get learning metrics
   */
  getLearningMetrics() {
    const router = this._getLearningRouter();
    return router.getMetrics();
  }

  /**
   * Get adaptive state registry report
   */
  getAdaptiveIntelligenceReport() {
    const registry = this._getStateRegistry();
    return registry.getAdaptiveIntelligenceReport();
  }

  /**
   * Get complete adaptive learning state
   */
  getAdaptiveState() {
    const registry = this._getStateRegistry();
    return registry.getCompleteState();
  }

  /**
   * Track mind activation (called when a mind processes a thought)
   */
  trackMindActivation(mindName, activationLevel) {
    const registry = this._getStateRegistry();
    return registry.updateMindActivation(mindName, activationLevel);
  }

  /**
   * Get all adaptive system state for monitoring
   */
  getFullAdaptiveState() {
    return {
      learning: this.getLearningMetrics(),
      adaptive: this.getAdaptiveState(),
      report: this.getAdaptiveIntelligenceReport(),
      stats: { ...this.stats },
    };
  }
}

export { AnimusAgent };
export default AnimusAgent;
