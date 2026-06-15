"""Sovereign Organism Runtime — Python implementation.

A living, phi-encoded, 4-register organism with heartbeat, kernel execution,
edge sensing, and cross-organism resonance.

NOW ENHANCED WITH REAL INTELLIGENCE:
- Cognitive homeostatic learning (learns from experience)
- Multi-mind fusion (complex reasoning)
- Agent scaffolding (autonomous execution)
- Nova Sovereign backend (decentralized intelligence)
- Observable adaptive state (proves it's alive and learning)
"""
from __future__ import annotations

from .constants import PHI, GOLDEN_ANGLE, HEARTBEAT_MS
from .state import OrganismState, StateSnapshot
from .heartbeat import Heartbeat
from .kernel import KernelExecutor, KernelStatus
from .sensor import EdgeSensor, SensorType
from .resonance import CrossOrganismResonance
from .vitality import VitalityCalculator
from .nervous_system import NervousSystemCoordinator, JavaBridge, get_coordinator
from .cognitive_homeostat import CognitiveHomeostat, PredictionError, CognitiveState
from .multi_mind_fusion import MultiMindFusion, MindType, AutonomousMind, FusedIntelligence
from .agent_scaffolding import (
    AutonomousAgent, Task, AgentCapability, TaskDelegationPlatform, TaskStatus
)
from .nova_sovereign import (
    NovaSovereignBackend, SovereignIntelligenceCoordinator, IntelligenceTransaction
)

__all__ = [
    # Core constants
    "PHI",
    "GOLDEN_ANGLE",
    "HEARTBEAT_MS",
    
    # Basic organism components
    "OrganismState",
    "StateSnapshot",
    "Heartbeat",
    "KernelExecutor",
    "KernelStatus",
    "EdgeSensor",
    "SensorType",
    "CrossOrganismResonance",
    "VitalityCalculator",
    
    # Multi-language support
    "NervousSystemCoordinator",
    "JavaBridge",
    "get_coordinator",
    
    # REAL INTELLIGENCE components
    "CognitiveHomeostat",
    "PredictionError",
    "CognitiveState",
    "MultiMindFusion",
    "MindType",
    "AutonomousMind",
    "FusedIntelligence",
    "AutonomousAgent",
    "Task",
    "AgentCapability",
    "TaskDelegationPlatform",
    "TaskStatus",
    "NovaSovereignBackend",
    "SovereignIntelligenceCoordinator",
    "IntelligenceTransaction",
]
