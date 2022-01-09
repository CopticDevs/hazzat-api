import { AxiosResponse, default as axios } from "axios";
import { assert } from "chai";
import { ErrorCodes } from "../../Common/Errors";
import { OperationExecutor } from "../../Common/Utils/OperationExecutor";
import { ISeasonInfo } from "../../Models/ISeasonInfo";
import { ITuneInfo } from "../../Models/ITuneInfo";
import { ResourceTypes } from "../../Routes/ResourceTypes";
import { Validators } from "../Helpers/Validators";
import { ApiValidator, TestCaseType } from "./ApiValidator";
import { TestConfiguration } from "./TestConfiguration";

describe("Tunes controller", () => {
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

    describe("/GET all tunes", () => {
        it("should get all tunes", async () => {
            const response: AxiosResponse<ITuneInfo[]> = await axios.get(`${tc.baseTestUrl}/tunes`);

            Validators.validateArray(response.data);
            response.data.forEach((season) => Validators.validateHymnTune(season));
        });
    });

    describe("/GET a tune", () => {
        it("should get a single tune", async () => {
            const resourceId = `/${ResourceTypes.Tunes}/1`;
            const response: AxiosResponse<ITuneInfo> = await axios.get(`${tc.baseTestUrl}${resourceId}`);

            Validators.validateObject(response.data);
            Validators.validateHymnTune(response.data, resourceId);
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Tunes, value: "1" })
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

    describe("/GET all tune seasons", () => {
        it("should get all tune seasons", async () => {
            const response: AxiosResponse<ISeasonInfo[]> = await axios.get(`${tc.baseTestUrl}/${ResourceTypes.Tunes}/1/${ResourceTypes.Seasons}`);

            Validators.validateArray(response.data);
            response.data.forEach((season) => Validators.validateTuneSeason(season));
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Tunes, value: "1" })
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

    describe("/GET a tune season", () => {
        it("should get a tune season", async () => {
            const resourceId = `/${ResourceTypes.Tunes}/1/${ResourceTypes.Seasons}/33`;
            const response: AxiosResponse<ISeasonInfo[]> = await axios.get(`${tc.baseTestUrl}${resourceId}`);

            Validators.validateObject(response.data);
            Validators.validateTuneSeason(response.data, resourceId);
        });

        const apiValidator = new ApiValidator();
        apiValidator
            .withPart({ typeName: ResourceTypes.Tunes, value: "1" })
            .withPart({ typeName: ResourceTypes.Seasons, value: "33" })
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
