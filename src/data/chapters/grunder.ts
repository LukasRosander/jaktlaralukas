import { sources } from '@/data/sources'
import type { TheoryChapter } from '@/types'

export const grunderChapters: TheoryChapter[] = [
  {
    id: 'ch-grund-intro',
    categoryId: 'jaktens-grunder',
    title: 'Vad är jägarexamen?',
    summary: 'Provets delar, vad som krävs för att jaga och hur du lägger upp dina studier.',
    readingTimeMin: 7,
    blocks: [
      {
        kind: 'paragraph',
        text: 'Jägarexamen är den kunskapsprövning som krävs för att få jaga i Sverige och för att kunna ansöka om licens för jaktvapen. Examen består av ett teoretiskt prov och flera praktiska prov, och den prövar både kunskap och handlag. Målet är att varje jägare ska kunna identifiera vilt säkert, hantera vapen ansvarsfullt och fatta rätt beslut i fält.',
      },
      { kind: 'heading', text: 'Provets delar' },
      {
        kind: 'paragraph',
        text: 'Det teoretiska provet täcker allt från artkännedom och viltvård till vapenteknik, säkerhet och lagstiftning. De praktiska proven prövar din vapenhantering och ditt skytte i situationer som liknar verklig jakt. Du anmäler dig hos en provledare som är förordnad av Naturvårdsverket.',
      },
      {
        kind: 'list',
        items: [
          'Teoretiskt prov – kunskapsfrågor över hela kursinnehållet.',
          'Grundprov – säker hantering av kulgevär och hagelgevär.',
          'Högviltprov – skytte mot älgfigur på bestämt avstånd.',
          'Praktiskt hagelgevärsprov – rörliga mål i olika vinklar.',
        ],
      },
      {
        kind: 'fact',
        title: 'Tre saker måste stämma innan du jagar',
        text: 'Godkänd jägarexamen, betald viltvårdsavgift för det aktuella jaktåret och rätt att jaga på marken. Saknas något av dem är jakten olaglig – även om du har vapenlicens.',
      },
      { kind: 'heading', text: 'Så lägger du upp studierna' },
      {
        kind: 'paragraph',
        text: 'De flesta som klarar provet första gången har studerat regelbundet under flera veckor istället för intensivt under några dagar. Läs ett kapitel i taget, träna frågor direkt efteråt och gör hela provsimuleringar i slutet. Artkännedom och lagstiftning är de områden där flest tappar poäng, så lägg extra tid där.',
      },
      {
        kind: 'important',
        title: 'Viktigt att kunna',
        items: [
          'Vilka delar jägarexamen består av.',
          'Att viltvårdsavgiften ska vara betald för varje jaktår.',
          'Att jakträtten följer marken och måste upplåtas till dig.',
          'Att jägarexamen krävs för licens på jaktvapen.',
        ],
      },
    ],
    sources: [sources.naturvardsverketJakt, sources.jaktlagen],
  },
  {
    id: 'ch-grund-ansvar',
    categoryId: 'jaktens-grunder',
    title: 'Jägarens roll och ansvar',
    summary: 'Viltvård, förvaltning och den förtroendeposition jägaren har i samhället.',
    readingTimeMin: 6,
    blocks: [
      {
        kind: 'paragraph',
        text: 'Jakt i Sverige bygger på ett förtroende. Samhället låter enskilda personer bruka en gemensam naturresurs, och i utbyte förväntas jägaren vårda viltet, följa reglerna och uppträda på ett sätt som tål att granskas. Jaktlagen uttrycker det som att viltet ska vårdas – jakt och viltvård hör ihop.',
      },
      { kind: 'heading', text: 'Jägaren som förvaltare' },
      {
        kind: 'paragraph',
        text: 'Avskjutning är ett förvaltningsverktyg. Genom att anpassa uttaget efter stammens storlek, könsfördelning och markens bärkraft kan jägare påverka betesskador, trafikolyckor och djurens hälsa. Det kräver att du rapporterar vad du fäller och deltar i inventeringar.',
      },
      {
        kind: 'list',
        items: [
          'Rapportera fällt vilt enligt de rutiner som gäller i älgskötselområdet eller jaktlaget.',
          'Delta i inventering av vilt och betesskador.',
          'Anpassa uttaget efter avskjutningsplan och stammens utveckling.',
          'Bidra till biotopvård, till exempel viltåkrar och kantzoner.',
        ],
      },
      {
        kind: 'fact',
        title: 'Allemansrätten omfattar inte jakt',
        text: 'Du får vistas i naturen med stöd av allemansrätten, men aldrig jaga. Jakt kräver alltid jakträtt, som du får av markägaren eller genom ett jaktlag.',
      },
      { kind: 'heading', text: 'Hur du uppträder spelar roll' },
      {
        kind: 'paragraph',
        text: 'Många människor möter jakten genom det de ser: fordon på skogsbilvägar, vapen som bärs över öppen mark, varningsskyltar vid jakt. Ett korrekt och hänsynsfullt uppträdande – och tydlig information till närboende och friluftsliv – är en del av jägarens ansvar.',
      },
      {
        kind: 'important',
        title: 'Viktigt att kunna',
        items: [
          'Att jaktlagen kopplar samman jakt och skyldigheten att vårda viltet.',
          'Att avskjutning är ett förvaltningsverktyg som kräver rapportering.',
          'Att allemansrätten aldrig ger jakträtt.',
          'Att jägaren har ett ansvar för hur jakten uppfattas av andra.',
        ],
      },
    ],
    sources: [sources.jaktlagen, sources.naturvardsverketJakt],
  },
]
