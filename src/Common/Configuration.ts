import { config } from "mssql";
import * as nconf from "nconf";

/*
 * App Configuration
 */
export class Configuration {
    private static readonly _configKeys = {
        databaseServer: "databaseServer",
        databaseName: "databaseName",
        databaseUsername: "databaseUsername",
        databasePassword: "databasePassword"
    };

    private static readonly _requiredConfigKeys: string[] = [
        Configuration._configKeys.databaseServer,
        Configuration._configKeys.databaseName,
        Configuration._configKeys.databaseUsername,
        Configuration._configKeys.databasePassword
    ];

    public static sqlConfig: config;
    public static port: string | number;

    public static initialize(): void {
        // Load command line arguments, environment variables and config.json into nconf
        nconf.argv()
            .env()
            .file(__dirname + "/../config.json");

        nconf.required(Configuration._requiredConfigKeys);

        this.sqlConfig = {
            database: nconf.get(Configuration._configKeys.databaseName),
            options: {
                encrypt: true
            },
            password: nconf.get(Configuration._configKeys.databasePassword),
            server: nconf.get(Configuration._configKeys.databaseServer),
            user: nconf.get(Configuration._configKeys.databaseUsername)
        };
        this.port = process.env.PORT || 3000;
    }
}
