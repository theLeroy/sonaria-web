<template>
  <div class="relative">
    <!-- landscape image -->
    <div class="fixed inset-0 h-screen w-full object-cover">
      <template v-if="isLandscape">
        <HeatDistortImage
          src="/files/sonaria_website_querformat.png"
          alt="Sonaria background image"
          class="absolute inset-0 hidden h-screen w-full object-cover"
        />
      </template>
      <template v-else>
        <HeatDistortImage
          src="/files/sonaria_website_hochformat.png"
          alt="Sonaria background image"
          class="absolute inset-0 h-screen w-full object-cover"
        />
      </template>
    </div>
    <article
      id="arti"
      class="
        relative z-20 min-h-screen overflow-y-auto px-6 py-16
        sm:px-10 sm:py-20
      "
      aria-labelledby="faq-heading"
    >
      <div class="mx-auto flex max-w-md flex-col gap-12">
        <header class="text-center">
          <p class="font-mono text-xs tracking-[0.35em] text-white/50 uppercase">
            Sonaria&nbsp;
          </p>
          <h1
            id="faq-heading"
            class="
              mt-2 text-4xl font-light tracking-tight text-balance text-white
              sm:text-5xl
            "
          >
            Häufig gestellte Fragen
          </h1>

          <div
            class="
              mx-auto mt-8 h-px w-24 bg-linear-to-r from-transparent
              via-white/40 to-transparent
            "
            aria-hidden="true"
          />
        </header>

        <ul class="flex list-none flex-col gap-3 p-0">
          <li
            v-for="(item, index) in faqItems"
            :id="faqAnchorId(index)"
            :key="index"
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
                  {{ item.emoji ?? String(index + 1).padStart(2, '0') }}
                </span>
                <span
                  class="min-w-0 flex-1 font-medium wrap-break-word text-white"
                >
                  {{ (item.topic) }}
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
                    min-h-0 border-t border-white/10 px-5 pt-4 pb-5
                    text-sm/relaxed text-white/85 opacity-95
                    group-open:opacity-100
                    motion-safe:transition-opacity motion-safe:delay-75
                    motion-safe:duration-300 motion-safe:ease-out
                    motion-reduce:transition-none motion-reduce:delay-0
                  "
                >
                  <p
                    class="
                      text-pretty
                      md:pl-13
                    "
                  >
                    {{ item.text }}
                  </p>
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
type FaqItem = Readonly<{
  /** Icon(s) displayed before `topic`, or between letters when `interleaveEmojiInTopic` */
  emoji: string
  /** Plain headline (no emoji) */
  topic: string
  text: string
  /** Builds `topic` letters joined with `emoji` (e.g. L💥I💥…) */
  interleaveEmojiInTopic?: true
}>

const config = useRuntimeConfig()
const siteName = computed(() => config.public.SITE_NAME ?? 'Site')

/** FAQ — `emoji`, `topic` und Antwort (`text`). Line-up nutzt Interleaving. */
const faqItems: readonly FaqItem[] = [
  {
    emoji: '🚀',
    topic: 'Was ist Sonaria Festival?',
    text:
      'Aus dem Zusammenschluss verschiedener Kollektive und Freund:innen entsteht diesen Sommer ein neues Festival nahe Bern: drei Tage unter freiem Himmel in einer Parallelwelt, die den Alltag vergessen lässt. Es gibt drei Bühnen — zwei mit elektronischer Musik und eine mit Live-Bands — mit Artists von nah und fern. FAQ und mehr Infos: sonaria.ch.',
  },
  {
    emoji: '🦦',
    topic: 'Ablauf und Programm',
    text:
      'Freitags beginnt es um 14:00 Uhr. Samstags gibt es den ganzen Tag Musik, Workshops, Konzerte, Spiel und Spass. Sonntags kannst du ausschlafen oder dich bis am Nachmittag austanzen; am frühen Abend schliessen wir die Tore wieder.',
  },
  {
    emoji: '💥',
    topic: 'LINEUP',
    text:
      'Mehr Infos folgen bald — wird verrückt. Timetable und Soundcloud-Links gibt es später auf der Website oder auf Instagram.',
  },
  {
    emoji: '🏎',
    topic: 'Anreise (ÖV und Shuttle)',
    text:
      'Die Anfahrt per Auto sowie Übernachten im Camper oder Bus sind wegen der Gelände-Situation leider nicht möglich. Mit dem RBS oder dem Tram (Linie 6) bis Worb Dorf (ca. 20–30 Minuten aus der Region Bern) — von dort bringt dich unser Shuttle ans Festival. Alternativ ÖV bis Station Walkringen, Wikartswil oder Dorf (ab Bern über Worb Dorf, ca. 40 Minuten), dann etwa 30 Minuten zu Fuss; der Weg ist ausgeschildert. Die genaue Adresse geben wir nicht her — damit zusammenhängend ist die Anreise mit dem Auto nicht möglich.',
  },
  {
    emoji: '🚗',
    topic: 'Auto und Camper',
    text:
      'Die Anreise mit dem Auto ist untersagt — das ist eine Auflage der Gemeinde. Bitte haltet euch alle daran. Übernachten in einem Bus ist ebenfalls nicht möglich.',
  },
  {
    emoji: '❤️',
    topic: 'Awareness & Safer Space',
    text:
      'Wir erwarten ein rücksichtsvolles Miteinander; Diskriminierung jeglicher Art tolerieren wir nicht. Vor Ort gibt es ein erkennbares Awareness-Team für Vorfälle sowie einen Safer Space, wenn du dich zurückziehen möchtest. Das gesamte Awareness-Konzept findest du in den FAQ.',
  },
  {
    emoji: '⛺️',
    topic: 'Übernachtung',
    text:
      'Wir empfehlen zu übernachten im eigenen Zelt — es gibt einen schönen Zeltplatz.',
  },
  {
    emoji: '☎️',
    topic: 'Inklusion & Barrierefreiheit',
    text:
      'Du bist willkommen, auch wenn du z. B. Einschränkungen in der Mobilität hast oder andere spezielle Bedürfnisse — melde dich bei uns. Wenn möglich, unterstützen wir dich mit dem, was du brauchst.',
  },
  {
    emoji: '💰',
    topic: 'Tickets, Cash & Sturm',
    text:
      'Schnapp dir rechtzeitig ein Ticket — das Festival lebt zu 100 % von freiwilliger Arbeit und ist nicht gewinnorientiert; die Preise decken vor allem die Kosten. Bei Sturm kann das Event leider nicht stattfinden; dann versuchen wir, möglichst viel des Ticketpreises zurückzuerstatten — den genauen Anteil entscheiden wir nach den angefallenen Ausgaben.',
  },
  {
    emoji: '🥦',
    topic: 'Food',
    text:
      'Verschiedene externe Menschen betreiben Foodstände eigenständig. Es gibt unter anderem veganes und vegetarisches Essen. Wenn du einen eigenen Stand anbieten und etwas dazuverdienen möchtest, melde dich bei uns.',
  },
  {
    emoji: '⭐️',
    topic: 'Mithelfen',
    text:
      'Ob Auf- oder Abbau, kulinarische Idee, Performance oder Schichtarbeit — wenn du mithelfen willst, schreib uns an events@sonaria.ch oder melde dich auf Instagram. Wir suchen u. a. Menschen für diverse Schichten, Betreiber:innen für Essensstände und noch Platz für Kunstinstallationen; beim Abbau freut sich jede helfende Hand. Instagram: @sonaria.festival',
  },
]

function faqSlug(slugSource: string): string {
  return slugSource
    .toLowerCase()
    .replaceAll(/[^\p{L}\p{N}]+/gu, '-')
    .replaceAll(/^-+|-+$/gu, '')
}

function faqAnchorId(index: number): string {
  const item = faqItems[index]
  const suffix = item ? faqSlug(item.topic) : ''
  const safe = suffix.length > 0 ? suffix : String(index)
  return `arti-${safe}`
}

useSeoMeta({
  title: () => `${siteName.value} — FAQ`,
  description:
    'Sonaria Festival nahe Bern: Anreise, Line-up, Tickets, Awareness & mehr.',
})

const isLandscape = useMediaQuery('(orientation: landscape)')
</script>
<style>
/* This won't work yet */
details::details-content {
  overflow: hidden;
  height: 0;
  transition: height 0.3s;
}

details[open]::details-content {
  height: auto;
}
</style>
