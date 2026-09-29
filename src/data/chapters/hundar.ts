import { sources } from '@/data/sources'
import type { TheoryChapter } from '@/types'

export const hundarChapters: TheoryChapter[] = [
  {
    id: 'ch-hund-raser',
    categoryId: 'jakthundar',
    title: 'Jakthundsraser och användning',
    summary: 'Hundtyper, deras arbetssätt, eftersökskravet och reglerna om tillsyn.',
    readingTimeMin: 8,
    blocks: [
      {
        kind: 'paragraph',
        text: 'Svenska jakthundar är avlade för olika uppgifter, och rasens arbetssätt avgör vilken jaktform den passar för. En bra jakthund är dessutom en förutsättning för effektiva eftersök, vilket gör hunden till en djurskyddsfråga och inte bara en jaktfråga.',
      },
      { kind: 'heading', text: 'Hundtyper och arbetssätt' },
      {
        kind: 'table',
        headings: ['Typ', 'Exempel', 'Arbetssätt'],
        rows: [
          ['Spetsar', 'Jämthund, norrbottenspets', 'Söker upp och håller vilt med ståndskall'],
          ['Stövare', 'Hamiltonstövare, schillerstövare', 'Driver hare och räv med skall'],
          ['Drivande kortbenta', 'Drever, taxar', 'Lugnt drev på klövvilt och hare'],
          ['Stötande och apporterande', 'Wachtelhund, retriever', 'Stöter upp och apporterar fågel'],
          ['Stående fågelhundar', 'Pointer, setter', 'Söker av mark och står för fågel'],
          ['Grythundar', 'Tax, terrier', 'Arbetar i gryt på räv och grävling'],
        ],
      },
      { kind: 'heading', text: 'Eftersök' },
      {
        kind: 'paragraph',
        text: 'Vid jakt efter bland annat älg, hjort, rådjur och vildsvin ska en hund som är särskilt lämpad för eftersök kunna finnas på plats inom två timmar från påskjutningen. Kravet gäller oavsett hur säkert skottet verkade sitta, och det är jaktlagets ansvar att lösa det innan jakten börjar.',
      },
      {
        kind: 'fact',
        title: 'Tillsyn 1 mars – 20 augusti',
        text: 'Under den period då viltet har ungar ska hundar hållas under sådan tillsyn att de hindras från att driva eller förfölja vilt. Även under resten av året gäller ett allmänt tillsynsansvar.',
      },
      { kind: 'heading', text: 'Hundens säkerhet' },
      {
        kind: 'list',
        items: [
          'Använd pejl och skyddsväst vid vildsvinsjakt.',
          'Se till att hunden är vaccinerad och försäkrad.',
          'Ha med förbandsmaterial anpassat för hund.',
          'Undvik jakt i stark värme och se till att hunden får vatten.',
        ],
      },
      {
        kind: 'important',
        title: 'Viktigt att kunna',
        items: [
          'Vilka hundtyper som används för vilka jaktformer.',
          'Att eftersökshund ska kunna vara på plats inom två timmar.',
          'Reglerna om tillsyn 1 mars – 20 augusti.',
          'Att hundens säkerhet är en del av jaktplaneringen.',
        ],
      },
    ],
    sources: [sources.jaktforordningen, sources.jaktlagen, sources.jagareforbundet],
  },
]
