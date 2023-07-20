import { QueryResolvers } from "../../../types/graphql"

export const Query: QueryResolvers = {
  user: async () => {
    return {}
  },
  users: async (_, __, { db }) => {
    const find = await db.user.findMany()
    console.log(find)
    return []
  }
}