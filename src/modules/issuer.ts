import { DID, VerifiableCredential, TaskDetails, TaskEvidence } from '../core/types';
import { mockSign, sha256 } from '../core/crypto';

export class CredentialIssuer {
    private issuerDid: DID;
    private privateKey: string;

    constructor(issuerDid: DID, privateKey: string) {
        this.issuerDid = issuerDid;
        this.privateKey = privateKey;
    }

    /**
     * Issues a Verifiable Credential for a completed task.
     */
    public issueCredential(
        subjectDid: DID,
        task: TaskDetails,
        evidence?: TaskEvidence
    ): VerifiableCredential {

        // 1. Construct the Credential Subject
        const credentialSubject = {
            id: subjectDid,
            task: task,
            evidence: evidence
        };

        // 2. Prepare the unsigned structure
        const unsignedCred: VerifiableCredential = {
            '@context': ['https://www.w3.org/2018/credentials/v1', 'https://codexa.protocol/v1'],
            type: ['VerifiableCredential', 'AgentTaskCompletion'],
            issuer: this.issuerDid,
            issuanceDate: new Date().toISOString(),
            credentialSubject: credentialSubject
        };

        // 3. Sign the credential (Mock Signature)
        // In reality, this would be Ed25519 signature of the canonicalized JSON
        const signature = mockSign(unsignedCred, this.privateKey);

        // 4. Attach Proof
        unsignedCred.proof = {
            type: 'Ed25519Signature2020',
            created: new Date().toISOString(),
            verificationMethod: `${this.issuerDid}#key-1`,
            proofPurpose: 'assertionMethod',
            jws: signature
        };

        return unsignedCred;
    }

    /**
     * Simulates anchoring the credential hash to the Amadeus State.
     * Returns a mock State Proof hash.
     */
    public async anchorCredential(credential: VerifiableCredential): Promise<string> {
        const credHash = sha256(JSON.stringify(credential));
        console.log(`[MockAnchor] Anchoring credential hash ${credHash} to Amadeus L1...`);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 100));

        return `state_proof_${sha256(credHash + Date.now()).substring(0, 16)}`;
    }
}
