import * as express from "express";
import { IConfiguration } from "../Configuration";
import { ServiceLanguage } from "../Types/ServiceLanguage";

export class LanguageHelpers {
    /**
     * Sets the response language based on the requests's accepted languages and the app's supported languages.
     * @param req express request
     * @param configuration
     */
    public static getResponseLanguage(req: express.Request, configuration: IConfiguration): ServiceLanguage {
        const responseLang = req.acceptsLanguages(configuration.acceptedLanguages);
        return LanguageHelpers._mapRequestLocaleToLang(responseLang);
    }

    private static _mapRequestLocaleToLang(locale: string | boolean): ServiceLanguage {
        switch (locale) {
            case "ar":
                return ServiceLanguage.Arabic;
            case "en":
            default:
                return ServiceLanguage.English;
        }
    }
}
