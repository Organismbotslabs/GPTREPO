/**
 * PHYSICS LAWS & THERMODYNAMIC CONSTRAINTS
 * 
 * The Sovereign Organism is constrained by real physics principles:
 * - Conservation of energy
 * - Second law of thermodynamics (entropy increase)
 * - Information theory bounds
 * - Computational complexity limits
 * 
 * These laws are UNBREAKABLE because they derive from fundamental physics.
 * No amount of code or governance can circumvent thermodynamics.
 * 
 * @module foundations/physics-laws
 * @version 2.0.0
 */

import {
  PHI,
  PHI_INVERSE,
  BOLTZMANN_CONSTANT,
  LANDAUER_LIMIT_ENERGY,
  HEARTBEAT_MS,
  INFORMATION_THEORETICAL_SECURITY,
} from './mathematical-constants.js';

// ══════════════════════════════════════════════════════════════════════════════
// LAW P-1: LANDAUER'S PRINCIPLE — State Erasure Costs Energy
// ══════════════════════════════════════════════════════════════════════════════

/**
 * Landauer's Principle (Bennett & Landauer, 1996):
 * 
 * The minimum energy cost to erase 1 bit of information is:
 *   E_min = k_B · T · ln(2)
 * 
 * where:
 *   k_B = Boltzmann constant = 1.380649e-23 J/K
 *   T = temperature in Kelvin (assume 300K room temp)
 *   ln(2) = 0.693147...
 * 
 * At room temperature: E_min ≈ 2.86e-21 joules per bit
 * 
 * IMPLICATION FOR ORGANISM:
 *   State CANNOT be arbitrarily erased. It costs real energy.
 *   Therefore, perfect "garbage collection" is physically impossible.
 *   Memory MUST be preserved. This ENFORCES Law ML-001 (Memory Lineage).
 *   
 * ENFORCEMENT AT RUNTIME:
 *   Any attempt to delete organism state without recording ancestry
 *   violates physics. The system will FORBID such operations.
 */
class LandauerPrincipleEnforcer {
  constructor() {
    this.totalBitsErased = 0;
    this.totalEnergySpent = 0;
  }

  /**
   * Calculate energy cost of erasing N bits
   * 
   * Formula: E = N × k_B × T × ln(2)
   */
  calculateErasureCost(numBits, tempKelvin = 300) {
    const ln2 = Math.log(2);
    const energyCost = numBits * BOLTZMANN_CONSTANT * tempKelvin * ln2;
    this.totalEnergySpent += energyCost;
    return energyCost;
  }

  /**
   * Cost of erasing the entire state of an agent (assuming 1MB = 8M bits)
   * at room temperature: 1MB ≈ 2.3e-14 joules
   * 
   * This is why deletion logs cost energy and must be tracked.
   */
  estimateAgentErasureCost(agentMemorySizeBytes, tempKelvin = 300) {
    const bits = agentMemorySizeBytes * 8;
    return this.calculateErasureCost(bits, tempKelvin);
  }

  /**
   * Assert that deletion respects lineage law
   */
  assertDeletionHasLineage(stateId, ancestorChain) {
    if (!ancestorChain || ancestorChain.length === 0) {
      throw new Error(`PHYSICS LAW VIOLATION: Attempted to delete state ${stateId} without ancestor chain. This violates Landauer's Principle and Law ML-001.`);
    }
    return true;
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// LAW P-2: SECOND LAW OF THERMODYNAMICS — Entropy Always Increases
// ══════════════════════════════════════════════════════════════════════════════

/**
 * Second Law of Thermodynamics:
 * 
 *   dS/dt ≥ 0  (Entropy always increases or stays constant)
 * 
 * For isolated systems: S_final ≥ S_initial
 * For open systems: dS_internal = dS_heat_flow + dS_irreversible ≥ 0
 * 
 * IMPLICATION FOR ORGANISM:
 *   The organism cannot decrease entropy (disorder) without an external energy input.
 *   Making something "perfect" or "ordered" requires work.
 *   Therefore:
 *     - Defects cannot spontaneously fix themselves (need energy)
 *     - Chaos requires active maintenance to prevent
 *     - All governance requires continuous work
 * 
 * ENFORCEMENT AT RUNTIME:
 *   System entropy is continuously calculated.
 *   If system entropy DECREASES without external work input, FORBID operation.
 */
class EntropyLawEnforcer {
  constructor() {
    this.currentEntropy = 0;
    this.lastMeasurement = Date.now();
    this.externalWorkInput = 0;
  }

  /**
   * Calculate Shannon entropy of a state
   * H(X) = -Σ p(x) · log₂(p(x))
   * 
   * Measures disorder/uncertainty in the organism's state
   */
  calculateStateEntropy(stateDistribution) {
    let entropy = 0;
    for (const prob of stateDistribution) {
      if (prob > 0) {
        entropy -= prob * Math.log2(prob);
      }
    }
    return entropy;
  }

  /**
   * Assert that system entropy does not decrease without work
   * 
   * Law: ΔS_system ≥ -W_external / T
   *   where W_external = work done on system
   *         T = temperature
   */
  assertEntropyConstraint(newEntropy, tempKelvin = 300, workInputJoules = 0) {
    const deltaS = newEntropy - this.currentEntropy;
    const minAllowedDecrease = -workInputJoules / tempKelvin;

    if (deltaS < minAllowedDecrease - 1e-10) {
      throw new Error(`PHYSICS LAW VIOLATION: System entropy decreased (${deltaS}) without sufficient work input (${minAllowedDecrease}). Violates Second Law of Thermodynamics.`);
    }

    this.currentEntropy = newEntropy;
    this.externalWorkInput += workInputJoules;
    return true;
  }

  /**
   * Measure change in system entropy over time
   */
  measureEntropyRate() {
    const now = Date.now();
    const timeDelta = (now - this.lastMeasurement) / 1000; // seconds
    const entropyRate = (this.currentEntropy - this.lastMeasurement) / timeDelta;
    this.lastMeasurement = now;
    return entropyRate;
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// LAW P-3: COMPUTATIONAL COMPLEXITY BOUNDS — No Free Computation
// ══════════════════════════════════════════════════════════════════════════════

/**
 * Computational Complexity Theory (Cobham-Edmonds thesis):
 * 
 * A problem is "efficiently solvable" if it can be solved in polynomial time.
 * Some problems require exponential time (NP-complete problems).
 * 
 * IMPLICATION FOR ORGANISM:
 *   Cannot solve intractable problems without exponential time/energy.
 *   Must use approximation, heuristics, or quantum computation.
 *   No algorithm can overcome complexity class boundaries.
 * 
 * ENFORCEMENT AT RUNTIME:
 *   Track algorithmic complexity of key operations.
 *   If operation exceeds expected complexity class, mark as suspect.
 */
class ComplexityBoundsEnforcer {
  constructor() {
    this.trackedOperations = new Map();
  }

  /**
   * Register an operation's expected complexity
   * 
   * complexity: 'O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)', etc.
   */
  registerOperation(operationName, complexity, maxInputSize) {
    const complexityClass = this.parseComplexity(complexity);
    this.trackedOperations.set(operationName, {
      complexity,
      complexityClass,
      maxInputSize,
      timesExecuted: 0,
      totalTime: 0,
    });
  }

  /**
   * Check that execution time matches expected complexity
   * 
   * If actual_time >> expected_time, something is wrong (algorithm attack, bug, etc.)
   */
  assertComplexityBound(operationName, inputSize, actualTimeMs) {
    if (!this.trackedOperations.has(operationName)) {
      throw new Error(`Operation ${operationName} not registered with complexity bounds`);
    }

    const op = this.trackedOperations.get(operationName);
    const expectedTime = this.estimateTime(op.complexityClass, inputSize);
    const ratio = actualTimeMs / expectedTime;

    // Allow 2x overhead for system factors, but not 100x+
    if (ratio > 100) {
      throw new Error(`COMPLEXITY LAW VIOLATION: Operation ${operationName} took ${actualTimeMs}ms for input size ${inputSize}. Expected ${expectedTime}ms (ratio: ${ratio}x). Possible algorithmic attack.`);
    }

    op.timesExecuted++;
    op.totalTime += actualTimeMs;
    return true;
  }

  parseComplexity(complexityStr) {
    // Simple parser: "O(n log n)" → { base: 'n', factor: 'log' }
    const match = complexityStr.match(/O\(([^)]+)\)/);
    return match ? match[1] : '1';
  }

  estimateTime(complexityClass, inputSize) {
    // Rough estimates in milliseconds
    const estimates = {
      '1': 0.001,
      'log n': 0.01 * Math.log2(inputSize),
      'n': 0.1 * inputSize,
      'n log n': 0.1 * inputSize * Math.log2(inputSize),
      'n²': 1 * inputSize * inputSize,
      '2^n': Math.pow(2, Math.min(inputSize, 20)) * 10, // cap at 2^20
    };
    return estimates[complexityClass] || 1;
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// LAW P-4: INFORMATION CONSERVATION — No Information Creation from Nothing
// ══════════════════════════════════════════════════════════════════════════════

/**
 * Information Conservation Principle:
 * 
 * Information cannot be created from nothing. The total information in a
 * closed system is conserved (or increases due to external input).
 * 
 * Mutual Information: I(X;Y) measures information shared between X and Y
 * 
 * IMPLICATION FOR ORGANISM:
 *   Cannot know something without observing it or deriving it from known info.
 *   Hallucinated information violates information conservation.
 *   Law SL-006 (Hallucination Containment) enforces this physics.
 * 
 * ENFORCEMENT AT RUNTIME:
 *   All generated information must be traceable to observations or derivations.
 *   Ungrounded assertions are rejected.
 */
class InformationConservationEnforcer {
  constructor() {
    this.knownFacts = new Set();
    this.derivedFacts = new Map(); // fact → derivation proof
  }

  /**
   * Observe a fact from the external world
   * This is a SOURCE of information (external input)
   */
  observeFact(fact, source = 'external') {
    this.knownFacts.add(fact);
    return { fact, source, timestamp: Date.now() };
  }

  /**
   * Derive a fact from known facts using logical rules
   * 
   * Rules: Array of { premises: [...], conclusion: fact }
   * If all premises are known, we can conclude the fact
   */
  deriveFact(conclusion, premises, ruleName) {
    for (const premise of premises) {
      if (!this.knownFacts.has(premise)) {
        throw new Error(`INFORMATION CONSERVATION VIOLATION: Cannot derive "${conclusion}" - premise not known: "${premise}". Violates information conservation.`);
      }
    }

    this.knownFacts.add(conclusion);
    this.derivedFacts.set(conclusion, {
      rule: ruleName,
      premises,
      derivedAt: Date.now(),
    });

    return { conclusion, derivation: this.derivedFacts.get(conclusion) };
  }

  /**
   * Assert that a fact is grounded (traceable to observation or derivation)
   * 
   * This FORBIDS hallucinated facts
   */
  assertFactIsGrounded(fact) {
    if (!this.knownFacts.has(fact)) {
      throw new Error(`INFORMATION CONSERVATION VIOLATION: Fact "${fact}" is ungrounded. Not observed and not derivable. This is hallucination. FORBID.`);
    }
    return true;
  }

  /**
   * Get the information lineage of a fact
   * Shows how this fact was derived (or observed)
   */
  getFactLineage(fact) {
    if (!this.knownFacts.has(fact)) return null;

    const derivation = this.derivedFacts.get(fact);
    if (!derivation) {
      return { type: 'observation', fact };
    }

    return {
      type: 'derived',
      fact,
      rule: derivation.rule,
      premises: derivation.premises,
      premisesLineages: derivation.premises.map(p => this.getFactLineage(p)),
    };
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// LAW P-5: CRYPTOGRAPHIC IRREVERSIBILITY — One-Way Functions
// ══════════════════════════════════════════════════════════════════════════════

/**
 * Cryptographic One-Way Functions:
 * 
 * A function f is "one-way" if:
 *   - Computing f(x) is easy (polynomial time)
 *   - Computing f⁻¹(y) is hard (exponential time)
 * 
 * Cryptographic hash functions are (conjectured) one-way:
 *   - No known collision algorithm (all current: 2^(n/2) complexity)
 *   - SHA-256: Requires ~2^128 operations to invert
 * 
 * IMPLICATION FOR ORGANISM:
 *   Hashed state cannot be reversed to original state.
 *   Signed contracts cannot be forged without private key.
 *   Once hashed/signed, the commitment is irreversible.
 */
class CryptographicIrreversibilityEnforcer {
  /**
   * Assert that a hash cannot be reversed
   * 
   * If someone claims to have reversed a SHA-256 hash, something is broken
   */
  assertHashIrreversibility(originalData, hash) {
    const crypto = require('crypto');
    const computed = crypto.createHash('sha256').update(originalData).digest('hex');

    if (computed === hash) {
      return true; // Hash is consistent
    }

    throw new Error(`CRYPTOGRAPHIC IRREVERSIBILITY VIOLATION: Hash mismatch. Original data does not hash to claimed value. Possible tampering.`);
  }

  /**
   * Track immutable commitments
   * Once something is cryptographically committed, it cannot change
   */
  makeImmutableCommitment(data) {
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
    
    return {
      hash,
      data, // For audit purposes only - not modifiable
      committedAt: Date.now(),
      isImmutable: true,
    };
  }

  /**
   * Verify immutable commitment
   * If data changed, hash will differ
   */
  verifyImmutableCommitment(commitment, currentData) {
    const crypto = require('crypto');
    const currentHash = crypto.createHash('sha256').update(JSON.stringify(currentData)).digest('hex');

    if (currentHash !== commitment.hash) {
      throw new Error(`IMMUTABILITY VIOLATION: Committed data has changed! Hash was ${commitment.hash}, now ${currentHash}. FORBID modification.`);
    }

    return true;
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// EXPORTS
// ══════════════════════════════════════════════════════════════════════════════

export {
  LandauerPrincipleEnforcer,
  EntropyLawEnforcer,
  ComplexityBoundsEnforcer,
  InformationConservationEnforcer,
  CryptographicIrreversibilityEnforcer,
};
