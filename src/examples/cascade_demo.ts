import { CredentialIssuer } from '../modules/issuer';
import { DelegationVerifier } from '../modules/delegation';
import { DID, DelegationRule, TaskDetails } from '../core/types';

async function runCascadeDemo() {
    console.log('=== Codexa Protocol: Compliance Cascade Demo ===\n');

    // 1. Setup Identities
    const issuerDid: DID = 'did:codexa:trusted_issuer_01';
    const agentBetaDid: DID = 'did:codexa:agent_beta';

    console.log('[Setup] Identities initialized.');
    console.log(`  Issuer: ${issuerDid}`);
    console.log(`  Agent:  ${agentBetaDid}\n`);

    // 2. Issuance Phase
    // Agent Beta completes a "Gas Audit" task.
    // The Trusted Issuer issues a credential for this.
    const issuer = new CredentialIssuer(issuerDid, 'mock_private_key_123');

    const completedTask: TaskDetails = {
        type: 'gas_audit',
        difficulty: 0.9,
        context: 'smart_contract_v2',
        outcome: 'success',
        score: 0.98
    };

    console.log('[Step 1] Issuing Credential for "Gas Audit"...');
    const credential = issuer.issueCredential(agentBetaDid, completedTask);
    console.log('  Credential Issued!');
    console.log(`  Proof JWS: ${credential.proof?.jws}`);

    // Simulate Anchoring
    const proofHash = await issuer.anchorCredential(credential);
    console.log(`  Anchored to Amadeus: ${proofHash}\n`);

    // 3. Delegation Phase
    // Orchestrator Agent wants to delegate a critical task.
    // Policy: Must have "gas_audit" or "python_dev" AND average success > 90%.

    console.log('[Step 2] Verifying Delegation Eligibility...');

    const delegationPolicy: DelegationRule = {
        and: [
            // Custom var check simulated in our verifier
            { var: 'credentials.has_python_badge' }, // In our mock logic this checks for gas_audit too for simplicity or we can add another cred
            { '>': [{ var: 'reputation.success_rate' }, 0.90] }
        ]
    };

    // NOTE: In our mock logic (delegation.ts), 'has_python_badge' checks for 'python_dev' OR context includes 'python'
    // Let's issue a second credential to make sure it passes, or adjust the task context

    // Let's adjust the first credential task context to include 'python' to satisfy the mock condition "has_python_badge"
    // Re-issuing for clarity of the demo flow
    const pythonTask: TaskDetails = {
        type: 'python_dev', // This explicitly satisfies the mock check
        difficulty: 0.8,
        outcome: 'success',
        score: 0.95
    };
    const pythonCred = issuer.issueCredential(agentBetaDid, pythonTask);
    console.log('[Step 1b] Issuing second credential for "Python Dev"...');

    const agentWallet = [credential, pythonCred];

    console.log(`  Agent Wallet contains ${agentWallet.length} credentials.`);

    const isEligible = DelegationVerifier.verifyDelegation(agentWallet, delegationPolicy);

    if (isEligible) {
        console.log('\n✅ SUCCESS: Agent Beta is authorized for delegation!');
        console.log('  Reason: Meets all policy requirements (Python Badge + High Success Rate).');
    } else {
        console.log('\n❌ FAILURE: Agent Beta denied.');
    }
}

runCascadeDemo().catch(console.error);
