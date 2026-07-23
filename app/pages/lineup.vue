<template>
  <div class="relative">
    <article
      id="arti"
      class="
        relative z-20 min-h-screen overflow-y-auto px-6 py-16
        sm:px-10 sm:py-20
      "
      aria-labelledby="lineup-heading"
    >
      <div class="mx-auto flex max-w-md flex-col gap-12">
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
            <Button
              to="/files/sonaria_timetable.pdf"
              target="_blank"
            >
              {{ pageContent.pdfLabel }}
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

        <ul class="flex list-none flex-col gap-3 p-0">
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
                hover:bg-black/35
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
                <div class="min-h-0 border-t border-white/10 px-5 pt-4 pb-5">
                  <p
                    v-if="day.note"
                    class="mb-5 text-sm/relaxed text-pretty text-white/60"
                  >
                    {{ day.note }}
                  </p>

                  <div class="flex flex-col gap-6">
                    <section
                      v-for="stageBlock in day.stages"
                      :key="`${day.id}-${stageBlock.stageId}`"
                    >
                      <h2
                        class="
                          mb-3 flex items-center gap-2 font-mono text-xs
                          tracking-[0.2em] text-white/55 uppercase
                        "
                      >
                        <span
                          class="size-2 rounded-full"
                          :class="stageDotClass(stageBlock.stageId)"
                          aria-hidden="true"
                        />
                        {{ stageName(stageBlock.stageId) }}
                      </h2>

                      <ul class="flex list-none flex-col gap-2 p-0">
                        <li
                          v-for="(slot, slotIndex) in stageBlock.slots"
                          :key="`${day.id}-${stageBlock.stageId}-${slotIndex}`"
                          class="
                            rounded-xl border border-white/10 bg-white/5 px-4
                            py-3
                          "
                          :class="stageBorderClass(stageBlock.stageId)"
                        >
                          <div class="flex items-start justify-between gap-3">
                            <div class="min-w-0 flex-1">
                              <p
                                v-if="slot.tag"
                                class="
                                  mb-1 font-mono text-[0.65rem] tracking-[0.18em]
                                  text-white/45 uppercase
                                "
                              >
                                {{ tagLabel(slot.tag) }}
                              </p>
                              <p class="font-medium wrap-break-word text-white">
                                {{ slot.name }}
                              </p>
                            </div>
                            <p
                              class="
                                shrink-0 font-mono text-xs tracking-wide
                                text-white/55
                              "
                            >
                              {{ slot.time }}
                            </p>
                          </div>

                          <p
                            v-if="slot.description"
                            class="
                              mt-2 text-sm/relaxed text-pretty text-white/70
                            "
                          >
                            {{ slot.description }}
                          </p>

                          <a
                            v-if="slot.link"
                            class="
                              mt-2 inline-block font-mono text-xs tracking-wide
                              text-white/50 underline-offset-2 transition-opacity
                              hover:text-white/80 hover:underline hover:opacity-80
                            "
                            :href="slot.link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {{ linkLabel(slot.link) }}
                          </a>
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
  type LineupStageBlock,
  type SlotTag,
  type StageId,
} from '~/data/lineupStages'

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
  pdfLabel: string
  tagLabels: Readonly<Record<SlotTag, string>>
  stageNames: Readonly<Record<StageId, string>>
  days: readonly LineupDay[]
}>

const config = useRuntimeConfig()
const siteName = computed(() => config.public.SITE_NAME ?? 'Site')

const lineupLocale = ref<LineupLocale>('de')

const stages = [
  { id: 'silsi' as const, name: 'Silsi', dotClass: 'bg-cyan-300' },
  { id: 'mutowac' as const, name: 'Mutować', dotClass: 'bg-fuchsia-400' },
  { id: 'aerodrom' as const, name: 'Aerodrom', dotClass: 'bg-amber-300' },
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
  }
}

const lineupContentByLocale: Record<LineupLocale, LineupPageContent> = {
  de: {
    heading: 'Line-up',
    intro: 'Timetable · Running Order · Freitag–Sonntag · Beginn 14:00',
    seoDescription:
      'Sonaria Festival Line-up und Timetable: Silsi, Mutować und Aerodrom von Freitag bis Sonntag.',
    toggleLabel: 'See content in English',
    toggleAriaLabel: 'Inhalt auf Englisch anzeigen',
    pdfLabel: 'PDF',
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
    },
    days: [
      {
        id: 'freitag',
        name: 'Freitag',
        note: 'Nachtruhe · Stages closed · 02:00–10:00',
        stages: freitagStages,
      },
      {
        id: 'samstag',
        name: 'Samstag',
        note: 'Tagsüber ab 10:00 — die Nacht geht bis in den Sonntagmorgen.',
        stages: samstagStages,
      },
      {
        id: 'sonntag',
        name: 'Sonntag',
        note: 'Ausschlafen oder weitertanzen — am Nachmittag schliessen wir.',
        stages: sonntagStages,
      },
    ],
  },
  en: {
    heading: 'Line-up',
    intro: 'Timetable · Running Order · Friday–Sunday · Starts 14:00',
    seoDescription:
      'Sonaria Festival line-up and timetable: Silsi, Mutować and Aerodrom from Friday to Sunday.',
    toggleLabel: 'Zeig mir den Inhalt auf Deutsch',
    toggleAriaLabel: 'Show content in German',
    pdfLabel: 'PDF',
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
    },
    days: [
      {
        id: 'freitag',
        name: 'Friday',
        note: 'Night rest · Stages closed · 02:00–10:00',
        stages: freitagStages,
      },
      {
        id: 'samstag',
        name: 'Saturday',
        note: 'Daytime from 10:00 — the night runs into Sunday morning.',
        stages: samstagStages,
      },
      {
        id: 'sonntag',
        name: 'Sunday',
        note: 'Sleep in or keep dancing — we close in the afternoon.',
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

function tagLabel(tag: SlotTag): string {
  return pageContent.value.tagLabels[tag]
}

function linkLabel(url: string): string {
  if (url.includes('soundcloud')) {
    return 'SoundCloud'
  }
  if (url.includes('spotify')) {
    return 'Spotify'
  }
  if (url.includes('instagram')) {
    return 'Instagram'
  }
  return 'Link'
}

function lineupAnchorId(dayId: LineupDayId): string {
  return `arti-${dayId}`
}

useSeoMeta({
  title: () => `${siteName.value} — Line-up`,
  description: () => pageContent.value.seoDescription,
})
</script>
