import * as nconf from "nconf";

/*
 * Test Configuration
 */
export class TestConfiguration {
    private static readonly configKeys = {
        baseTestUrl: "baseTestUrl",
        testLocation: "testLocation"
    };

    private static readonly requiredConfigKeys: string[] = [
        TestConfiguration.configKeys.baseTestUrl,
        TestConfiguration.configKeys.testLocation
    ];

    public baseTestUrl: string;
    public testLocation: string;

    constructor() {
        this.initialize();
    }

    private initialize(): void {
        let configPath: string;

        // load command line args
        nconf.argv();
        nconf.required([TestConfiguration.configKeys.testLocation]);

        this.testLocation = nconf.get(TestConfiguration.configKeys.testLocation);

        switch (this.testLocation) {
            case "LOCAL":
                configPath = "/local.json";
                break;
            case "DEV":
                configPath = "/dev.json";
                break;
            case "PPE":
                configPath = "/ppe.json";
                break;
            case "PROD":
                configPath = "/prod.json";
                break;
        }

        nconf.file(__dirname + configPath)
        nconf.required(TestConfiguration.requiredConfigKeys);

        this.baseTestUrl = nconf.get(TestConfiguration.configKeys.baseTestUrl);
    }
}
