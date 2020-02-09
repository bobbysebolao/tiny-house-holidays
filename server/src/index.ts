// article that explains how to configure the VS Code
//eslint plugin to lint .ts files:
// https://medium.com/devityoself/monorepo-eslint-vscode-6f5982c8404d

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql";
const app = express();
const port = 9000;

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: "/api" });

app.listen(port);

console.log(`App is running at port ${port}`);

// typeDefs
// resolvers
