import { images } from '@/data/images'
import { sources } from '@/data/sources'
import type { TheoryChapter } from '@/types'

export const viltChapters: TheoryChapter[] = [
  {
    id: 'ch-vilt-hjortdjur',
    categoryId: 'viltet-i-sverige',
    title: 'Hjortdjur i Sverige',
    summary: 'Älg, kronhjort, dovhjort och rådjur – kännetecken, biologi och förväxlingsrisker.',
    readingTimeMin: 12,
    blocks: [
      {
        kind: 'paragraph',
        text: 'Sverige har fyra vilt levande hjortdjur utanför renskötselområdet: älg, kronhjort, dovhjort och rådjur. Alla fyra är partåiga hovdjur som idisslar, och hos samtliga bär hanarna horn som fälls och växer ut på nytt varje år. Att kunna skilja arterna från varandra – och könen inom arten – är ett grundkrav för säker jakt, eftersom jakttider och vapenkrav skiljer sig åt.',
      },

      { kind: 'heading', text: 'Älg' },
      {
        kind: 'image',
        src: images.species.alg,
        alt: 'Älgtjur i dimmig granskog vid gryningen',
        caption: 'Älgen känns igen på mankammen, den kraftiga mulen och de höga ljusa benen.',
      },
      {
        kind: 'paragraph',
        text: 'Älgen är Sveriges största hjortdjur och världens största nu levande art i hjortdjursfamiljen. En fullvuxen tjur i norra Sverige kan väga över 500 kilo. Kroppen är hög och kort med tydlig mankam, benen ljusa och grova, och mulen stor och överhängande. Älgen är i första hand en skogslevande art som betar löv, ris, kvistar och vattenväxter.',
      },
      {
        kind: 'paragraph',
        text: 'Tjuren bär horn som antingen är skovelformade eller stångformade. Hornen fälls under vintern och nya växer ut under våren och sommaren, täckta av en känslig basthud som nöts av inför brunsten i september. Kon saknar horn och har en ljus fläck – en så kallad kospegel – vid könsöppningen som kan användas vid könsbedömning.',
      },
      {
        kind: 'fact',
        title: 'Älgkalven',
        text: 'Kalvar föds i maj–juni, oftast en eller två. En kalv känns igen på kort huvud, kort mule, hög benställning i förhållande till kroppen och att den saknar mankam. Vid kalvjakt är det avgörande att inte förväxla en stor kalv med en ungdjur.',
      },

      { kind: 'heading', text: 'Kronhjort' },
      {
        kind: 'image',
        src: images.species.kronhjort,
        alt: 'Kronhjort med stora horn i gyllene höstgräs',
        caption: 'Kronhjorten är näst störst av våra hjortdjur och bröler kraftigt under brunsten.',
      },
      {
        kind: 'paragraph',
        text: 'Kronhjorten är näst störst av våra hjortdjur. Pälsen är rödbrun på sommaren och gråbrun på vintern, och spegeln är gulbeige utan svart kantning. Hjorten har grova, kraftigt förgrenade horn och en tydlig halsman under brunsten, som infaller i september–oktober. Då hörs hjortens djupa brölande långt över markerna.',
      },

      { kind: 'heading', text: 'Dovhjort' },
      {
        kind: 'paragraph',
        text: 'Dovhjorten är mindre än kronhjorten och har en lång svans med svart översida samt en vit spegel med tydlig svart kantning. Sommarpälsen är ofta rödbrun med vita fläckar, men färgvariationen är stor och mörka och vita individer förekommer. Den fullvuxna hjorten har karakteristiska skovelformade, palmerade horn. Brunsten sker i oktober.',
      },
      {
        kind: 'table',
        headings: ['Art', 'Svans', 'Spegel', 'Horn hos hane'],
        rows: [
          ['Älg', 'Mycket kort', 'Saknas', 'Skovel eller stång'],
          ['Kronhjort', 'Kort', 'Gulbeige, utan svart kant', 'Grova, förgrenade'],
          ['Dovhjort', 'Lång, svart översida', 'Vit med svart kant', 'Palmerade skovlar'],
          ['Rådjur', 'Nästan osynlig', 'Vit till gulvit', 'Små, oftast tre taggar'],
        ],
      },

      { kind: 'heading', text: 'Rådjur' },
      {
        kind: 'image',
        src: images.species.radjur,
        alt: 'Rådjursbock i högt gräs vid en skogsbryn',
        caption:
          'Rådjuret har svart mule med vita läppfläckar, mycket kort svans och tydlig ljus spegel.',
      },
      {
        kind: 'paragraph',
        text: 'Rådjuret är vårt minsta och talrikaste hjortdjur och finns i hela landet utom i fjällen. Sommarpälsen är rödbrun och vinterpälsen gråbrun. Svansen är så kort att den knappt syns, och spegeln är vit till gulvit. Nosen är svart med vita fläckar på över- och underläpp. Bocken bär små horn med vanligen tre taggar per stång.',
      },
      {
        kind: 'paragraph',
        text: 'Rådjuret har en biologisk särdrag bland våra hjortdjur: brunsten sker i juli–augusti, men det befruktade ägget vilar i livmodern i flera månader innan fosterutvecklingen startar. Denna fördröjda fosterutveckling gör att killingarna ändå föds i maj–juni, när födotillgången är god.',
      },
      {
        kind: 'fact',
        title: 'Könsbedömning på rådjur vintertid',
        text: 'Bocken fäller hornen på senhösten och kan då förväxlas med en get. Geten har en hårtofs vid könsöppningen som bocken saknar, och bocken har oftast en kraftigare hals och tydliga hornbaser.',
      },

      {
        kind: 'important',
        title: 'Viktigt att kunna',
        items: [
          'Att älgen är Sveriges största hjortdjur och kronhjorten näst störst.',
          'Att alla våra hjortdjurshanar fäller hornen och växer nya varje år.',
          'Skillnaden mellan dovhjortens och kronhjortens spegel och svans.',
          'Att rådjuret har fördröjd fosterutveckling efter brunst i juli–augusti.',
          'Hur du könsbedömer älg och rådjur i fält.',
        ],
      },
    ],
    sources: [sources.jagareforbundet, sources.naturvardsverketJakt],
  },
  {
    id: 'ch-vilt-vildsvin',
    categoryId: 'viltet-i-sverige',
    title: 'Vildsvin och övrigt klövvilt',
    summary: 'Vildsvinets biologi, flockstruktur och vad som gör arten särskilt krävande att jaga.',
    readingTimeMin: 9,
    blocks: [
      {
        kind: 'paragraph',
        text: 'Vildsvinet är ett partåigt hovdjur som skiljer sig från hjortdjuren på flera avgörande punkter: det är en allätare, det idisslar inte, det saknar horn och det kan föda kultingar under stora delar av året. Stammen har vuxit kraftigt sedan 1980-talet och arten finns idag i större delen av södra och mellersta Sverige.',
      },
      {
        kind: 'image',
        src: images.species.vildsvin,
        alt: 'Vildsvin i lövskog i höstljus',
        caption: 'Vildsvinet har en kilformad kropp med högsta punkten över bogen.',
      },
      { kind: 'heading', text: 'Kännetecken' },
      {
        kind: 'paragraph',
        text: 'Kroppen är kilformad med högsta punkten över bogen, huvudet långt och kraftigt och svansen lång med en tofs. Pälsen är borstig och gråsvart till brunaktig. Kultingarna är ljusbruna med längsgående ljusa strimmor som ger ett effektivt kamouflage och växer bort under de första månaderna.',
      },
      { kind: 'heading', text: 'Flocken och suggans roll' },
      {
        kind: 'paragraph',
        text: 'Vildsvin lever i matriarkala flockar där en ledarsugga styr flockens rytm och brunstsynkronisering. Galtar lever ensamma utanför brunsten. Att fälla ledarsuggan kan slå sönder flockens struktur och leda till att ungsuggor blir dräktiga i otid – därför är suggor som för kultingar fredade och stor försiktighet krävs vid all vildsvinsjakt.',
      },
      {
        kind: 'important',
        title: 'Viktigt att kunna',
        items: [
          'Att vildsvinet är allätare och inte idisslar.',
          'Att kultingar är strimmiga under sina första månader.',
          'Att suggor som för smågrisar är fredade.',
          'Att ledarsuggan har en nyckelroll i flockens struktur.',
          'Att kött från vildsvin måste trikinundersökas.',
        ],
      },
      {
        kind: 'fact',
        title: 'Mufflonfår och andra arter',
        text: 'Utöver hjortdjur och vildsvin förekommer mufflonfår lokalt i Sverige, bland annat på Gotland. Arten räknas som klövvilt och omfattas av rapporteringskrav vid trafikolyckor.',
      },
    ],
    sources: [sources.jagareforbundet, sources.livsmedelsverket],
  },
  {
    id: 'ch-vilt-rovdjur',
    categoryId: 'viltet-i-sverige',
    title: 'Rovdjur och rovvilt',
    summary: 'Björn, varg, lo och järv samt de mindre rovdjuren räv, grävling och mård.',
    readingTimeMin: 8,
    blocks: [
      {
        kind: 'paragraph',
        text: 'De fyra stora rovdjuren – björn, varg, lodjur och järv – är statens vilt och omfattas av särskild förvaltning. Jakt på dessa arter sker genom licensjakt eller skyddsjakt efter beslut, aldrig under allmän jakttid. Påträffas de döda ska de anmälas, och de tillfaller staten.',
      },
      {
        kind: 'list',
        items: [
          'Björn – Sveriges största rovdjur, kraftig kropp med puckel över bogen och kort svans.',
          'Varg – hundliknande, långbent, med kort rak svans som hålls hängande.',
          'Lodjur – tydliga örontofsar, kort svans med svart spets, kraftiga tassar.',
          'Järv – mörk med ljusare sidoband, yvig svans, kraftig och låg kropp.',
        ],
      },
      { kind: 'heading', text: 'Räv' },
      {
        kind: 'image',
        src: images.species.rav,
        alt: 'Rödräv i höstgräs vid ett skogsbryn',
        caption: 'Räven känns igen på den yviga svansen med ljus spets och den spetsiga nosen.',
      },
      {
        kind: 'paragraph',
        text: 'Räven är vårt vanligaste rovdjur och finns i hela landet. Den är en viktig art i jaktsammanhang, dels som eftersökt vilt, dels för att den påverkar stammarna av småvilt. Räven kan bära dvärgbandmask, vilket gör att god hygien vid hantering av fällda djur är viktig.',
      },
      { kind: 'heading', text: 'Mårddjur och övriga' },
      {
        kind: 'paragraph',
        text: 'Grävling, mård, mink och iller tillhör mårddjuren. Grävlingen har karakteristiska svartvita längsgående ansiktsstrimmor och en kompakt kropp. Mårdhunden och den invasiva minken kräver särskild uppmärksamhet, eftersom de påverkar häckande fågel och omfattas av åtgärder mot invasiva arter.',
      },
      {
        kind: 'important',
        title: 'Viktigt att kunna',
        items: [
          'Att björn, varg, lo och järv är statens vilt.',
          'Att jakt på stora rovdjur kräver beslut om licens- eller skyddsjakt.',
          'Kännetecken som skiljer varg från stor hund och lo från övriga kattdjur.',
          'Att räv kan bära dvärgbandmask – hantera fällda djur hygieniskt.',
        ],
      },
    ],
    sources: [sources.jaktforordningen, sources.jagareforbundet],
  },
  {
    id: 'ch-vilt-fagel',
    categoryId: 'viltet-i-sverige',
    title: 'Fågel och småvilt',
    summary: 'Skogsfågel, sjöfågel, hare och bäver – arter, kännetecken och förväxlingsrisker.',
    readingTimeMin: 10,
    blocks: [
      {
        kind: 'paragraph',
        text: 'Fågeljakt och småviltsjakt kräver ofta snabb artbestämning på kort tid, ibland i dåligt ljus eller på flyende vilt. Därför är det viktigt att kunna både utseende, flyktbild och ljud. Många arter liknar varandra, och vissa är helt fredade.',
      },
      { kind: 'heading', text: 'Skogsfågel' },
      {
        kind: 'image',
        src: images.species.tjader,
        alt: 'Tjädertupp på mossbeklädd skogsmark',
        caption: 'Tjädertuppen är blåsvart med ljus kraftig näbb och röd ögonbrynsfläck.',
      },
      {
        kind: 'paragraph',
        text: 'Tjädern är vår största skogsfågel. Tuppen är blåsvart med ljus näbb och röd ögonbrynsfläck, medan hönan är brunspräcklig med rostfärgat bröst. Orren är mindre: tuppen är blåsvart med lyrformad stjärt och tydliga vita vingband. Järpen är minst av de tre, gråspräcklig med en svart strupfläck hos tuppen och en kort tofs.',
      },
      { kind: 'heading', text: 'Sjöfågel' },
      {
        kind: 'image',
        src: images.species.grasand,
        alt: 'Gräsandshane på en stilla sjö',
        caption: 'Gräsandshanen har grönt huvud, vit halsring och brunt bröst.',
      },
      {
        kind: 'paragraph',
        text: 'Gräsanden är vår vanligaste and. Hanen i praktdräkt har grönt huvud, vit halsring och brunt bröst, medan honan är brunspräcklig. Kricka är betydligt mindre och snabbflygande, knipa har ett kort och högljutt vingbrus, och bland gäss är grågås och kanadagås de vanligaste jaktbara arterna.',
      },
      { kind: 'heading', text: 'Hare och bäver' },
      {
        kind: 'image',
        src: images.species.hare,
        alt: 'Skogshare i vit vinterpäls i snö',
        caption: 'Skogsharen får vit vinterpäls men behåller svarta öronspetsar.',
      },
      {
        kind: 'paragraph',
        text: 'Skogsharen byter till vit vinterpäls med svarta öronspetsar, medan fältharen är större, förblir gråbrun och har svart översida på svansen. Bävern är vårt största gnagare, känns igen på den platta fjällklädda svansen, och jagas under särskild jakttid.',
      },
      {
        kind: 'important',
        title: 'Viktigt att kunna',
        items: [
          'Att orren har lyrformad stjärt och tjädern inte.',
          'Kännetecken för gräsand, kricka och knipa.',
          'Skillnaden mellan skogshare och fälthare året runt.',
          'Att fredade arter aldrig får förväxlas med jaktbara – är du osäker avstår du.',
        ],
      },
    ],
    sources: [sources.jagareforbundet, sources.naturvardsverketJakttider],
  },
]
