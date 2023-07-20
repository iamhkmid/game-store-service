// import { QueryResolvers } from "../../../types/graphql"

// export const Query: QueryResolvers = {
//   user: async () => {
//     return {}
//   },
//   users: async (_, __, { db }) => {
//     const find = await db.user.findMany()
//     return find.map((val) => ({ id: val.id, name: val.name, username: val.username, updatedAt: val.updatedAt, createdAt: val.createdAt, role: val.role  }))
//   }
// }