import { VerifiableCredential, DelegationRule, DID } from '../core/types';
import { mockVerify } from '../core/crypto';

export class DelegationVerifier {

    /**
     * Verifies a set of credentials against a logic policy.
     */
    public static verifyDelegation(
        credentials: VerifiableCredential[],
        policy: DelegationRule
    ): boolean {
        return this.evaluateRule(policy, credentials);
    }

    private static evaluateRule(rule: DelegationRule, credentials: VerifiableCredential[]): boolean {
        // 1. Handle Logic Operators (AND, OR)
        if (rule.and) {
            return rule.and.every(subRule => this.evaluateRule(subRule, credentials));
        }
        if (rule.or) {
            return rule.or.some(subRule => this.evaluateRule(subRule, credentials));
        }

        // 2. Handle Variable Comparisons ({ ">": [ {var: "reputation.score"}, 0.9 ] })
        // Basic simplified implementation for the demo

        if (rule['>']) {
            const variable = rule['>'][0] as { var: string };
            const threshold = rule['>'][1] as number;
            const value = this.extractValue(variable.var, credentials);
            return value > threshold;
        }

        if (rule['in']) {
            const allowedList = rule['in'][0] as string[];
            const variable = rule['in'][1] as { var: string };
            const value = this.extractValue(variable.var, credentials);
            return allowedList.includes(value);
        }

        // Specific check for "has_credential_type"
        if (rule.var === 'credentials.has_python_badge') {
            const hasPython = credentials.some(c =>
                c.credentialSubject.task.context?.includes('python') ||
                c.credentialSubject.task.type === 'python_dev'
            );
            return hasPython;
        }

        return false;
    }

    /**
     * Helper to extract values from a list of credentials.
     * For this demo, we assume we are aggregating values (e.g. max score).
     */
    private static extractValue(path: string, credentials: VerifiableCredential[]): any {
        if (path === 'reputation.success_rate') {
            // Calculate average outcome success
            const successCount = credentials.filter(c => c.credentialSubject.task.outcome === 'success').length;
            return credentials.length > 0 ? successCount / credentials.length : 0;
        }

        if (path === 'credentials.python_badge.issuer') {
            // Return the issuer of the first relevant badge
            const cred = credentials.find(c => c.credentialSubject.task.type === 'python_dev');
            return cred ? cred.issuer : '';
        }

        return 0;
    }
}
