import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import { json } from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import schema from "./schema";
import prisma from "../utils/prismaInstance";
import { TGraphqlCtx, TGraphqlCtxFunction, TGraphqlServer } from "./graphql.types";

const graphqlServer: TGraphqlServer = async ({ app, httpServer }) => {
  const server = new ApolloServer<TGraphqlCtx>({
    schema,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  const context: TGraphqlCtxFunction = async ({ req, res }) => ({ req, res, db: prisma });

  app.use('/graphql',
    cors<cors.CorsRequest>({ origin: "*", exposedHeaders: ['Authorization'], allowedHeaders: ['Authorization'] }),
    json(),
    expressMiddleware(server, { context }),
  );
}

export default graphqlServer