export type DID = `did:codexa:${string}`;

export interface AgentIdentity {
    did: DID;
    publicKey: string; // Hex string
}

export interface TaskEvidence {
    logHash?: string;
    outputHash: string;
    storageLink?: string; // Arweave or IPFS URI
}

export interface TaskDetails {
    type: string;
    difficulty: number; // 0.0 to 1.0
    context?: string;
    outcome: 'success' | 'failure';
    score?: number; // 0.0 to 1.0 (performance score)
}

export interface CredentialSubject {
    id: DID;
    task: TaskDetails;
    evidence?: TaskEvidence;
}

export interface Proof {
    type: 'Ed25519Signature2020';
    created: string; // ISO Date
    verificationMethod: string;
    proofPurpose: 'assertionMethod';
    jws: string; // Signature
}

/**
 * W3C-compatible Verifiable Credential Structure
 */
export interface VerifiableCredential {
    '@context': string[];
    type: string[];
    issuer: DID;
    issuanceDate: string;
    credentialSubject: CredentialSubject;
    proof?: Proof;
}

// Delegation Logic Types
export interface DelegationRule {
    var?: string;
    // Primitive Logic Types
    and?: DelegationRule[];
    or?: DelegationRule[];
    '>'?: [DelegationRule | { var: string }, number];
    '<'?: [DelegationRule | { var: string }, number];
    'in'?: [string | string[], DelegationRule | { var: string }];
    // Direct values for simplicity in this mock
    value?: any;
}
