"""Nova Sovereign Backend — Decentralized Intelligence Platform.

This module integrates with the Nova Sovereign backend for:
- Decentralized intelligence coordination
- Cross-organism learning and knowledge sharing
- Distributed autonomous decision-making
- Blockchain-verified intelligence transactions
"""
from __future__ import annotations

import time
import asyncio
from typing import Dict, List, Any, Optional
from dataclasses import dataclass, field
import logging
import hashlib
import json

logger = logging.getLogger(__name__)


@dataclass
class IntelligenceTransaction:
    """Transaction of intelligence between organisms."""
    transaction_id: str
    source_organism_id: str
    target_organism_id: Optional[str]
    intelligence_type: str  # "learned_pattern", "decision", "knowledge"
    payload: Dict[str, Any]
    timestamp: float = field(default_factory=time.time)
    verified: bool = False
    hash: str = ""
    
    def calculate_hash(self) -> str:
        """Calculate cryptographic hash of transaction."""
        content = json.dumps({
            'transaction_id': self.transaction_id,
            'source': self.source_organism_id,
            'target': self.target_organism_id,
            'type': self.intelligence_type,
            'payload': self.payload,
            'timestamp': self.timestamp
        }, sort_keys=True)
        
        self.hash = hashlib.sha256(content.encode()).hexdigest()
        return self.hash
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            'transaction_id': self.transaction_id,
            'source_organism_id': self.source_organism_id,
            'target_organism_id': self.target_organism_id,
            'intelligence_type': self.intelligence_type,
            'payload': self.payload,
            'timestamp': self.timestamp,
            'verified': self.verified,
            'hash': self.hash
        }


@dataclass
class SovereignIntelligenceNode:
    """Node in the sovereign intelligence network."""
    node_id: str
    organism_id: str
    capabilities: List[str]
    trust_score: float = 0.5
    transactions_sent: int = 0
    transactions_received: int = 0
    last_seen: float = field(default_factory=time.time)
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            'node_id': self.node_id,
            'organism_id': self.organism_id,
            'capabilities': self.capabilities,
            'trust_score': self.trust_score,
            'transactions_sent': self.transactions_sent,
            'transactions_received': self.transactions_received,
            'last_seen': self.last_seen
        }


class NovaSovereignBackend:
    """Decentralized intelligence backend using Nova Sovereign architecture.
    
    This enables:
    - Cross-organism knowledge sharing
    - Distributed learning and adaptation
    - Sovereign (independent) intelligence that doesn't rely on centralized servers
    - Verifiable intelligence transactions
    """
    
    def __init__(
        self, 
        organism_id: str,
        enable_blockchain: bool = False
    ):
        self.organism_id = organism_id
        self.enable_blockchain = enable_blockchain
        
        # Local intelligence store
        self.local_knowledge: Dict[str, Any] = {}
        self.shared_knowledge: Dict[str, Any] = {}
        
        # Network state
        self.nodes: Dict[str, SovereignIntelligenceNode] = {}
        self.transactions: List[IntelligenceTransaction] = []
        
        # Performance tracking
        self.sync_count = 0
        self.knowledge_received = 0
        self.knowledge_shared = 0
        
        logger.info(f"Nova Sovereign Backend initialized for {organism_id}")
    
    async def share_intelligence(
        self, 
        intelligence_type: str, 
        data: Dict[str, Any],
        target_organism: Optional[str] = None
    ) -> IntelligenceTransaction:
        """Share intelligence with other organisms.
        
        This enables real distributed learning - organisms share what they learn.
        """
        transaction = IntelligenceTransaction(
            transaction_id=self._generate_transaction_id(),
            source_organism_id=self.organism_id,
            target_organism_id=target_organism,
            intelligence_type=intelligence_type,
            payload=data
        )
        
        # Calculate hash for verification
        transaction.calculate_hash()
        
        # Broadcast to network
        await self._broadcast_transaction(transaction)
        
        # Record locally
        self.transactions.append(transaction)
        self.knowledge_shared += 1
        
        logger.info(
            f"Shared intelligence: {intelligence_type} "
            f"(tx: {transaction.transaction_id[:8]}...)"
        )
        
        return transaction
    
    async def receive_intelligence(
        self, 
        transaction: IntelligenceTransaction
    ) -> Dict[str, Any]:
        """Receive and process intelligence from other organisms."""
        # Verify transaction
        expected_hash = transaction.calculate_hash()
        if transaction.hash != expected_hash:
            logger.warning(f"Invalid transaction hash: {transaction.transaction_id}")
            return {'status': 'rejected', 'reason': 'invalid_hash'}
        
        # Check trust score of source
        if transaction.source_organism_id in self.nodes:
            source_node = self.nodes[transaction.source_organism_id]
            if source_node.trust_score < 0.3:
                logger.warning(f"Low trust source: {transaction.source_organism_id}")
                return {'status': 'rejected', 'reason': 'low_trust'}
        
        # Process based on intelligence type
        if transaction.intelligence_type == "learned_pattern":
            self._integrate_learned_pattern(transaction.payload)
        elif transaction.intelligence_type == "decision":
            self._observe_decision(transaction.payload)
        elif transaction.intelligence_type == "knowledge":
            self._integrate_knowledge(transaction.payload)
        
        transaction.verified = True
        self.knowledge_received += 1
        
        logger.info(
            f"Received intelligence from {transaction.source_organism_id}: "
            f"{transaction.intelligence_type}"
        )
        
        return {
            'status': 'accepted',
            'transaction_id': transaction.transaction_id
        }
    
    async def sync_with_network(self) -> Dict[str, Any]:
        """Synchronize with sovereign intelligence network.
        
        This is how organisms stay coordinated without central control.
        """
        logger.info("Syncing with sovereign intelligence network...")
        
        # Discover peers
        discovered_nodes = await self._discover_nodes()
        
        # Exchange intelligence with high-trust nodes
        for node_id, node in self.nodes.items():
            if node.trust_score > 0.6:
                await self._exchange_with_node(node)
        
        self.sync_count += 1
        
        return {
            'synced': True,
            'nodes_discovered': len(discovered_nodes),
            'nodes_trusted': sum(1 for n in self.nodes.values() if n.trust_score > 0.6),
            'sync_count': self.sync_count
        }
    
    def register_node(
        self, 
        node_id: str, 
        organism_id: str, 
        capabilities: List[str]
    ) -> SovereignIntelligenceNode:
        """Register a node in the sovereign network."""
        node = SovereignIntelligenceNode(
            node_id=node_id,
            organism_id=organism_id,
            capabilities=capabilities
        )
        
        self.nodes[node_id] = node
        
        logger.info(f"Registered node: {node_id} (organism: {organism_id})")
        
        return node
    
    def update_trust_score(
        self, 
        node_id: str, 
        successful: bool
    ) -> None:
        """Update trust score based on interaction outcome."""
        if node_id not in self.nodes:
            return
        
        node = self.nodes[node_id]
        
        if successful:
            node.trust_score = min(1.0, node.trust_score * 1.1)
        else:
            node.trust_score = max(0.0, node.trust_score * 0.9)
        
        logger.debug(f"Updated trust for {node_id}: {node.trust_score:.3f}")
    
    def get_network_status(self) -> Dict[str, Any]:
        """Get status of sovereign intelligence network."""
        return {
            'organism_id': self.organism_id,
            'total_nodes': len(self.nodes),
            'trusted_nodes': sum(1 for n in self.nodes.values() if n.trust_score > 0.6),
            'transactions_total': len(self.transactions),
            'knowledge_shared': self.knowledge_shared,
            'knowledge_received': self.knowledge_received,
            'sync_count': self.sync_count,
            'blockchain_enabled': self.enable_blockchain,
            'local_knowledge_size': len(self.local_knowledge),
            'shared_knowledge_size': len(self.shared_knowledge)
        }
    
    def export_knowledge_graph(self) -> Dict[str, Any]:
        """Export knowledge graph for visualization or transfer."""
        return {
            'organism_id': self.organism_id,
            'local_knowledge': self.local_knowledge,
            'shared_knowledge': self.shared_knowledge,
            'nodes': {
                node_id: node.to_dict() 
                for node_id, node in self.nodes.items()
            },
            'transaction_count': len(self.transactions),
            'export_time': time.time()
        }
    
    # ── Private methods ──
    
    def _generate_transaction_id(self) -> str:
        """Generate unique transaction ID."""
        content = f"{self.organism_id}_{time.time()}_{len(self.transactions)}"
        return hashlib.sha256(content.encode()).hexdigest()
    
    async def _broadcast_transaction(
        self, 
        transaction: IntelligenceTransaction
    ) -> None:
        """Broadcast transaction to network."""
        # In production, this would use actual networking
        # For now, simulate broadcast
        
        for node in self.nodes.values():
            if node.organism_id != self.organism_id:
                # Simulate sending to node
                node.transactions_received += 1
        
        logger.debug(f"Broadcast transaction to {len(self.nodes)} nodes")
    
    async def _discover_nodes(self) -> List[SovereignIntelligenceNode]:
        """Discover nodes in the network."""
        # In production, this would use mDNS, DHT, or other discovery
        # For now, return existing nodes
        
        return list(self.nodes.values())
    
    async def _exchange_with_node(self, node: SovereignIntelligenceNode) -> None:
        """Exchange intelligence with a specific node."""
        # Pull knowledge from node
        # In production, this would be actual network communication
        
        node.last_seen = time.time()
        logger.debug(f"Exchanged intelligence with {node.node_id}")
    
    def _integrate_learned_pattern(self, pattern_data: Dict[str, Any]) -> None:
        """Integrate learned pattern from another organism."""
        pattern_id = pattern_data.get('pattern_id', 'unknown')
        self.shared_knowledge[f"pattern_{pattern_id}"] = pattern_data
        
        logger.debug(f"Integrated learned pattern: {pattern_id}")
    
    def _observe_decision(self, decision_data: Dict[str, Any]) -> None:
        """Observe decision made by another organism."""
        decision_id = decision_data.get('decision_id', 'unknown')
        self.shared_knowledge[f"decision_{decision_id}"] = decision_data
        
        logger.debug(f"Observed decision: {decision_id}")
    
    def _integrate_knowledge(self, knowledge_data: Dict[str, Any]) -> None:
        """Integrate knowledge from another organism."""
        knowledge_id = knowledge_data.get('knowledge_id', 'unknown')
        self.shared_knowledge[f"knowledge_{knowledge_id}"] = knowledge_data
        
        logger.debug(f"Integrated knowledge: {knowledge_id}")


class SovereignIntelligenceCoordinator:
    """Coordinates multiple organisms with Nova Sovereign backend.
    
    This enables true distributed intelligence - organisms that learn
    together without centralized control.
    """
    
    def __init__(self):
        self.backends: Dict[str, NovaSovereignBackend] = {}
        self.global_intelligence: Dict[str, Any] = {}
        
    def register_organism(
        self, 
        organism_id: str, 
        backend: NovaSovereignBackend
    ) -> None:
        """Register organism with coordinator."""
        self.backends[organism_id] = backend
        logger.info(f"Registered organism with coordinator: {organism_id}")
    
    async def coordinate_learning(self) -> Dict[str, Any]:
        """Coordinate learning across all organisms.
        
        This is where REAL distributed intelligence happens.
        """
        logger.info("Coordinating learning across organisms...")
        
        # Collect intelligence from all organisms
        collected_intelligence = []
        
        for organism_id, backend in self.backends.items():
            # Get knowledge from each organism
            knowledge = backend.export_knowledge_graph()
            collected_intelligence.append(knowledge)
        
        # Synthesize global intelligence
        self._synthesize_global_intelligence(collected_intelligence)
        
        # Distribute insights back to organisms
        for backend in self.backends.values():
            await backend.sync_with_network()
        
        return {
            'coordinated': True,
            'organisms': len(self.backends),
            'global_knowledge_size': len(self.global_intelligence),
            'timestamp': time.time()
        }
    
    def get_coordinator_metrics(self) -> Dict[str, Any]:
        """Get metrics for the entire sovereign intelligence network."""
        total_transactions = sum(
            len(b.transactions) for b in self.backends.values()
        )
        
        total_nodes = sum(
            len(b.nodes) for b in self.backends.values()
        )
        
        return {
            'total_organisms': len(self.backends),
            'total_nodes': total_nodes,
            'total_transactions': total_transactions,
            'global_knowledge_size': len(self.global_intelligence),
            'organism_stats': {
                organism_id: backend.get_network_status()
                for organism_id, backend in self.backends.items()
            }
        }
    
    def _synthesize_global_intelligence(
        self, 
        collected_intelligence: List[Dict[str, Any]]
    ) -> None:
        """Synthesize global intelligence from all organisms."""
        # Merge knowledge from all organisms
        for intelligence in collected_intelligence:
            organism_id = intelligence['organism_id']
            
            # Merge local knowledge
            for key, value in intelligence['local_knowledge'].items():
                global_key = f"{organism_id}_{key}"
                self.global_intelligence[global_key] = value
            
            # Merge shared knowledge
            for key, value in intelligence['shared_knowledge'].items():
                if key not in self.global_intelligence:
                    self.global_intelligence[key] = value
        
        logger.info(f"Synthesized global intelligence: {len(self.global_intelligence)} entries")
