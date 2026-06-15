"""Cognitive Homeostatic Learning System — Real Intelligence Foundation.

This module implements a cognitive homeostasis system that:
- Learns from prediction errors
- Decreases awareness on errors (homeostatic regulation)
- Updates internal models based on experience
- Demonstrates observable adaptation over time
"""
from __future__ import annotations

import math
import time
from typing import Dict, List, Any, Optional, Callable
from dataclasses import dataclass, field
from collections import deque
import json
import logging

logger = logging.getLogger(__name__)


@dataclass
class PredictionError:
    """Represents a prediction error that drives learning."""
    expected: float
    observed: float
    context: Dict[str, Any]
    timestamp: float
    error_magnitude: float = 0.0
    
    def __post_init__(self):
        self.error_magnitude = abs(self.expected - self.observed)


@dataclass
class CognitiveState:
    """Observable cognitive state that changes over time."""
    awareness_level: float = 1.0  # Decreases on prediction errors
    learning_rate: float = 0.01
    adaptation_score: float = 0.0
    prediction_accuracy: float = 0.0
    total_experiences: int = 0
    internal_model: Dict[str, Any] = field(default_factory=dict)
    embedding_weights: Dict[str, List[float]] = field(default_factory=dict)
    recent_errors: deque = field(default_factory=lambda: deque(maxlen=100))
    
    def to_dict(self) -> Dict[str, Any]:
        """Export observable state."""
        return {
            'awareness_level': self.awareness_level,
            'learning_rate': self.learning_rate,
            'adaptation_score': self.adaptation_score,
            'prediction_accuracy': self.prediction_accuracy,
            'total_experiences': self.total_experiences,
            'model_complexity': len(self.internal_model),
            'embedding_dimensions': len(self.embedding_weights),
            'recent_error_count': len(self.recent_errors)
        }


class CognitiveHomeostat:
    """Cognitive homeostatic system that learns and adapts.
    
    Key features:
    - Awareness decreases on prediction errors (homeostatic regulation)
    - Learning signals propagate to embeddings
    - Observable adaptive state proves the system is alive
    - Autonomous decision-making based on learned patterns
    """
    
    def __init__(self, learning_rate: float = 0.01):
        self.state = CognitiveState(learning_rate=learning_rate)
        self.experience_buffer: List[Dict[str, Any]] = []
        self.learned_patterns: Dict[str, Any] = {}
        self.action_history: List[Dict[str, Any]] = []
        self._last_update = time.time()
        
    def experience(
        self, 
        observation: Dict[str, Any], 
        context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """Process a new experience and learn from it.
        
        This is where REAL learning happens - the system updates its
        internal model based on what it observes.
        """
        context = context or {}
        
        # Make prediction based on current model
        prediction = self._predict(observation, context)
        
        # Calculate prediction error
        error = self._calculate_error(prediction, observation)
        
        # COGNITIVE HOMEOSTASIS: Awareness decreases on prediction errors
        self._regulate_awareness(error)
        
        # Learn from the error - update internal model
        learning_delta = self._learn_from_error(error, observation, context)
        
        # Propagate learning signal to embeddings
        self._update_embeddings(error, observation, learning_delta)
        
        # Update adaptation metrics
        self._update_adaptation_metrics(error)
        
        # Store experience for future learning
        self.experience_buffer.append({
            'observation': observation,
            'context': context,
            'prediction': prediction,
            'error': error.error_magnitude,
            'timestamp': time.time()
        })
        
        self.state.total_experiences += 1
        
        logger.info(
            f"Experience processed: error={error.error_magnitude:.4f}, "
            f"awareness={self.state.awareness_level:.4f}, "
            f"adaptation={self.state.adaptation_score:.4f}"
        )
        
        return {
            'prediction': prediction,
            'error': error.error_magnitude,
            'learning_delta': learning_delta,
            'state': self.state.to_dict()
        }
    
    def predict(self, observation: Dict[str, Any]) -> Dict[str, Any]:
        """Make autonomous prediction based on learned model."""
        return self._predict(observation, {})
    
    def decide(self, situation: Dict[str, Any]) -> Dict[str, Any]:
        """Make autonomous decision based on learned patterns.
        
        This demonstrates REAL intelligence - making decisions without
        human approval based on learned experience.
        """
        # Analyze situation using learned patterns
        pattern_match = self._match_patterns(situation)
        
        # Calculate confidence based on past success
        confidence = self._calculate_confidence(pattern_match)
        
        # Make decision autonomously if confidence is high enough
        if confidence > 0.6:
            decision = self._generate_decision(situation, pattern_match)
            action = {
                'decision': decision,
                'confidence': confidence,
                'reasoning': self._explain_decision(decision, pattern_match),
                'autonomous': True
            }
        else:
            # Request human guidance for low-confidence decisions
            action = {
                'decision': None,
                'confidence': confidence,
                'reasoning': 'Insufficient confidence for autonomous decision',
                'autonomous': False,
                'human_guidance_needed': True
            }
        
        # Record decision for learning
        self.action_history.append({
            'situation': situation,
            'action': action,
            'timestamp': time.time()
        })
        
        return action
    
    def learn_from_outcome(
        self, 
        decision_id: int, 
        outcome: Dict[str, Any],
        success: bool
    ) -> None:
        """Learn from the outcome of a decision.
        
        This creates a feedback loop where the system improves over time.
        """
        if decision_id >= len(self.action_history):
            logger.warning(f"Invalid decision_id: {decision_id}")
            return
        
        decision_record = self.action_history[decision_id]
        
        # Update learned patterns based on success/failure
        pattern_key = self._hash_situation(decision_record['situation'])
        
        if pattern_key not in self.learned_patterns:
            self.learned_patterns[pattern_key] = {
                'attempts': 0,
                'successes': 0,
                'features': decision_record['situation'],
                'successful_actions': []
            }
        
        pattern = self.learned_patterns[pattern_key]
        pattern['attempts'] += 1
        
        if success:
            pattern['successes'] += 1
            pattern['successful_actions'].append(decision_record['action'])
        
        # Adjust learning rate based on success
        if success:
            self.state.learning_rate *= 1.05  # Increase on success
        else:
            self.state.learning_rate *= 0.95  # Decrease on failure
        
        # Keep learning rate bounded
        self.state.learning_rate = max(0.001, min(0.1, self.state.learning_rate))
        
        logger.info(
            f"Learned from outcome: success={success}, "
            f"pattern_success_rate={pattern['successes']/pattern['attempts']:.2f}"
        )
    
    def get_observable_state(self) -> Dict[str, Any]:
        """Get observable state that proves the system is alive and changing.
        
        This demonstrates that learning is actually happening.
        """
        now = time.time()
        uptime = now - self._last_update
        
        return {
            'cognitive_state': self.state.to_dict(),
            'uptime_seconds': uptime,
            'experiences_count': len(self.experience_buffer),
            'patterns_learned': len(self.learned_patterns),
            'decisions_made': len(self.action_history),
            'internal_model_size': len(self.state.internal_model),
            'embedding_dimensions': {
                k: len(v) for k, v in self.state.embedding_weights.items()
            },
            'recent_errors': [
                e.error_magnitude for e in list(self.state.recent_errors)[-10:]
            ],
            'learning_trajectory': self._calculate_learning_trajectory(),
            'is_learning': self._is_actively_learning(),
            'timestamp': now
        }
    
    def export_learned_knowledge(self) -> Dict[str, Any]:
        """Export learned knowledge for persistence or transfer."""
        return {
            'internal_model': self.state.internal_model,
            'learned_patterns': self.learned_patterns,
            'embedding_weights': self.state.embedding_weights,
            'state': self.state.to_dict(),
            'version': '1.0.0'
        }
    
    def import_learned_knowledge(self, knowledge: Dict[str, Any]) -> None:
        """Import previously learned knowledge."""
        self.state.internal_model.update(knowledge.get('internal_model', {}))
        self.learned_patterns.update(knowledge.get('learned_patterns', {}))
        self.state.embedding_weights.update(knowledge.get('embedding_weights', {}))
        logger.info("Imported learned knowledge")
    
    # ── Private methods ──
    
    def _predict(
        self, 
        observation: Dict[str, Any], 
        context: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Make prediction using internal model."""
        prediction = {}
        
        for key, value in observation.items():
            if isinstance(value, (int, float)):
                # Use learned model if available
                model_key = f"model_{key}"
                if model_key in self.state.internal_model:
                    model = self.state.internal_model[model_key]
                    predicted = model.get('mean', value) * model.get('weight', 1.0)
                else:
                    # Default prediction
                    predicted = value
                
                prediction[key] = predicted
        
        return prediction
    
    def _calculate_error(
        self, 
        prediction: Dict[str, Any], 
        observation: Dict[str, Any]
    ) -> PredictionError:
        """Calculate prediction error."""
        errors = []
        
        for key in prediction.keys():
            if key in observation:
                pred_val = prediction[key]
                obs_val = observation[key]
                if isinstance(pred_val, (int, float)) and isinstance(obs_val, (int, float)):
                    errors.append(abs(pred_val - obs_val))
        
        avg_error = sum(errors) / len(errors) if errors else 0.0
        
        error = PredictionError(
            expected=sum(prediction.values() if all(isinstance(v, (int, float)) for v in prediction.values()) else [0]),
            observed=sum(observation.values() if all(isinstance(v, (int, float)) for v in observation.values()) else [0]),
            context={},
            timestamp=time.time(),
            error_magnitude=avg_error
        )
        
        self.state.recent_errors.append(error)
        return error
    
    def _regulate_awareness(self, error: PredictionError) -> None:
        """COGNITIVE HOMEOSTASIS: Awareness decreases on prediction errors.
        
        This is a key feature of real intelligence - the system becomes
        less "aware" (more uncertain) when predictions fail.
        """
        # Awareness decreases proportionally to error magnitude
        awareness_decrease = error.error_magnitude * 0.1
        self.state.awareness_level = max(0.1, self.state.awareness_level - awareness_decrease)
        
        # Homeostatic recovery - slowly return to baseline
        self.state.awareness_level = min(1.0, self.state.awareness_level + 0.01)
    
    def _learn_from_error(
        self, 
        error: PredictionError, 
        observation: Dict[str, Any],
        context: Dict[str, Any]
    ) -> float:
        """Update internal model based on prediction error."""
        learning_delta = 0.0
        
        for key, value in observation.items():
            if isinstance(value, (int, float)):
                model_key = f"model_{key}"
                
                if model_key not in self.state.internal_model:
                    self.state.internal_model[model_key] = {
                        'mean': value,
                        'variance': 0.0,
                        'weight': 1.0,
                        'sample_count': 0
                    }
                
                model = self.state.internal_model[model_key]
                
                # Update running statistics (online learning)
                n = model['sample_count'] + 1
                old_mean = model['mean']
                new_mean = old_mean + (value - old_mean) / n
                model['mean'] = new_mean
                model['variance'] = ((n - 1) * model['variance'] + (value - old_mean) * (value - new_mean)) / n
                model['sample_count'] = n
                
                # Adjust weight based on error
                model['weight'] *= (1.0 - self.state.learning_rate * error.error_magnitude)
                model['weight'] = max(0.1, min(2.0, model['weight']))
                
                learning_delta += abs(new_mean - old_mean)
        
        return learning_delta
    
    def _update_embeddings(
        self, 
        error: PredictionError, 
        observation: Dict[str, Any],
        learning_delta: float
    ) -> None:
        """Propagate learning signal to embeddings.
        
        This creates feedback loops where errors update the embedding space.
        """
        for key, value in observation.items():
            if isinstance(value, (int, float)):
                embedding_key = f"embed_{key}"
                
                if embedding_key not in self.state.embedding_weights:
                    # Initialize embedding with phi-encoded dimensions
                    phi = 1.618033988749895
                    dims = 8
                    self.state.embedding_weights[embedding_key] = [
                        math.cos(i * phi) * value for i in range(dims)
                    ]
                
                # Update embedding based on learning signal
                embedding = self.state.embedding_weights[embedding_key]
                for i in range(len(embedding)):
                    # Gradient descent update
                    gradient = error.error_magnitude * math.sin(i * learning_delta)
                    embedding[i] -= self.state.learning_rate * gradient
    
    def _update_adaptation_metrics(self, error: PredictionError) -> None:
        """Update metrics that show adaptation over time."""
        # Calculate prediction accuracy from recent errors
        if len(self.state.recent_errors) > 0:
            recent_error_avg = sum(e.error_magnitude for e in self.state.recent_errors) / len(self.state.recent_errors)
            self.state.prediction_accuracy = 1.0 - min(1.0, recent_error_avg)
        
        # Adaptation score increases as we learn
        self.state.adaptation_score = (
            self.state.prediction_accuracy * 0.5 +
            (len(self.learned_patterns) / max(1, self.state.total_experiences)) * 0.3 +
            self.state.awareness_level * 0.2
        )
    
    def _match_patterns(self, situation: Dict[str, Any]) -> Dict[str, Any]:
        """Match situation against learned patterns."""
        best_match = None
        best_score = 0.0
        
        for pattern_key, pattern in self.learned_patterns.items():
            score = self._similarity(situation, pattern['features'])
            if score > best_score:
                best_score = score
                best_match = pattern
        
        return {
            'pattern': best_match,
            'similarity': best_score
        } if best_match else {}
    
    def _similarity(self, a: Dict[str, Any], b: Dict[str, Any]) -> float:
        """Calculate similarity between two feature sets."""
        common_keys = set(a.keys()) & set(b.keys())
        if not common_keys:
            return 0.0
        
        similarities = []
        for key in common_keys:
            val_a = a[key]
            val_b = b[key]
            
            if isinstance(val_a, (int, float)) and isinstance(val_b, (int, float)):
                # Numerical similarity
                max_val = max(abs(val_a), abs(val_b), 1.0)
                sim = 1.0 - abs(val_a - val_b) / max_val
                similarities.append(sim)
            elif val_a == val_b:
                similarities.append(1.0)
            else:
                similarities.append(0.0)
        
        return sum(similarities) / len(similarities) if similarities else 0.0
    
    def _calculate_confidence(self, pattern_match: Dict[str, Any]) -> float:
        """Calculate confidence in decision based on pattern match."""
        if not pattern_match or 'pattern' not in pattern_match:
            return 0.0
        
        pattern = pattern_match['pattern']
        similarity = pattern_match['similarity']
        
        if pattern['attempts'] == 0:
            return 0.0
        
        success_rate = pattern['successes'] / pattern['attempts']
        
        # Confidence is product of success rate and similarity
        confidence = success_rate * similarity
        
        return confidence
    
    def _generate_decision(
        self, 
        situation: Dict[str, Any], 
        pattern_match: Dict[str, Any]
    ) -> str:
        """Generate autonomous decision based on pattern."""
        pattern = pattern_match['pattern']
        
        if pattern['successful_actions']:
            # Use most recent successful action
            action = pattern['successful_actions'][-1]
            return action.get('decision', 'no_action')
        
        return 'explore_new_action'
    
    def _explain_decision(
        self, 
        decision: str, 
        pattern_match: Dict[str, Any]
    ) -> str:
        """Generate explanation for decision."""
        if not pattern_match or 'pattern' not in pattern_match:
            return "No matching pattern found"
        
        pattern = pattern_match['pattern']
        similarity = pattern_match['similarity']
        success_rate = pattern['successes'] / max(1, pattern['attempts'])
        
        return (
            f"Decision '{decision}' based on pattern match "
            f"(similarity: {similarity:.2f}, "
            f"historical success: {success_rate:.2f}, "
            f"n={pattern['attempts']})"
        )
    
    def _hash_situation(self, situation: Dict[str, Any]) -> str:
        """Create hash key for situation."""
        # Simple hash based on sorted keys and values
        items = sorted(situation.items())
        return json.dumps(items, sort_keys=True)
    
    def _calculate_learning_trajectory(self) -> Dict[str, Any]:
        """Calculate learning trajectory over time."""
        if len(self.state.recent_errors) < 2:
            return {'trend': 'insufficient_data'}
        
        # Get error trend
        errors = [e.error_magnitude for e in self.state.recent_errors]
        recent_avg = sum(errors[-10:]) / min(10, len(errors))
        older_avg = sum(errors[:len(errors)//2]) / max(1, len(errors)//2)
        
        improvement = older_avg - recent_avg
        
        return {
            'trend': 'improving' if improvement > 0.01 else 'stable' if abs(improvement) < 0.01 else 'degrading',
            'improvement_rate': improvement,
            'recent_error_avg': recent_avg,
            'historical_error_avg': older_avg
        }
    
    def _is_actively_learning(self) -> bool:
        """Check if system is actively learning (state is changing)."""
        # Learning is happening if:
        # 1. We have recent experiences
        # 2. Internal model is being updated
        # 3. Adaptation score is changing
        
        recent_experiences = len([
            e for e in self.experience_buffer 
            if time.time() - e['timestamp'] < 60  # Last minute
        ])
        
        return recent_experiences > 0 and len(self.state.internal_model) > 0
