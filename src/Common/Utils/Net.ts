import * as express from "express";

export module Net {
    export function sendResponse(response: express.Response, result: any): void {
        if (!result) {
            response.status(404).send("The resource cannot be found")
        } else {
            response.send(result);
        }
    }
}
