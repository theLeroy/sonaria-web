# Project Template: Nuxt

Boilerplate for web projects, to be used in conjunction with the [statamic-skeleton](https://github.com/teamnovu/statamic-skeleton).

## Getting Started

Set up a local `.env` file and **replace all occurrences of `REPLACE_ME` in your `.env` file with your own values.**

```bash
cp .env.example .env
```

Install dependencies:

```bash
pnpm install
```

Update dependencies. The skeleton will be updated from time to time, but you may want to start with the latest package versions.

```bash
pnpm update
```

## Development Server

Start the development server at `http://localhost:3000`.

```bash
pnpm dev
```

(Optional) Host on a `.novu.io` domain

```bash
# Laravel Herd
herd proxy workshop-web.novu.io http://localhost:3000

# Laravel Valet
valet proxy workshop-web.novu.io http://localhost:3000
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview the production build:

```bash
pnpm preview
```

## Working with the Skeleton

When you are implementing a new component, follow these steps:
 1. Create a component in the `~/components/cms/components` folder (e.g., `CmsAccordion.vue`).
 2. In it, write your fragment using the `graphql(..)` helper from `~/gql/generated`:
   - Note: You should get IntelliSense for the fragment type. If not, check that `pnpm dev` is running.
```
// CmsAccordion.vue

import { graphql } from '~/gql/generated'

graphql(`
  fragment ComponentAccordion on Fieldset_ComponentAccordion {
    id
    [...]
  }
`)
```
 3. Go to `CmsComponentsLoader.vue` and register your new fragment there:
```
// CmsComponentsLoader.vue

graphql(`
  fragment Components on Sets_Components {
    [...]

    ...ComponentAccordion
  }
`)
```
 4. In your `CmsAccordion.vue`, you can now access your data via the `data` prop:
```
// CmsAccordion.vue

import type { ComponentAccordionFragment } from '~/gql/generated/graphql'

const props = defineProps<{
  data: ComponentAccordionFragment
}>()
```
 5. Create a component in the UI component library, e.g., `~/components/ui/Accordion.vue`.
   - Make sure that this component **does not have** any GraphQL-related logic. The idea is that the `Accordion` can be reused in other projects, even outside of a Statamic context.
   - For that goal, define your props as necessary, e.g.:
```
// Accordion.vue

const props = defineProps<{
  sections: Array<{
    id: string
    heading: string
    icon?: string
    content: string
  }>
}>()
```
  - The `CmsAccordion` is responsible for transforming the GraphQL response data for use (for example, removing `null` entries).
```
// CmsAccordion.vue

const sections = computed(() => props.data.sections
  .filter(s => s !== null)
  .map(s => ({
    id: s.id ?? '',
    heading: s.heading,
    icon: s.icon ?? undefined,
    content: s.content ?? '',
  })))
```

## Prefixes and Naming Conventions
There are prefixes that components should use:

- **Cms**: Components that fetch Statamic-provided data and, if feasible, pass it to abstracted components in templates.
  - Locations: `~/components/cms/components/`, `~/components/cms/heroes/`, `~/components/cms/navigation/`
  - Examples: `CmsMoodImage.vue`, `CmsRichtext.vue`, `CmsHeroExample.vue`, `CmsNavigation.vue`

- **Blueprint**: Page-level templates resolved by entry blueprint.
  - Location: `~/components/cms/blueprints/`
  - Examples: `CmsBlueprintPage.vue`

- **UI**: All visible UI elements. This includes app-specific components called from the `Cms*` components.
  - Description: All visual building blocks should be located in this folder, such as buttons, language switchers, pills, tags, backlinks, pagination, tooltips, etc.
  - Note: By default, this folder is organized into `./components` and `./heroes`, but feel free to create whatever structure is best suited to your project (atomic, feature-based domains, etc.).
  - Location: `~/components/ui/`, `~/components/ui/components/`, `~/components/ui/heroes/`
  - Examples: `Button.vue`, `LanguageSwitcher.vue`

- **Utils**: Low-level, non-visual UI primitives, layout, and debug helpers.
  - Description: All non-visual helpers for component-independent concerns such as positioning, spacing, image processing, handling links, managing hitboxes, adding modal functionality, etc.
  - Location: `~/components/utils/`
  - Examples: `Container.vue`, `Section.vue`, `DebugSomethingNotFound.vue`, `DebugBreaky.vue`

- **Loader (suffix)**: Dynamic resolvers that map GraphQL typenames to Vue components.
  - Location: `~/components/cms/loaders/`
  - Examples: `CmsComponentsLoader.vue`, `CmsBlueprintLoader.vue`, `CmsHeroLoader.vue`

### Naming Conventions

Blueprints and fieldsets from Statamic are mapped to Vue components via the loader components. Follow these rules to ensure automatic resolution works:

- **General**
  - Use PascalCase file names and component names (e.g., `CmsMoodImage.vue`).
  - Place components in the folder that matches their role/prefix (see above).

- **Replicator fieldsets → Cms components**
  - Statamic fieldset: `component_<name>`
    - Imported in the Components replicator fieldset as a set with a single import.
    - Resulting GraphQL typename: `Fieldset_Component<Name>`
  - Vue component name: `Cms<Name>`
    - Location: `~/components/cms/components/Cms<Name>.vue`
  - Example:
    - Fieldset handle: `component_image`
    - Resulting GraphQL typename: `Fieldset_ComponentImage`
    - Component: `~/components/cms/components/CmsImage.vue`

- **Entry blueprints → Blueprint components**
  - Statamic collection named `<Collection>` with blueprint `<Blueprint>`
  - Statamic GraphQL typename: `Entry_<Collection>_<Blueprint>`
  - Vue component name: `CmsBlueprint<Blueprint>`
    - Location: `~/components/cms/blueprints/CmsBlueprint<Blueprint>.vue`
  - Example:
    - Blueprint: `page` in collection `pages`
    - Resulting GraphQL typename: `Entry_Pages_Page`
    - Component: `~/components/cms/blueprints/CmsBlueprintPage.vue`

- **Heroes**
  - Follow the `Cms<Name>` pattern within their respective folders, e.g., `~/components/cms/heroes/CmsHeroExample.vue`.
