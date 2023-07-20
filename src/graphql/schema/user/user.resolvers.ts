import { QueryResolvers } from "../../../types/graphql.types"

export const Query: QueryResolvers = {
  user: async () => {
    return {}
  },
  users: async (_, __, { db }) => {
    return await db.user.findMany()
  }
}