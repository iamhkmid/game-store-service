import { defaultFieldResolver, GraphQLSchema } from "graphql"
import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils"

const typeDirectiveArgumentMaps: Record<string, any> = {}

const AuthDirectiveTransformer = (schema: GraphQLSchema, directiveName: string) =>
  mapSchema(schema, {
    [MapperKind.TYPE]: type => {
      const authDirective = getDirective(schema, type, directiveName)?.[0]
      if (authDirective) {
        typeDirectiveArgumentMaps[type.name] = authDirective
      }
      return undefined
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
      const authDirective =
        getDirective(schema, fieldConfig, directiveName)?.[0] ??
        typeDirectiveArgumentMaps[typeName]
      if (authDirective) {
        const { requires } = authDirective
        if (requires) {
          const { resolve = defaultFieldResolver } = fieldConfig
          fieldConfig.resolve = function (source, args, context, info) {
            // const user = getUserFn(context.headers.authToken)
            const user = true
            if (!user) {
              throw new Error('not authorized')
            }
            return resolve(source, args, context, info)
          }
          return fieldConfig
        }
      }
    }
  })

export default AuthDirectiveTransformer
