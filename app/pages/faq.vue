<template>
  <div class="relative">
    <!-- landscape image -->
    <div class="absolute inset-0 h-screen w-full object-cover">
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
      <div class="mx-auto flex max-w-2xl flex-col gap-12">
        <header class="text-center">
          <p class="font-mono text-xs tracking-[0.35em] text-white/50 uppercase">
            Sonaria
          </p>
          <h1
            id="faq-heading"
            class="
              mt-2 text-4xl font-light tracking-tight text-balance text-white
              sm:text-5xl
            "
          >
            Frequently asked questions
          </h1>
          <p
            class="
              mx-auto mt-4 max-w-md text-sm/relaxed text-pretty text-white/70
            "
          >
            Antworten auf einen Tap — mehr Infos auch auf{' '}
            <a
              href="https://sonaria.ch"
              class="
                text-white underline underline-offset-4 ring-focus/40
                outline-none
                focus-visible:ring-2
              "
              target="_blank"
              rel="noopener noreferrer"
            >sonaria.ch</a>.
          </p>
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
            class="group"
          >
            <details
              class="
                overflow-hidden rounded-2xl border border-white/15 bg-black/35
                shadow-[inset_0_1px_0_0_rgb(255_255_255/0.08)] backdrop-blur-md
                backdrop-saturate-150 transition-[border-color,box-shadow]
                open:border-white/25 open:bg-black/45
                open:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.12)]
              "
            >
              <summary
                class="
                  flex cursor-pointer list-none items-start gap-4 px-5 py-4
                  text-left ring-focus/40 outline-none select-none
                  focus-visible:ring-2
                  [&::-webkit-details-marker]:hidden
                "
              >
                <span
                  class="
                    mt-0.5 flex size-7 shrink-0 items-center justify-center
                    rounded-full border border-white/20 bg-white/5 font-mono
                    text-xs text-white/60 transition-colors
                    group-open:border-white/35 group-open:text-white
                  "
                  aria-hidden="true"
                >
                  {{ String(index + 1).padStart(2, '0') }}
                </span>
                <span class="flex-1 font-medium text-white">
                  {{ item.topic }}
                </span>
              </summary>
              <div
                class="
                  border-t border-white/10 px-5 pt-4 pb-5 text-sm/relaxed
                  text-white/85
                "
              >
                <p class="pl-11 text-pretty">
                  {{ item.text }}
                </p>
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
  topic: string
  text: string
}>

const config = useRuntimeConfig()
const siteName = computed(() => config.public.SITE_NAME ?? 'Site')

/** FAQ — Inhalte aus Festival-Infos (topic + Antworttext) */
const faqItems: readonly FaqItem[] = [
  {
    topic: 'Was ist Sonaria Festival?',
    text:
      'Aus dem Zusammenschluss verschiedener Kollektive und Freund:innen entsteht diesen Sommer ein neues Festival nahe Bern: drei Tage unter freiem Himmel in einer Parallelwelt, die den Alltag vergessen lässt. Es gibt drei Bühnen — zwei mit elektronischer Musik und eine mit Live-Bands — mit Artists von nah und fern. FAQ und mehr Infos: sonaria.ch.',
  },
  {
    topic: 'Ablauf und Programm',
    text:
      'Freitags beginnt es um 14:00 Uhr. Samstags gibt es den ganzen Tag Musik, Workshops, Konzerte, Spiel und Spass. Sonntags kannst du ausschlafen oder dich bis am Nachmittag austanzen; am frühen Abend schliessen wir die Tore wieder.',
  },
  {
    topic: 'Line-up',
    text:
      'Mehr Infos folgen bald — wird verrückt. Timetable und Soundcloud-Links gibt es später auf der Website oder auf Instagram.',
  },
  {
    topic: 'Anreise (ÖV und Shuttle)',
    text:
      'Die Anfahrt per Auto sowie Übernachten im Camper oder Bus sind wegen der Gelände-Situation leider nicht möglich. Mit dem RBS oder dem Tram (Linie 6) bis Worb Dorf (ca. 20–30 Minuten aus der Region Bern) — von dort bringt dich unser Shuttle ans Festival. Alternativ ÖV bis Station Walkringen, Wikartswil oder Dorf (ab Bern über Worb Dorf, ca. 40 Minuten), dann etwa 30 Minuten zu Fuss; der Weg ist ausgeschildert. Die genaue Adresse geben wir nicht her — damit zusammenhängend ist die Anreise mit dem Auto nicht möglich.',
  },
  {
    topic: 'Auto und Camper',
    text:
      'Die Anreise mit dem Auto ist untersagt — das ist eine Auflage der Gemeinde. Bitte haltet euch alle daran. Übernachten in einem Bus ist ebenfalls nicht möglich.',
  },
  {
    topic: 'Awareness & Safer Space',
    text:
      'Wir erwarten ein rücksichtsvolles Miteinander; Diskriminierung jeglicher Art tolerieren wir nicht. Vor Ort gibt es ein erkennbares Awareness-Team für Vorfälle sowie einen Safer Space, wenn du dich zurückziehen möchtest. Das gesamte Awareness-Konzept findest du in den FAQ.',
  },
  {
    topic: 'Übernachtung',
    text:
      'Wir empfehlen zu übernachten im eigenen Zelt — es gibt einen schönen Zeltplatz.',
  },
  {
    topic: 'Inklusion & Barrierefreiheit',
    text:
      'Du bist willkommen, auch wenn du z. B. Einschränkungen in der Mobilität hast oder andere spezielle Bedürfnisse — melde dich bei uns. Wenn möglich, unterstützen wir dich mit dem, was du brauchst.',
  },
  {
    topic: 'Tickets, Cash & Sturm',
    text:
      'Schnapp dir rechtzeitig ein Ticket — das Festival lebt zu 100 % von freiwilliger Arbeit und ist nicht gewinnorientiert; die Preise decken vor allem die Kosten. Bei Sturm kann das Event leider nicht stattfinden; dann versuchen wir, möglichst viel des Ticketpreises zurückzuerstatten — den genauen Anteil entscheiden wir nach den angefallenen Ausgaben.',
  },
  {
    topic: 'Food',
    text:
      'Verschiedene externe Menschen betreiben Foodstände eigenständig. Es gibt unter anderem veganes und vegetarisches Essen. Wenn du einen eigenen Stand anbieten und etwas dazuverdienen möchtest, melde dich bei uns.',
  },
  {
    topic: 'Mithelfen',
    text:
      'Ob Auf- oder Abbau, kulinarische Idee, Performance oder Schichtarbeit — wenn du mithelfen willst, schreib uns an events@sonaria.ch oder melde dich auf Instagram. Wir suchen u. a. Menschen für diverse Schichten, Betreiber:innen für Essensstände und noch Platz für Kunstinstallationen; beim Abbau freut sich jede helfende Hand. Instagram: @sonaria.festival',
  },
]

function faqSlug(topic: string): string {
  return topic
    .toLowerCase()
    .replaceAll(/[^\p{L}\p{N}]+/gu, '-')
    .replaceAll(/^-+|-+$/gu, '')
}

function faqAnchorId(index: number): string {
  const topic = faqItems[index]?.topic
  const suffix = topic ? faqSlug(topic) : ''
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
