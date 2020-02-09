// article that explains how to configure the VS Code
//eslint plugin to lint .ts files:
// https://medium.com/devityoself/monorepo-eslint-vscode-6f5982c8404d

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./graphql";
// import bodyParser from "body-parser";
// import { listings } from "./listings";
const app = express();
const port = 9000;

const server = new ApolloServer({ schema });
server.applyMiddleware({ app, path: "/api" });

// app.use(bodyParser.json());

// //listings
// app.get("/listings", (_req, res) => {
//   return res.send(listings);
// });

// //delete listing
// app.post("/delete-listing", (req, res) => {
//   const id: string = req.body.id;

//   for (let i = 0; i < listings.length; i++) {
//     if (listings[i].id === id) {
//       return res.send(listings.splice(i, 1));
//     }
//     return res.send("Failed to delete listing");
//   }
// });

app.listen(port);

console.log(`App is running at port ${port}`);
