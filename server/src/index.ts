require("dotenv").config();

// article that explains how to configure the VS Code
//eslint plugin to lint .ts files:
// https://medium.com/devityoself/monorepo-eslint-vscode-6f5982c8404d

import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { connectDatabase } from "./database";
import { typeDefs, resolvers } from "./graphql";
const app = express();

const mount = async (app: Application) => {
  const db = await connectDatabase();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db })
  });
  server.applyMiddleware({ app, path: "/api" });

  app.listen(process.env.PORT);

  console.log(`App is running at port ${process.env.PORT}`);

  const listings = await db.listings.find({}).toArray();
  console.log(listings);
};

mount(express());
