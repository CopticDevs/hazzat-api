import { assert } from "chai";
import { ImportMock, MockManager } from 'ts-mock-imports';
import * as AsyncDelayerModule from "../../Common/Utils/AsyncDelayer";
import { IRetryPolicy } from "../../Common/Utils/IRetryPolicy";
import { OperationExecutor } from "../../Common/Utils/OperationExecutor";

describe("Operation Executor Unit Tests", () => {
    let mockManager: MockManager<AsyncDelayerModule.AsyncDelayer>;
    let retryPolicy: IRetryPolicy;
    const expectedResult = "expected result";

    beforeEach("Mock out Async delayer", () => {
        mockManager = ImportMock.mockClass(AsyncDelayerModule, 'AsyncDelayer');

        // Setup mocked delayer to save time
        mockManager.mock('delay', console.log("Delay called"));

        retryPolicy = {
            retryCount: 5,
            retryDelayMs: 100
        };
    });

    afterEach("Restore dependencies", () => {
        mockManager.restore();
    });

    describe("Validate inputs", () => {
        it("should throw for null action", async () => {
            try {
                await OperationExecutor.execute(null, retryPolicy);
                assert.fail("Expected failure, but it succeeded");
            }
            catch (ex) {
                assert.equal(ex, "Error: Action was not specified");
            }
        });

        it("should throw for undefined action", async () => {
            try {
                await OperationExecutor.execute(undefined, retryPolicy);
                assert.fail("Expected failure, but it succeeded");
            }
            catch (ex) {
                assert.equal(ex, "Error: Action was not specified");
            }
        });

        it("should throw for null retry policy", async () => {
            const successfulAction = () => {
                return Promise.resolve(expectedResult);
            };
            try {
                await OperationExecutor.execute(successfulAction, null);
                assert.fail("Expected failure, but it succeeded");
            }
            catch (ex) {
                assert.equal(ex, "Error: Retry policy not specified");
            }
        });

        it("should throw for undefined retry policy", async () => {
            const successfulAction = () => {
                return Promise.resolve(expectedResult);
            };
            try {
                await OperationExecutor.execute(successfulAction, undefined);
                assert.fail("Expected failure, but it succeeded");
            }
            catch (ex) {
                assert.equal(ex, "Error: Retry policy not specified");
            }
        });

        it("should throw for null retry count", async () => {
            const successfulAction = () => {
                return Promise.resolve(expectedResult);
            };
            retryPolicy.retryCount = null;
            try {
                await OperationExecutor.execute(successfulAction, retryPolicy);
                assert.fail("Expected failure, but it succeeded");
            }
            catch (ex) {
                assert.notEqual(ex, "Error: Expected failure, but it succeeded");
            }
        });

        it("should throw for undefined retry count", async () => {
            const successfulAction = () => {
                return Promise.resolve(expectedResult);
            };
            retryPolicy.retryCount = undefined;
            try {
                await OperationExecutor.execute(successfulAction, retryPolicy);
                assert.fail("Expected failure, but it succeeded");
            }
            catch (ex) {
                assert.notEqual(ex, "Error: Expected failure, but it succeeded");
            }
        });

        it("should throw for zero retry count", async () => {
            const successfulAction = () => {
                return Promise.resolve(expectedResult);
            };
            retryPolicy.retryCount = 0;
            try {
                await OperationExecutor.execute(successfulAction, retryPolicy);
                assert.fail("Expected failure, but it succeeded");
            }
            catch (ex) {
                assert.notEqual(ex, "Error: Expected failure, but it succeeded");
            }
        });

        it("should throw for negative retry count", async () => {
            const successfulAction = () => {
                return Promise.resolve(expectedResult);
            };
            retryPolicy.retryCount = -5;
            try {
                await OperationExecutor.execute(successfulAction, retryPolicy);
                assert.fail("Expected failure, but it succeeded");
            }
            catch (ex) {
                assert.notEqual(ex, "Error: Expected failure, but it succeeded");
            }
        });

        it("should throw for null retry count", async () => {
            const successfulAction = () => {
                return Promise.resolve(expectedResult);
            };
            retryPolicy.retryCount = null;
            try {
                await OperationExecutor.execute(successfulAction, retryPolicy);
                assert.fail("Expected failure, but it succeeded");
            }
            catch (ex) {
                assert.notEqual(ex, "Error: Expected failure, but it succeeded");
            }
        });

        it("should throw for undefined retry delay", async () => {
            const successfulAction = () => {
                return Promise.resolve(expectedResult);
            };
            retryPolicy.retryDelayMs = undefined;
            try {
                await OperationExecutor.execute(successfulAction, retryPolicy);
                assert.fail("Expected failure, but it succeeded");
            }
            catch (ex) {
                assert.notEqual(ex, "Error: Expected failure, but it succeeded");
            }
        });

        it("should throw for zero retry delay", async () => {
            const successfulAction = () => {
                return Promise.resolve(expectedResult);
            };
            retryPolicy.retryDelayMs = 0;
            try {
                await OperationExecutor.execute(successfulAction, retryPolicy);
                assert.fail("Expected failure, but it succeeded");
            }
            catch (ex) {
                assert.notEqual(ex, "Error: Expected failure, but it succeeded");
            }
        });

        it("should throw for negative retry delay", async () => {
            const successfulAction = () => {
                return Promise.resolve(expectedResult);
            };
            retryPolicy.retryDelayMs = -5;
            try {
                await OperationExecutor.execute(successfulAction, retryPolicy);
                assert.fail("Expected failure, but it succeeded");
            }
            catch (ex) {
                assert.notEqual(ex, "Error: Expected failure, but it succeeded");
            }
        });

        it("should throw for negative timeout duration", async () => {
            const successfulAction = () => {
                return Promise.resolve(expectedResult);
            };
            retryPolicy.attemptTimeoutMs = -5;
            try {
                await OperationExecutor.execute(successfulAction, retryPolicy);
                assert.fail("Expected failure, but it succeeded");
            }
            catch (ex) {
                assert.notEqual(ex, "Error: Expected failure, but it succeeded");
            }
        });
    });

    describe("Validate results", () => {
        it("should return expected result on success", async () => {
            const successfulAction = () => {
                return Promise.resolve(expectedResult);
            };
            const actualResult = await OperationExecutor.execute<string>(successfulAction, retryPolicy);
            assert.equal(actualResult, expectedResult);
        });

        it("should fail with expected result on failure", async () => {
            const action = () => {
                return Promise.reject(expectedResult);
            };

            try {
                await OperationExecutor.execute<string>(action, retryPolicy);
                assert.fail("Expected action to fail, but it succeeded");
            }
            catch (ex) {
                assert.equal(ex, expectedResult);
            }
        });

        it("should succeed for methods completing withing the specified timeout period", async () => {
            retryPolicy.attemptTimeoutMs = 200;
            const successfulAction = () => {
                return Promise.resolve(expectedResult);
            };

            const actualResult = await OperationExecutor.execute<string>(successfulAction, retryPolicy);
            assert.equal(actualResult, expectedResult);
        });

        it("should fail for methods taking longer than specified timeout period", async () => {
            retryPolicy.attemptTimeoutMs = 100;
            const action = () => {
                return new Promise<string>((resolve) => setTimeout(resolve, 200));
            };

            try {
                await OperationExecutor.execute<string>(action, retryPolicy);
                throw new Error("Expected action to fail, but it succeeded");
            }
            catch (ex) {
                assert.equal(ex, "Action timed out.");
            }
        });

        it("should fail for methods failing within the specified timeout period", async () => {
            retryPolicy.attemptTimeoutMs = 100;
            const action = () => {
                return Promise.reject(expectedResult);
            };
            try {
                await OperationExecutor.execute<string>(action, retryPolicy);
                assert.fail("Expected action to fail, but it succeeded");
            }
            catch (ex) {
                assert.equal(ex, expectedResult);
            }
        });
    });
});
