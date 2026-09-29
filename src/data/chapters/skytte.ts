import { sources } from '@/data/sources'
import type { TheoryChapter } from '@/types'

export const skytteChapters: TheoryChapter[] = [
  {
    id: 'ch-skytte-teknik',
    categoryId: 'skytte',
    title: 'Skjutteknik och träffsäkerhet',
    summary: 'Skjutställningar, andning, avfyrning, träffområde och inskjutning.',
    readingTimeMin: 9,
    blocks: [
      {
        kind: 'paragraph',
        text: 'Träffsäkerhet är en djurskyddsfråga. Den som skjuter säkert kan också avstå från osäkra skott, eftersom hen vet var gränsen går. Grunden läggs på skjutbanan, inte i jaktmarken.',
      },
      { kind: 'heading', text: 'Skjutställningar' },
      {
        kind: 'list',
        items: [
          'Liggande – stabilast, används när terrängen tillåter.',
          'Sittande – bra kompromiss mellan stabilitet och överblick.',
          'Knästående – snabb att ta, måttlig stabilitet.',
          'Stående – minst stabil, används med stöd när det är möjligt.',
        ],
      },
      {
        kind: 'paragraph',
        text: 'Använd stöd så snart du kan: en trädstam, en skjutkäpp, tornets kant eller ryggsäcken. Ett stöd som eliminerar sidorörelser förbättrar träffbilden mer än de flesta andra åtgärder.',
      },
      { kind: 'heading', text: 'Avfyrning' },
      {
        kind: 'paragraph',
        text: 'Andas ut lugnt och håll andan i den naturliga pausen. Låt fingret ta upp trycket mjukt och rakt bakåt, och behåll siktbilden genom skottet. Rycker du i avtryckaren flyttas träffen ofta flera decimeter på jaktavstånd.',
      },
      {
        kind: 'fact',
        title: 'Träffområdet på klövvilt',
        text: 'Sikta i lung- och hjärtregionen strax bakom framben och bog. Området är stort, ger snabb död och lämnar marginal för små fel. Skott mot buk och bakdel ger onödigt lidande och svåra eftersök.',
      },
      { kind: 'heading', text: 'Inskjutning och kontroll' },
      {
        kind: 'paragraph',
        text: 'Inskjutning innebär att du justerar siktet så att träffpunkten stämmer med siktpunkten på ett valt avstånd, ofta 100 meter. Kontrollera inskjutningen varje säsong, efter transportskador och alltid när du byter ammunition.',
      },
      {
        kind: 'important',
        title: 'Viktigt att kunna',
        items: [
          'Att liggande ställning är stabilast och stående minst stabil.',
          'Att träffområdet på klövvilt ligger bakom bogen i lungregionen.',
          'Att avtryckaren ska tas mjukt rakt bakåt.',
          'Att inskjutningen ska kontrolleras varje säsong och vid ammunitionsbyte.',
          'Att rimligt hagelavstånd oftast är omkring 25–30 meter.',
        ],
      },
    ],
    sources: [sources.jagareforbundet, sources.naturvardsverketJakt],
  },
]
