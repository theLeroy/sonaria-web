import type { BlueprintsFragment } from '~/gql/generated/graphql'

export type BlueprintTypenames = Extract<BlueprintsFragment['__typename'], `Entry_${string}`>
