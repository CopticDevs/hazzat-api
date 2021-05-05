import axios from "axios";
import * as nconf from "nconf";
import { AsyncDelayer } from "../../Common/Utils/AsyncDelayer";

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

    public async ensureServiceIsAwake(): Promise<void> {
        if (!this.baseTestUrl) {
            throw new Error("Base Test URL is not set.  Need to call Initialize() on the test configuration first.");
        }

        let isAwake = false;
        let attemptNumber = 0;
        const maxAttempts = 5;
        const delayer = new AsyncDelayer();
        while (!isAwake) {
            try {
                console.log(`Making a get call to ${this.baseTestUrl}`);
                await axios.get(`${this.baseTestUrl}`);
                isAwake = true;
            }
            catch (ex) {
                console.log(`Attempting to wake up service #${attemptNumber}/${maxAttempts}`);
                if (attemptNumber >= maxAttempts) {
                    throw ex;
                }
                await delayer.delay(5000);
                attemptNumber++;
            }
        }
    }
}
