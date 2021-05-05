import { Log } from "./Logger";
import { IRetryPolicy } from "./IRetryPolicy";
import { AsyncDelayer } from "./AsyncDelayer";

/**
 * A class to execute an async operation with a retry policy.
 */
export class OperationExecutor {
    /**
     * Execute the given operation with the given retry policy.
     * @param action The operation to be executed.
     * @param retryPolicy The retry policy to be used.
     */
    public static async execute<T>(action: () => Promise<T>, retryPolicy: IRetryPolicy): Promise<T> {
        if (!action) {
            throw new Error("Action was not specified");
        }
        if (!retryPolicy) {
            throw new Error("Retry policy not specified");
        }

        if (!retryPolicy.retryCount || retryPolicy.retryCount < 0) {
            throw new Error(`Invalid retry count specified: ${retryPolicy.retryCount}`);
        }

        if (!retryPolicy.retryDelayMs || retryPolicy.retryDelayMs < 0) {
            throw new Error(`Invalid retry delay specified: ${retryPolicy.retryDelayMs}`);
        }

        if (retryPolicy.attemptTimeoutMs && retryPolicy.attemptTimeoutMs < 0) {
            throw new Error(`Invalid timeout specified: ${retryPolicy.attemptTimeoutMs}`);
        }

        let attempts = 1;
        const delayer = new AsyncDelayer();
        while (true) {
            try {
                if (!retryPolicy.attemptTimeoutMs) {
                    Log.verbose("OperationExecutor", "execute", "Calling action");
                    return await action();
                } else {
                    Log.verbose("OperationExecutor", "execute", `Calling action with timeout ${retryPolicy.attemptTimeoutMs}`);
                    return await this.callActionWithTimeout(action, retryPolicy.attemptTimeoutMs);
                }
            }
            catch (ex) {
                Log.verbose("OperationExecutor", "execute", `Operation failed on attempt #${attempts}/${retryPolicy.retryCount}`);
                Log.exception("OperationExecutor", "execute", ex);
                attempts++;

                if (attempts > retryPolicy.retryCount) {
                    throw ex;
                }
                await delayer.delay(retryPolicy.retryDelayMs);
            }
        }
    }

    public static async callActionWithTimeout<T>(action: () => Promise<T>, timeoutMs: number): Promise<T> {
        const timerPromise = new Promise<T>((_r, rej) => setTimeout(() => {
            rej('Action timed out.');
        }, timeoutMs));
        return Promise.race<T>([action(), timerPromise]);
    }
}
