import { sources } from '@/data/sources'
import type { TheoryChapter } from '@/types'

export const lagstiftningChapters: TheoryChapter[] = [
  {
    id: 'ch-lag-jaktlagen',
    categoryId: 'lagstiftning',
    title: 'Jaktlagen och jaktförordningen',
    summary: 'Regelverkets uppbyggnad, fredning, jakträtt, statens vilt och eftersöksplikt.',
    readingTimeMin: 10,
    blocks: [
      {
        kind: 'paragraph',
        text: 'Svensk jaktlagstiftning är uppbyggd i nivåer. Riksdagen beslutar om jaktlagen, regeringen om jaktförordningen och Naturvårdsverket utfärdar föreskrifter. Länsstyrelserna fattar beslut i regionala frågor, till exempel om licensjakt och skyddsjakt. Alla nivåer måste följas.',
      },
      { kind: 'heading', text: 'Viltet är fredat' },
      {
        kind: 'paragraph',
        text: 'Grundprincipen är att allt vilt är fredat. Jakt är alltså tillåten först när en jakttid, ett beslut eller en särskild bestämmelse öppnar för den. Med vilt avses vilda däggdjur och fåglar – fisk och insekter omfattas av annan lagstiftning.',
      },
      {
        kind: 'fact',
        title: 'Jakträtten följer marken',
        text: 'Fastighetsägaren har jakträtten om den inte har upplåtits till någon annan. Allemansrätten ger aldrig rätt att jaga, och du måste kunna visa att du har jakträtt på den mark du jagar på.',
      },
      { kind: 'heading', text: 'Statens vilt' },
      {
        kind: 'paragraph',
        text: 'Ett antal utpekade arter är statens vilt, bland annat björn, varg, lodjur, järv och kungsörn. Påträffas de döda eller fälls de ska de anmälas, och de tillfaller staten. Fallvilt av dessa arter får inte tas om hand av enskild.',
      },
      { kind: 'heading', text: 'Eftersöksplikt' },
      {
        kind: 'paragraph',
        text: 'Den som skadar vilt vid jakt är skyldig att snarast göra vad som behövs för att djuret ska kunna spåras upp och avlivas. Vid jakt efter bland annat älg, hjort, rådjur och vildsvin ska en hund som är särskilt lämpad för eftersök kunna vara på plats inom två timmar.',
      },
      { kind: 'heading', text: 'Otillåtna metoder' },
      {
        kind: 'list',
        items: [
          'Jakt från motordrivet fordon är förbjuden, utom i särskilt medgivna undantagsfall.',
          'Pilbåge och armborst är inte tillåtna jaktvapen i Sverige.',
          'Endast typgodkända fångstredskap får användas.',
          'Blyhagel får inte användas vid jakt i våtmarksmiljöer.',
          'Vilt får inte jagas med hjälp av inspelade lockljud annat än när det uttryckligen tillåts.',
        ],
      },
      {
        kind: 'important',
        title: 'Viktigt att kunna',
        items: [
          'Regelverkets nivåer: lag, förordning, föreskrifter och länsstyrelsebeslut.',
          'Att allt vilt är fredat som grundprincip.',
          'Att jakträtten tillhör fastighetsägaren om den inte upplåtits.',
          'Vilka arter som är statens vilt.',
          'Att eftersöksplikten gäller omedelbart vid skadeskjutning.',
        ],
      },
    ],
    sources: [sources.jaktlagen, sources.jaktforordningen, sources.naturvardsverketJakt],
  },
  {
    id: 'ch-lag-vapen-jakttider',
    categoryId: 'lagstiftning',
    title: 'Vapenlagstiftning och jakttider',
    summary: 'Licens, förvaring, viltvårdsavgiften och hur du hittar rätt jakttid.',
    readingTimeMin: 8,
    blocks: [
      {
        kind: 'paragraph',
        text: 'Vapenlagen reglerar rätten att inneha skjutvapen. För jaktvapen krävs licens från Polismyndigheten, och godkänd jägarexamen är en förutsättning för att ansöka. Licensen är knuten till dig och till ett visst vapen för ett visst ändamål.',
      },
      { kind: 'heading', text: 'Förvaring' },
      {
        kind: 'paragraph',
        text: 'Vapen ska förvaras så att obehöriga inte kommer åt dem, i praktiken i ett godkänt säkerhetsskåp. Ammunition ska förvaras säkert enligt gällande krav. Den som lånar ut ett vapen ansvarar för att låntagaren har rätt att inneha det.',
      },
      {
        kind: 'fact',
        title: 'Viltvårdsavgiften',
        text: 'Alla som jagar i Sverige ska betala viltvårdsavgiften för det aktuella jaktåret. Kvittot – det statliga jaktkortet – ska kunna visas upp vid kontroll. Avgiften finansierar viltvård och forskning.',
      },
      { kind: 'heading', text: 'Jakttider' },
      {
        kind: 'paragraph',
        text: 'Jakttiderna framgår av bilagorna till jaktförordningen och kan skilja sig mellan län och områden. De ändras över tid, så kontrollera alltid aktuella tider inför säsongen. Länsstyrelsen kan besluta om avvikelser, och för älg beslutas jaktstarten regionalt.',
      },
      {
        kind: 'table',
        headings: ['Begrepp', 'Innebörd'],
        rows: [
          ['Allmän jakttid', 'Period då arten får jagas av den som har jakträtt'],
          ['Licensjakt', 'Begränsad jakt efter beslut, med kvot och rapportering'],
          ['Skyddsjakt', 'Jakt för att förebygga skada, efter beslut eller enligt bilaga'],
          ['Fredning', 'Period då arten inte får jagas'],
        ],
      },
      {
        kind: 'important',
        title: 'Viktigt att kunna',
        items: [
          'Att jägarexamen krävs för att ansöka om licens på jaktvapen.',
          'Att vapen ska förvaras i godkänt säkerhetsskåp.',
          'Att viltvårdsavgiften ska vara betald för varje jaktår.',
          'Var jakttiderna finns och att de varierar mellan län.',
          'Skillnaden mellan allmän jakttid, licensjakt och skyddsjakt.',
        ],
      },
    ],
    sources: [
      sources.vapenlagen,
      sources.polisenVapen,
      sources.jaktforordningen,
      sources.naturvardsverketJakttider,
    ],
  },
]
