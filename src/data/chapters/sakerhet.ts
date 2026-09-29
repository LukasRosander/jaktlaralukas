import { sources } from '@/data/sources'
import type { TheoryChapter } from '@/types'

export const sakerhetChapters: TheoryChapter[] = [
  {
    id: 'ch-sak-grundregler',
    categoryId: 'jakt-och-sakerhet',
    title: 'Säkerhet före, under och efter jakt',
    summary: 'Grundregler för vapenhantering, kulfång, rikoschetter och viltolyckor.',
    readingTimeMin: 10,
    blocks: [
      {
        kind: 'paragraph',
        text: 'Jaktsäkerhet bygger på vanor. Reglerna är få och enkla, men de måste sitta så väl att de gäller även när du är trött, kall eller när något oväntat händer. Varje skott är ditt eget ansvar – det kan aldrig delegeras till jaktledaren eller sällskapet.',
      },
      { kind: 'heading', text: 'Grundregler för vapenhantering' },
      {
        kind: 'list',
        items: [
          'Behandla alltid vapnet som om det är laddat.',
          'Rikta aldrig vapnet mot något du inte är beredd att skjuta på.',
          'Kontrollera själv att vapnet är oladdat – lita aldrig på någon annans ord.',
          'Håll fingret utanför varbygeln till dess du beslutat att skjuta.',
          'Lita aldrig på säkringen som enda skydd.',
          'Plocka ur patronerna när jakten avbryts.',
        ],
      },
      {
        kind: 'fact',
        title: 'Oladdat vapen – när?',
        text: 'Vid transport, i fordon, vid passage av hinder som stängsel och diken, vid raster, vid förflyttning i sällskap och alltid när jakt inte pågår.',
      },
      { kind: 'heading', text: 'Kulfång och rikoschetter' },
      {
        kind: 'paragraph',
        text: 'Kulfånget är det som stoppar kulan om den missar eller går igenom viltet. En jordvall, ett motlut eller tät mark fungerar; luft, vatten och horisont gör det inte. En kula från ett klass 1-vapen kan gå flera kilometer om den inte stoppas.',
      },
      {
        kind: 'paragraph',
        text: 'Hårda och släta ytor – vatten, is, berghällar och frusen mark – ger stor risk för rikoschetter, där kulan studsar vidare i oförutsägbar riktning. Undvik sådana skottriktningar även när målet ser fritt ut.',
      },
      { kind: 'heading', text: 'Säkerhet i sällskap' },
      {
        kind: 'list',
        items: [
          'Använd varselplagg vid jakt med flera deltagare.',
          'Håll dig till din tilldelade skjutsektor och känn grannpassens läge.',
          'Ha telefon eller jaktradio och vetskap om hur larm görs.',
          'Sätt ut varningsskyltar vid jakt nära vägar och stigar.',
          'Bär första förband och vet var närmaste väg för ambulans finns.',
        ],
      },
      { kind: 'heading', text: 'Viltolyckor i trafiken' },
      {
        kind: 'paragraph',
        text: 'Sammanstötningar med bland annat älg, hjort, rådjur, vildsvin och de stora rovdjuren ska anmälas till polisen via 112. Märk ut olycksplatsen så att eftersöksjägaren kan hitta rätt, och lämna uppgifter om riktning djuret försvann i. Även om djuret verkar oskadat ska olyckan anmälas.',
      },
      {
        kind: 'important',
        title: 'Viktigt att kunna',
        items: [
          'De sex grundreglerna för säker vapenhantering.',
          'När vapnet alltid ska vara oladdat.',
          'Vad ett säkert kulfång är och varför det alltid krävs.',
          'Vilka underlag som ger rikoschettrisk.',
          'Att viltolyckor anmäls till 112 och att platsen ska märkas ut.',
        ],
      },
    ],
    sources: [sources.jagareforbundet, sources.viltolycksradet, sources.jaktlagen],
  },
]
