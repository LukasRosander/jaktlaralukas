import { sources } from '@/data/sources'
import type { TheoryChapter } from '@/types'

export const etikChapters: TheoryChapter[] = [
  {
    id: 'ch-etik-principer',
    categoryId: 'jaktetik',
    title: 'Etiska grundprinciper',
    summary: 'God jaktetik, respekt för viltet och besluten som bara jägaren själv kan fatta.',
    readingTimeMin: 7,
    blocks: [
      {
        kind: 'paragraph',
        text: 'Jaktetik är det som styr dina val när ingen ser. Lagen anger minimikraven, men etiken går längre: den handlar om respekt för viltet, för marken och för människorna runt jakten. De flesta etiska beslut fattas ensam, på ett pass, i några sekunder.',
      },
      { kind: 'heading', text: 'Det avstådda skottet' },
      {
        kind: 'paragraph',
        text: 'Den viktigaste etiska handlingen inom jakt är ofta att inte skjuta. Är du osäker på arten, på könet, på avståndet eller på kulfånget, är beslutet redan fattat: du avstår. Ett uteblivet skott kostar ingenting – ett felaktigt skott kan kosta ett djur onödigt lidande.',
      },
      {
        kind: 'fact',
        title: 'Fyra frågor före varje skott',
        text: 'Vet jag säkert vilken art och vilket djur det är? Står djuret så att skottet blir rätt placerat? Är avståndet inom min egen förmåga? Har jag ett säkert kulfång? Är svaret nej på någon av dem avstår du.',
      },
      { kind: 'heading', text: 'Respekt för det fällda djuret' },
      {
        kind: 'list',
        items: [
          'Hantera djuret värdigt och ta hand om köttet.',
          'Undvik onödig exponering av fällt vilt i offentliga miljöer.',
          'Inled eftersök omedelbart vid minsta tvekan om träffen.',
          'Avbryt jakten hellre än att genomföra den slarvigt.',
        ],
      },
      { kind: 'heading', text: 'Jakten och omvärlden' },
      {
        kind: 'paragraph',
        text: 'Jakt sker i marker där andra vistas. Informera om pågående jakt, visa hänsyn mot vandrare, bärplockare och boende, och kom ihåg att ditt uppträdande formar bilden av alla jägare.',
      },
      {
        kind: 'important',
        title: 'Viktigt att kunna',
        items: [
          'Att etiken går längre än lagens minimikrav.',
          'De fyra frågorna som ska besvaras före varje skott.',
          'Att du alltid avstår vid osäkerhet.',
          'Att eftersök ska inledas vid minsta tvekan om träffen.',
        ],
      },
    ],
    sources: [sources.jagareforbundet, sources.jaktlagen],
  },
]
