import express from 'express'
import http from 'http'
import cors from 'cors'
import { altairRoute } from './routes/altairRoute'
import './utils/prismaInstance' // initialize prisma instance
import graphqlServer from './graphql'
import dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

export const corsOptions = { origin: "*", exposedHeaders: ["Authorization"] }
export const PORT = parseInt(process.env.PORT || "4001")

const main = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  app.use(cors(corsOptions))
  app.use(express.urlencoded({ extended: true }))

  graphqlServer({ app, httpServer });

  app.use("/altair", altairRoute)

  httpServer.listen(PORT, () => {
    console.log(`⚡️ Server is listening on port ${PORT}`)
    console.log(`GraphQL path: "/graphql"`)
  })

  httpServer.on("error", (error) => {
    console.error('Error occurred while starting the server:', error)
  })
}

main().catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})