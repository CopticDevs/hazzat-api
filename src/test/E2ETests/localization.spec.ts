import { AxiosResponse, default as axios } from "axios";
import { assert } from "chai";
import { OperationExecutor } from "../../Common/Utils/OperationExecutor";
import { IFormatInfo } from "../../Models/IFormatInfo";
import { IHymnInfo, IHymnInfoWithServiceDetails } from "../../Models/IHymnInfo";
import { ISeasonInfo } from "../../Models/ISeasonInfo";
import { IServiceInfo } from "../../Models/IServiceInfo";
import { ITuneInfo } from "../../Models/ITuneInfo";
import { ITypeInfo } from "../../Models/ITypeInfo";
import { ITextContent, IVariationInfo } from "../../Models/IVariationInfo";
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

    describe("Header parsing tests", () => {
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
                { headers: { "Accept-Language": "fr" } });

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

    describe("Season localization tests", () => {
        it("should get a season in English", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/2`;
            const response: AxiosResponse<ISeasonInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "en" } });

            Validators.validateObject(response.data);
            Validators.validateSeason(response.data, resourceId);
            assert.equal(response.data.name, "Nairouz");
            assert.equal(response.data.verse, "Bless the crown of the year with Your goodness O Lord");
        });

        it("should get a season in Arabic", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/2`;
            const response: AxiosResponse<ISeasonInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "ar" } });

            Validators.validateObject(response.data);
            Validators.validateSeason(response.data, resourceId);
            assert.equal(response.data.name, "نيروز");
            assert.equal(response.data.verse, "بارك إكليل السنة بصلاحك يا رب");
        });
    });

    describe("Service localization tests", () => {
        it("should get a service in English", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15`;
            const response: AxiosResponse<IServiceInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "en" } });

            Validators.validateObject(response.data);
            Validators.validateService(response.data, resourceId);
            assert.equal(response.data.name, "Vespers Psalmody");
        });

        it("should get a service in Arabic", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15`;
            const response: AxiosResponse<IServiceInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "ar" } });

            Validators.validateObject(response.data);
            Validators.validateService(response.data, resourceId);
            assert.equal(response.data.name, "تسبحة عشية");
        });
    });

    describe("Service Hymn localization tests", () => {
        it("should get a service hymn in English", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15/${ResourceTypes.Hymns}/311`;
            const response: AxiosResponse<IHymnInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "en" } });

            Validators.validateObject(response.data);
            Validators.validateServiceHymn(response.data, resourceId);
            assert.equal(response.data.name, "Psalm 116 (Ni Ethnos Teero)");
        });

        it("should get a service hymn in Arabic", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15/${ResourceTypes.Hymns}/311`;
            const response: AxiosResponse<IHymnInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "ar" } });

            Validators.validateObject(response.data);
            Validators.validateServiceHymn(response.data, resourceId);
            assert.equal(response.data.name, "المزمور المائة والسادس عشر (ني إثنوس تيرو)");
        });
    });

    describe("Format localization tests", () => {
        it("should get a Format in English", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15/${ResourceTypes.Hymns}/311/${ResourceTypes.Formats}/1`;
            const response: AxiosResponse<IFormatInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "en" } });

            Validators.validateObject(response.data);
            Validators.validateServiceHymnFormat(response.data, resourceId);
            assert.equal(response.data.name, "Text");
        });

        it("should get a Format in Arabic", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15/${ResourceTypes.Hymns}/311/${ResourceTypes.Formats}/1`;
            const response: AxiosResponse<IFormatInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "ar" } });

            Validators.validateObject(response.data);
            Validators.validateServiceHymnFormat(response.data, resourceId);
            assert.equal(response.data.name, "نَص");
        });
    });

    describe("Variation localization tests", () => {
        it("should get a Variation in English", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15/${ResourceTypes.Hymns}/311/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}/288`;
            const response: AxiosResponse<IVariationInfo<ITextContent>> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "en" } });

            Validators.validateObject(response.data);
            Validators.validateTextContent(response.data.content);
            assert.equal(response.data.name, "Psalm 116 (Ni Ethnos Teero)");
        });

        it("should get a Variation in Arabic", async () => {
            const resourceId = `/${ResourceTypes.Seasons}/1/${ResourceTypes.Services}/15/${ResourceTypes.Hymns}/311/${ResourceTypes.Formats}/1/${ResourceTypes.Variations}/288`;
            const response: AxiosResponse<IVariationInfo<ITextContent>> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "ar" } });

            Validators.validateObject(response.data);
            Validators.validateTextContent(response.data.content);
            assert.equal(response.data.name, "المزمور المائة والسادس عشر (ني إثنوس تيرو)");
        });
    });

    describe("Types localization tests", () => {
        it("should get a Type in English", async () => {
            const resourceId = `/${ResourceTypes.Types}/17`;
            const response: AxiosResponse<ITypeInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "en" } });

            Validators.validateObject(response.data);
            Validators.validateHymnType(response.data, resourceId);
            assert.equal(response.data.name, "Psalmody Hymns");
            assert.equal(response.data.nameSingular, "Psalmody");
        });

        it("should get a Type in Arabic", async () => {
            const resourceId = `/${ResourceTypes.Types}/17`;
            const response: AxiosResponse<ITypeInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "ar" } });

            Validators.validateObject(response.data);
            Validators.validateHymnType(response.data, resourceId);
            assert.equal(response.data.name, "تسابيح");
            assert.equal(response.data.nameSingular, "تسبحة");
        });
    });

    describe("Type Season localization tests", () => {
        it("should get a Type Season in English", async () => {
            const resourceId = `/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1`;
            const response: AxiosResponse<ISeasonInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "en" } });

            Validators.validateObject(response.data);
            Validators.validateTypeSeason(response.data, resourceId);
            assert.equal(response.data.name, "Annual");
            assert.isTrue(response.data.verse.startsWith("\"How lovely is Your tabernacle, O Lord of hosts!"));
        });

        it("should get a Type Season in Arabic", async () => {
            const resourceId = `/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1`;
            const response: AxiosResponse<ISeasonInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "ar" } });

            Validators.validateObject(response.data);
            Validators.validateTypeSeason(response.data, resourceId);
            assert.equal(response.data.name, "سنوي");
            assert.isTrue(response.data.verse.startsWith("\"ما أحلى مساكنك يا رب الجنود"));
        });
    });

    describe("Type Season Hymn localization tests", () => {
        it("should get a Type Season hymn in English", async () => {
            const resourceId = `/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/311`;
            const response: AxiosResponse<IHymnInfoWithServiceDetails> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "en" } });

            Validators.validateObject(response.data);
            Validators.validateTypeServiceHymnWithServiceDetails(response.data, resourceId);
            assert.equal(response.data.name, "Psalm 116 (Ni Ethnos Teero)");
            assert.equal(response.data.serviceName, "Vespers Psalmody");
        });

        it("should get a Type Season hymn in Arabic", async () => {
            const resourceId = `/${ResourceTypes.Types}/17/${ResourceTypes.Seasons}/1/${ResourceTypes.Hymns}/311`;
            const response: AxiosResponse<IHymnInfoWithServiceDetails> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "ar" } });

            Validators.validateObject(response.data);
            Validators.validateTypeServiceHymnWithServiceDetails(response.data, resourceId);
            assert.equal(response.data.name, "المزمور المائة والسادس عشر (ني إثنوس تيرو)");
            assert.equal(response.data.serviceName, "تسبحة عشية");
        });
    });

    describe("Tunes localization tests", () => {
        it("should get a Tune in English", async () => {
            const resourceId = `/${ResourceTypes.Tunes}/1`;
            const response: AxiosResponse<ITuneInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "en" } });

            Validators.validateObject(response.data);
            Validators.validateHymnTune(response.data, resourceId);
            assert.equal(response.data.name, "Annual");
        });

        it("should get a Tune in Arabic", async () => {
            const resourceId = `/${ResourceTypes.Tunes}/1`;
            const response: AxiosResponse<ITuneInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "ar" } });

            Validators.validateObject(response.data);
            Validators.validateHymnTune(response.data, resourceId);
            assert.equal(response.data.name, "سنوي");
        });
    });

    describe("Tune Season localization tests", () => {
        it("should get a Tune Season in English", async () => {
            const resourceId = `/${ResourceTypes.Tunes}/1/${ResourceTypes.Seasons}/33`;
            const response: AxiosResponse<ISeasonInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "en" } });

            Validators.validateObject(response.data);
            Validators.validateTuneSeason(response.data, resourceId);
            assert.equal(response.data.name, "Papal Hymns");
            assert.isTrue(response.data.verse.startsWith("\"Your people shall be volunteers in the day of Your power"));
        });

        it("should get a Tune Season in Arabic", async () => {
            const resourceId = `/${ResourceTypes.Tunes}/1/${ResourceTypes.Seasons}/33`;
            const response: AxiosResponse<ISeasonInfo> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "ar" } });

            Validators.validateObject(response.data);
            Validators.validateTuneSeason(response.data, resourceId);
            assert.equal(response.data.name, "الحآن البطاركة");
            assert.isTrue(response.data.verse.startsWith("شعبك مُنتدب في يوم قوتك في زينة مقدسة من رحم الفجر."));
        });
    });

    describe("Tune Season Hymn localization tests", () => {
        it("should get a Tune Season hymn in English", async () => {
            const resourceId = `/${ResourceTypes.Tunes}/1/${ResourceTypes.Seasons}/33/${ResourceTypes.Hymns}/456`;
            const response: AxiosResponse<IHymnInfoWithServiceDetails> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "en" } });

            Validators.validateObject(response.data);
            Validators.validateTuneServiceHymnWithServiceDetails(response.data, resourceId);
            assert.equal(response.data.name, "O King of Peace (Epouro)");
            assert.equal(response.data.serviceName, "Procession");
        });

        it("should get a Tune Season hymn in Arabic", async () => {
            const resourceId = `/${ResourceTypes.Tunes}/1/${ResourceTypes.Seasons}/33/${ResourceTypes.Hymns}/456`;
            const response: AxiosResponse<IHymnInfoWithServiceDetails> = await axios.get(
                `${tc.baseTestUrl}${resourceId}`,
                { headers: { "Accept-Language": "ar" } });

            Validators.validateObject(response.data);
            Validators.validateTuneServiceHymnWithServiceDetails(response.data, resourceId);
            assert.equal(response.data.name, "يا ملك السلام (أبؤورو)");
            assert.equal(response.data.serviceName, "زفّة");
        });
    });
});
