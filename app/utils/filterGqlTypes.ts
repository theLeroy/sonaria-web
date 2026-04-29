/* eslint-disable @typescript-eslint/unified-signatures */

/**
 * The filterGqlTypes helper function is used to filter the result of a GraphQL query by a specific typename.
 * If you fetch entries from a collection, your return type will be EntryInterface, which is a union of all possible entry types (e.g. Entry_News_Article, Entry_Pages_Page, ...).
 * If you know you fetched from the pages collection and your result can only ever be of type Entry_Pages_Page, you can use filterGqlTypes:
 *
 * @example
 * ```ts
 * const page = someQueryFunction();
 * // typeof pages: { __typename: 'Entry_Pages_Page', ... } | { __typename: 'Entry_News_Article' } | undefined
 *
 * const filteredPage = computed(() => filterGqlTypes(page, 'Entry_Pages_Page'));
 * // typeof filteredPage: { __typename: 'Entry_Pages_Page', ... } | undefined
 * ```
 *
 */

/**
 * Filter the single result of a GraphQL query by a specific typename.
 *
 * @param entry Entry to filter
 * @param type Typename to filter by
 */
export function filterGqlTypes<
  TEntry extends { __typename: string },
  TTypename extends string,
>(
  entry: TEntry | null | undefined,
  type: TTypename,
): Extract<TEntry, { __typename: TTypename }> | null
/**
 * Filter the single result of a GraphQL query by a list of typenames.
 *
 * @param entry Entry to filter
 * @param types Typenames to filter by
 */
export function filterGqlTypes<
  TEntry extends { __typename: string },
  TTypename extends string,
>(
  entry: TEntry | null | undefined,
  types: TTypename[],
): Extract<TEntry, { __typename: TTypename }> | null
/**
 * Filter the array result of a GraphQL query by a specific typename.
 *
 * @param collection Collection of entries to filter
 * @param type Typename to filter by
 */
export function filterGqlTypes<
  TEntry extends { __typename: string },
  TTypename extends string,
>(
  collection: Array<TEntry | null | undefined> | null | undefined,
  type: TTypename,
): Array<Extract<TEntry, { __typename: TTypename }>>
/**
 * Filter the array result of a GraphQL query by a list of typenames.
 *
 * @param collection Collection of entries to filter
 * @param types Typenames to filter by
 */
export function filterGqlTypes<
  TEntry extends { __typename: string },
  TTypename extends string,
>(
  collection: Array<TEntry | null | undefined> | null | undefined,
  types: TTypename[],
): Array<Extract<TEntry, { __typename: TTypename }>>
export function filterGqlTypes<
  TEntry extends { __typename: string },
  TTypename extends string,
>(
  entryOrCollection: Array<TEntry | null | undefined> | TEntry | null | undefined,
  typeOrTypes: TTypename | TTypename[],
): Array<Extract<TEntry, { __typename: TTypename }>> | Extract<TEntry, { __typename: TTypename }> | null {
  // Normalize typeOrTypes to always be an array for consistent matching
  const typesToMatch = Array.isArray(typeOrTypes) ? typeOrTypes : [typeOrTypes]

  // Helper function to check if an entry matches the filter
  const entryMatchesType = (entry: TEntry | null | undefined): boolean => {
    if (!entry?.__typename) return false
    return typesToMatch.includes(entry.__typename as TTypename)
  }

  // Handle array case
  if (Array.isArray(entryOrCollection)) {
    return entryOrCollection.filter(entryMatchesType) as Array<Extract<TEntry, { __typename: TTypename }>>
  }

  // Handle single entry case (including undefined)
  return entryMatchesType(entryOrCollection)
    ? (entryOrCollection as Extract<TEntry, { __typename: TTypename }>)
    : null
}
