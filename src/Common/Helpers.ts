import * as express from "express";

export module Networking {
    export function setResponseHeaders(res: express.Response): void {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    }
}
