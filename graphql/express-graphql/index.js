// Referenced from: https://graphql.org/graphql-js/

import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";
import { ruruHTML } from "ruru/server";

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    world: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello() {
    return "Hello world!";
  },
  world() {
    return "World of hello";
  },
  extra() {
    return "Something";
  },
};

const app = express();

// Create and use the GraphQL handler.
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

// Serve the GraphiQL IDE.
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(4000, () => {
  console.log("Express app listening at 4000");
});
