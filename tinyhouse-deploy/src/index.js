"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV === "local") {
    require("dotenv").config();
}
// article that explains how to configure the VS Code
//eslint plugin to lint .ts files:
// https://medium.com/devityoself/monorepo-eslint-vscode-6f5982c8404d
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const apollo_server_express_1 = require("apollo-server-express");
const database_1 = require("./database");
const graphql_1 = require("./graphql");
const mount = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database_1.connectDatabase();
    app.use(body_parser_1.default.json({ limit: "2mb" }));
    app.use(cookie_parser_1.default(process.env.SECRET));
    app.use(compression_1.default());
    if (process.env.NODE_ENV === "production") {
        app.use(express_1.default.static(`${__dirname}/client`));
        app.get("/*", (_req, res) => res.sendFile(`${__dirname}/client/index.html`));
    }
    if (process.env.NODE_ENV === "local") {
        app.use(express_1.default.static(`${__dirname}/../client`));
        app.get("/*", (_req, res) => res.sendFile(`${__dirname}/../../client/build/index.html`));
    }
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: graphql_1.typeDefs,
        resolvers: graphql_1.resolvers,
        context: ({ req, res }) => ({ db, req, res })
    });
    server.applyMiddleware({ app, path: "/api" });
    app.listen(process.env.PORT);
    console.log(`App is running at port ${process.env.PORT}`);
});
mount(express_1.default());
