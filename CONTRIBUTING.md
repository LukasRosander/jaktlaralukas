# Bidra till Jaktlära

Tack för att du vill hjälpa till! Projektet vinner mest på två sorters bidrag: **korrekt
faktainnehåll** och **förbättringar av användarupplevelsen**.

Diskussion sker gärna på svenska, men kod, commit-meddelanden och kodkommentarer skrivs på engelska.
All text som användaren ser i gränssnittet ska vara på svenska.

---

## Innan du börjar

1. Sök igenom befintliga issues och pull requests så att arbetet inte dubbleras.
2. Öppna gärna ett issue först för större förändringar, så slipper du lägga tid på något som
   projektet vill lösa på ett annat sätt.
3. Små rättelser – stavfel, felaktiga fakta, trasiga länkar – kan skickas direkt som pull request.

## Utvecklingsmiljö

```bash
npm install
npm run dev      # http://localhost:4317
```

Innan du öppnar en pull request:

```bash
npm run lint     # oxlint
npm run build    # typkontroll (tsc -b) + produktionsbygge
npm run format   # Prettier
```

Alla tre ska gå igenom utan fel.

---

## Innehållsbidrag

### Regler för frågor

Detta är den viktigaste regeln i projektet:

> **Återge aldrig officiella provfrågor från jägarexamen.** Alla frågor ska vara nyskrivna i
> utbildningssyfte.

Pull requests som innehåller kopierade provfrågor, eller frågor som framställs som officiella,
kommer att avslås.

En bra fråga:

- prövar **förståelse**, inte gissningar på formuleringar;
- har fyra rimliga alternativ där de felaktiga är rimliga misstag;
- har en förklaring som lär ut resonemanget;
- har minst en **källa** – i praktiken Naturvårdsverket, Riksdagen (jaktlagen, jaktförordningen,
  vapenlagen), Livsmedelsverket, Polismyndigheten eller Svenska Jägareförbundet.

Se avsnittet "Lägga till innehåll" i [README.md](README.md#lägga-till-innehåll) för exakt kodformat.

### Regler för teori

- Skriv sakligt, kort och i löpande text. Undvik myndighetsspråk.
- Använd `fact`-block för sådant som är lätt att missa och `important`-block för det som måste kunnas.
- Ange alltid källor på kapitelnivå.
- Undvik att skriva ut exakta paragrafnummer om du inte har verifierat dem mot en aktuell källa.
  Regler ändras, och ett felaktigt paragrafnummer är värre än inget.
- Lagkrav som varierar mellan län (till exempel jakttider) ska beskrivas som variabla, med
  hänvisning till att aktuella tider ska kontrolleras.

### Bilder

- Bilder läggs i `src/assets/images/` som `.webp`, högst cirka 300 kB per bild.
- Registrera bilden i `src/data/images.ts` och importera den därifrån – aldrig via en strängsökväg.
- Bidra bara med bilder du har rätt att licensiera under projektets villkor. Ange källa i din pull
  request.

---

## Kodbidrag

### Riktlinjer

- **TypeScript i strict-läge.** Undvik `any`; utöka hellre domänmodellen i `src/types/index.ts`.
- **En komponent per fil**, namngiven export, i den mapp som matchar dess domän.
- **Generiska byggstenar** hör i `src/components/ui/`, domänspecifika i respektive undermapp.
- **Beräkningar hör i `src/utils/`**, inte i komponenter.
- **Läs innehåll via `src/data/repository.ts`**, inte genom att importera mockdatan direkt.
- **Framsteg ändras bara via `useProgress()`.** Skriv aldrig till `localStorage` från en komponent.
- **Inloggningen är en prototyp, inte säkerhet.** Konton ligger i webbläsaren och lösenordshashningen
  i `src/utils/password.ts` skyddar ingenting mot någon som har tillgång till datorn. Bygg inget som
  förutsätter att lagret är säkert, och lägg inte in något känsligt bakom det – riktig
  autentisering hör hemma på en server.
- **Styling med Tailwind-klasser** och tokens från `src/styles/index.css`. Lägg inte till nya färger
  utan att först se om en befintlig token räcker.
- **Kommentarer förklarar varför**, inte vad koden gör.

### Tillgänglighet och responsivitet

Varje ändring i gränssnittet ska fungera:

- med tangentbord, inklusive synlig fokusmarkering;
- med skärmläsare – använd semantiska element och `aria-*` där det behövs;
- på mobil (från 360 px bredd), tablet och desktop;
- med `prefers-reduced-motion` aktiverat.

### Commit-meddelanden

Korta, i imperativ, på engelska. Gärna med prefix:

```text
feat: add exam review for unanswered questions
fix: keep streak alive across month boundaries
content: add eight questions about firearm classes
docs: clarify Windows setup steps
```

### Pull requests

Beskriv i PR-texten:

1. Vad du har ändrat och varför.
2. Källor, om du har lagt till eller ändrat faktainnehåll.
3. Hur du testat – vilka skärmar och vilka skärmstorlekar.
4. Skärmbilder för synliga ändringar (gärna både mobil och desktop).

---

## Uppförandekod

Var vänlig och saklig. Håll diskussionen på sak – både när det gäller kod och när det gäller
tolkningar av regelverk. Vi bygger ett verktyg som människor förlitar sig på inför ett prov, och i
förlängningen inför jakt med skarpt vapen. Noggrannhet går före tempo.

## Licens

Genom att bidra godkänner du att ditt bidrag licensieras under projektets [MIT-licens](LICENSE).
