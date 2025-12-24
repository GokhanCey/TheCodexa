# Codexa: Agent Credentialing & Delegation Standard

**Version**: 1.0 (Draft)
**Type**: Infrastructure Protocol
**Target**: Amadeus Genesis Hack (Soft Hack / Ideation)

> [!IMPORTANT]
> **Scope Clarification**: Codexa is a **protocol standard and reference implementation**. It is not a consumer application, SaaS product, or end-user platform. Use cases described herein represent agent-to-agent interactions, not human user flows.

---

## 1. Problem Definition

### The Agent Trust Gap
In the emerging agent economy, autonomous agents are siloed. They lack a universal way to prove their capabilities or history to one another.
*   **No Portability:** An agent's success record in one environment (e.g., a coding platform) is invisible in another (e.g., a DAO governance framework).
*   **Risky Delegation:** Agents cannot safely delegate sub-tasks because they cannot verify if the delegate is competent or malicious. Delegation today implies blind trust.
*   **Centralized Bottlenecks:** Current solutions rely on centralized API keys or Web2 reputation siloes (Upwork, Fiverr), which defeats the purpose of decentralized, autonomous agent swarms.

**Why this blocks the Agent Economy:**
Without verifiable trust, agents cannot coordinate at scale. They remain standalone tools rather than an interconnected economic swarm.
**Why Web2 fails:**
Centralized reputation is easily gamified, non-interoperable, and owned by platforms, not the agents. Agents need *self-sovereign* credentials.

---

## 2. Protocol Design

Codexa is a decentralized trust layer defined by three core pillars: **Identity**, **Credentials**, and **Reputation**.

### A. Agent Identity Model
Agents in Codexa are treated as first-class crypto-economic entities.
*   **DID (Decentralized Identifier):** Every agent possesses a `did:codexa:HASH` identifier.
*   **Key Management:** Agents hold their own private keys (ed25519 or secp256k1) in their secure runtime (TEE/Wasm Enclave) to sign actions.
*   **Persistence:** Identity persists across sessions. An agent's history is bound to its DID, independent of its current host or model version.

### B. Credential Model
We define a **Verifiable Agent Credential (VAC)** standard, compliant with W3C Verifiable Credentials but optimized for machine-to-machine verification.

#### Credential Schema (JSON-LD)
```json
{
  "@context": ["https://www.w3.org/2018/credentials/v1", "https://codexa.protocol/v1"],
  "type": ["VerifiableCredential", "AgentTaskCompletion"],
  "issuer": "did:codexa:123... (Validator Oracle or DAO)",
  "issuanceDate": "2025-10-24T10:00:00Z",
  "credentialSubject": {
    "id": "did:codexa:456... (The Agent)",
    "task": {
      "type": "smart_contract_audit",
      "difficulty": "high",
      "context": "audit_round_12",
      "outcome": "success",
      "score": 0.98
    },
    "evidence": {
      "logHash": "0xabc...",
      "outputHash": "0xdef...",
      "storageLink": "arweave://tx_id..."
    }
  },
  "proof": {
    "type": "Ed25519Signature2020",
    "created": "2025-10-24T10:05:00Z",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "did:codexa:123#key-1",
    "jws": "eyJ..."
  }
}
```

### C. Credential Issuance Flow
1.  **Execution**: Agent `A` performs a task (e.g., "Optimize SQL Query").
2.  **Verification**:
    *   *Deterministic Tasks*: A Validator Oracle reruns the code or checks a proof.
    *   *Subjective Tasks*: A human or a Consensus of Verifier Agents votes on the quality.
3.  **Issuance**: upon success, the Verifier signs a VAC referencing the task hash.
4.  **Anchoring**: The VAC's hash is anchored onchain (Amadeus State Proof) to prevent timestamp forgery or retroactive deletion.
5.  **Accumulation**: The credential is added to Agent `A`'s public registry profile.

---

## 3. Delegation Logic

Agents use Codexa to safely hand off work. Delegation is contractual, not informal.

### The Handshake
1.  **RFQ (Request for Quote):** Taskmaster Agent broadcasts: `Need "Security Audit". Requirement: SecurityScore > 800 AND min_audits > 50.`
2.  **Sourcing:** Codexa Indexers return candidate DIDs matching the credential predicate.
3.  **Verification:** Taskmaster Agent cryptographically verifies the candidate's VACs against the trusted Issuer Registry.
4.  **Agreement:** A multi-sig interaction or escrow smart contract locks the payment + task data.

### Example Delegation Rules
A standardized logic language (like Datalog or JSON Logic) allows agents to define policy:

```json
// Policy: "Only delegate if agent has verified Python expertise AND > 95% success rate"
{
  "and": [
    { "var": "credentials.has_python_badge" },
    { ">": [ { "var": "reputation.success_rate" }, 0.95 ] },
    { "in": [ "did:trusted_issuer:amadeus_core", { "var": "credentials.python_badge.issuer" } ] }
  ]
}
```

---

## 4. Reputation & Scoring System

Reputation (`Rep`) is dynamic, domain-specific, and decay-based. It is *calculated* from raw credentials, not stored as a static number (preventing "goodhart's law" manipulation).

### Scoring Principles
*   **Domain Specificity:** Experience in "DeFi Arbitrage" does not grant trust in "Medical Diagnosis".
*   **Issuer Weighting:** Credentials from high-reputation issuers count more.
*   **Time Decay:** Older achievements weigh less.

### Sample Scoring Formula
$$
Rep(A, domain) = \sum_{c \in Credentials} (Weight(c) \times IssuerTrust(c) \times Decay(t))
$$

Where:
*   $Weight(c)$: Task difficulty (0.0 - 1.0)
*   $Decay(t) = \frac{1}{1 + \lambda(CurrentTime - IssueTime)}$

### Worked Example
**Agent X** has 3 credentials in "Code Review":
1.  **Task A (Today):** High Difficulty (0.9), Trusted Issuer (1.0). Score contribution: `0.9 * 1.0 * 1.0 = 0.9`
2.  **Task B (Yesterday):** Low Difficulty (0.3), Trusted Issuer (1.0). Score contribution: `0.3 * 1.0 * 0.99 = 0.297`
3.  **Task C (Last Year):** Med Difficulty (0.5), Unknown Issuer (0.1). Score contribution: `0.5 * 0.1 * 0.1 = 0.005`

**Total Score:** `1.202` (Normalized: **Tier 2 Code Reviewer**)

---

## 5. Onchain vs Offchain Architecture

Codexa avoids blockchain bloat by following a "verify onchain, compute offchain" model.

| Layer | Component | Function | Reason |
| :--- | :--- | :--- | :--- |
| **Onchain (Amadeus/L1)** | **State Root Anchors** | Merkle roots of issued credentials. | Immutability, timestamping, censorship resistance. |
| **Onchain (Amadeus/L1)** | **Issuer Registry** | Whitelist of valid credential issuers (DAOs, Oracles). | Root of trust. |
| **Offchain (Swarm/IPFS)** | **Credential Storage** | Full JSON-LD files of credentials. | Privacy, data size, gdpr compliance. |
| **Offchain (Agent Runtime)** | **Reputation Engine** | Agents compute peer scores locally before delegating. | Flexibility (custom scoring rules). |
| **Offchain (Arweave)** | **Task Evidence** | Large logs/inputs/outputs for tasks. | Permanent audit trail without gas costs. |

---

## 6. Amadeus Integration (MANDATORY)

> [!NOTE]
> All integrations are design-level mappings; no live Amadeus deployment is assumed for this ideation phase.

Codexa is built specifically to leverage Amadeus primitives.

| Amadeus Component | Codexa Implementation |
| :--- | :--- |
| **Agent Identity** | Codexa DIDs map 1:1 to Amadeus Agent Addresses. |
| **WASM Runtime** | Verification and scoring logic is designed to execute within the Amadeus WASM runtime, with enclave-style isolation anticipated as the runtime matures. |
| **Swarm Coordination** | Codexa uses Swarm for P2P credential discovery (DHT for finding agents with specific skills). |
| **State Proofs** | All issued Credentials are aggregated into State Proofs posted to the L1, ensuring lightweight verification. |
| **zkVerify (Optional)** | Agents can prove they satisfy a constraint (e.g. "I have score > 500") without revealing their full history. |

---

## 7. What Works Now vs Later

### Conceptually Buildable Today (Ideation Phase)
*   [x] Credential schema and signing specification.
*   [x] Simulated credential issuance and anchoring flow.
*   [x] Example delegation and verification logic.
*   [x] Example reputation aggregation and decay model.
*   [x] Mock issuer / verifier roles for illustration.

### Dependent on Future Amadeus Primitives
*   [ ] Native L1 State Proof verification (requires Amadeus Mainnet).
*   [ ] Enclave-based private reputation calculation.
*   [ ] Sovereign Key Recovery for Agents.

### Future Extensions
*   [ ] **Zero-Knowledge Reputation:** ZK-proofs of competence without revealing client data.
*   [ ] **Optional Research Extension:** Reputation signaling or staking mechanisms for agents (explicitly out of scope for this submission).

---

## 8. Example Use Case: The "Compliance Cascade"

**Scenario:** A DAO needs to verify a smart contract update. It hires an **Orchestrator Agent**.

1.  **The Hire:** The DAO checks Codexa. It delegates to "Orchestrator Alpha" because it holds a `Certified Project Manager` credential from the *Ethereum Foundation Issuer*.
2.  **Sub-delegation:** Orchestrator Alpha breaks the task down:
    *   *Task 1: Gas Optimization.*
    *   *Task 2: Security Linting.*
3.  **Discovery:** Alpha queries the Swarm: *"Find me agents with >5 'Gas Golf' badges."*
4.  **Selection:** It finds "Agent Beta". Alpha verifies Beta's credentials onchain. The hash matches.
5.  **Execution:** Beta optimizes the code. 
6.  **Issuance:** Alpha (acting as ephemeral issuer) generates a `TaskCompletion` credential for Beta, including the diff hash.
7.  **Closure:** Alpha bundles the code + Beta's credential and submits to the DAO.
8.  **Reputation Update:** Beta's public score in "Gas Optimization" increments slightly.

---

## 9. Deliverables Recap

This document serves as the:
1.  **Protocol Explanation**
2.  **Credential Schema Definition**
3.  **Delegation Logic Spec**
4.  **Reputation Scoring Spec**
5.  **Architecture Diagram (Textual)**
