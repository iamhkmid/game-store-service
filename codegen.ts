
import type { CodegenConfig } from '@graphql-codegen/cli';
import { PORT } from './src';

const config: CodegenConfig = {
  overwrite: true,
  schema: `http://localhost:${PORT}/graphql`,
  config: {
    enumsAsConst: true
  },
  generates: {
    "src/types/graphql.types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../graphql/graphql.types#TGraphqlCtx"
      }
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
