import { AxiosResponse, default as axios } from "axios";
import { assert } from "chai";
import { ErrorCodes } from "../../Common/Errors";
import { OperationExecutor } from "../../Common/Utils/OperationExecutor";
import { IBookletInfo } from "../../Models/IBookletInfo";
import { ResourceTypes } from "../../Routes/ResourceTypes";
import { ApiValidator, TestCaseType } from "../Helpers/ApiValidator";
import { Validators } from "../Helpers/Validators";
import { TestConfiguration } from "./TestConfiguration";

describe("Booklets controller", () => {
    let tc: TestConfiguration;

    before("Initialize Test Configuration", async () => {
        tc = new TestConfiguration();

        console.log(`Using test location ${tc.testLocation}`);
        console.log(`Using baseurl ${tc.baseTestUrl}`);

        // Wake up the service before first test
        await OperationExecutor.executeAsync(() => axios.get(`${tc.baseTestUrl}`), {
            retryCount: 4,
            retryDelayMs: 5000,
            attemptTimeoutMs: 10000
        });
    });

    describe("/GET all booklets", () => {
        it("should get all booklets", async () => {
            const response: AxiosResponse<IBookletInfo[]> = await axios.get(`${tc.baseTestUrl}/${ResourceTypes.Booklets}`);

            Validators.validateArray(response.data);
            response.data.forEach((booklet) => Validators.validateBooklet(booklet));
        });
    });

    describe("/GET a booklet", () => {
        it("should get a single booklet", async () => {
            const resourceId = `/${ResourceTypes.Booklets}/1`;
            const response: AxiosResponse<IBookletInfo> = await axios.get(`${tc.baseTestUrl}${resourceId}`);

            Validators.validateObject(response.data);
            Validators.validateBooklet(response.data, resourceId);
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Booklets, value: "1" })
            .generate().forEach((testCase) => {
                it(testCase.description, async () => {
                    try {
                        await axios.get(`${tc.baseTestUrl}${testCase.resourceId}`);
                        assert.fail();
                    }
                    catch (ex) {
                        if (testCase.testCase === TestCaseType.NonExisting) {
                            Validators.validateErrorAxiosResponse(ex.response, 404, ErrorCodes.NotFoundError);
                        }
                        else {
                            Validators.validateErrorAxiosResponse(ex.response, 404);
                        }
                    }
                });
            });
    });
});
