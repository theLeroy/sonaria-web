<template>
  <div class="relative">
    <article
      id="arti"
      class="
        relative z-20 min-h-screen overflow-y-auto px-4 py-16
        sm:px-8 sm:py-20
        lg:px-10
      "
      aria-labelledby="lineup-heading"
    >
      <div class="mx-auto flex w-full max-w-360 flex-col gap-12">
        <header class="text-center">
          <p class="font-mono text-xs tracking-[0.35em] text-white/50 uppercase">
            Sonaria&nbsp;
          </p>
          <h1
            id="lineup-heading"
            class="
              mt-2 text-4xl font-light tracking-tight text-balance text-white
              sm:text-5xl
            "
          >
            {{ pageContent.heading }}
          </h1>

          <p class="mt-4 text-sm/relaxed text-pretty text-white/70">
            {{ pageContent.intro }}
          </p>

          <div
            class="
              mx-auto mt-8 h-px w-24 bg-linear-to-r from-transparent
              via-white/40 to-transparent
            "
            aria-hidden="true"
          />

          <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button
              :aria-label="pageContent.toggleAriaLabel"
              @click="toggleLineupLocale"
            >
              {{ pageContent.toggleLabel }}
            </Button>
          </div>

          <ul
            class="
              mt-8 flex list-none flex-wrap items-center justify-center gap-x-5
              gap-y-2 p-0 font-mono text-xs tracking-wide text-white/55
              uppercase
            "
            aria-label="Stages"
          >
            <li
              v-for="stage in stages"
              :key="stage.id"
              class="flex items-center gap-2"
            >
              <span
                class="size-2 rounded-full"
                :class="stage.dotClass"
                aria-hidden="true"
              />
              {{ stage.name }}
            </li>
          </ul>
        </header>

        <ul class="flex list-none flex-col gap-6 p-0">
          <li
            v-for="(day, index) in days"
            :id="lineupAnchorId(day.id)"
            :key="day.id"
          >
            <details
              class="
                group rounded-2xl border border-white/15 bg-black/25
                shadow-[inset_0_1px_0_0_rgb(255_255_255/0.08)]
                ring-offset-transparent backdrop-blur-md backdrop-saturate-150
                transition-[border-color,box-shadow,background-color]
                open:border-white/25 open:bg-black/45
                open:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.12)]
                focus-visible:ring-2 focus-visible:ring-focus
                focus-visible:ring-offset-4
                motion-reduce:transition-none
              "
              open
            >
              <summary
                class="
                  flex cursor-pointer list-none items-center gap-4 px-5 py-4
                  text-left outline-none select-none
                  focus-visible:ring-2 focus-visible:ring-offset-4
                  [&::-webkit-details-marker]:hidden
                "
              >
                <span
                  class="
                    mt-0.5 flex size-9 shrink-0 items-center justify-center
                    rounded-full border border-white/20 bg-white/5 font-mono
                    text-xs text-white/60 transition-colors
                    group-open:border-white/35 group-open:text-white
                  "
                  aria-hidden="true"
                >
                  {{ String(index + 1).padStart(2, '0') }}
                </span>
                <span class="min-w-0 flex-1 font-medium text-white">
                  {{ day.name }}
                </span>
              </summary>

              <div
                class="
                  grid grid-rows-[0fr] overflow-hidden
                  group-open:grid-rows-[1fr]
                  motion-safe:transition-[grid-template-rows]
                  motion-safe:duration-300 motion-safe:ease-out
                  motion-reduce:transition-none
                "
              >
                <div
                  class="
                    min-h-0 border-t border-white/10 px-4 pt-4 pb-5
                    sm:px-5
                  "
                >
                  <p
                    v-if="day.note"
                    class="mb-5 text-sm/relaxed text-pretty text-white/60"
                  >
                    {{ day.note }}
                  </p>

                  <div
                    class="
                      grid grid-cols-2 gap-5
                      lg:grid-cols-4
                    "
                  >
                    <section
                      v-for="stageId in STAGE_ORDER"
                      :key="`${day.id}-${stageId}`"
                      class="min-w-0"
                    >
                      <h2
                        class="
                          mb-3 flex items-center gap-2 font-mono text-xs
                          tracking-[0.2em] text-white/55 uppercase
                        "
                      >
                        <span
                          class="size-2 rounded-full"
                          :class="stageDotClass(stageId)"
                          aria-hidden="true"
                        />
                        {{ stageName(stageId) }}
                      </h2>

                      <ul class="flex list-none flex-col gap-2 p-0">
                        <li
                          v-for="(slot, slotIndex) in stageSlots(day, stageId)"
                          :key="`${day.id}-${stageId}-${slotIndex}`"
                          class="
                            rounded-xl border border-white/10 bg-white/5 p-3
                          "
                          :class="[
                            stageBorderClass(stageId),
                            slot.cancelled
                              && 'border-white/10 bg-white/3 opacity-55',
                          ]"
                          :aria-label="
                            slot.cancelled
                              ? `${slot.name} — ${pageContent.cancelledLabel}`
                              : undefined
                          "
                        >
                          <div class="flex items-start justify-between gap-2">
                            <div class="min-w-0 flex-1">
                              <p
                                v-if="slot.tag || slot.cancelled"
                                class="
                                  mb-1 flex flex-wrap items-center gap-x-2
                                  gap-y-1 font-mono text-[0.65rem]
                                  tracking-[0.18em] text-white/45 uppercase
                                "
                              >
                                <span v-if="slot.tag">{{ tagLabel(slot.tag) }}</span>
                                <span
                                  v-if="slot.cancelled"
                                  class="text-white/70"
                                >
                                  {{ pageContent.cancelledLabel }}
                                </span>
                              </p>
                              <p
                                class="font-medium wrap-break-word text-white"
                                :class="
                                  slot.cancelled && `
                                    line-through decoration-white/50
                                  `
                                "
                              >
                                {{ slot.name }}
                              </p>
                              <p
                                v-if="slot.label"
                                class="
                                  mt-1 font-mono text-[0.7rem] tracking-wide
                                  text-white/45
                                "
                              >
                                {{ slot.label }}
                              </p>
                            </div>
                            <p
                              v-if="showsSlotTime(slot)"
                              class="
                                shrink-0 font-mono text-[0.7rem] tracking-wide
                                text-white/55
                              "
                              :class="
                                slot.cancelled && `
                                  line-through decoration-white/40
                                `
                              "
                            >
                              {{ slot.time }}
                            </p>
                          </div>

                          <p
                            v-if="slotDescription(slot) && !slot.cancelled"
                            class="
                              mt-2 text-xs/relaxed text-pretty text-white/70
                            "
                          >
                            {{ slotDescription(slot) }}
                          </p>

                          <div
                            v-if="slotLinks(slot).length > 0 && !slot.cancelled"
                            class="mt-3 flex flex-wrap gap-2"
                          >
                            <a
                              v-for="item in slotLinks(slot)"
                              :key="item.href"
                              class="
                                inline-flex items-center gap-1.5 rounded-md
                                border border-white/25 bg-white/10 px-2 py-1
                                font-mono text-[0.7rem] tracking-wide text-white
                                transition-[border-color,background-color,opacity]
                                hover:border-white/50 hover:bg-white/20
                                hover:opacity-95
                              "
                              :href="item.href"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg
                                v-if="item.kind === 'soundcloud'"
                                class="size-3.5 shrink-0"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  d="M1.5 13.2c0-1.1.7-2 1.7-2.3.2-2.3 2.1-4.1 4.4-4.1.6 0 1.2.1 1.7.4V17H3.8c-1.3 0-2.3-1.1-2.3-2.4zm9.1-7.5c.4-.2.8-.3 1.3-.3 1.6 0 2.9 1.3 2.9 2.9v8.5h-4.2V5.7zm5.5-.6c2.3 0 4.2 1.9 4.2 4.2v8.5h-4.2V9.3c0-1.3-1.1-2.3-2.3-2.3-.4 0-.8.1-1.1.3V5.4c.7-.2 1.4-.3 2.1-.3z"
                                />
                              </svg>
                              <svg
                                v-else-if="item.kind === 'instagram'"
                                class="size-3.5 shrink-0"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 3.2-1.6 4.8-4.9 4.9-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9C2.4 3.9 4 2.4 7.1 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.2 0-3.5 0-4.8.1-2.2.1-3.3 1.2-3.4 3.4-.1 1.2-.1 1.6-.1 4.8s0 3.5.1 4.8c.1 2.2 1.2 3.3 3.4 3.4 1.2.1 1.6.1 4.8.1s3.5 0 4.8-.1c2.2-.1 3.3-1.2 3.4-3.4.1-1.2.1-1.6.1-4.8s0-3.5-.1-4.8c-.1-2.2-1.2-3.3-3.4-3.4-1.3-.1-1.6-.1-4.8-.1zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 8.1a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zm6.3-8.4a1.2 1.2 0 1 1-2.3 0 1.2 1.2 0 0 1 2.3 0z"
                                />
                              </svg>
                              <svg
                                v-else-if="item.kind === 'spotify'"
                                class="size-3.5 shrink-0"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.6 14.4c-.2.3-.5.4-.8.2-2.2-1.3-5-1.6-8.3-.9-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 3.6-.8 6.7-.4 9.2 1.1.3.1.4.5.3.8zm1.2-2.7c-.2.4-.7.5-1 .3-2.5-1.5-6.4-2-9.4-1.1-.4.1-.8-.1-.9-.5-.1-.4.1-.8.5-.9 3.4-1 7.7-.5 10.6 1.2.3.2.4.7.2 1zm.1-2.8C14.7 8.9 9.4 8.7 6.3 9.6c-.5.1-1-.1-1.2-.5-.1-.5.1-1 .5-1.2 3.6-1.1 9.5-.9 13.2 1.3.4.3.6.8.3 1.2-.2.4-.8.5-1.2.3z"
                                />
                              </svg>
                              <svg
                                v-else
                                class="size-3.5 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M10 13a5 5 0 0 0 7.1 0l2.8-2.8a5 5 0 0 0-7.1-7.1L11.5 4.4" />
                                <path d="M14 11a5 5 0 0 0-7.1 0L4.1 13.8a5 5 0 0 0 7.1 7.1L12.5 19.6" />
                              </svg>
                              {{ item.label }}
                            </a>
                          </div>
                        </li>

                        <li
                          v-if="stageSlots(day, stageId).length === 0"
                          class="
                            rounded-xl border border-dashed border-white/10 p-3
                            font-mono text-xs text-white/35
                          "
                        >
                          —
                        </li>
                      </ul>
                    </section>
                  </div>
                </div>
              </div>
            </details>
          </li>
        </ul>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import {
  freitagStages,
  samstagStages,
  sonntagStages,
  STAGE_ORDER,
  type LineupSlot,
  type LineupStageBlock,
  type SlotTag,
  type StageId,
} from '~/data/lineupStages'

type SlotLinkKind = 'soundcloud' | 'instagram' | 'spotify' | 'website'

type SlotLink = Readonly<{
  kind: SlotLinkKind
  label: string
  href: string
}>

type LineupDayId = 'freitag' | 'samstag' | 'sonntag'

type LineupDay = Readonly<{
  id: LineupDayId
  name: string
  note?: string
  stages: readonly LineupStageBlock[]
}>

type LineupLocale = 'de' | 'en'

type LineupPageContent = Readonly<{
  heading: string
  intro: string
  seoDescription: string
  toggleLabel: string
  toggleAriaLabel: string
  cancelledLabel: string
  tagLabels: Readonly<Record<SlotTag, string>>
  stageNames: Readonly<Record<StageId, string>>
  days: readonly LineupDay[]
}>

const config = useRuntimeConfig()
const siteName = computed(() => config.public.SITE_NAME ?? 'Site')

const lineupLocale = ref<LineupLocale>('de')

const stages = [
  {
    id: 'silsi' as const,
    name: 'Silsi',
    dotClass: 'bg-cyan-300',
  },
  {
    id: 'mutowac' as const,
    name: 'Mutować',
    dotClass: 'bg-fuchsia-400',
  },
  {
    id: 'aerodrom' as const,
    name: 'Aerodrom',
    dotClass: 'bg-amber-300',
  },
  {
    id: 'offspaces' as const,
    name: 'Offspaces',
    dotClass: 'bg-emerald-300',
  },
]

const stageDotClass = (stageId: StageId): string => {
  const stage = stages.find(item => item.id === stageId)
  return stage?.dotClass ?? 'bg-white/40'
}

const stageBorderClass = (stageId: StageId): string => {
  switch (stageId) {
    case 'silsi':
      return 'border-cyan-300/35'
    case 'mutowac':
      return 'border-fuchsia-400/35'
    case 'aerodrom':
      return 'border-amber-300/35'
    case 'offspaces':
      return 'border-emerald-300/35'
  }
}

const lineupContentByLocale: Record<LineupLocale, LineupPageContent> = {
  de: {
    heading: 'Line-up',
    intro: 'Timetable · Running Order · Freitag–Sonntag · Beginn 14:00',
    seoDescription:
      'Sonaria Festival Line-up und Timetable: Silsi, Mutować, Aerodrom und Offspaces von Freitag bis Sonntag.',
    toggleLabel: 'See content in English',
    toggleAriaLabel: 'Inhalt auf Englisch anzeigen',
    cancelledLabel: 'Abgesagt',
    tagLabels: {
      vinyl: 'Vinyl',
      live: 'Live',
      workshop: 'Workshop',
      band: 'Band',
      performance: 'Performance',
      offen: 'Offen',
    },
    stageNames: {
      silsi: 'Silsi',
      mutowac: 'Mutować',
      aerodrom: 'Aerodrom',
      offspaces: 'Offspaces',
    },
    days: [
      {
        id: 'freitag',
        name: 'Freitag',
        stages: freitagStages,
      },
      {
        id: 'samstag',
        name: 'Samstag',

        stages: samstagStages,
      },
      {
        id: 'sonntag',
        name: 'Sonntag',

        stages: sonntagStages,
      },
    ],
  },
  en: {
    heading: 'Line-up',
    intro: 'Timetable · Running Order · Friday–Sunday · Starts 14:00',
    seoDescription:
      'Sonaria Festival line-up and timetable: Silsi, Mutować, Aerodrom and Offspaces from Friday to Sunday.',
    toggleLabel: 'Zeig mir den Inhalt auf Deutsch',
    toggleAriaLabel: 'Show content in German',
    cancelledLabel: 'Cancelled',
    tagLabels: {
      vinyl: 'Vinyl',
      live: 'Live',
      workshop: 'Workshop',
      band: 'Band',
      performance: 'Performance',
      offen: 'TBD',
    },
    stageNames: {
      silsi: 'Silsi',
      mutowac: 'Mutować',
      aerodrom: 'Aerodrom',
      offspaces: 'Offspaces',
    },
    days: [
      {
        id: 'freitag',
        name: 'Friday',
        stages: freitagStages,
      },
      {
        id: 'samstag',
        name: 'Saturday',
        stages: samstagStages,
      },
      {
        id: 'sonntag',
        name: 'Sunday',
        stages: sonntagStages,
      },
    ],
  },
}

const pageContent = computed(() => lineupContentByLocale[lineupLocale.value])
const days = computed(() => pageContent.value.days)

function toggleLineupLocale(): void {
  lineupLocale.value = lineupLocale.value === 'de' ? 'en' : 'de'
}

function stageName(stageId: StageId): string {
  return pageContent.value.stageNames[stageId]
}

function stageSlots(day: LineupDay, stageId: StageId): readonly LineupSlot[] {
  const block = day.stages.find(stage => stage.stageId === stageId)
  return block?.slots ?? []
}

function tagLabel(tag: SlotTag): string {
  return pageContent.value.tagLabels[tag]
}

function showsSlotTime(slot: LineupSlot): boolean {
  return slot.tag === 'workshop' || slot.tag === 'performance'
}

function slotDescription(slot: LineupSlot): string | undefined {
  return slot.description?.[lineupLocale.value]
}

function slotLinks(slot: LineupSlot): readonly SlotLink[] {
  const links: SlotLink[] = []

  if (slot.soundcloud) {
    links.push({
      kind: 'soundcloud',
      label: 'SoundCloud',
      href: slot.soundcloud,
    })
  }
  if (slot.instagram) {
    links.push({
      kind: 'instagram',
      label: 'Instagram',
      href: slot.instagram,
    })
  }
  if (slot.spotify) {
    links.push({
      kind: 'spotify',
      label: 'Spotify',
      href: slot.spotify,
    })
  }
  if (slot.website) {
    links.push({
      kind: 'website',
      label: 'Website',
      href: slot.website,
    })
  }

  return links
}

function lineupAnchorId(dayId: LineupDayId): string {
  return `arti-${dayId}`
}

useSeoMeta({
  title: () => `${siteName.value} — Line-up`,
  description: () => pageContent.value.seoDescription,
})
</script>
