import * as express from "express";

export module Net {
    export function setResponseHeaders(res: express.Response): void {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    }
}
