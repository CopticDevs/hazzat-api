/**
 * Retry Policy
 */
export interface IRetryPolicy {
    /** Number of times to retry an operation */
    retryCount: number;
    /** Delay between attempts in ms */
    retryDelayMs: number;
}
