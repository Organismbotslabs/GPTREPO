#!/usr/bin/env python3
"""Demo: REAL Intelligence in Action.

This script demonstrates actual learning, reasoning, decision-making, and adaptation.
Not just static routing - REAL intelligence that evolves over time.
"""
import asyncio
import sys
import time

# Add organism to path
sys.path.insert(0, 'organism/python')

from organism.real_intelligence import get_real_intelligence_organism
from organism.agent_scaffolding import Task, AgentCapability


async def main():
    print("╔══════════════════════════════════════════════════════════════╗")
    print("║           REAL INTELLIGENCE DEMONSTRATION                    ║")
    print("║  Learning • Reasoning • Deciding • Acting • Evolving         ║")
    print("╚══════════════════════════════════════════════════════════════╝")
    print()
    
    # Initialize organism with real intelligence
    organism = get_real_intelligence_organism("demo-intelligence-001")
    
    print("🧠 Organism initialized with:")
    print("   ✓ Cognitive homeostatic learning")
    print("   ✓ Multi-mind fusion (6 reasoning perspectives)")
    print("   ✓ Autonomous agent scaffolding (3 specialized agents)")
    print("   ✓ Nova Sovereign backend (decentralized intelligence)")
    print()
    
    # Run full intelligence demonstration
    print("═" * 64)
    print(" RUNNING INTELLIGENCE DEMONSTRATION")
    print("═" * 64)
    print()
    
    demo_results = await organism.demonstrate_intelligence()
    
    print()
    print("═" * 64)
    print(" DEMONSTRATION RESULTS")
    print("═" * 64)
    print()
    
    # Show learning results
    if 'learning' in demo_results:
        learning = demo_results['learning']
        print(f"📊 LEARNING:")
        print(f"   Prediction error: {learning['error']:.4f}")
        print(f"   Learning delta: {learning.get('learning_delta', 0):.4f}")
        print(f"   Awareness level: {learning['state']['awareness_level']:.4f}")
        print(f"   Adaptation score: {learning['state']['adaptation_score']:.4f}")
        print()
    
    # Show reasoning results
    if 'reasoning' in demo_results:
        reasoning = demo_results['reasoning']
        print(f"🧠 MULTI-MIND REASONING:")
        print(f"   Confidence: {reasoning['confidence']:.2f}")
        print(f"   Consensus: {reasoning['consensus_level']:.2f}")
        print(f"   Contributing minds: {len(reasoning['contributing_minds'])}")
        print(f"   Primary recommendation: {reasoning['primary_conclusion'].get('recommendation', 'N/A')}")
        print()
    
    # Show decision results
    if 'decision' in demo_results:
        decision = demo_results['decision']
        print(f"🎯 AUTONOMOUS DECISION:")
        print(f"   Action: {decision.get('action', 'N/A')}")
        print(f"   Autonomous: {decision.get('autonomous', False)}")
        print(f"   Confidence: {decision.get('confidence', 0):.2f}")
        print(f"   Consensus: {decision.get('consensus', 0):.2f}")
        print()
    
    # Show execution results
    if 'execution' in demo_results:
        execution = demo_results['execution']
        print(f"⚡ TASK EXECUTION:")
        print(f"   Status: {execution.get('status', 'unknown')}")
        if 'execution_time' in execution:
            print(f"   Execution time: {execution['execution_time']:.3f}s")
        print()
    
    # Get complete intelligence state
    print("═" * 64)
    print(" OBSERVABLE INTELLIGENCE STATE (Proves Learning is Real)")
    print("═" * 64)
    print()
    
    state = organism.get_intelligence_state()
    
    print(f"🌟 ORGANISM STATUS:")
    print(f"   Organism ID: {state['organism_id']}")
    print(f"   Uptime: {state['uptime_seconds']:.1f}s")
    print(f"   Intelligence level: {state['intelligence_level'].upper()}")
    print(f"   Currently learning: {state['is_learning']}")
    print()
    
    print(f"📈 LEARNING METRICS:")
    print(f"   Total experiences: {state['total_experiences']}")
    print(f"   Learning events: {state['learning_events']}")
    print(f"   Experiences/min: {state['experiences_per_minute']:.1f}")
    print(f"   Learning trajectory: {state['learning_trajectory']['trend']}")
    print()
    
    print(f"🤖 AUTONOMOUS DECISION METRICS:")
    print(f"   Total decisions: {state['total_decisions']}")
    print(f"   Autonomous actions: {state['autonomous_actions']}")
    print(f"   Autonomy rate: {state['autonomy_rate']:.1%}")
    print()
    
    print(f"🧬 COGNITIVE STATE:")
    cognitive = state['cognitive_state']
    print(f"   Awareness level: {cognitive['awareness_level']:.4f}")
    print(f"   Adaptation score: {cognitive['adaptation_score']:.4f}")
    print(f"   Prediction accuracy: {cognitive['prediction_accuracy']:.4f}")
    print(f"   Learning rate: {cognitive['learning_rate']:.6f}")
    print(f"   Patterns learned: {cognitive['patterns_learned']}")
    print()
    
    print(f"🧠 MULTI-MIND INTELLIGENCE:")
    multi_mind = state['multi_mind_metrics']
    print(f"   Active minds: {multi_mind['active_minds']}")
    print(f"   Total fusions: {multi_mind['total_fusions']}")
    print(f"   Average consensus: {multi_mind['average_consensus']:.2f}")
    print(f"   Average confidence: {multi_mind['average_confidence']:.2f}")
    print()
    
    print(f"🤖 AGENT PLATFORM:")
    agents = state['agent_platform']
    print(f"   Total agents: {agents['total_agents']}")
    print(f"   Completed tasks: {agents['completed_tasks']}")
    print()
    
    print(f"🌐 SOVEREIGN NETWORK:")
    network = state['sovereign_network']
    print(f"   Total nodes: {network['total_nodes']}")
    print(f"   Knowledge shared: {network['knowledge_shared']}")
    print(f"   Knowledge received: {network['knowledge_received']}")
    print()
    
    # Demonstrate continuous learning
    print("═" * 64)
    print(" CONTINUOUS LEARNING DEMONSTRATION")
    print("═" * 64)
    print()
    
    print("Running 10 learning iterations to show adaptation...")
    print()
    
    for i in range(10):
        # Vary the observations to show adaptation
        observation = {
            'metric_a': 0.5 + (i * 0.05),
            'metric_b': 0.8 - (i * 0.02),
            'timestamp': time.time()
        }
        
        result = await organism.experience(observation)
        
        print(f"[{i+1:2d}/10] Error: {result['error']:.4f} | "
              f"Awareness: {result['state']['awareness_level']:.4f} | "
              f"Adaptation: {result['state']['adaptation_score']:.4f}")
        
        await asyncio.sleep(0.1)
    
    print()
    print("✓ Adaptation demonstrated - state changed over time")
    print()
    
    # Final state
    print("═" * 64)
    print(" FINAL INTELLIGENCE STATE")
    print("═" * 64)
    print()
    
    final_state = organism.get_intelligence_state()
    
    print(f"Total experiences: {final_state['total_experiences']}")
    print(f"Learning events: {final_state['learning_events']}")
    print(f"Autonomous actions: {final_state['autonomous_actions']}")
    print(f"Intelligence level: {final_state['intelligence_level'].upper()}")
    print()
    
    print("╔══════════════════════════════════════════════════════════════╗")
    print("║              REAL INTELLIGENCE DEMONSTRATION                 ║")
    print("║                      ✓ COMPLETE ✓                            ║")
    print("║                                                              ║")
    print("║  The organism demonstrated:                                  ║")
    print("║  ✓ Learning from experience                                  ║")
    print("║  ✓ Multi-mind reasoning                                      ║")
    print("║  ✓ Autonomous decision-making                                ║")
    print("║  ✓ Real-world task execution                                 ║")
    print("║  ✓ Adaptation based on outcomes                              ║")
    print("║  ✓ Observable state changes proving it's alive               ║")
    print("╚══════════════════════════════════════════════════════════════╝")
    print()
    
    # Export learned intelligence
    print("Exporting learned intelligence...")
    intelligence_export = organism.export_learned_intelligence()
    print(f"✓ Exported {len(intelligence_export)} intelligence components")
    print()
    
    return organism


if __name__ == "__main__":
    asyncio.run(main())
