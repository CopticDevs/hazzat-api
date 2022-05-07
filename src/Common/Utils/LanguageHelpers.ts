import * as express from "express";
import { IConfiguration } from "../Configuration";
import { Language } from "../Types/Language";

export class LanguageHelpers {
    /**
     * Sets the response language based on the requests's accepted languages and the app's supported languages.
     * @param req express request
     * @param configuration
     */
    public static getResponseLanguage(req: express.Request, configuration: IConfiguration): Language {
        const responseLang = req.acceptsLanguages(configuration.acceptedLanguages);
        return LanguageHelpers._mapRequestLocaleToLang(responseLang);
    }

    private static _mapRequestLocaleToLang(locale: string | boolean): Language {
        switch (locale) {
            case "ar":
                return Language.Arabic;
            case "en":
            default:
                return Language.English;
        }
    }
}
