import { assert } from "chai";
import { ImportMock, MockManager } from 'ts-mock-imports';
import * as AsyncDelayerModule from "../../Common/Utils/AsyncDelayer";
import { IRetryPolicy } from "../../Common/Utils/IRetryPolicy";
import { OperationExecutor } from "../../Common/Utils/OperationExecutor";

describe.only("Operation Executor Unit Tests", () => {
    let mockManager: MockManager<AsyncDelayerModule.AsyncDelayer>;
    const retryPolicy: IRetryPolicy = {
        retryCount: 5,
        retryDelayMs: 100
    };
    const expectedResult = "expected result";

    beforeEach("Mock out Async delayer", () => {
        mockManager = ImportMock.mockClass(AsyncDelayerModule, 'AsyncDelayer');

        // Setup mocked delayer to save time
        mockManager.mock('delay', console.log("Delay called"));
    });

    afterEach("Restore dependencies", () => {
        mockManager.restore();
    });

    it("should return expected result on success", async () => {
        const action = () => {
            return Promise.resolve(expectedResult);
        };

        const actualResult = await OperationExecutor.execute<string>(action, retryPolicy);
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
});
