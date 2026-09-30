# Jaktlära

**Din väg till jägarexamen** – en modern, öppen studieplattform för alla som förbereder sig inför
det svenska jägarexamensprovet.

Förbered dig smartare: läs teorin kapitel för kapitel, träna på frågor med förklaringar, gör prov
under tidspress och följ din utveckling över tid.

> **Viktigt:** Alla frågor i projektet är egna exempelfrågor skrivna i utbildningssyfte. De är
> **inte** hämtade från, och ska inte uppfattas som, officiella provfrågor för jägarexamen.
> Kontrollera alltid gällande regler hos [Naturvårdsverket](https://www.naturvardsverket.se/) och
> din länsstyrelse inför jakt.

---

## Vad projektet är

Det här är **första versionen** av plattformen: en komplett, interaktiv frontend-prototyp som körs
lokalt. All data är mockdata som ligger i `src/data/` och sparas i webbläsarens `localStorage`.
Ingen backend och ingen databas behövs för att köra projektet.

Inloggningen är också en prototyp som lever helt i webbläsaren – se
[Inloggningen i prototypen](#inloggningen-i-prototypen).

Varje konto startar tomt – noll avklarade kapitel, noll svar och alla märken låsta – precis som för
en ny användare. Vill du se hur skärmarna ser ut med historik finns **Fyll på med demodata** under
Inställningar → Dina data.

Arkitekturen är däremot förberedd för en riktig backend – se
[Byta till ett riktigt API](#byta-till-ett-riktigt-api).

### Funktioner i prototypen

| Område             | Vad du kan göra                                                                     |
| ------------------ | ----------------------------------------------------------------------------------- |
| **Landningssida**  | Presentation av plattformen, med vägar till inloggning och registrering               |
| **Konto**          | Logga in, skapa konto och logga ut – varje konto har sina egna framsteg               |
| **Dashboard**      | Se total framsteg, fortsätt på rätt kapitel, dagens träningsmål och senaste resultat |
| **Teori**          | 12 ämnesområden, 20 kapitel med faktarutor, tabeller, bilder och "Viktigt att kunna" |
| **Övningsfrågor**  | Träna med direkt facit och förklaring, filtrera på område eller bara ej klarade      |
| **Provsimulator**  | 25, 50 eller 70 frågor – eller provläget "Simulera jägarexamen" med timer            |
| **Provresultat**   | Poäng, tid, resultat per ämnesområde och genomgång av felaktiga svar                 |
| **Statistik**      | Nyckeltal och utvecklingsdiagram per vecka                                          |
| **Sparat**         | Bokmärk kapitel och frågor, med flikarna Alla / Teori / Frågor                       |
| **Framsteg**       | 12 märken som låses upp automatiskt när du når ett delmål                            |
| **Profil**         | Profilöversikt, nyckeltal och dina upplåsta märken                                   |
| **AI-coach**       | Förberedd flik för en studiecoach – avstängd och tydligt märkt "Inte aktiv"           |
| **Inställningar**  | Provstandard, textstorlek, reducerade animationer och nollställning av framsteg      |

---

## Teknik

| Verktyg                                        | Roll                                     |
| ---------------------------------------------- | ---------------------------------------- |
| [React 19](https://react.dev/)                 | UI-bibliotek                             |
| [TypeScript](https://www.typescriptlang.org/)  | Typsäkerhet i hela kodbasen              |
| [Vite](https://vite.dev/)                      | Utvecklingsserver och byggverktyg        |
| [Tailwind CSS 4](https://tailwindcss.com/)     | Designsystem och styling                 |
| [React Router](https://reactrouter.com/)       | Routing                                  |
| [Lucide](https://lucide.dev/)                  | Ikoner                                   |
| [Recharts](https://recharts.org/)              | Diagram                                  |
| [oxlint](https://oxc.rs/)                      | Linting                                  |

Typsnitten (Inter och Instrument Serif) paketeras lokalt via `@fontsource`, så appen fungerar utan
internetanslutning.

---

## Kom igång

### Förutsättningar

- **Node.js 20.19+ eller 22.12+** (rekommenderat: den senaste LTS-versionen) – <https://nodejs.org/>
- **npm** (följer med Node.js)

Kontrollera din version:

```bash
node -v
npm -v
```

### Installera och starta (macOS / Linux)

```bash
git clone <repo-url>
cd jaktlara        # mappen får samma namn som repot
npm install
npm run dev
```

Öppna adressen som skrivs ut i terminalen, normalt <http://localhost:4317>.

### Installera och starta på Windows (steg för steg)

1. **Installera Node.js.** Ladda ner LTS-versionen från <https://nodejs.org/> och kör
   installationsprogrammet med standardinställningarna.
2. **Öppna en terminal.** Tryck `Win`, skriv `PowerShell` och öppna **Windows PowerShell**.
   (Kommandotolken `cmd` och Git Bash fungerar också.)
3. **Kontrollera installationen:**

   ```powershell
   node -v
   npm -v
   ```

   Du ska få ut ett versionsnummer för båda. Får du ett felmeddelande – starta om terminalen så att
   Windows hittar den nya PATH-variabeln.

4. **Hämta projektet.** Antingen med Git:

   ```powershell
   git clone <repo-url>
   cd jaktlara        # mappen får samma namn som repot
   ```

   Eller ladda ner projektet som ZIP, högerklicka → **Extrahera alla**, och gå därefter till mappen:

   ```powershell
   cd C:\Users\<ditt-användarnamn>\Downloads\jaktlara
   ```

5. **Installera beroendena** (tar en stund första gången):

   ```powershell
   npm install
   ```

6. **Starta utvecklingsservern:**

   ```powershell
   npm run dev
   ```

7. **Öppna appen.** Terminalen skriver ut något i stil med:

   ```text
   VITE ready in 420 ms
   ➜  Local:   http://localhost:4317/
   ```

   `Ctrl`-klicka på länken eller öppna <http://localhost:4317> i webbläsaren.

8. **Stoppa servern** med `Ctrl + C` i terminalen.

> **Om porten redan används:** starta på en annan port med
> `npm run dev -- --port 4400`, eller ändra `server.port` i `vite.config.ts`.
>
> **Om PowerShell blockerar `npm`** med ett meddelande om körningspolicy, kör terminalen som
> administratör en gång och ange:
> `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`

### Bygga en produktionsversion

```bash
npm run build     # typkontroll + bygge till dist/
npm run preview   # servera det byggda resultatet lokalt (http://localhost:4318)
```

Resultatet hamnar i `dist/` och är statiska filer som kan läggas på valfri statisk webbhost.

### Alla npm-skript

| Skript            | Gör                                                           |
| ----------------- | ------------------------------------------------------------- |
| `npm run dev`     | Startar utvecklingsservern med hot reload på port 4317         |
| `npm run build`   | Kör `tsc -b` och bygger produktionsversionen till `dist/`      |
| `npm run preview` | Servar `dist/` lokalt för att kontrollera bygget               |
| `npm run lint`    | Kör oxlint över kodbasen                                       |
| `npm run format`  | Formaterar koden med Prettier                                  |

---

## Inloggningen i prototypen

> **Detta är ingen säkerhetsmodell.** Konton sparas i webbläsarens `localStorage` på den dator du
> sitter vid. Det finns ingen server, ingen sessionshantering och inget skydd mot att någon med
> tillgång till datorn läser eller ändrar datan. Lösenord lagras hashade (SHA-256 med slumpat salt)
> så att ingen klartext ligger kvar, men hashning i webbläsaren gör det **inte** säkert – vem som
> helst kan byta ut hashen direkt i `localStorage`. Använd därför aldrig ett lösenord du använder
> någon annanstans, och ersätt det här lagret med riktig serverautentisering innan något liknande
> används på riktigt.

### Testkonto

| Användarnamn    | Lösenord |
| --------------- | -------- |
| `lukasrosander` | `12345`  |

Kontot finns förifyllt så att appen går att prova direkt. På inloggningssidan finns knappen
**Fyll i testkontot** som skriver in uppgifterna för dig.

### Skapa konto

`/skapa-konto` lägger till ett nytt konto lokalt. Användarnamnet måste vara unikt (jämförelsen är
skiftlägesokänslig), och varje konto får sina egna framsteg: avklarade kapitel, svar, prov,
bokmärken, märken och inställningar följer kontot och blandas aldrig ihop mellan konton.

### Var datan ligger

| Nyckel i `localStorage`               | Innehåll                                              |
| ------------------------------------- | ----------------------------------------------------- |
| `jaktlara.accounts.v1`                | Alla konton (namn, användarnamn, salt, lösenordshash) |
| `jaktlara.session.v1`                 | Vilket konto som är inloggat just nu                  |
| `jaktlara.progress.v2.<kontots-id>`   | Framstegen för ett enskilt konto                      |

Töm de nycklarna i webbläsarens utvecklingsverktyg om du vill börja helt från början.

### Koden

- `src/store/AuthProvider.tsx` – kontolagret: inloggning, registrering och utloggning.
- `src/utils/password.ts` – salt, hashning och valideringsreglerna för användarnamn och lösenord.
- `src/data/accounts.ts` – testkontot och omvandlingen från konto till profil.
- `src/components/auth/RequireAuth.tsx` – skyddar `/app/*` och monterar rätt konto framsteg.
- `src/pages/LoginPage.tsx`, `src/pages/SignUpPage.tsx` – skärmarna.

När en backend tillkommer är `AuthProvider` det enda stället som behöver bytas ut: resten av appen
läser kontot via `useAuth()`.

---

## AI-coachen

Fliken **AI-coach** finns i menyn men är medvetet avstängd. Sidan förklarar vad coachen ska kunna
(svara på jaktfrågor med källor, ge råd om studieteknik, hålla sig till ämnet), varför den inte är
påslagen ännu, och visar en inaktiverad chattruta med texten "Chatten är avstängd i den här
versionen". Menypunkten är märkt **Snart**.

Sidan ligger i `src/pages/AiCoachPage.tsx` och menyposten i `src/config/navigation.ts`. Det som
återstår för att slå på den är en modellintegration bakom ett API samt en källgrundad kontext – ren
frigenerering vore fel i ett sammanhang där svaren ska kunna beläggas mot Naturvårdsverket och
gällande lagstiftning.

---

## Projektstruktur

```text
jaktlara/
├── public/                     Statiska filer (favicon)
├── src/
│   ├── assets/images/          Bilder på vilt, natur och kategorier (webp)
│   ├── components/
│   │   ├── achievements/       BadgeCard, AchievementToast
│   │   ├── auth/               AuthLayout, RequireAuth, TextField
│   │   ├── exam/               ExamTimer, QuestionNavigator
│   │   ├── layout/             Sidebar, MobileNavigation, Header, Logo
│   │   ├── marketing/          Landningssidans header och footer
│   │   ├── questions/          QuestionCard
│   │   ├── stats/              StatCard, ProgressChart, CategoryBars
│   │   ├── theory/             TheoryCard, TheoryBlocks
│   │   └── ui/                 Button, Card, ProgressBar, Pill, Tabs, Avatar …
│   ├── config/                 navigation.ts – appens menystruktur
│   ├── data/
│   │   ├── chapters/           Teorikapitel, en fil per ämnesområde
│   │   ├── accounts.ts         Testkontot och kontots profilvy
│   │   ├── achievements.ts     Märken och deras villkor
│   │   ├── images.ts           Registret över paketerade bilder
│   │   ├── questions.ts        Frågebanken (exempelfrågor)
│   │   ├── repository.ts       Åtkomstlagret mot innehållet
│   │   ├── sources.ts          Återanvändbara källhänvisningar
│   │   ├── statistics.ts       Demohistorik (valfri, tomt läge som standard)
│   │   ├── theory.ts           De 12 ämnesområdena
│   │   └── user.ts             Standardinställningar
│   ├── hooks/                  useProgress, useAuth, useProfile, useLocalStorage …
│   ├── layouts/                AppLayout – appens skal
│   ├── pages/                  En fil per skärm (inkl. LoginPage, SignUpPage, AiCoachPage)
│   ├── store/                  AuthProvider, ProgressProvider och deras context
│   ├── styles/index.css        Designtokens, typsnitt och animationer
│   ├── types/index.ts          Hela domänmodellen
│   ├── utils/                  stats, achievements, exam, password, date, format …
│   ├── App.tsx                 Routing
│   └── main.tsx                Startpunkt
├── CONTRIBUTING.md
├── LICENSE
├── index.html
├── package.json
├── tsconfig.app.json
└── vite.config.ts
```

### Så hänger delarna ihop

- **`src/types/index.ts`** definierar hela domänmodellen (`Question`, `TheoryChapter`,
  `ExamAttempt`, `ProgressState` …). Börja här när du vill förstå datan.
- **`src/data/`** innehåller allt innehåll som ren TypeScript-data. Inga komponenter importerar
  mockdatan direkt – de går via **`src/data/repository.ts`**.
- **`src/store/AuthProvider.tsx`** äger kontona och vem som är inloggad.
  **`src/components/auth/RequireAuth.tsx`** släpper bara in inloggade besökare på `/app/*` och
  monterar framstegen för just det kontot.
- **`src/store/ProgressProvider.tsx`** äger användarens framsteg: klarmarkerade kapitel, svar, prov,
  bokmärken, märken och inställningar. Allt sparas i `localStorage` under nyckeln
  `jaktlara.progress.v2.<kontots-id>`, så varje konto har sin egen historik.
- **`src/utils/`** innehåller alla beräkningar – statistik, streak, märkesvillkor och provlogik – så
  att komponenterna kan hållas rena.
- **`src/components/`** är presentationslagret, uppdelat i `ui/` (generiska byggstenar) och
  domänmappar.

---

## Lägga till innehåll

### Lägga till en fråga

Öppna `src/data/questions.ts` och lägg till ett objekt i arrayen:

```ts
{
  id: 'q-vilt-011',                       // måste vara unikt
  categoryId: 'viltet-i-sverige',         // se CategoryId i src/types
  question: 'Vilket kännetecken har järpen?',
  answers: [                              // alltid fyra alternativ (A–D)
    'Lyrformad stjärt',
    'Gråspräcklig dräkt med kort tofs',
    'Helvit vinterdräkt',
    'Röd näbb',
  ],
  correctAnswer: 1,                       // nollbaserat index i answers
  explanation:
    'Järpen är minst av våra skogsfåglar, gråspräcklig med kort tofs och hos tuppen en svart strupfläck.',
  difficulty: 'medel',                    // 'lätt' | 'medel' | 'svår'
  tags: ['järpe', 'fågel'],               // valfritt
  sources: [sources.jagareforbundet],     // se src/data/sources.ts
}
```

Riktlinjer:

- Skriv **egna** frågor. Återge aldrig officiella provfrågor.
- Förklaringen ska lära ut resonemanget, inte bara bekräfta rätt bokstav.
- Bifoga minst en källa. Behöver du en ny källa lägger du till den i `src/data/sources.ts`.
- Frågan dyker automatiskt upp i övningsläget, provsimulatorn och statistiken.

### Lägga till teoriinnehåll

Kapitel ligger i `src/data/chapters/`, en fil per ämnesområde.

**Nytt kapitel i ett befintligt område** – lägg till ett objekt i rätt fil, exempelvis
`src/data/chapters/vilt.ts`:

```ts
{
  id: 'ch-vilt-smaevilt',
  categoryId: 'viltet-i-sverige',
  title: 'Småvilt i jordbrukslandskapet',
  summary: 'Fasan, rapphöna och fälthare – kännetecken och biotoper.',
  readingTimeMin: 7,
  blocks: [
    { kind: 'heading', text: 'Fasan' },
    { kind: 'paragraph', text: 'Fasanen är införd i Sverige och …' },
    { kind: 'list', items: ['Tuppen har lång stjärt …', 'Hönan är diskret brun …'] },
    { kind: 'fact', title: 'Biotop', text: 'Trivs i kantzoner mellan åker och skog.' },
    { kind: 'image', src: images.species.hare, alt: 'Fälthare i höstgräs' },
    { kind: 'table', headings: ['Art', 'Kännetecken'], rows: [['Fasan', 'Lång stjärt']] },
    { kind: 'important', items: ['Fasanen är införd.', 'Jakttid varierar mellan län.'] },
  ],
  sources: [sources.jagareforbundet],
}
```

Tillgängliga blocktyper: `heading`, `paragraph`, `list`, `fact`, `important`, `image`, `table`.
De definieras av `TheoryBlock` i `src/types/index.ts` och renderas av
`src/components/theory/TheoryBlocks.tsx`.

**Nytt ämnesområde:**

1. Lägg till id:t i unionen `CategoryId` i `src/types/index.ts`.
2. Skapa `src/data/chapters/<namn>.ts` och exportera en array med kapitel.
3. Lägg till en bild i `src/assets/images/` och registrera den i `src/data/images.ts`.
4. Lägg till området i `theoryCategories` i `src/data/theory.ts`.
5. Lägg in en relativ styrka i `CATEGORY_STRENGTH` i `src/data/statistics.ts` (används av demodatan).

### Lägga till ett märke

Lägg till en post i `src/data/achievements.ts`. Villkoret (`criteria`) måste matcha en variant av
`AchievementCriteria` i `src/types/index.ts`, och utvärderas i `src/utils/achievements.ts`. Behöver
du en helt ny typ av villkor lägger du till den på båda ställena.

---

## Byta till ett riktigt API

Prototypen är byggd för att kunna få en backend utan att UI-lagret skrivs om:

1. **Innehåll.** Alla läsningar går via `src/data/repository.ts`. Byt ut funktionskropparna mot
   `fetch`-anrop – returtyperna finns redan som `Promise`-varianter i `api`-objektet i samma fil.
2. **Framsteg.** `src/store/ProgressProvider.tsx` är det enda stället som skriver användardata. Byt
   `useLocalStorage` mot ett API-anrop (`GET /api/progress` vid start, `PATCH` vid varje mutation).
   Alla komponenter använder `useProgress()` och behöver inte ändras.
3. **Konto och profil.** `src/store/AuthProvider.tsx` är det enda stället som känner till konton.
   Byt `signIn`/`signUp` mot `POST /api/login` och `POST /api/accounts`, och låt profilen komma från
   `GET /api/me`. Ta bort lösenordshashningen i `src/utils/password.ts` – den hör hemma på servern.
4. **Källor.** Modellen `ContentSource` finns redan på både frågor och kapitel, så innehåll kan
   flyttas till ett CMS utan att strukturen ändras.

---

## Tillgänglighet

- Semantiska landmärken, `aria-*` på interaktiva komponenter och en "Hoppa till innehållet"-länk.
- Alla interaktiva element går att nå och använda med tangentbord, med synlig fokusmarkering.
- Textstorlek och reducerade animationer kan ställas in i appen, och `prefers-reduced-motion`
  respekteras.
- Färgkontrasterna följer designsystemets mörkgröna/beige palett med kontrollerad kontrast.

---

## Bidra

Läs [CONTRIBUTING.md](CONTRIBUTING.md). Kort version: forka, skapa en gren, kör
`npm run lint && npm run build` innan du öppnar en pull request, och bifoga källor till allt
faktainnehåll.

## Licens

[MIT](LICENSE) © Jaktlära-projektet
