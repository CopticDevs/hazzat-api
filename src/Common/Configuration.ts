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

    public static port: number;
    public static dbConnectionString: string;

    public static initialize(): void {
        // Load command line arguments, environment variables and config.json into nconf
        nconf.argv()
            .env()
            .file(__dirname + "/../config.json");

        nconf.required(Configuration._requiredConfigKeys);

        this.port = parseInt(process.env.PORT) || 3000;

        const dbName: string = nconf.get(Configuration._configKeys.databaseName);
        const dbUser: string = nconf.get(Configuration._configKeys.databaseUsername);
        const dbServer: string = nconf.get(Configuration._configKeys.databaseServer);
        const dbPass:string = encodeURIComponent(nconf.get(Configuration._configKeys.databasePassword));
        this.dbConnectionString = `mssql://${dbUser}:${dbPass}@${dbServer}/${dbName}?encrypt=true`;
    }
}
