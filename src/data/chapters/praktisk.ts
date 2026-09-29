import { sources } from '@/data/sources'
import type { TheoryChapter } from '@/types'

export const praktiskChapters: TheoryChapter[] = [
  {
    id: 'ch-prak-skott-till-kott',
    categoryId: 'praktisk-jakt',
    title: 'Från skott till kött',
    summary: 'Skottecken, eftersök, urtagning, nedkylning och livsmedelssäkerhet.',
    readingTimeMin: 10,
    blocks: [
      {
        kind: 'paragraph',
        text: 'Arbetet börjar när skottet har gått. Hur du agerar de närmaste minuterna avgör både om ett skadat djur hittas snabbt och om köttet blir ett bra livsmedel.',
      },
      { kind: 'heading', text: 'Skottecken' },
      {
        kind: 'paragraph',
        text: 'Skottecken är all information du samlar direkt efter skottet: djurets reaktion, ljudet av träffen, flyktriktning samt hår, ben, blod och vävnad på platsen. Markera din skottplats och den plats där du sist såg djuret innan du börjar söka.',
      },
      {
        kind: 'list',
        items: [
          'Ljust blod med luftbubblor tyder på lungträff.',
          'Mörkt blod med fodermaterial tyder på träff i mag-tarmregionen.',
          'Vitt, grovt hår kan tyda på lågt sittande skott.',
          'Rejält blodspår som avtar snabbt kan betyda ytlig träff.',
        ],
      },
      {
        kind: 'fact',
        title: 'Vänta rätt tid',
        text: 'Vid osäker träff är det oftast bättre att vänta en stund och kalla in eftersökshund än att omedelbart följa spåret och driva djuret längre bort. Följ jaktlagets rutin och kontakta eftersöksekipaget tidigt.',
      },
      { kind: 'heading', text: 'Urtagning och nedkylning' },
      {
        kind: 'paragraph',
        text: 'Ta ur djuret så snart som möjligt och arbeta rent. Kroppsvärmen ger bakterier goda förhållanden, så snabb nedkylning är avgörande. Häng djuret luftigt eller kyl det aktivt – lägg aldrig varmt kött i en tät plastsäck.',
      },
      {
        kind: 'list',
        items: [
          'Använd rena, vassa knivar och tvätta händerna.',
          'Undvik att skada mag- och tarmkanalen.',
          'Kyl ner till låg temperatur så snabbt förhållandena tillåter.',
          'Dokumentera fällplats och datum för spårbarhet.',
        ],
      },
      { kind: 'heading', text: 'Livsmedelssäkerhet' },
      {
        kind: 'paragraph',
        text: 'Kött från vildsvin ska trikinundersökas av ett godkänt laboratorium innan det äts eller lämnas vidare. Var uppmärksam på tecken på sjukdom hos fällt vilt – avvikande beteende, avmagring, bölder eller missfärgade organ – och lämna in prov vid misstanke.',
      },
      {
        kind: 'important',
        title: 'Viktigt att kunna',
        items: [
          'Vad skottecken är och hur de tolkas.',
          'Att skottplats och sista observationsplats ska markeras.',
          'Att urtagning och nedkylning ska ske snabbt.',
          'Att varmt kött aldrig läggs i tät plastsäck.',
          'Att vildsvinskött måste trikinundersökas.',
        ],
      },
    ],
    sources: [sources.livsmedelsverket, sources.jagareforbundet, sources.jaktlagen],
  },
]
