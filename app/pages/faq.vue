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
            Short answers below — tap a topic to reveal the full reply.
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

/** FAQ entries — edit topics and answers here */
const faqItems: readonly FaqItem[] = [
  {
    topic: 'When and where is the festival?',
    text: 'Programming and exact dates are announced on our channels closer to the event. Subscribe or check back — we will include gate times and how to reach the site.',
  },
  {
    topic: 'How do tickets work?',
    text: 'Ticket types and release waves are published when sales open. Read the conditions on the ticket page for refunds, resale, and ID checks.',
  },
  {
    topic: 'What can I bring?',
    text: 'A clear bag policy or restrictions may apply. We publish a full FAQ for accessibility, lockers, cashless payment, and what is allowed at the entrance.',
  },
  {
    topic: 'Code of conduct & safety',
    text: 'We want everyone to feel welcome. Stewarding and welfare teams are on site — if something feels wrong, speak to staff or security right away.',
  },
]

function faqSlug(topic: string): string {
  return topic
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/gu, '-')
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
  description: 'Frequently asked questions about Sonaria.',
})

const isTouchDevice = useMediaQuery('(pointer: coarse)')
const isLandscape = useMediaQuery('(orientation: landscape)')
</script>
