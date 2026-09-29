import { sources } from '@/data/sources'
import type { Question } from '@/types'

/**
 * EXAMPLE QUESTIONS – NOT OFFICIAL EXAM QUESTIONS.
 *
 * Every question below is written from scratch for this learning prototype. It
 * is not taken from, and does not reproduce, the official Swedish hunting
 * licence exam ("jägarexamen"). Always verify the facts against the attached
 * sources before relying on them, and update `sources` when content changes.
 *
 * Adding a question: append an object to the array, keep `id` unique, use four
 * alternatives, set `correctAnswer` to the zero-based index of the right one
 * and write an explanation that teaches rather than just confirms.
 */
export const questions: Question[] = [
  // ─── Jaktens grunder ──────────────────────────────────────────────────────
  {
    id: 'q-grund-001',
    categoryId: 'jaktens-grunder',
    question: 'Vad krävs för att lagligt få jaga i Sverige?',
    answers: [
      'Endast ett giltigt medlemskap i en jägarorganisation',
      'Godkänd jägarexamen, betald viltvårdsavgift och jakträtt på marken',
      'Endast tillstånd från markägaren',
      'Enbart ett giltigt vapenlicens',
    ],
    correctAnswer: 1,
    explanation:
      'Tre delar måste vara på plats: du ska ha avlagt jägarexamen, betalt viltvårdsavgiften (jaktkortet) för det aktuella jaktåret och ha rätt att jaga på marken. Medlemskap i en jägarorganisation är frivilligt.',
    difficulty: 'lätt',
    tags: ['jaktkort', 'jakträtt'],
    sources: [sources.jaktlagen, sources.naturvardsverketJakt],
  },
  {
    id: 'q-grund-002',
    categoryId: 'jaktens-grunder',
    question: 'Vem har jakträtten på en fastighet enligt jaktlagen?',
    answers: [
      'Kommunen där fastigheten ligger',
      'Alla som har betalat viltvårdsavgift',
      'Fastighetsägaren, om rätten inte har upplåtits till någon annan',
      'Länsstyrelsen',
    ],
    correctAnswer: 2,
    explanation:
      'Jakträtten följer marken och tillhör fastighetsägaren. Ägaren kan upplåta jakträtten till någon annan, till exempel genom ett jakträttsavtal eller ett jaktlag. Allemansrätten ger aldrig rätt att jaga.',
    difficulty: 'lätt',
    tags: ['jakträtt', 'markägare'],
    sources: [sources.jaktlagen],
  },
  {
    id: 'q-grund-003',
    categoryId: 'jaktens-grunder',
    question: 'Vad innebär det att viltet är fredat?',
    answers: [
      'Att vilt aldrig får jagas i Sverige',
      'Att vilt får jagas fritt utanför nationalparker',
      'Att vilt bara får jagas när och hur det uttryckligen är tillåtet',
      'Att endast markägaren får jaga viltet',
    ],
    correctAnswer: 2,
    explanation:
      'Grundprincipen i jaktlagen är att allt vilt är fredat. Jakt är alltså tillåten först när en jakttid, ett beslut eller en särskild bestämmelse öppnar för den – inte tvärtom.',
    difficulty: 'medel',
    tags: ['fredat vilt'],
    sources: [sources.jaktlagen],
  },
  {
    id: 'q-grund-004',
    categoryId: 'jaktens-grunder',
    question: 'Vad ingår i begreppet "vilt" enligt jaktlagen?',
    answers: [
      'Endast klövvilt och rovdjur',
      'Vilda däggdjur och fåglar',
      'Alla vilda djur inklusive fisk och insekter',
      'Endast de arter som har allmän jakttid',
    ],
    correctAnswer: 1,
    explanation:
      'Med vilt avses vilda däggdjur och fåglar. Fisk, kräldjur, grod- och insektsarter omfattas inte av jaktlagstiftningen utan av annan lagstiftning.',
    difficulty: 'medel',
    tags: ['definitioner'],
    sources: [sources.jaktlagen],
  },

  // ─── Viltet i Sverige ─────────────────────────────────────────────────────
  {
    id: 'q-vilt-001',
    categoryId: 'viltet-i-sverige',
    question: 'Vad kännetecknar rådjur?',
    answers: [
      'Har en svart spegel och lång svans',
      'Har mycket kort svans och ljus spegel',
      'Är större än kronhjorten',
      'Bär kraftiga skovelhorn',
    ],
    correctAnswer: 1,
    explanation:
      'Rådjuret är vårt minsta hjortdjur. Svansen är så kort att den knappt syns, och spegeln (den ljusa fläcken kring bakdelen) är vit till gulvit. Nosen är svart med vit fläck på över- och underläpp.',
    difficulty: 'lätt',
    tags: ['rådjur', 'artkännedom'],
    sources: [sources.jagareforbundet],
  },
  {
    id: 'q-vilt-002',
    categoryId: 'viltet-i-sverige',
    question: 'Vilket är Sveriges största hjortdjur?',
    answers: ['Kronhjort', 'Dovhjort', 'Älg', 'Ren'],
    correctAnswer: 2,
    explanation:
      'Älgen är Sveriges och världens största hjortdjur. En fullvuxen tjur kan väga över 500 kg i norra Sverige. Kronhjorten är näst störst av våra hjortdjur.',
    difficulty: 'lätt',
    tags: ['älg', 'artkännedom'],
    sources: [sources.jagareforbundet],
  },
  {
    id: 'q-vilt-003',
    categoryId: 'viltet-i-sverige',
    question: 'När fäller älgtjuren sina horn?',
    answers: [
      'Under brunsten i september',
      'Under vintern, varefter nya horn växer ut på våren',
      'Vartannat år på sensommaren',
      'Älgtjuren behåller samma horn hela livet',
    ],
    correctAnswer: 1,
    explanation:
      'Hornen fälls under vintern, ofta från december och framåt, och nya horn växer ut under våren och sommaren. Under tillväxten är hornen täckta av basthud som nöts av inför brunsten.',
    difficulty: 'medel',
    tags: ['älg', 'horn'],
    sources: [sources.jagareforbundet],
  },
  {
    id: 'q-vilt-004',
    categoryId: 'viltet-i-sverige',
    question: 'Vad är typiskt för dovhjortens horn hos en fullvuxen handjur?',
    answers: [
      'Spetsiga stänger utan förgreningar',
      'Breda, skovelformade partier högst upp',
      'Horn som sitter kvar året runt',
      'Spiralvridna horn',
    ],
    correctAnswer: 1,
    explanation:
      'Den fullvuxna dovhjorten har karakteristiska skovelformade (palmerade) horn. Dovhjorten har också en lång svans med svart översida och en vit spegel med svart kantning.',
    difficulty: 'medel',
    tags: ['dovhjort', 'artkännedom'],
    sources: [sources.jagareforbundet],
  },
  {
    id: 'q-vilt-005',
    categoryId: 'viltet-i-sverige',
    question: 'Hur skiljer du enklast skogshare från fälthare vintertid?',
    answers: [
      'Skogsharen blir vit med svarta öronspetsar',
      'Fältharen blir helt vit',
      'Skogsharen får svart svans',
      'Arterna går inte att skilja på vintern',
    ],
    correctAnswer: 0,
    explanation:
      'Skogsharen byter till vit vinterpäls men behåller svarta öronspetsar. Fältharen är större, förblir gråbrun och har en svart översida på svansen året runt.',
    difficulty: 'medel',
    tags: ['hare', 'artkännedom'],
    sources: [sources.jagareforbundet],
  },
  {
    id: 'q-vilt-006',
    categoryId: 'viltet-i-sverige',
    question: 'Vilket kännetecken hör till tjädertuppen?',
    answers: [
      'Lyrformad stjärt',
      'Blåsvart fjäderdräkt och röd ögonbrynsfläck',
      'Vita vingar året runt',
      'Kluven näbb och gul strupe',
    ],
    correctAnswer: 1,
    explanation:
      'Tjädertuppen är stor och blåsvart med kraftig ljus näbb och en röd ögonbrynsfläck. Den lyrformade stjärten hör istället till orrtuppen.',
    difficulty: 'medel',
    tags: ['tjäder', 'fågel'],
    sources: [sources.jagareforbundet],
  },
  {
    id: 'q-vilt-007',
    categoryId: 'viltet-i-sverige',
    question: 'Vad kännetecknar en gräsandshane i praktdräkt?',
    answers: [
      'Helt brun med blå näbb',
      'Grönt huvud, vit halsring och brun bröstfjäderdräkt',
      'Svart huvud med vit strupe',
      'Grått huvud med svart näbb',
    ],
    correctAnswer: 1,
    explanation:
      'Gräsandshanen har ett metalliskt grönt huvud, en tydlig vit halsring och brunaktigt bröst. Honan är brunspräcklig och betydligt mer diskret färgad.',
    difficulty: 'lätt',
    tags: ['gräsand', 'fågel'],
    sources: [sources.jagareforbundet],
  },
  {
    id: 'q-vilt-008',
    categoryId: 'viltet-i-sverige',
    question: 'Hur ser vildsvinskultingar ut under sina första månader?',
    answers: [
      'Helt svarta',
      'Ljusbruna med längsgående ljusa strimmor',
      'Vitfläckiga som dovhjortskalvar',
      'Gråa med svart nos',
    ],
    correctAnswer: 1,
    explanation:
      'Kultingarna är ljusbruna med tydliga längsgående strimmor som ger kamouflage i vegetationen. Strimmorna växer bort under de första månaderna.',
    difficulty: 'lätt',
    tags: ['vildsvin'],
    sources: [sources.jagareforbundet],
  },
  {
    id: 'q-vilt-009',
    categoryId: 'viltet-i-sverige',
    question: 'När har rådjuret sin brunst?',
    answers: [
      'I september–oktober',
      'I juli–augusti',
      'I december–januari',
      'I mars–april',
    ],
    correctAnswer: 1,
    explanation:
      'Rådjuret brunstar i juli–augusti. Arten har fördröjd fosterutveckling: det befruktade ägget vilar i flera månader innan utvecklingen startar, så killingarna föds först i maj–juni.',
    difficulty: 'svår',
    tags: ['rådjur', 'reproduktion'],
    sources: [sources.jagareforbundet],
  },
  {
    id: 'q-vilt-010',
    categoryId: 'viltet-i-sverige',
    question: 'Vilket ljud är typiskt för kronhjortshanen under brunsten?',
    answers: [
      'Ett gällt skall',
      'Ett djupt, utdraget brölande',
      'Ett väsande ljud',
      'Kronhjorten är helt tystlåten',
    ],
    correctAnswer: 1,
    explanation:
      'Kronhjortshanen bröler kraftigt under brunsten i september–oktober för att markera revir och imponera på hindarna. Ljudet hörs långt och är ett bra kännetecken i fält.',
    difficulty: 'medel',
    tags: ['kronhjort'],
    sources: [sources.jagareforbundet],
  },

  // ─── Viltvård och ekologi ─────────────────────────────────────────────────
  {
    id: 'q-eko-001',
    categoryId: 'viltvard-och-ekologi',
    question: 'Vad menas med en biotop?',
    answers: [
      'Ett områdes totala viltstam',
      'Den livsmiljö som en art är anpassad till',
      'Ett avgränsat jaktområde',
      'Antalet djur ett område kan föda',
    ],
    correctAnswer: 1,
    explanation:
      'Biotopen är den livsmiljö där en art finner föda, skydd och möjlighet att föröka sig. Biotopvård – att förbättra livsmiljön – är ofta effektivare viltvård än utfodring.',
    difficulty: 'medel',
    tags: ['ekologi'],
    sources: [sources.naturvardsverketJakt],
  },
  {
    id: 'q-eko-002',
    categoryId: 'viltvard-och-ekologi',
    question: 'Vad beskriver ett områdes bärkraft?',
    answers: [
      'Hur många djur som skjuts under ett jaktår',
      'Hur stor viltstam marken långsiktigt kan försörja',
      'Hur mycket foder som läggs ut',
      'Hur många jägare som har jakträtt',
    ],
    correctAnswer: 1,
    explanation:
      'Bärkraften är den viltstam som marken kan försörja över tid utan att biotopen eller djurens hälsa försämras. Överstiger stammen bärkraften ökar betesskador, sjukdomar och svält.',
    difficulty: 'medel',
    tags: ['ekologi', 'viltvård'],
    sources: [sources.naturvardsverketJakt],
  },
  {
    id: 'q-eko-003',
    categoryId: 'viltvard-och-ekologi',
    question: 'Vilken viltvårdsåtgärd ger oftast störst långsiktig nytta?',
    answers: [
      'Att förbättra foder- och skyddsmöjligheter i biotopen',
      'Att sätta ut uppfödda djur varje år',
      'Att utfodra kraftigt under hela vintern',
      'Att helt avstå från jakt',
    ],
    correctAnswer: 0,
    explanation:
      'Biotopvård som viltåkrar, kantzoner, lövrika ungskogar och våtmarker ger varaktig effekt. Utfodring kan behövas i nödsituationer men riskerar att koncentrera vilt och sprida smitta.',
    difficulty: 'medel',
    tags: ['viltvård'],
    sources: [sources.naturvardsverketJakt],
  },
  {
    id: 'q-eko-004',
    categoryId: 'viltvard-och-ekologi',
    question: 'Varför är avskjutningsstatistik viktig i viltförvaltningen?',
    answers: [
      'Den används enbart för att fördela jaktkortsintäkter',
      'Den ger underlag för att följa stammens utveckling och anpassa avskjutningen',
      'Den krävs för att få vapenlicens',
      'Den ersätter behovet av inventeringar',
    ],
    correctAnswer: 1,
    explanation:
      'Tillsammans med inventeringar, betesskadeinventering och observationer ger avskjutningsstatistiken en bild av hur stammen utvecklas. Det är grunden för adaptiv förvaltning.',
    difficulty: 'medel',
    tags: ['förvaltning'],
    sources: [sources.naturvardsverketJakt],
  },

  // ─── Jaktformer ───────────────────────────────────────────────────────────
  {
    id: 'q-form-001',
    categoryId: 'jaktformer',
    question: 'Vad kännetecknar smygjakt?',
    answers: [
      'Jägaren sitter still på pass och väntar in viltet',
      'Jägaren rör sig långsamt och tyst genom markerna för att komma inom skotthåll',
      'Hundar driver viltet mot passkyttar',
      'Jakten sker uteslutande från jakttorn',
    ],
    correctAnswer: 1,
    explanation:
      'Vid smygjakt förflyttar sig jägaren långsamt och uppmärksamt med vinden i ansiktet. Formen kräver god artkännedom och tålamod, och skotttillfällena är ofta korta.',
    difficulty: 'lätt',
    tags: ['smygjakt'],
    sources: [sources.jagareforbundet],
  },
  {
    id: 'q-form-002',
    categoryId: 'jaktformer',
    question: 'Vilken är den största säkerhetsfördelen med att jaga från ett jakttorn?',
    answers: [
      'Skotten får en nedåtriktad vinkel med säkrare kulfång',
      'Viltet kan inte upptäcka jägaren',
      'Skjutavståndet blir alltid kortare',
      'Man behöver inte ha kulfång bakom viltet',
    ],
    correctAnswer: 0,
    explanation:
      'Från ett torn skjuter du nedåt, vilket gör att marken kan fungera som kulfång och minskar risken för rikoschetter. Kravet på att säkra kulfånget bakom viltet gäller ändå alltid.',
    difficulty: 'medel',
    tags: ['jakttorn', 'säkerhet'],
    sources: [sources.jagareforbundet],
  },
  {
    id: 'q-form-003',
    categoryId: 'jaktformer',
    question: 'Vad är viktigast att klara ut innan en drevjakt startar?',
    answers: [
      'Vem som lagar maten i jaktstugan',
      'Passens placering, skjutriktningar och signaler för start och slut',
      'Vilken hundras som används',
      'Hur många patroner varje jägare bär med sig',
    ],
    correctAnswer: 1,
    explanation:
      'En tydlig jaktledargenomgång med passplacering, tillåtna skjutriktningar, grannpassens läge samt signaler för jaktstart och jaktslut är själva grunden för en säker drevjakt.',
    difficulty: 'lätt',
    tags: ['drevjakt', 'säkerhet'],
    sources: [sources.jagareforbundet],
  },

  // ─── Jakthundar ───────────────────────────────────────────────────────────
  {
    id: 'q-hund-001',
    categoryId: 'jakthundar',
    question: 'Vilken hundtyp används traditionellt för ståndskall på älg?',
    answers: ['Stövare', 'Jämthund och andra spetsar', 'Stående fågelhund', 'Grythund'],
    correctAnswer: 1,
    explanation:
      'Spetsar som jämthund, norsk älghund grå och norrbottenspets används för att spåra upp älg och hålla den med ståndskall tills jägaren kan komma fram.',
    difficulty: 'medel',
    tags: ['älghund'],
    sources: [sources.jagareforbundet],
  },
  {
    id: 'q-hund-002',
    categoryId: 'jakthundar',
    question:
      'Vad gäller för tillgång till eftersökshund vid jakt efter älg, hjort, rådjur och vildsvin?',
    answers: [
      'Ingen hund behöver finnas tillgänglig',
      'En hund som är särskilt lämpad för eftersök ska kunna finnas på plats inom två timmar',
      'Hunden måste alltid vara med i jaktlaget under jakten',
      'Endast jaktledaren behöver ha en hund',
    ],
    correctAnswer: 1,
    explanation:
      'Vid jakt efter bland annat älg, hjort, rådjur och vildsvin ska en hund som är särskilt lämpad för eftersök kunna vara på plats inom två timmar från påskjutningen.',
    difficulty: 'svår',
    tags: ['eftersök'],
    sources: [sources.jaktforordningen],
  },
  {
    id: 'q-hund-003',
    categoryId: 'jakthundar',
    question: 'Vad innebär reglerna om tillsyn över hund under våren och sommaren?',
    answers: [
      'Hundar får aldrig vistas i skog och mark',
      'Hundar ska hållas under sådan tillsyn att de hindras från att jaga vilt under 1 mars–20 augusti',
      'Hundar får springa lösa så länge de är ID-märkta',
      'Reglerna gäller endast i nationalparker',
    ],
    correctAnswer: 1,
    explanation:
      'Under perioden 1 mars–20 augusti, när viltet har ungar, ska hundar hållas under sådan tillsyn att de hindras från att driva eller förfölja vilt. Även under övrig tid gäller ett allmänt tillsynsansvar.',
    difficulty: 'medel',
    tags: ['hundtillsyn'],
    sources: [sources.jaktlagen],
  },

  // ─── Vapen och ammunition ─────────────────────────────────────────────────
  {
    id: 'q-vapen-001',
    categoryId: 'vapen-och-ammunition',
    question: 'Vilken vapenklass krävs normalt för jakt efter älg, hjort och vildsvin?',
    answers: ['Klass 1', 'Klass 2', 'Klass 3', 'Klass 4'],
    correctAnswer: 0,
    explanation:
      'Kulvapen klass 1 krävs för det största klövviltet. Klasserna definieras av kravet på anslagsenergi på 100 meter, där klass 1 har det högsta kravet.',
    difficulty: 'medel',
    tags: ['vapenklass'],
    sources: [sources.naturvardsverketVapen],
  },
  {
    id: 'q-vapen-002',
    categoryId: 'vapen-och-ammunition',
    question: 'Vilken typ av kula ska användas vid jakt efter klövvilt?',
    answers: [
      'Helmantlad kula',
      'Expanderande kula som ger god sårverkan',
      'Blykula utan mantel',
      'Spårljuskula',
    ],
    correctAnswer: 1,
    explanation:
      'Kulan ska expandera och avge sin energi i djuret för att ge snabb död. Helmantlade kulor är inte tillåtna vid jakt efter klövvilt eftersom de riskerar att gå rakt igenom.',
    difficulty: 'medel',
    tags: ['ammunition'],
    sources: [sources.naturvardsverketVapen],
  },
  {
    id: 'q-vapen-003',
    categoryId: 'vapen-och-ammunition',
    question: 'Hur många patroner får ett hagelgevär högst vara laddat med vid jakt?',
    answers: [
      'Två i magasinet och en i loppet, totalt tre',
      'Fem totalt',
      'Obegränsat antal',
      'Endast en patron',
    ],
    correctAnswer: 0,
    explanation:
      'Vid jakt får ett hagelgevär vara laddat med högst två patroner i magasinet och en i loppet. Begränsningen finns för att minska risken för överilade skott.',
    difficulty: 'svår',
    tags: ['hagelgevär'],
    sources: [sources.jaktforordningen],
  },
  {
    id: 'q-vapen-004',
    categoryId: 'vapen-och-ammunition',
    question: 'Vad betyder anslagsenergi?',
    answers: [
      'Kulans vikt multiplicerad med kalibern',
      'Den rörelseenergi kulan har när den träffar målet',
      'Rekylkraften mot skytten',
      'Krutmängden i patronen',
    ],
    correctAnswer: 1,
    explanation:
      'Anslagsenergi är kulans rörelseenergi vid träffen, mätt i joule. Den beror på kulvikt och hastighet, och används för att definiera vapenklasserna för jakt.',
    difficulty: 'medel',
    tags: ['ballistik'],
    sources: [sources.naturvardsverketVapen],
  },
  {
    id: 'q-vapen-005',
    categoryId: 'vapen-och-ammunition',
    question: 'Hur ska jaktvapen förvaras när de inte används?',
    answers: [
      'Oladdade i en låst garderob',
      'I ett godkänt säkerhetsskåp, eller på annat sätt som lagen godtar',
      'Isärtagna men fritt tillgängliga i bostaden',
      'I bilens bagageutrymme',
    ],
    correctAnswer: 1,
    explanation:
      'Vapen ska förvaras så att obehöriga inte kommer åt dem, i praktiken i ett godkänt säkerhetsskåp. Ammunition ska förvaras säkert och åtskilt enligt gällande krav.',
    difficulty: 'lätt',
    tags: ['förvaring'],
    sources: [sources.vapenlagen, sources.polisenVapen],
  },
  {
    id: 'q-vapen-006',
    categoryId: 'vapen-och-ammunition',
    question: 'Hur ska ett vapen hanteras vid transport i bil?',
    answers: [
      'Laddat men säkrat på passagerarsätet',
      'Oladdat, i fodral eller väska och inte lätt åtkomligt',
      'Laddat i ett låst fodral',
      'Fritt liggande i baksätet så det syns',
    ],
    correctAnswer: 1,
    explanation:
      'Vapnet ska vara oladdat och förvarat i fodral eller väska under transport, och det får inte vara lätt åtkomligt. Det minskar både stöldrisk och risken för vådaskott.',
    difficulty: 'lätt',
    tags: ['transport', 'säkerhet'],
    sources: [sources.vapenlagen],
  },

  // ─── Skytte ───────────────────────────────────────────────────────────────
  {
    id: 'q-skytte-001',
    categoryId: 'skytte',
    question: 'Var sitter det bästa träffområdet på ett klövvilt?',
    answers: [
      'I bakdelen',
      'I lungregionen strax bakom framben och bog',
      'I halsens nedre del',
      'I buken',
    ],
    correctAnswer: 1,
    explanation:
      'Ett skott i lung- och hjärtregionen bakom bogen ger stor säkerhetsmarginal och snabb död. Skott mot buk och bakdel ger onödigt lidande och svåra eftersök.',
    difficulty: 'lätt',
    tags: ['träffområde'],
    sources: [sources.jagareforbundet],
  },
  {
    id: 'q-skytte-002',
    categoryId: 'skytte',
    question: 'Vilket är det viktigaste skälet till att öva skytte inför jaktsäsongen?',
    answers: [
      'Att spara ammunition under jakten',
      'Att säkra träffsäkerhet så att viltet inte utsätts för onödigt lidande',
      'Att kunna skjuta på längre avstånd än 300 meter',
      'Att vapnet ska slitas in',
    ],
    correctAnswer: 1,
    explanation:
      'Regelbunden träning ger kontroll över vapnet och realistisk kunskap om din egen träffsäkerhet. Det är en förutsättning för att kunna avstå från osäkra skott.',
    difficulty: 'lätt',
    tags: ['träning', 'etik'],
    sources: [sources.jagareforbundet],
  },
  {
    id: 'q-skytte-003',
    categoryId: 'skytte',
    question: 'Vad gäller normalt som rimligt maximalt skjutavstånd med hagelgevär?',
    answers: [
      'Cirka 10 meter',
      'Cirka 25–30 meter',
      'Cirka 60 meter',
      'Cirka 100 meter',
    ],
    correctAnswer: 1,
    explanation:
      'Hagelsvärmen tappar snabbt både täthet och energi. Bortom omkring 25–30 meter ökar risken för skadeskjutning kraftigt, beroende på vapen, choke och hagelstorlek.',
    difficulty: 'medel',
    tags: ['hagelgevär', 'skjutavstånd'],
    sources: [sources.jagareforbundet],
  },
  {
    id: 'q-skytte-004',
    categoryId: 'skytte',
    question: 'Vad innebär inskjutning av ett kulvapen?',
    answers: [
      'Att rengöra loppet före jakt',
      'Att justera siktet så att träffpunkten stämmer på ett bestämt avstånd',
      'Att skjuta in nya patroner i magasinet',
      'Att prova vapnets rekyl',
    ],
    correctAnswer: 1,
    explanation:
      'Inskjutning innebär att du justerar sikte eller kikarsikte så att träffpunkten motsvarar siktpunkten på ett valt avstånd, ofta 100 meter. Kontrollera inskjutningen varje säsong.',
    difficulty: 'medel',
    tags: ['inskjutning'],
    sources: [sources.jagareforbundet],
  },

  // ─── Jaktetik ─────────────────────────────────────────────────────────────
  {
    id: 'q-etik-001',
    categoryId: 'jaktetik',
    question: 'Du är inte helt säker på artbestämningen av ett djur i skymningen. Vad gör du?',
    answers: [
      'Skjuter och kontrollerar efteråt',
      'Avstår från skottet',
      'Skjuter ett varningsskott för att se reaktionen',
      'Frågar grannpasset via radio och skjuter sedan',
    ],
    correctAnswer: 1,
    explanation:
      'Grundregeln är att du måste vara helt säker på art, kön och att skottet är säkert. Är du tveksam avstår du – ett uteblivet skott är alltid bättre än ett felaktigt.',
    difficulty: 'lätt',
    tags: ['etik', 'säkerhet'],
    sources: [sources.jagareforbundet],
  },
  {
    id: 'q-etik-002',
    categoryId: 'jaktetik',
    question: 'Vad är jägarens ansvar om ett djur har skadats vid påskjutning?',
    answers: [
      'Att avsluta jakten och anmäla händelsen nästa dag',
      'Att snarast vidta åtgärder för att spåra upp och avliva djuret',
      'Att invänta nästa jakttillfälle',
      'Att låta markägaren ta över ansvaret',
    ],
    correctAnswer: 1,
    explanation:
      'Den som skadar vilt är skyldig att snarast göra vad som behövs för att spåra upp och avliva djuret. Eftersök ska inledas utan onödigt dröjsmål, och eftersökshund ska finnas tillgänglig.',
    difficulty: 'medel',
    tags: ['eftersök', 'etik'],
    sources: [sources.jaktlagen],
  },
  {
    id: 'q-etik-003',
    categoryId: 'jaktetik',
    question: 'Vilken princip bör styra valet av skottillfälle?',
    answers: [
      'Att chansen inte får missas',
      'Att djuret står stilla, står fritt och att kulfånget är säkert',
      'Att avståndet är så långt som vapnet tillåter',
      'Att skottet tas innan grannpasset hinner före',
    ],
    correctAnswer: 1,
    explanation:
      'Ett bra skottillfälle innebär att du säkert kan artbestämma djuret, att det står fritt och lämpligt vinklat, att avståndet är inom din förmåga och att kulfånget är säkert.',
    difficulty: 'lätt',
    tags: ['etik'],
    sources: [sources.jagareforbundet],
  },

  // ─── Jakt och säkerhet ────────────────────────────────────────────────────
  {
    id: 'q-sak-001',
    categoryId: 'jakt-och-sakerhet',
    question: 'Vad innebär kravet på säkert kulfång?',
    answers: [
      'Att viltet står inom 50 meter',
      'Att det finns något bakom viltet som stoppar kulan om den går förbi eller igenom',
      'Att du använder kikarsikte',
      'Att marken är snötäckt',
    ],
    correctAnswer: 1,
    explanation:
      'Kulfånget är det som stoppar kulan – vanligtvis en jordvall, en kraftig markyta eller motlut. Utan säkert kulfång ska skottet inte tas, eftersom en kula kan gå flera kilometer.',
    difficulty: 'lätt',
    tags: ['kulfång', 'säkerhet'],
    sources: [sources.jagareforbundet],
  },
  {
    id: 'q-sak-002',
    categoryId: 'jakt-och-sakerhet',
    question: 'Vilket underlag ger störst risk för rikoschett?',
    answers: [
      'Mjuk myrmark',
      'Vatten, is, sten och frusen hård mark',
      'Nyplöjd åker',
      'Tjock mossa',
    ],
    correctAnswer: 1,
    explanation:
      'Hårda och släta ytor som vatten, is och berghällar kan få kulan att studsa vidare i oförutsägbar riktning. Undvik skott i sådan riktning även om målet ser fritt ut.',
    difficulty: 'medel',
    tags: ['rikoschett'],
    sources: [sources.jagareforbundet],
  },
  {
    id: 'q-sak-003',
    categoryId: 'jakt-och-sakerhet',
    question: 'När ska vapnet vara oladdat?',
    answers: [
      'Endast vid transport i bil',
      'Vid transport, vid passage av hinder, i sällskap och alltid när jakt inte pågår',
      'Bara när barn är i närheten',
      'Aldrig, så länge vapnet är säkrat',
    ],
    correctAnswer: 1,
    explanation:
      'Ladda först när jakten börjar och plocka ur patronerna så snart den avbryts. Vid klättring över hinder, i fordon, vid raster och vid förflyttning i sällskap ska vapnet vara oladdat.',
    difficulty: 'lätt',
    tags: ['vapenhantering'],
    sources: [sources.jagareforbundet],
  },
  {
    id: 'q-sak-004',
    categoryId: 'jakt-och-sakerhet',
    question: 'Vad gör du först vid en viltolycka i trafiken med ett rådjur?',
    answers: [
      'Kör vidare om bilen är oskadd',
      'Märker ut olycksplatsen, ringer 112 och lämnar uppgifter så att eftersök kan göras',
      'Tar med djuret hem',
      'Anmäler till kommunen inom en vecka',
    ],
    correctAnswer: 1,
    explanation:
      'Sammanstötningar med bland annat rådjur, älg, hjort och vildsvin ska anmälas till polisen via 112. Märk ut platsen så att eftersöksjägaren kan hitta rätt och spåra det skadade djuret.',
    difficulty: 'medel',
    tags: ['viltolycka'],
    sources: [sources.viltolycksradet],
  },

  // ─── Lagstiftning ─────────────────────────────────────────────────────────
  {
    id: 'q-lag-001',
    categoryId: 'lagstiftning',
    question: 'Vilken avgift måste vara betald innan du jagar?',
    answers: [
      'Jaktvårdsavgiften till kommunen',
      'Viltvårdsavgiften, det vill säga statliga jaktkortet',
      'Medlemsavgiften i ett jaktlag',
      'Vapenlicensavgiften varje år',
    ],
    correctAnswer: 1,
    explanation:
      'Alla som jagar i Sverige ska betala viltvårdsavgiften för det aktuella jaktåret. Kvittot – jaktkortet – ska kunna visas upp vid kontroll.',
    difficulty: 'lätt',
    tags: ['jaktkort'],
    sources: [sources.jaktlagen, sources.naturvardsverketJakt],
  },
  {
    id: 'q-lag-002',
    categoryId: 'lagstiftning',
    question: 'Vad är statens vilt?',
    answers: [
      'Allt vilt som fälls på statlig mark',
      'Vissa utpekade arter som tillfaller staten när de påträffas döda eller fälls',
      'Vilt som förvaltas av kommunen',
      'Vilt som saknar allmän jakttid',
    ],
    correctAnswer: 1,
    explanation:
      'Ett antal arter, bland annat björn, varg, lodjur, järv och kungsörn, är statens vilt. Påträffas de döda eller fälls de ska de anmälas och tillfaller staten.',
    difficulty: 'medel',
    tags: ['statens vilt'],
    sources: [sources.jaktforordningen],
  },
  {
    id: 'q-lag-003',
    categoryId: 'lagstiftning',
    question: 'Var hittar du gällande jakttider för en art?',
    answers: [
      'I vapenlagen',
      'I jaktförordningens bilagor, med kompletterande beslut från länsstyrelsen',
      'I miljöbalken',
      'I markägarens jakträttsavtal',
    ],
    correctAnswer: 1,
    explanation:
      'Jakttiderna framgår av bilagorna till jaktförordningen och kan variera mellan län och områden. Kontrollera alltid aktuella tider inför säsongen, eftersom de ändras över tid.',
    difficulty: 'medel',
    tags: ['jakttider'],
    sources: [sources.jaktforordningen, sources.naturvardsverketJakttider],
  },
  {
    id: 'q-lag-004',
    categoryId: 'lagstiftning',
    question: 'Är det tillåtet att jaga med pilbåge eller armborst i Sverige?',
    answers: [
      'Ja, för småvilt',
      'Nej, det är inte tillåtet',
      'Ja, med särskilt tillstånd från kommunen',
      'Ja, om jägaren har avlagt bågskytteprov',
    ],
    correctAnswer: 1,
    explanation:
      'Pilbåge och armborst är inte tillåtna jaktvapen i Sverige. Tillåtna vapen och redskap regleras i jaktförordningen och i Naturvårdsverkets föreskrifter.',
    difficulty: 'medel',
    tags: ['vapen', 'lagstiftning'],
    sources: [sources.jaktforordningen],
  },
  {
    id: 'q-lag-005',
    categoryId: 'lagstiftning',
    question: 'Får du skjuta från ett motordrivet fordon?',
    answers: [
      'Ja, om motorn är avstängd',
      'Nej, jakt från motordrivet fordon är förbjuden utom i särskilt medgivna undantagsfall',
      'Ja, vid jakt på vildsvin',
      'Ja, om fordonet står på enskild väg',
    ],
    correctAnswer: 1,
    explanation:
      'Jakt från motordrivna fordon är förbjuden. Undantag kan medges i enskilda fall, till exempel för personer med vissa funktionsnedsättningar, men kräver beslut.',
    difficulty: 'medel',
    tags: ['fordon', 'lagstiftning'],
    sources: [sources.jaktforordningen],
  },
  {
    id: 'q-lag-006',
    categoryId: 'lagstiftning',
    question: 'Vilket ansvar har en jaktledare?',
    answers: [
      'Att äga marken där jakten sker',
      'Att planera och leda jakten samt gå igenom säkerhetsregler och jaktens upplägg',
      'Att kontrollera alla deltagares vapenlicenser hos Polisen',
      'Att ansvara för varje deltagares skott',
    ],
    correctAnswer: 1,
    explanation:
      'Jaktledaren organiserar jakten, informerar om säkerhet, passplacering och signaler. Varje jägare bär däremot alltid själv ansvaret för sina egna skott.',
    difficulty: 'medel',
    tags: ['jaktledare'],
    sources: [sources.jagareforbundet],
  },

  // ─── Praktisk jakt ────────────────────────────────────────────────────────
  {
    id: 'q-prak-001',
    categoryId: 'praktisk-jakt',
    question: 'Varför ska ett fällt djur tas ur och kylas så snabbt som möjligt?',
    answers: [
      'För att köttet ska bli mörkare',
      'För att bromsa bakterietillväxt och bevara kvaliteten på köttet',
      'För att djuret ska bli lättare att bära',
      'För att undvika att hunden hittar det',
    ],
    correctAnswer: 1,
    explanation:
      'Kroppsvärmen ger bakterier goda förhållanden. Snabb urtagning och effektiv nedkylning med god luftcirkulation – aldrig i tät plastsäck – är avgörande för livsmedelssäkerheten.',
    difficulty: 'lätt',
    tags: ['kötthantering'],
    sources: [sources.livsmedelsverket],
  },
  {
    id: 'q-prak-002',
    categoryId: 'praktisk-jakt',
    question: 'Vilken undersökning är särskilt viktig för kött från vildsvin?',
    answers: [
      'Analys av blyhalt',
      'Trikinundersökning',
      'DNA-analys',
      'Kontroll av hornens ålder',
    ],
    correctAnswer: 1,
    explanation:
      'Vildsvin kan bära trikiner, en parasit som kan smitta människa. Kött från vildsvin ska därför trikinundersökas av ett godkänt laboratorium innan det äts eller lämnas vidare.',
    difficulty: 'medel',
    tags: ['trikiner', 'livsmedel'],
    sources: [sources.livsmedelsverket],
  },
  {
    id: 'q-prak-003',
    categoryId: 'praktisk-jakt',
    question: 'Vad är ett skottecken?',
    answers: [
      'Ett märke som sätts ut på passet',
      'Djurets reaktion och spåren på platsen som berättar hur skottet träffade',
      'Vapnets sikte',
      'Ett tecken från jaktledaren att skjuta',
    ],
    correctAnswer: 1,
    explanation:
      'Skottecken är den information du samlar direkt efter skottet: djurets reaktion, flyktriktning, ljud, samt hår, ben och blod på platsen. Den styr hur eftersöket bör läggas upp.',
    difficulty: 'medel',
    tags: ['eftersök'],
    sources: [sources.jagareforbundet],
  },

  // ─── Artkännedom ──────────────────────────────────────────────────────────
  {
    id: 'q-art-001',
    categoryId: 'artkannedom',
    question: 'Vilket kännetecken skiljer orrtuppen från tjädertuppen?',
    answers: [
      'Orren har lyrformad stjärt och vit vingbandsteckning',
      'Orren är större än tjädern',
      'Orren saknar röd ögonbrynsfläck',
      'Orren har helvit fjäderdräkt',
    ],
    correctAnswer: 0,
    explanation:
      'Orrtuppen är mindre än tjädern, blåsvart med utåtsvängd lyrformad stjärt och tydliga vita vingband. Båda arterna har röda ögonbrynsfläckar.',
    difficulty: 'medel',
    tags: ['orre', 'tjäder'],
    sources: [sources.jagareforbundet],
  },
  {
    id: 'q-art-002',
    categoryId: 'artkannedom',
    question: 'Hur skiljer du en grävling från en mårdhund i fält?',
    answers: [
      'Grävlingen har svartvita längsgående ansiktsstrimmor och kraftig kropp',
      'Mårdhunden är större och har ringad svans',
      'Grävlingen har spetsig, räv-lik nos',
      'Arterna är omöjliga att skilja utan spårsnö',
    ],
    correctAnswer: 0,
    explanation:
      'Grävlingen har karakteristiska svartvita strimmor längs huvudet och en kompakt, bredare kropp. Mårdhunden är mer hundlik med mörk ansiktsmask och yvig päls.',
    difficulty: 'svår',
    tags: ['grävling', 'mårdhund'],
    sources: [sources.jagareforbundet],
  },
  {
    id: 'q-art-003',
    categoryId: 'artkannedom',
    question: 'Vilket av följande är ett säkert kännetecken för räv på håll?',
    answers: [
      'Kort svans och rundade öron',
      'Lång, yvig svans ofta med vit spets samt spetsig nos',
      'Vita ben och svart svansspets',
      'Kraftig kroppsbyggnad med puckel över bogen',
    ],
    correctAnswer: 1,
    explanation:
      'Räven känns igen på den långa yviga svansen, ofta med vit spets, den spetsiga nosen och den rostfärgade pälsen. Rörelsemönstret är lätt och fjädrande.',
    difficulty: 'lätt',
    tags: ['räv'],
    sources: [sources.jagareforbundet],
  },
  {
    id: 'q-art-004',
    categoryId: 'artkannedom',
    question: 'Varför är säker artkännedom en förutsättning för jakt?',
    answers: [
      'För att kunna beräkna köttmängden',
      'För att jakttider, fredning och vapenkrav skiljer sig mellan arter',
      'För att kunna namnge djuret i jaktrapporten',
      'För att hundar reagerar olika på olika arter',
    ],
    correctAnswer: 1,
    explanation:
      'Olika arter har olika jakttider, fredningsbestämmelser och krav på vapen och ammunition. Felaktig artbestämning kan både vara ett jaktbrott och orsaka onödigt lidande.',
    difficulty: 'lätt',
    tags: ['artkännedom', 'etik'],
    sources: [sources.jaktforordningen],
  },
]

/** Fast lookup for review screens and bookmark rendering. */
export const questionsById: Record<string, Question> = Object.fromEntries(
  questions.map((question) => [question.id, question]),
)
