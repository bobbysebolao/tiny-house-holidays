if (process.env.NODE_ENV === "local") {
  require("dotenv").config();
}

// article that explains how to configure the VS Code
//eslint plugin to lint .ts files:
// https://medium.com/devityoself/monorepo-eslint-vscode-6f5982c8404d

import express, { Application } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import { ApolloServer } from "apollo-server-express";
import { connectDatabase } from "./database";
import { typeDefs, resolvers } from "./graphql";

const mount = async (app: Application) => {
  const db = await connectDatabase();

  app.use(bodyParser.json({ limit: "2mb" }));
  app.use(cookieParser(process.env.SECRET));
  app.use(compression());

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(`${__dirname}/client`));
    app.get("/*", (_req, res) => res.sendFile(`${__dirname}/client/index.html`));
  }

  if (process.env.NODE_ENV === "local") {
    app.use(express.static(`${__dirname}/../client`));
    app.get("/*", (_req, res) => res.sendFile(`${__dirname}/../client/index.html`));
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ db, req, res })
  });
  server.applyMiddleware({ app, path: "/api" });

  app.listen(process.env.PORT);

  console.log(`App is running at port ${process.env.PORT}`);
};

mount(express());
