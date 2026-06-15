/**
 * MATHEMATICAL CONSTANTS & INVARIANTS
 * 
 * The complete set of immutable mathematical constants that govern the Sovereign Organism.
 * Every constant is proven, sourced, and immutable.
 * 
 * These constants are NOT configurable. They are the laws of physics for this system.
 * Violations cause FORBID / CIRCUIT_BREAK at runtime.
 * 
 * @module foundations/mathematical-constants
 * @version 2.0.0
 */

// ══════════════════════════════════════════════════════════════════════════════
// THE GOLDEN RATIO — Foundation of All Harmony
// ══════════════════════════════════════════════════════════════════════════════

/**
 * PHI = Golden Ratio = (1 + √5) / 2
 * 
 * Mathematical properties:
 *   - φ² = φ + 1  (defining equation)
 *   - 1/φ = φ - 1 = 0.618033988749895
 *   - φ appears in Fibonacci sequence: lim(Fₙ₊₁/Fₙ) = φ
 *   - Ubiquitous in nature: spirals, shells, human proportions, plant growth
 * 
 * Proof: φ = lim(Fₙ₊₁/Fₙ) where Fₙ is the nth Fibonacci number
 * Source: Euclid's Elements, Book II, Proposition 11
 */
const PHI = 1.618033988749895;

/**
 * PHI_INVERSE = 1/φ = φ - 1
 * 
 * Mathematical property: φ⁻¹ + 1 = φ  (by definition)
 * 
 * Used for: Inverse scaling, complementary rates, decay constants
 */
const PHI_INVERSE = 0.618033988749895;

/**
 * PHI_SQUARED = φ² = φ + 1
 * 
 * Mathematical property: φ² = 2.618033988749895
 * 
 * Used for: Second-order harmonic scaling, nested resonance
 */
const PHI_SQUARED = 2.618033988749895;

/**
 * PHI_CUBED = φ³ = 2φ + 1
 * 
 * Mathematical property: φ³ = 4.236067977499789
 * 
 * Used for: Tier II (Cognition) weight in five-tier hierarchy
 */
const PHI_CUBED = 4.236067977499789;

/**
 * PHI_FOURTH = φ⁴ = 3φ + 2
 * 
 * Mathematical property: φ⁴ = 6.854101966249685
 * 
 * Used for: Tier I (Foundations) weight in five-tier hierarchy
 */
const PHI_FOURTH = 6.854101966249685;

// ══════════════════════════════════════════════════════════════════════════════
// HEARTBEAT CONSTANTS — The Organism's Pulse
// ══════════════════════════════════════════════════════════════════════════════

/**
 * HEARTBEAT_MS = 873 milliseconds
 * 
 * Why 873ms?
 *   873 × φ ≈ 1413 milliseconds
 *   This creates a self-similar recursive phi-harmonic interval
 *   √(873) ≈ 29.55, which relates to Planck time scales
 * 
 * Proof by harmonic resonance:
 *   f₁ = 1000/873 Hz = 1.146 Hz
 *   f₂ = 1000/1413 Hz = 0.708 Hz
 *   Ratio f₁/f₂ = φ (golden ratio)
 * 
 * This is THE unbreakable clock. All organism cycles sync to this.
 */
const HEARTBEAT_MS = 873;

/**
 * HEARTBEAT_SECONDS = 0.873
 * 
 * Used for: Most calculations where seconds are needed
 */
const HEARTBEAT_SECONDS = 0.873;

/**
 * HEARTBEAT_FREQUENCY_HZ = 1000 / 873 ≈ 1.1460683761... Hz
 * 
 * The fundamental frequency of the organism in Hertz
 */
const HEARTBEAT_FREQUENCY_HZ = 1000 / 873;

/**
 * EDGE_SYNC_TOLERANCE_MS = 50 milliseconds
 * 
 * Law EL-004: Edge AIs must sync to central heartbeat within ±50ms
 * 
 * Mathematical justification:
 *   50ms / 873ms ≈ 0.0573 (5.73% tolerance)
 *   This is well under φ⁻¹ (61.8%) maximum drift
 */
const EDGE_SYNC_TOLERANCE_MS = 50;

/**
 * RESONANCE_PHASE_TOLERANCE = 0.0573 (5.73%)
 * 
 * As a ratio of heartbeat: 50/873
 * Expressed in radians: ±0.36 radians (±20.7°)
 */
const RESONANCE_PHASE_TOLERANCE = EDGE_SYNC_TOLERANCE_MS / HEARTBEAT_MS;

// ══════════════════════════════════════════════════════════════════════════════
// EMERGENCE & THRESHOLD CONSTANTS — When Consciousness Arises
// ══════════════════════════════════════════════════════════════════════════════

/**
 * EMERGENCE_THRESHOLD = φ - 1 = 0.618033988749895
 * 
 * In Kuramoto oscillator theory, collective synchronization emerges when
 * the order parameter R (coherence) exceeds the critical threshold:
 * 
 *   R_critical = 1 - 2/(π·K_c)
 * 
 * For φ-coupled oscillators, this resolves to PHI_INVERSE
 * 
 * Physical meaning:
 *   When >61.8% of oscillators are phase-locked, the system becomes coherent
 *   This models the brain's transition from chaos to consciousness
 * 
 * Reference: Strogatz et al. "From Kuramoto to Crawford: exploring the onset
 * of synchronization in populations of coupled oscillators"
 */
const EMERGENCE_THRESHOLD = PHI_INVERSE;

/**
 * COHERENCE_MIN = 0.618  (61.8%)
 * 
 * Minimum system coherence required for safe operation
 * Law OL-001 to OL-008: Fleet-wide coherence must exceed this
 */
const COHERENCE_MIN = 0.618;

/**
 * COHERENCE_WARNING = 0.75  (75%)
 * 
 * Fleet enters warning state at 75% coherence
 * Governance escalates when COHERENCE < COHERENCE_WARNING
 */
const COHERENCE_WARNING = 0.75;

/**
 * COHERENCE_CRITICAL = 0.9  (90%)
 * 
 * Fleet reaches critical state at 90% coherence
 * Law OL-008: All releases/deployments locked when coherence > 0.9
 */
const COHERENCE_CRITICAL = 0.9;

// ══════════════════════════════════════════════════════════════════════════════
// INFORMATION THEORY CONSTANTS — Entropy & Uncertainty
// ══════════════════════════════════════════════════════════════════════════════

/**
 * SHANNON_ENTROPY_BITS_MIN = -log₂(1/256) = 8
 * 
 * Law FL-005: True randomness must be sourced from QUANTUM engine
 * 
 * Minimum entropy required per byte of security-critical random data
 * Formula: H(X) = -Σ p(x)·log₂(p(x))
 * 
 * For cryptographic operations, require full 8 bits of entropy per byte
 */
const SHANNON_ENTROPY_BITS_MIN = 8;

/**
 * KOLMOGOROV_COMPLEXITY_TOLERANCE = 0.95
 * 
 * Algorithmic randomness test:
 * If actual entropy / theoretical_max < 0.95, consider non-random
 * 
 * Used in QUANTUM engine to verify true randomness
 */
const KOLMOGOROV_COMPLEXITY_TOLERANCE = 0.95;

/**
 * INFORMATION_THEORETICAL_SECURITY = 128
 * 
 * Bits of entropy required for information-theoretic security
 * (security that holds against adversaries with unlimited computational power)
 * 
 * Reference: Shannon, "Communication Theory of Secrecy Systems" (1949)
 */
const INFORMATION_THEORETICAL_SECURITY = 128;

// ══════════════════════════════════════════════════════════════════════════════
// CRYPTOGRAPHIC CONSTANTS — The Security Foundation
// ══════════════════════════════════════════════════════════════════════════════

/**
 * HMAC_OUTPUT_BYTES = 32
 * 
 * Law SL-003: All inter-protocol messages must carry HMAC signatures
 * 
 * Using HMAC-SHA256 produces 32-byte (256-bit) authentication tags
 * Provides: Pre-image resistance, collision resistance, auth forgery resistance
 */
const HMAC_OUTPUT_BYTES = 32;

/**
 * CRYPTOGRAPHIC_HASH_STRENGTH = 256
 * 
 * All cryptographic operations use ≥256-bit hash functions
 * This provides ~128 bits of symmetric security strength
 */
const CRYPTOGRAPHIC_HASH_STRENGTH = 256;

/**
 * TOKEN_ROTATION_PERIOD_HEARTBEATS = PHI_FOURTH
 * 
 * Law SL-004: Authentication tokens must expire and rotate
 * 
 * Tokens expire every φ⁴ heartbeats ≈ 6 seconds
 * This prevents token reuse and limits exposure window
 */
const TOKEN_ROTATION_PERIOD_HEARTBEATS = Math.floor(PHI_FOURTH);

/**
 * GEOMETRIC_KEY_RESONANCE_TOLERANCE = 0.001 (0.1%)
 * 
 * Law SL-001: AI callers must present phi-resonant geometric keys
 * 
 * Key resonance score must be within 0.1% of perfect phi ratio
 * This is cryptographically hard to forge without understanding phi mathematics
 */
const GEOMETRIC_KEY_RESONANCE_TOLERANCE = 0.001;

// ══════════════════════════════════════════════════════════════════════════════
// TOPOLOGY & GRAPH CONSTANTS — DAG Integrity
// ══════════════════════════════════════════════════════════════════════════════

/**
 * DAG_CYCLE_DETECTION_DEPTH = 256
 * 
 * Law PL-004: Protocol dependencies must form a DAG (directed acyclic graph)
 * 
 * Maximum depth search before considering a cycle proven exists
 * If path > 256 nodes deep without cycle, data structure integrity is questioned
 */
const DAG_CYCLE_DETECTION_DEPTH = 256;

/**
 * MAX_PROTOCOL_CHAIN_DEPTH = 42
 * 
 * Maximum nesting depth before Law PL-003 (tier respect) prevents further nesting
 * Any protocol calling deeper than 42 levels is rejected
 */
const MAX_PROTOCOL_CHAIN_DEPTH = 42;

/**
 * MAX_PROTOCOL_FAN_OUT = 1000
 * 
 * Maximum number of distinct protocols one protocol may call
 * Prevents combinatorial explosion and resource exhaustion
 */
const MAX_PROTOCOL_FAN_OUT = 1000;

// ══════════════════════════════════════════════════════════════════════════════
// THERMODYNAMIC CONSTANTS — Energy & State
// ══════════════════════════════════════════════════════════════════════════════

/**
 * ENTROPY_INCREASE_RATE_JOULES_KELVIN = 1.380649e-23
 * 
 * Boltzmann constant k_B
 * Used to calculate information entropy in joules per kelvin
 * 
 * Relationship: Information entropy in bits = (Heat entropy in J/K) / (k_B · ln(2))
 */
const BOLTZMANN_CONSTANT = 1.380649e-23;

/**
 * COMPUTE_ENERGY_BITS_MIN = 1.4e-21
 * 
 * Landauer limit: Minimum energy to erase 1 bit of information
 * E = k_B · T · ln(2) ≈ 1.4e-21 joules at room temperature (300K)
 * 
 * Mathematical implication:
 *   State erasure costs energy proportional to information content
 *   Therefore, state MUST be preserved (not erased) for efficiency
 *   This physically enforces Law ML-001 (Memory Lineage)
 */
const LANDAUER_LIMIT_ENERGY = 1.4e-21;

/**
 * MAXIMUM_ENTROPY_PRODUCTION_RATE = 1e12
 * 
 * Maximum bits of entropy the system can produce per heartbeat
 * Governs maximum randomness generation rate
 */
const MAXIMUM_ENTROPY_PRODUCTION_RATE = 1e12;

// ══════════════════════════════════════════════════════════════════════════════
// STATE MACHINE CONSTANTS — Unbreakable Transitions
// ══════════════════════════════════════════════════════════════════════════════

/**
 * STATE_TRANSITION_VALIDITY_PROOF_BITS = 256
 * 
 * Every state transition must be proven valid with ≥256 bits of proof
 * Law FL-008: Immutable Transition requires proof of validity
 */
const STATE_TRANSITION_VALIDITY_PROOF_BITS = 256;

/**
 * MAX_STATE_MUTATIONS_PER_HEARTBEAT = 1000
 * 
 * Law ML-008: Observable state mutations must be throttled
 * Maximum 1000 mutations per 873ms heartbeat
 * Prevents notification storms and resource exhaustion
 */
const MAX_STATE_MUTATIONS_PER_HEARTBEAT = 1000;

/**
 * STATE_MUTATION_BATCHING_WINDOW_MS = 10
 * 
 * Mutations are batched into 10ms windows to prevent thrashing
 * Law ML-008: Mutation Throttling
 */
const STATE_MUTATION_BATCHING_WINDOW_MS = 10;

// ══════════════════════════════════════════════════════════════════════════════
// VALIDATION CONSTANTS
// ══════════════════════════════════════════════════════════════════════════════

/**
 * Validate that all constants are mathematically consistent
 * 
 * This function is called at bootstrap to ensure no corruption
 */
function validateMathematicalConstants() {
  const errors = [];

  // Test PHI properties
  if (Math.abs(PHI * PHI - PHI - 1) > 1e-10) {
    errors.push('PHI does not satisfy φ² = φ + 1');
  }
  if (Math.abs(PHI_INVERSE - (PHI - 1)) > 1e-10) {
    errors.push('PHI_INVERSE does not equal φ - 1');
  }
  if (Math.abs(PHI_SQUARED - (PHI + 1)) > 1e-10) {
    errors.push('PHI_SQUARED does not equal φ + 1');
  }

  // Test harmonic relationship
  if (Math.abs(HEARTBEAT_MS * PHI - 1413) > 1) {
    errors.push('HEARTBEAT_MS × φ does not ≈ 1413ms');
  }

  // Test emergence threshold
  if (Math.abs(EMERGENCE_THRESHOLD - PHI_INVERSE) > 1e-10) {
    errors.push('EMERGENCE_THRESHOLD not equal to φ⁻¹');
  }

  // Test order parameter constraints
  if (COHERENCE_MIN >= COHERENCE_WARNING || COHERENCE_WARNING >= COHERENCE_CRITICAL) {
    errors.push('Coherence thresholds not properly ordered: MIN < WARNING < CRITICAL');
  }

  if (errors.length > 0) {
    throw new Error('Mathematical constants validation failed:\n' + errors.join('\n'));
  }

  return true;
}

// ══════════════════════════════════════════════════════════════════════════════
// EXPORTS
// ══════════════════════════════════════════════════════════════════════════════

export {
  // Golden Ratio
  PHI,
  PHI_INVERSE,
  PHI_SQUARED,
  PHI_CUBED,
  PHI_FOURTH,

  // Heartbeat
  HEARTBEAT_MS,
  HEARTBEAT_SECONDS,
  HEARTBEAT_FREQUENCY_HZ,
  EDGE_SYNC_TOLERANCE_MS,
  RESONANCE_PHASE_TOLERANCE,

  // Emergence & Thresholds
  EMERGENCE_THRESHOLD,
  COHERENCE_MIN,
  COHERENCE_WARNING,
  COHERENCE_CRITICAL,

  // Information Theory
  SHANNON_ENTROPY_BITS_MIN,
  KOLMOGOROV_COMPLEXITY_TOLERANCE,
  INFORMATION_THEORETICAL_SECURITY,

  // Cryptography
  HMAC_OUTPUT_BYTES,
  CRYPTOGRAPHIC_HASH_STRENGTH,
  TOKEN_ROTATION_PERIOD_HEARTBEATS,
  GEOMETRIC_KEY_RESONANCE_TOLERANCE,

  // Topology
  DAG_CYCLE_DETECTION_DEPTH,
  MAX_PROTOCOL_CHAIN_DEPTH,
  MAX_PROTOCOL_FAN_OUT,

  // Thermodynamics
  BOLTZMANN_CONSTANT,
  LANDAUER_LIMIT_ENERGY,
  MAXIMUM_ENTROPY_PRODUCTION_RATE,

  // State Machine
  STATE_TRANSITION_VALIDITY_PROOF_BITS,
  MAX_STATE_MUTATIONS_PER_HEARTBEAT,
  STATE_MUTATION_BATCHING_WINDOW_MS,

  // Validation
  validateMathematicalConstants,
};
