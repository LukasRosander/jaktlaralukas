import { sources } from '@/data/sources'
import type { TheoryChapter } from '@/types'

export const ekologiChapters: TheoryChapter[] = [
  {
    id: 'ch-eko-ekosystem',
    categoryId: 'viltvard-och-ekologi',
    title: 'Ekosystem och biotoper',
    summary: 'Hur biotop, bärkraft och näringskedjor styr hur mycket vilt en mark kan hålla.',
    readingTimeMin: 8,
    blocks: [
      {
        kind: 'paragraph',
        text: 'Ett ekosystem består av alla levande organismer i ett område tillsammans med den icke-levande miljön: mark, vatten, klimat och näringsämnen. Viltet är en del av detta system, och varje art är anpassad till en viss livsmiljö – sin biotop. Förstår du biotopen förstår du också var viltet finns och varför.',
      },
      { kind: 'heading', text: 'Biotop och bärkraft' },
      {
        kind: 'paragraph',
        text: 'Biotopen avgör tillgången på föda, skydd mot väder och rovdjur samt möjligheten att föda upp ungar. Bärkraften är den viltstam som marken långsiktigt kan försörja utan att biotopen försämras eller djuren far illa. Bärkraften varierar mellan årstider – vinterns födotillgång sätter ofta den övre gränsen.',
      },
      {
        kind: 'fact',
        title: 'Minimifaktorn',
        text: 'Det är alltid den knappaste resursen som begränsar stammen. Finns det gott om sommarbete men brist på vinterföda är det vinterfödan som sätter taket, oavsett hur bra övriga förhållanden är.',
      },
      { kind: 'heading', text: 'Näringskedjor och samspel' },
      {
        kind: 'paragraph',
        text: 'Växter binder solenergi, växtätare omvandlar den till kroppsmassa och rovdjur lever på växtätarna. Rovdjur, sjukdomar, väder och jakt verkar tillsammans som dödlighetsfaktorer. Ökar en faktor kan en annan minska – jakt ersätter i stor utsträckning annan dödlighet snarare än att läggas ovanpå den.',
      },
      {
        kind: 'list',
        items: [
          'Kantzoner mellan skog och öppen mark är ofta de artrikaste miljöerna.',
          'Lövrik ungskog ger både foder och skydd för klövvilt.',
          'Våtmarker är avgörande för sjöfågel och en mängd insekter.',
          'Död ved och gamla träd skapar livsmiljöer för fåglar och smådjur.',
        ],
      },
      {
        kind: 'important',
        title: 'Viktigt att kunna',
        items: [
          'Vad biotop och bärkraft innebär.',
          'Att den knappaste resursen begränsar stammen.',
          'Hur näringskedjan är uppbyggd.',
          'Att jakt är en av flera dödlighetsfaktorer.',
        ],
      },
    ],
    sources: [sources.naturvardsverketJakt, sources.jagareforbundet],
  },
  {
    id: 'ch-eko-viltvard',
    categoryId: 'viltvard-och-ekologi',
    title: 'Praktisk viltvård',
    summary: 'Biotopvård, utfodring, predatorkontroll och hur avskjutningen planeras.',
    readingTimeMin: 9,
    blocks: [
      {
        kind: 'paragraph',
        text: 'Viltvård är allt arbete som syftar till att ge viltet bättre förutsättningar. Den mest verkningsfulla viltvården handlar om att förbättra livsmiljön, inte om att kompensera för en dålig biotop med foder.',
      },
      { kind: 'heading', text: 'Biotopvård' },
      {
        kind: 'list',
        items: [
          'Anlägg viltåkrar med grödor som ger foder långt in på vintern.',
          'Skapa och sköt kantzoner mellan skog, åker och vatten.',
          'Gynna löv och bärris i ungskog och vid skogsbruksåtgärder.',
          'Restaurera våtmarker och småvatten för sjöfågel.',
          'Lämna skyddande vegetation kring häckningsplatser.',
        ],
      },
      { kind: 'heading', text: 'Utfodring – med eftertanke' },
      {
        kind: 'paragraph',
        text: 'Utfodring kan rädda vilt under extrema vintrar, men har också nackdelar. Foderplatser koncentrerar djur, vilket ökar risken för smittspridning och lokala betesskador. Foder ska introduceras i god tid, hållas fräscht och inte avbrytas plötsligt. Utfodring ska aldrig användas för att hålla en stam över markens bärkraft.',
      },
      {
        kind: 'fact',
        title: 'Åtel och utfodring är inte samma sak',
        text: 'Utfodring syftar till att hjälpa viltet över en svår period. En åtel läggs ut för att samla vilt vid jakt. Reglerna, och etiken, skiljer sig åt – och lokala bestämmelser kan begränsa båda.',
      },
      { kind: 'heading', text: 'Avskjutningsplanering' },
      {
        kind: 'paragraph',
        text: 'En avskjutningsplan bygger på inventeringar, observationer under jakten, betesskadeinventering och tidigare avskjutning. För älg sker planeringen ofta inom älgskötselområden med treåriga planer. Rätt könsfördelning och rätt andel kalv i uttaget är viktigare än antalet djur i sig.',
      },
      {
        kind: 'important',
        title: 'Viktigt att kunna',
        items: [
          'Att biotopvård ger mer varaktig nytta än utfodring.',
          'Riskerna med koncentrerad utfodring.',
          'Skillnaden mellan utfodring och åtel.',
          'Att avskjutningsplaner bygger på inventering och rapportering.',
        ],
      },
    ],
    sources: [sources.naturvardsverketJakt, sources.jagareforbundet],
  },
]
