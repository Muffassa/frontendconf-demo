import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import path from "path";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import models from "./models";
import cors from "cors";

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./schema")));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./resolvers"))
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const PORT = 3000;

const app = express();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.use(cors("*"));
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(() => ({
    schema,
    context: { models }
  }))
);
app.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
app.listen(PORT);
