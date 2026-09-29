import type { ContentSource } from '@/types'

/**
 * Reusable source references.
 *
 * All example content in this prototype should eventually be verified against
 * current Swedish regulations. Attach the relevant entries to each question or
 * theory chapter via `sources` so the UI can surface them.
 */
export const sources = {
  naturvardsverketJakt: {
    label: 'Naturvårdsverket – Jakt och vilt',
    publisher: 'Naturvårdsverket',
    url: 'https://www.naturvardsverket.se/amnesomraden/jakt-och-vilt/',
    retrievedAt: '2026-01-15',
  },
  naturvardsverketJakttider: {
    label: 'Naturvårdsverket – Jakttider',
    publisher: 'Naturvårdsverket',
    url: 'https://www.naturvardsverket.se/amnesomraden/jakt-och-vilt/jakttider/',
    retrievedAt: '2026-01-15',
  },
  naturvardsverketVapen: {
    label: 'Naturvårdsverkets föreskrifter om jakt och statens vilt',
    publisher: 'Naturvårdsverket',
    url: 'https://www.naturvardsverket.se/om-oss/foreskrifter/',
    retrievedAt: '2026-01-15',
  },
  jaktlagen: {
    label: 'Jaktlag (1987:259)',
    publisher: 'Sveriges riksdag',
    url: 'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/jaktlag-1987259_sfs-1987-259/',
    retrievedAt: '2026-01-15',
  },
  jaktforordningen: {
    label: 'Jaktförordning (1987:905)',
    publisher: 'Sveriges riksdag',
    url: 'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/jaktforordning-1987905_sfs-1987-905/',
    retrievedAt: '2026-01-15',
  },
  vapenlagen: {
    label: 'Vapenlag (1996:67)',
    publisher: 'Sveriges riksdag',
    url: 'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/vapenlag-199667_sfs-1996-67/',
    retrievedAt: '2026-01-15',
  },
  jagareforbundet: {
    label: 'Svenska Jägareförbundet – Vilt & vetande',
    publisher: 'Svenska Jägareförbundet',
    url: 'https://jagareforbundet.se/vilt/',
    retrievedAt: '2026-01-15',
  },
  viltolycksradet: {
    label: 'Nationella Viltolycksrådet',
    publisher: 'Nationella Viltolycksrådet',
    url: 'https://www.viltolycka.se/',
    retrievedAt: '2026-01-15',
  },
  livsmedelsverket: {
    label: 'Livsmedelsverket – Vilt och kött',
    publisher: 'Livsmedelsverket',
    url: 'https://www.livsmedelsverket.se/',
    retrievedAt: '2026-01-15',
  },
  polisenVapen: {
    label: 'Polisen – Vapentillstånd och förvaring',
    publisher: 'Polismyndigheten',
    url: 'https://polisen.se/tjanster-tillstand/vapen/',
    retrievedAt: '2026-01-15',
  },
} satisfies Record<string, ContentSource>

export type SourceKey = keyof typeof sources
