export type AppNavItem = Readonly<{
  label: string
  to: string
}>

const NAV_MAIN: readonly AppNavItem[] = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Legal',
    to: '/legal',
  },
] as const

const NAV_FOOTER: readonly AppNavItem[] = [
  {
    label: 'Legal',
    to: '/legal',
  },
] as const

export const useAppNavigation = (): Readonly<{
  main: readonly AppNavItem[]
  footer: readonly AppNavItem[]
}> => {
  return {
    main: NAV_MAIN,
    footer: NAV_FOOTER,
  }
}

