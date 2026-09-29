import { sources } from '@/data/sources'
import type { TheoryChapter } from '@/types'

export const vapenChapters: TheoryChapter[] = [
  {
    id: 'ch-vapen-gevar',
    categoryId: 'vapen-och-ammunition',
    title: 'Kulgevär och hagelgevär',
    summary: 'Vapentyper, mekanismer, vapenklasser samt regler för förvaring och transport.',
    readingTimeMin: 10,
    blocks: [
      {
        kind: 'paragraph',
        text: 'Jaktvapen delas in i kulvapen och hagelvapen. Kulvapnet skjuter en enda projektil med hög precision på längre avstånd, medan hagelvapnet sprider en svärm av hagel och används på kortare håll mot rörliga mål. Kombinationsvapen finns också, med både kul- och hagelpipa.',
      },
      { kind: 'heading', text: 'Mekanismer' },
      {
        kind: 'list',
        items: [
          'Cylindermekanism – vanligast på kulgevär, driftsäker och exakt.',
          'Rak repetermekanism – snabb omladdning med bibehållen kindkontakt.',
          'Halvautomat – laddar om automatiskt, kräver extra noggrann hantering.',
          'Brytvapen – hagelgevär och kombinationsvapen som öppnas för laddning.',
        ],
      },
      { kind: 'heading', text: 'Vapenklasser för kulvapen' },
      {
        kind: 'paragraph',
        text: 'Kulvapen delas in i klasser efter hur mycket energi kulan har kvar på 100 meter. Klass 1 har det högsta kravet och används för det största klövviltet, medan lägre klasser används för mindre vilt. Klassen avgör vilka arter du får jaga med vapnet.',
      },
      {
        kind: 'table',
        headings: ['Klass', 'Används bland annat för'],
        rows: [
          ['Klass 1', 'Älg, kronhjort, dovhjort, vildsvin, björn'],
          ['Klass 2', 'Rådjur, mufflonfår och liknande vilt'],
          ['Klass 3', 'Räv, bäver, gås och liknande'],
          ['Klass 4', 'Mindre vilt som hare och skogsfågel'],
        ],
      },
      {
        kind: 'fact',
        title: 'Hagelgevärets laddning vid jakt',
        text: 'Vid jakt får ett hagelgevär vara laddat med högst två patroner i magasinet och en i loppet. Begränsningen minskar risken för överilade skott.',
      },
      { kind: 'heading', text: 'Förvaring och transport' },
      {
        kind: 'paragraph',
        text: 'Vapen ska förvaras så att obehöriga inte kan komma åt dem, i praktiken i ett godkänt säkerhetsskåp. Vid transport ska vapnet vara oladdat, ligga i fodral eller väska och inte vara lätt åtkomligt. Lämna aldrig vapen i ett obevakat fordon.',
      },
      {
        kind: 'important',
        title: 'Viktigt att kunna',
        items: [
          'Att klass 1 krävs för det största klövviltet.',
          'Att vapenklassen bestäms av anslagsenergin på 100 meter.',
          'Att hagelgevär vid jakt får ha högst tre patroner totalt.',
          'Reglerna för säker förvaring och transport.',
        ],
      },
    ],
    sources: [sources.naturvardsverketVapen, sources.vapenlagen, sources.polisenVapen],
  },
  {
    id: 'ch-vapen-ammunition',
    categoryId: 'vapen-och-ammunition',
    title: 'Ammunition och ballistik',
    summary: 'Patronens delar, kultyper, anslagsenergi, kulbana och hagelstorlekar.',
    readingTimeMin: 9,
    blocks: [
      {
        kind: 'paragraph',
        text: 'En patron består av hylsa, tändhatt, krut och projektil. När tändhatten slås an antänds krutet, trycket stiger och projektilen pressas genom loppet. Räfflorna ger kulan rotation, vilket stabiliserar den i luften.',
      },
      { kind: 'heading', text: 'Kultyper' },
      {
        kind: 'paragraph',
        text: 'Vid jakt efter klövvilt ska kulan expandera, så att den avger sin energi inne i djuret och ger snabb död. Helmantlade kulor är inte tillåtna för sådan jakt eftersom de riskerar att gå rakt igenom utan tillräcklig verkan. Blyfria alternativ blir alltmer vanliga och kräver ofta justerad inskjutning.',
      },
      {
        kind: 'fact',
        title: 'Anslagsenergi',
        text: 'Anslagsenergi är kulans rörelseenergi vid träffen, mätt i joule. Den beror på kulans vikt och hastighet, där hastigheten har störst betydelse. Energin används för att definiera vapenklasserna.',
      },
      { kind: 'heading', text: 'Kulbanan' },
      {
        kind: 'paragraph',
        text: 'Kulan färdas i en bana som böjs nedåt av tyngdkraften. Vid inskjutning på 100 meter ligger kulan något högt på kortare avstånd och faller därefter allt snabbare. Känn din ammunitions kulbana, och förstå att en kula kan gå flera kilometer om den inte stoppas.',
      },
      { kind: 'heading', text: 'Hagelammunition' },
      {
        kind: 'paragraph',
        text: 'Hagelpatroner anges med hagelstorlek och laddningsvikt. Grövre hagel har bättre genomslag men ger färre träffar i svärmen, medan finare hagel ger tätare svärm på korta avstånd. Chokens trängning påverkar hur snabbt svärmen sprider sig. Blyhagel är förbjudet vid jakt i våtmarksmiljöer.',
      },
      {
        kind: 'important',
        title: 'Viktigt att kunna',
        items: [
          'Patronens fyra delar.',
          'Att expanderande kula krävs vid jakt efter klövvilt.',
          'Vad anslagsenergi är och vad den beror på.',
          'Att en kula kan gå flera kilometer – kulfånget är alltid ditt ansvar.',
          'Att blyhagel inte får användas vid jakt i våtmark.',
        ],
      },
    ],
    sources: [sources.naturvardsverketVapen, sources.jaktforordningen],
  },
]
