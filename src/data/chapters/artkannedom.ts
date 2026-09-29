import { sources } from '@/data/sources'
import type { TheoryChapter } from '@/types'

export const artkannedomChapters: TheoryChapter[] = [
  {
    id: 'ch-art-i-falt',
    categoryId: 'artkannedom',
    title: 'Känna igen arter i fält',
    summary: 'Metodik för säker artbestämning: siluett, storlek, rörelse, ljud och spår.',
    readingTimeMin: 9,
    blocks: [
      {
        kind: 'paragraph',
        text: 'Artkännedom är det område där flest tappar poäng på jägarexamen, och samtidigt det som avgör om jakten blir laglig. I fält har du sällan perfekt ljus eller gott om tid. Därför behöver du en metod som fungerar även på halvdåliga observationer.',
      },
      { kind: 'heading', text: 'Arbeta i ordning' },
      {
        kind: 'list',
        items: [
          'Siluett och kroppsform – vilken djurgrupp är det?',
          'Storlek i förhållande till omgivningen – jämför med stubbar, buskar och andra djur.',
          'Färg och teckning – spegel, svans, ansiktsmask, vingband.',
          'Rörelsemönster – gångart, flyktbild, vingslagsfrekvens.',
          'Ljud – lockrop, varningsläte, vingbrus.',
        ],
      },
      {
        kind: 'fact',
        title: 'Spegel och svans avgör ofta',
        text: 'Hos hjortdjuren är kombinationen spegel och svans det snabbaste kännetecknet: rådjur har vit spegel och nästan ingen svans, dovhjort har vit spegel med svart kantning och lång svans, kronhjort har gulbeige spegel utan kantning.',
      },
      { kind: 'heading', text: 'Vanliga förväxlingar' },
      {
        kind: 'table',
        headings: ['Arter som förväxlas', 'Avgörande skillnad'],
        rows: [
          ['Tjäder / orre', 'Orren har lyrformad stjärt och vita vingband'],
          ['Skogshare / fälthare', 'Skogsharen blir vit med svarta öronspetsar'],
          ['Grävling / mårdhund', 'Grävlingen har längsgående svartvita ansiktsstrimmor'],
          ['Kronhjort / dovhjort', 'Dovhjortens spegel är svartkantad, svansen lång'],
          ['Grågås / kanadagås', 'Kanadagåsen har svart hals med vit kindfläck'],
        ],
      },
      { kind: 'heading', text: 'Spår och spårtecken' },
      {
        kind: 'paragraph',
        text: 'Spår i snö eller mjuk mark berättar mycket: klövspårets storlek och form, avståndet mellan spåren, spillning, gnagmärken och betesskador. Spårkunskap kompletterar den visuella artbestämningen och är ofta avgörande vid eftersök.',
      },
      {
        kind: 'important',
        title: 'Viktigt att kunna',
        items: [
          'Att arbeta systematiskt: siluett, storlek, teckning, rörelse, ljud.',
          'De vanligaste förväxlingsparen och vad som skiljer dem.',
          'Att fredade arter aldrig får förväxlas med jaktbara.',
          'Att du alltid avstår från skott vid osäker artbestämning.',
        ],
      },
    ],
    sources: [sources.jagareforbundet, sources.naturvardsverketJakttider],
  },
]
