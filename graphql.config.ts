import type { IGraphQLConfig } from 'graphql-config'
import type { CodegenConfig } from '@graphql-codegen/cli'
import 'dotenv/config'

const graphqlHost = process.env.GQL_HOST

if (!graphqlHost) {
  throw new Error('GQL_HOST is not set in .env')
}

const codegenConfig: CodegenConfig = {
  emitLegacyCommonJSImports: false,
  generates: {
    './app/gql/generated/': {
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
        persistedDocuments: true,
      },
      config: {
        useTypeImports: true,
        skipTypename: false,
        nonOptionalTypename: true,
        avoidOptionals: true,
      },
    },
    'schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },
}

const config: IGraphQLConfig = {
  schema: graphqlHost,
  documents: [
    'app/gql/**/*.{graphql,gql,ts,js}',
    'app/composables/**/*.{graphql,gql,ts,js,vue}',
    'app/components/**/*.{graphql,gql,ts,js,vue}',
    'app/pages/**/*.{graphql,gql,ts,js,vue}',
  ],
  extensions: {
    codegen: codegenConfig,
  },
}

export default config
