import * as crypto from 'crypto';

/**
 * Computes SHA-256 hash of any input string or buffer.
 */
export function sha256(input: string): string {
    return crypto.createHash('sha256').update(input).digest('hex');
}

/**
 * MOCK signature function.
 * In a real implementation, this would use ed25519 keys (e.g. via `noble-curves`).
 * For the hackathon/ideation phase, we simulate the signature to avoid complex key management dependencies.
 */
export function mockSign(data: any, privateKey: string): string {
    const payload = JSON.stringify(data);
    // Simulating a signature by hashing the payload + private key
    return `sig_${sha256(payload + privateKey).substring(0, 32)}`;
}

/**
 * MOCK verification function.
 */
export function mockVerify(data: any, signature: string, publicKey: string): boolean {
    // In this mock, we assume valid if signature starts with 'sig_'
    // Real implementation would verify the ed25519 signature.
    return signature.startsWith('sig_');
}
