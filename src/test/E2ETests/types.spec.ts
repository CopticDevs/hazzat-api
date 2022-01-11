import { AxiosResponse, default as axios } from "axios";
import { assert } from "chai";
import { ErrorCodes } from "../../Common/Errors";
import { OperationExecutor } from "../../Common/Utils/OperationExecutor";
import { ISeasonInfo } from "../../Models/ISeasonInfo";
import { ITypeInfo } from "../../Models/ITypeInfo";
import { ResourceTypes } from "../../Routes/ResourceTypes";
import { Validators } from "../Helpers/Validators";
import { ApiValidator, TestCaseType } from "../Helpers/ApiValidator";
import { TestConfiguration } from "./TestConfiguration";

describe("Types controller", () => {
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

    describe("/GET all types", () => {
        it("should get all types", async () => {
            const response: AxiosResponse<ITypeInfo[]> = await axios.get(`${tc.baseTestUrl}/types`);

            Validators.validateArray(response.data);
            response.data.forEach((season) => Validators.validateHymnType(season));
        });
    });

    describe("/GET a type", () => {
        it("should get a single type", async () => {
            const resourceId = `/${ResourceTypes.Types}/1`;
            const response: AxiosResponse<ITypeInfo> = await axios.get(`${tc.baseTestUrl}${resourceId}`);

            Validators.validateObject(response.data);
            Validators.validateHymnType(response.data, resourceId);
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Types, value: "1" })
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

    describe("/GET all type seasons", () => {
        it("should get all type seasons", async () => {
            const response: AxiosResponse<ISeasonInfo[]> = await axios.get(`${tc.baseTestUrl}/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}`);

            Validators.validateArray(response.data);
            response.data.forEach((season) => Validators.validateTypeSeason(season));
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Types, value: "17" })
            .generate().forEach((testCase) => {
                if (testCase.testCase === TestCaseType.NonExisting) {
                    it(`should return an empty array for non existing ${testCase.partUnderTest} ids`, async () => {
                        const response: AxiosResponse<ISeasonInfo[]> = await axios.get(`${tc.baseTestUrl}${testCase.resourceId}/${ResourceTypes.Seasons}`);

                        Validators.validateArray(response.data, true);
                    });
                }
                else {
                    it(testCase.description, async () => {
                        try {
                            await axios.get(`${tc.baseTestUrl}${testCase.resourceId}/${ResourceTypes.Seasons}`);
                            assert.fail();
                        }
                        catch (ex) {
                            Validators.validateErrorAxiosResponse(ex.response, 404);
                        }
                    });
                }
            });
    });

    describe("/GET a type season", () => {
        it("should get a type season", async () => {
            const resourceId = `/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1`;
            const response: AxiosResponse<ISeasonInfo[]> = await axios.get(`${tc.baseTestUrl}${resourceId}`);

            Validators.validateObject(response.data);
            Validators.validateTypeSeason(response.data, resourceId);
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Types, value: "17" })
            .withPart({ typeName: ResourceTypes.Seasons, value: "1" })
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
