<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="relative">
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
            {{ pageContent.heading }}
          </h1>

          <div
            class="
              mx-auto mt-8 h-px w-24 bg-linear-to-r from-transparent
              via-white/40 to-transparent
            "
            aria-hidden="true"
          />

          <div class="mt-6 flex justify-center">
            <Button
              :aria-label="pageContent.toggleAriaLabel"
              @click="toggleFaqLocale"
            >
              {{ pageContent.toggleLabel }}
            </Button>
          </div>
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
                  <div
                    class="
                      text-pretty
                      md:pl-13
                    "
                    data-faq-html
                    v-html="item.text"
                  />
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
  /** Trusted HTML answer (links, `<br>`, emphasis, …) */
  text: string
  /** Builds `topic` letters joined with `emoji` (e.g. L💥I💥…) */
  interleaveEmojiInTopic?: true
}>

type FaqLocale = 'de' | 'en'

type FaqPageContent = Readonly<{
  heading: string
  seoDescription: string
  toggleLabel: string
  toggleAriaLabel: string
  items: readonly FaqItem[]
}>

const config = useRuntimeConfig()
const siteName = computed(() => config.public.SITE_NAME ?? 'Site')

const faqLocale = ref<FaqLocale>('de')

const faqContentByLocale: Record<FaqLocale, FaqPageContent> = {
  de: {
    heading: 'Häufig gestellte Fragen',
    seoDescription:
      'Sonaria Festival nahe Bern: Anreise, Line-up, Tickets, Awareness & mehr.',
    toggleLabel: 'See content in English',
    toggleAriaLabel: 'Inhalt auf Englisch anzeigen',
    items: [
      {
        emoji: '🚀',
        topic: 'Was ist Sonaria Festival?',
        text:
      'Aus dem Zusammenschluss verschiedener Kollektive und Freund:innen entsteht diesen Sommer ein neues Festival nahe Bern: drei Tage unter freiem Himmel in einer Parallelwelt, die den Alltag vergessen lässt. Es gibt drei Bühnen — zwei mit elektronischer Musik und eine mit Live-Bands — mit Artists von nah und fern. FAQ und mehr Infos: sonaria.ch.',
      },
      {
        emoji: '🧹',
        topic: 'Leave no trace',
        text:
      'Keine Vermüllung! Bitte hilf uns, das Land und seine Umgebung sauber zu halten. Lass nichts zurück, entsorge deine Abfälle und Zigarettenstummel ordnungsgemäß, respektiere die Natur, heb Abfall auf, wenn du welchen siehst, auch wenn es nicht deiner ist. Abfall ist eine kollektive Verantwortung.',
      },
      {
        emoji: '🧡',
        topic: 'Safer Space',
        text:
      'Unser Festival soll ein warmer, einladender Raum für alle sein. Inklusivität und Diversität ist uns wichtig. Um ein wirklich lebendiges, sicheres Umfeld zu schaffen, müssen wir die Grenzen aller respektieren, um Zustimmung bitten und darauf achten, wie wir mit einander umgehen. Respektiere den Raum anderer und unterstütz, wann immer es nötig ist. Reagier und sprich jemand vor Ort an, wenn du diskriminierendes Verhalten siehst; sei es sexistisch, homophob oder jegliche andere Form von übergriffigem Verhalten.',
      },
      {
        emoji: '🚬',
        topic: 'Zigarettenstummel',
        text:
      'Steck sie in deinen tragbaren Aschenbecher oder in deine Tasche. Wirf sie nicht auf den Boden! Die Umwelt ist nicht unser Aschenbecher. Wenn du keinen hast, such einen Mülleimer in der Nähe und/oder lass dich von deinen Friends unterstützen. Das Gleiche gilt für alle Abfälle.',
      },
      {
        emoji: '💧',
        topic: 'Wasser',
        text:
      'Das Wasser vor Ort ist beschränkt und muss mühsam hochgetragen werden. Bitte benutz es sparsam und verschwende es nicht. Wir empfehlen dir, eine eigene Flasche mitzubringen.',
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
      'Timetable und Running Order stehen online — drei Stages von Freitag bis Sonntag, inkl. Artist-Infos und Links. <a href="/lineup">Zum Line-up</a>.',
      },
      {
        emoji: '🏎',
        topic: 'Anreise (ÖV und Shuttle)',
        text:
      'Die Anfahrt per Auto sowie Übernachten im Camper oder Bus sind wegen der Gelände-Situation leider nicht möglich. Mit dem RBS oder dem Tram (Linie 6) bis Worb Dorf (ca. 20–30 Minuten von Bern) — von dort bringt dich unser Shuttle ans Festival. Shuttle-Zeiten: Fr: 13:30-23:00. Sa: 11:30-16:30. So: 10:30-18:30. <br> Die Busse fahren in beide Richtungen, es ist also auch möglich, mit dem Shuttle nach Worb Dorf zu fahren. <br> Falls ihr lieber einen schönen 35 Minuten Weg hinauf laufen wollt, gibt es die Möglichkeit von Worb weiter den ÖV zu nehmen bis „Arni BE, Tanne“. Von da aus ist der Weg ausgeschildert.',
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
      'Wir erwarten von dir ein rücksichtvolles Verhalten gegenüber allen anderen. Wir tolerieren keine Diskriminierung jeglicher Art. Am Event werden wir ein erkennbares Awareness-Team haben, bei welchem du dich bei Vorfällen melden kannst. Zudem wird es einen Safer Space geben, falls du dich etwas zurückziehen möchtest. <a href="https://nachtzug-lunaria.ch/AwarenesskonzeptNachtzugLunaria.pdf">Hier</a> findest du unser detailiertes Awarenesskonzept.',
      },
      {
        emoji: '❤️',
        topic: 'Feuer und Feuerwerk',
        text:
      'Wegen der Tockenheit müssen wir leider Feuer und Feuerwerk verbieten. Bitte halte dich daran.',
      },
      {
        emoji: '⛺️',
        topic: 'Übernachtung',
        text:
      'Wir empfehlen zu übernachten im eigenen Zelt — es gibt einen schönen Zeltplatz. Übernachten in einem Bus ist leider nicht möglich.',
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
    ],
  },
  en: {
    heading: 'Frequently Asked Questions',
    seoDescription:
      'Sonaria Festival near Bern: getting there, line-up, tickets, awareness & more.',
    toggleLabel: 'Zeig mir den Inhalt auf Deutsch',
    toggleAriaLabel: 'Show content in German',
    items: [
      {
        emoji: '🚀',
        topic: 'What is Sonaria Festival?',
        text:
          'This summer, a new festival will emerge near Bern from the coming together of various collectives and friends: three days under the open sky in a parallel world that lets you forget everyday life. There are three stages — two with electronic music and one with live bands — featuring artists from near and far. FAQ and more info: sonaria.ch.',
      },
      {
        emoji: '🧹',
        topic: 'Leave no trace',
        text:
          'No littering! Please help us keep the land and its surroundings clean. Leave nothing behind, dispose of your waste and cigarette butts properly, respect nature, pick up trash when you see it, even if it is not yours. Waste is a collective responsibility.',
      },
      {
        emoji: '🧡',
        topic: 'Safer Space',
        text:
          'Our festival should be a warm, welcoming space for everyone. Inclusivity and diversity matter to us. To create a truly vibrant, safe environment, we must respect everyone\'s boundaries, ask for consent, and pay attention to how we interact with one another. Respect others\' space and support whenever necessary. Speak up and address someone on site if you witness discriminatory behavior — whether sexist, homophobic, or any other form of inappropriate conduct.',
      },
      {
        emoji: '🚬',
        topic: 'Cigarette butts',
        text:
          'Put them in your portable ashtray or in your pocket. Do not throw them on the ground! The environment is not our ashtray. If you do not have one, look for a nearby bin and/or ask your friends for help. The same applies to all waste.',
      },
      {
        emoji: '💧',
        topic: 'Water',
        text:
          'Water on site is limited and must be carried up laboriously. Please use it sparingly and do not waste it. We recommend bringing your own bottle.',
      },
      {
        emoji: '🦦',
        topic: 'Schedule and program',
        text:
          'On Friday it starts at 2:00 PM. On Saturday there is music, workshops, concerts, games and fun all day. On Sunday you can sleep in or keep dancing until the afternoon; in the early evening we close the gates again.',
      },
      {
        emoji: '💥',
        topic: 'LINEUP',
        text:
          'Timetable and running order are online — three stages from Friday to Sunday, including artist info and links. <a href="/lineup">Go to line-up</a>.',
      },
      {
        emoji: '🏎',
        topic: 'Getting there (public transport and shuttle)',
        text:
          'Unfortunately, driving by car as well as staying overnight in a camper or bus are not possible due to the site situation. Take the RBS or tram (line 6) to Worb Dorf (approx. 20–30 minutes from the Bern region) — from there our shuttle will take you to the festival. Shuttle-Times: Fr: 13:30-23:00 first with 2, then with 1 bus, depending on the number of people in the evening Sa: 11:30-16:30 only 1 bus So: 10:30-18:30 2 buses. The buses run in both directions, so it is also possible to take the shuttle to Worb Dorf.',
      },
      {
        emoji: '🚗',
        topic: 'Car and camper',
        text:
          'Access by car is prohibited — this is a requirement from the municipality. Please everyone adhere to this. Staying overnight in a bus is also not possible.',
      },
      {
        emoji: '❤️',
        topic: 'Awareness & Safer Space',
        text:
          'We expect considerate behavior towards everyone else. We tolerate no discrimination of any kind. At the event we will have a recognizable awareness team that you can contact in case of incidents. There will also be a safer space if you need to step away for a while. <a href="https://nachtzug-lunaria.ch/AwarenesskonzeptNachtzugLunaria.pdf">Here</a> you can find our detailed awareness concept.',
      },
      {
        emoji: '⛺️',
        topic: 'Accommodation',
        text:
          'We recommend staying in your own tent — there is a nice campsite. Unfortunately, staying overnight in a bus is not possible.',
      },
      {
        emoji: '☎️',
        topic: 'Inclusion & accessibility',
        text:
          'You are welcome even if you have mobility limitations or other special needs — please get in touch with us. Where possible, we will support you with what you need.',
      },
      {
        emoji: '💰',
        topic: 'Tickets, cash & storms',
        text:
          'Grab a ticket in time — the festival runs entirely on volunteer work and is non-profit; prices mainly cover costs. In case of storms the event unfortunately cannot take place; we will then try to refund as much of the ticket price as possible — the exact amount depends on expenses incurred.',
      },
      {
        emoji: '🥦',
        topic: 'Food',
        text:
          'Various independent vendors run food stalls on their own. There will be vegan and vegetarian options among others. If you would like to run your own stall and earn something on the side, get in touch with us.',
      },
      {
        emoji: '⭐️',
        topic: 'Volunteer',
        text:
          'Whether setup or teardown, culinary ideas, performance or shift work — if you want to help, write to us at events@sonaria.ch or contact us on Instagram. We are looking for people for various shifts, food stall operators, and there is still room for art installations; every helping hand is welcome during teardown. Instagram: @sonaria.festival',
      },
    ],
  },
}

const pageContent = computed(() => faqContentByLocale[faqLocale.value])
const faqItems = computed(() => pageContent.value.items)

function toggleFaqLocale(): void {
  faqLocale.value = faqLocale.value === 'de' ? 'en' : 'de'
}

function faqSlug(slugSource: string): string {
  return slugSource
    .toLowerCase()
    .replaceAll(/[^\p{L}\p{N}]+/gu, '-')
    .replaceAll(/^-+|-+$/gu, '')
}

function faqAnchorId(index: number): string {
  const item = faqItems.value[index]
  const suffix = item ? faqSlug(item.topic) : ''
  const safe = suffix.length > 0 ? suffix : String(index)
  return `arti-${safe}`
}

useSeoMeta({
  title: () => `${siteName.value} — FAQ`,
  description: () => pageContent.value.seoDescription,
})

</script>
<style>
[data-faq-html] :where(a) {
  font-weight: 500;
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 0.125rem;
  transition: opacity 0.2s;
}

[data-faq-html] :where(a):hover {
  opacity: 0.8;
}

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
