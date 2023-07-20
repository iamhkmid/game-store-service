import { NextFunction, Request, Response } from "express";
import { altairExpress } from "altair-express-middleware";
import { PORT } from "..";

export const altairEnv = (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === "development") {
    next()
  } else {
    res.end("Development only");
  }
}

export const altairMiddleware = altairExpress({
  endpointURL: "/graphql",
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`,
  initialQuery: ``,
})
