import type { Exchange } from '@urql/core'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { Client, fetchExchange } from '@urql/core'
import { persistedExchange } from '@urql/exchange-persisted'

export type GqlRequestFn = <TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables: TVariables,
) => Promise<TResult>

function buildExchanges(config: ReturnType<typeof useRuntimeConfig>): Exchange[] {
  const exchanges: Exchange[] = []

  if (config.public.GQL_APQ_ENABLED) {
    exchanges.push(persistedExchange({
      preferGetForPersistedQueries: 'within-url-limit',
    }))
  }

  exchanges.push(fetchExchange)

  return exchanges
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const gqlHost = config.public.GQL_HOST

  const { livePreview, livePreviewToken } = useCurrentRouteInfo()

  if (!gqlHost) {
    throw createError({
      statusCode: 500,
      statusText: 'GraphQL host not configured',
      fatal: true,
    })
  }

  const gqlHostUrl = computed((): string => {
    if (isDefined(livePreview) && livePreview.value) {
      return `${gqlHost}?token=${livePreviewToken.value}`
    }

    return gqlHost
  })

  const client = new Client({
    url: gqlHost,
    exchanges: buildExchanges(config),
  })

  const gql = async <TResult, TVariables>(
    document: TypedDocumentNode<TResult, TVariables>,
    variables: TVariables,
  ): Promise<TResult> => {
    const result = await client
      .query(document, variables as Record<string, unknown>, {
        url: gqlHostUrl.value,
      })
      .toPromise()

    if (result.error) {
      throw result.error
    }

    return result.data as TResult
  }

  return {
    provide: {
      gql,
    },
  }
})
