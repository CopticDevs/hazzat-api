import { injectable } from "inversify";
import * as nconf from "nconf";

export interface IConfiguration {
    port: string;
    dbConnectionString: string;
}

/*
 * App Configuration
 */
@injectable()
export class Configuration implements IConfiguration {
    private static readonly configKeys = {
        databaseName: "databaseName",
        databasePassword: "databasePassword",
        databaseServer: "databaseServer",
        databaseUsername: "databaseUsername"
    };

    private static readonly requiredConfigKeys: string[] = [
        Configuration.configKeys.databaseName,
        Configuration.configKeys.databasePassword,
        Configuration.configKeys.databaseServer,
        Configuration.configKeys.databaseUsername
    ];

    public port: string;
    public dbConnectionString: string;

    constructor() {
        this.initialize();
    }

    private initialize(): void {
        // Load command line arguments, environment variables and config.json into nconf
        nconf.argv()
            .env()
            .file(__dirname + "/../config.json");

        nconf.required(Configuration.requiredConfigKeys);

        this.port = process.env.PORT || "3000";

        const dbName: string = nconf.get(Configuration.configKeys.databaseName);
        const dbUser: string = nconf.get(Configuration.configKeys.databaseUsername);
        const dbServer: string = nconf.get(Configuration.configKeys.databaseServer);
        const dbPass: string = encodeURIComponent(nconf.get(Configuration.configKeys.databasePassword));
        this.dbConnectionString =
            process.env.CUSTOMCONNSTR_DBCONNECTIONSTRING ||
            `mssql://${dbUser}:${dbPass}@${dbServer}/${dbName}?encrypt=true`;
    }
}
