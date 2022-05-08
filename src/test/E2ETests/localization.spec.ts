import { AxiosResponse, default as axios } from "axios";
import { assert } from "chai";
import { OperationExecutor } from "../../Common/Utils/OperationExecutor";
import { ISeasonInfo } from "../../Models/ISeasonInfo";
import { ResourceTypes } from "../../Routes/ResourceTypes";
import { Validators } from "../Helpers/Validators";
import { TestConfiguration } from "./TestConfiguration";

describe("Localization Tests", () => {
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

    describe("Seasons Localization", () => {
        it("should get english for no headers", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/2`;
            const response: AxiosResponse<ISeasonInfo> = await axios.get(`${tc.baseTestUrl}${resourceId}`);

            Validators.validateObject(response.data);
            Validators.validateSeason(response.data, resourceId);
            assert.equal(response.data.name, "Nairouz");
            assert.equal(response.data.verse, "Bless the crown of the year with Your goodness O Lord");
        });

        it("should get english for en header", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/2`;
            const response: AxiosResponse<ISeasonInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "en" } });

            Validators.validateObject(response.data);
            Validators.validateSeason(response.data, resourceId);
            assert.equal(response.data.name, "Nairouz");
            assert.equal(response.data.verse, "Bless the crown of the year with Your goodness O Lord");
        });

        it("should get english for en-US header", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/2`;
            const response: AxiosResponse<ISeasonInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "en-US" } });

            Validators.validateObject(response.data);
            Validators.validateSeason(response.data, resourceId);
            assert.equal(response.data.name, "Nairouz");
            assert.equal(response.data.verse, "Bless the crown of the year with Your goodness O Lord");
        });

        it("should get english for fr header", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/2`;
            const response: AxiosResponse<ISeasonInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "en" } });

            Validators.validateObject(response.data);
            Validators.validateSeason(response.data, resourceId);
            assert.equal(response.data.name, "Nairouz");
            assert.equal(response.data.verse, "Bless the crown of the year with Your goodness O Lord");
        });

        it("should get english for bad header", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/2`;
            const response: AxiosResponse<ISeasonInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "bad" } });

            Validators.validateObject(response.data);
            Validators.validateSeason(response.data, resourceId);
            assert.equal(response.data.name, "Nairouz");
            assert.equal(response.data.verse, "Bless the crown of the year with Your goodness O Lord");
        });

        it("should get english for qualified header", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/2`;
            const response: AxiosResponse<ISeasonInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "en;q=0.9,ar;q=0.8" } });

            Validators.validateObject(response.data);
            Validators.validateSeason(response.data, resourceId);
            assert.equal(response.data.name, "Nairouz");
            assert.equal(response.data.verse, "Bless the crown of the year with Your goodness O Lord");
        });

        it("should get english for unordered qualified header", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/2`;
            const response: AxiosResponse<ISeasonInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "ar;q=0.8,en;q=0.9" } });

            Validators.validateObject(response.data);
            Validators.validateSeason(response.data, resourceId);
            assert.equal(response.data.name, "Nairouz");
            assert.equal(response.data.verse, "Bless the crown of the year with Your goodness O Lord");
        });

        it("should get arabic for ar header", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/2`;
            const response: AxiosResponse<ISeasonInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "ar" } });

            Validators.validateObject(response.data);
            Validators.validateSeason(response.data, resourceId);
            assert.equal(response.data.name, "نيروز");
            assert.equal(response.data.verse, "بارك إكليل السنة بصلاحك يا رب");
        });

        it("should get arabic for ar-AR header", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/2`;
            const response: AxiosResponse<ISeasonInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "ar-AR" } });

            Validators.validateObject(response.data);
            Validators.validateSeason(response.data, resourceId);
            assert.equal(response.data.name, "نيروز");
            assert.equal(response.data.verse, "بارك إكليل السنة بصلاحك يا رب");
        });

        it("should get arabic for qualified header", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/2`;
            const response: AxiosResponse<ISeasonInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "ar;q=0.9,en;q=0.8" } });

            Validators.validateObject(response.data);
            Validators.validateSeason(response.data, resourceId);
            assert.equal(response.data.name, "نيروز");
            assert.equal(response.data.verse, "بارك إكليل السنة بصلاحك يا رب");
        });

        it("should get arabic for unordered qualified header", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/2`;
            const response: AxiosResponse<ISeasonInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "en;q=0.8,ar;q=0.9" } });

            Validators.validateObject(response.data);
            Validators.validateSeason(response.data, resourceId);
            assert.equal(response.data.name, "نيروز");
            assert.equal(response.data.verse, "بارك إكليل السنة بصلاحك يا رب");
        });
    });
});
