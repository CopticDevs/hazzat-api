enum Verbosity {
    Verbose = "INFO ",
    Debug   = "DEBUG",
    Warning = "WARN ",
    Error   = "ERROR"
}

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
        console.info(Log._constructMessage(area, source, Verbosity.Verbose, message));
    }

    /**
     * Logs a debug message
     * @param area The class name originating the message
     * @param source The method originating the message
     * @param message The message to be logged
     */
    public static debug(area: string, source: string, message: string): void {
        console.debug(Log._constructMessage(area, source, Verbosity.Debug, message));
    }

    /**
     * Logs a warning message
     * @param area The class name originating the message
     * @param source The method originating the message
     * @param message The message to be logged
     */
    public static warning(area: string, source: string, message: string): void {
        console.warn(Log._constructMessage(area, source, Verbosity.Warning, message));
    }

    /**
     * Logs an error message
     * @param area The class name originating the message
     * @param source The method originating the message
     * @param message The message to be logged
     */
    public static error(area: string, source: string, message: string): void {
        console.error(Log._constructMessage(area, source, Verbosity.Error, message));
    }

    private static _constructMessage(area: string, source: string, level: Verbosity, message: string): string {
        const timestamp = new Date().toISOString();
        return `${timestamp} - ${level} - [${area}::${source}] ${message}`;
    }
}
