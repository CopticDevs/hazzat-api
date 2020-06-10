import * as winston from "winston";

export const logger = winston.createLogger({
    level: "debug",
    transports: [new winston.transports.Console()]
});

/**
 * Logger class
 */
export class Log {
    /**
     * Logs a verbose message
     * @param area The class name originating the message
     * @param source The method originating the message
     * @param message The message to be logged
     */
    public static verbose(area: string, source: string, message: string): void {
        Log._log(logger.verbose, area, source, message);
    }

    /**
     * Logs a debug message
     * @param area The class name originating the message
     * @param source The method originating the message
     * @param message The message to be logged
     */
    public static debug(area: string, source: string, message: string): void {
        Log._log(logger.debug, area, source, message);
    }

    /**
     * Logs a warning message
     * @param area The class name originating the message
     * @param source The method originating the message
     * @param message The message to be logged
     */
    public static warning(area: string, source: string, message: string): void {
        Log._log(logger.warn, area, source, message);
    }

    /**
     * Logs an error message
     * @param area The class name originating the message
     * @param source The method originating the message
     * @param message The message to be logged
     */
    public static error(area: string, source: string, message: string): void {
        Log._log(logger.error, area, source, message);
    }

    public static exception(area: string, source: string, exception: any): void {
        const timestamp = new Date().toISOString();
        logger.debug("Exception", { area, source, timestamp, exception });
    }

    private static _log(loggerMethod: winston.LeveledLogMethod, area: string, source: string, message: string): void {
        const timestamp = new Date().toISOString();
        loggerMethod(message, { area, source, timestamp });
    }
}
