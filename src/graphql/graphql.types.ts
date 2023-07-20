import { ContextFunction } from "@apollo/server";
import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { Application, Request, Response } from "express"
import http from 'http'

export type TGraphqlCtx = {
  req: Request;
  res: Response;
  db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
};

export type TGraphqlCtxFunction =  ContextFunction<[ExpressContextFunctionArgument], TGraphqlCtx>

export type TGraphqlServer = (p: {
  app: Application
  httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
}) => void