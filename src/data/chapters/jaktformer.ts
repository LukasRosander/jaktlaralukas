import { sources } from '@/data/sources'
import type { TheoryChapter } from '@/types'

export const jaktformerChapters: TheoryChapter[] = [
  {
    id: 'ch-form-vanliga',
    categoryId: 'jaktformer',
    title: 'Vanliga jaktformer',
    summary: 'Passkytte, smygjakt, vakjakt och åteljakt – när de används och vad de kräver.',
    readingTimeMin: 8,
    blocks: [
      {
        kind: 'paragraph',
        text: 'Valet av jaktform styrs av art, terräng, årstid, antal jägare och tillgång till hund. Varje form har sina egna säkerhetsfrågor, och den som förstår formen kan planera skottillfällena i förväg istället för att improvisera.',
      },
      { kind: 'heading', text: 'Passkytte' },
      {
        kind: 'paragraph',
        text: 'Jägaren står eller sitter på ett tilldelat pass medan viltet drivs eller rör sig naturligt. Jaktledaren anger passets läge, tillåtna skjutriktningar och var grannpassen finns. Passkytte kräver disciplin: du lämnar aldrig passet utan besked och skjuter aldrig utanför din tilldelade sektor.',
      },
      { kind: 'heading', text: 'Smygjakt' },
      {
        kind: 'paragraph',
        text: 'Vid smygjakt rör du dig långsamt och tyst med vinden i ansiktet, stannar ofta och söker av terrängen med kikare. Formen ger få men ofta nära skottillfällen och ställer höga krav på artkännedom eftersom besluten måste fattas snabbt.',
      },
      { kind: 'heading', text: 'Vakjakt och jakt från torn' },
      {
        kind: 'paragraph',
        text: 'Vid vakjakt väntar jägaren in viltet på en plats där det rör sig, ofta i skymning eller gryning. Ett jakttorn ger överblick, bättre vindförhållanden och en nedåtriktad skottvinkel där marken kan fungera som kulfång. Kravet på säkert kulfång gäller ändå alltid.',
      },
      {
        kind: 'fact',
        title: 'Åteljakt',
        text: 'Vid åteljakt lockas viltet till en utlagd foderplats. Formen används främst på vildsvin och kräver god kännedom om lokala regler, säkra skjutriktningar och ett väl förberett kulfång.',
      },
      {
        kind: 'important',
        title: 'Viktigt att kunna',
        items: [
          'Att du aldrig lämnar ditt pass utan jaktledarens besked.',
          'Att skjutsektorn alltid måste vara klarlagd innan jakten startar.',
          'Att jakttorn ger säkrare skottvinkel men inte tar bort kravet på kulfång.',
          'Att smygjakt ställer extra höga krav på snabb artbestämning.',
        ],
      },
    ],
    sources: [sources.jagareforbundet],
  },
  {
    id: 'ch-form-drev',
    categoryId: 'jaktformer',
    title: 'Jakt med hund och drev',
    summary: 'Drevjakt, ståndskall och tryckjakt – organisation, signaler och säkerhet.',
    readingTimeMin: 7,
    blocks: [
      {
        kind: 'paragraph',
        text: 'Jakt med hund är en central del av svensk jakttradition. Hunden hittar, driver eller ställer viltet, och jägaren måste kunna tolka hundarbetet för att förstå var viltet är och i vilken riktning det rör sig.',
      },
      { kind: 'heading', text: 'Drevjakt och tryckjakt' },
      {
        kind: 'paragraph',
        text: 'Vid drevjakt driver hundar viltet mot passkyttar. Tryckjakt är en lugnare variant där ett fåtal drevkarlar eller hundar rör sig genom området och får viltet att förflytta sig i normal takt, vilket ger bättre skottillfällen och säkrare artbedömning.',
      },
      { kind: 'heading', text: 'Ståndskall' },
      {
        kind: 'paragraph',
        text: 'Spetsar som jämthund och norrbottenspets används för att spåra upp älg och hålla den med ståndskall tills jägaren kan smyga fram. Hundens skall talar om både position och om djuret står eller går.',
      },
      {
        kind: 'fact',
        title: 'Jaktledarens genomgång',
        text: 'En säker hundjakt börjar alltid med en genomgång: passens placering, tillåtna skjutriktningar, grannpassens läge, vilka djur som får fällas, signaler för jaktstart och jaktslut samt hur eftersök hanteras.',
      },
      {
        kind: 'list',
        items: [
          'Kontrollera alltid att hund eller drevkarl inte finns i skottriktningen.',
          'Skjut aldrig mot vilt som följs tätt av hund om kulfånget är osäkert.',
          'Ha telefon eller radio och vetskap om hur sällskapet larmas.',
          'Använd varselplagg vid jakt med flera deltagare.',
        ],
      },
      {
        kind: 'important',
        title: 'Viktigt att kunna',
        items: [
          'Skillnaden mellan drevjakt, tryckjakt och ståndskallsjakt.',
          'Att hundens position alltid måste vara känd innan skott.',
          'Vad jaktledarens genomgång ska innehålla.',
          'Att eftersökshund ska kunna finnas på plats inom två timmar vid klövviltsjakt.',
        ],
      },
    ],
    sources: [sources.jagareforbundet, sources.jaktforordningen],
  },
]
