import { artkannedomChapters } from '@/data/chapters/artkannedom'
import { ekologiChapters } from '@/data/chapters/ekologi'
import { etikChapters } from '@/data/chapters/etik'
import { grunderChapters } from '@/data/chapters/grunder'
import { hundarChapters } from '@/data/chapters/hundar'
import { jaktformerChapters } from '@/data/chapters/jaktformer'
import { lagstiftningChapters } from '@/data/chapters/lagstiftning'
import { praktiskChapters } from '@/data/chapters/praktisk'
import { sakerhetChapters } from '@/data/chapters/sakerhet'
import { skytteChapters } from '@/data/chapters/skytte'
import { vapenChapters } from '@/data/chapters/vapen'
import { viltChapters } from '@/data/chapters/vilt'
import { images } from '@/data/images'
import type { CategoryId, TheoryCategory, TheoryChapter } from '@/types'

/**
 * The theory curriculum.
 *
 * Chapters live in `src/data/chapters/*` – one file per category – so that new
 * content can be added without touching this index. To add a category, create a
 * chapter file, add the id to `CategoryId` in `src/types` and append an entry
 * below.
 */
export const theoryCategories: TheoryCategory[] = [
  {
    id: 'jaktens-grunder',
    order: 1,
    title: 'Jaktens grunder',
    description: 'Vad jägarexamen innebär, jägarens ansvar och grunderna i svensk jakt.',
    image: images.categories.grunder,
    icon: 'Compass',
    chapters: grunderChapters,
  },
  {
    id: 'viltet-i-sverige',
    order: 2,
    title: 'Viltet i Sverige',
    description: 'Artkännedom, kännetecken och biologi.',
    image: images.categories.vilt,
    icon: 'Squirrel',
    chapters: viltChapters,
  },
  {
    id: 'viltvard-och-ekologi',
    order: 3,
    title: 'Viltvård och ekologi',
    description: 'Biotoper, bärkraft och praktiskt viltvårdsarbete.',
    image: images.categories.ekologi,
    icon: 'Trees',
    chapters: ekologiChapters,
  },
  {
    id: 'jaktformer',
    order: 4,
    title: 'Jaktformer',
    description: 'Pass, smyg, vak och jakt med hund – och säkerheten i varje form.',
    image: images.categories.jaktformer,
    icon: 'Footprints',
    chapters: jaktformerChapters,
  },
  {
    id: 'jakthundar',
    order: 5,
    title: 'Jakthundar',
    description: 'Raser, arbetssätt, eftersökskrav och regler om tillsyn.',
    image: images.categories.jakthundar,
    icon: 'Dog',
    chapters: hundarChapters,
  },
  {
    id: 'vapen-och-ammunition',
    order: 6,
    title: 'Vapen och ammunition',
    description: 'Vapentyper, vapenklasser, ballistik och förvaring.',
    image: images.categories.vapen,
    icon: 'Crosshair',
    chapters: vapenChapters,
  },
  {
    id: 'skytte',
    order: 7,
    title: 'Skytte',
    description: 'Skjutställningar, avfyrning, träffområde och inskjutning.',
    image: images.categories.skytte,
    icon: 'Target',
    chapters: skytteChapters,
  },
  {
    id: 'jaktetik',
    order: 8,
    title: 'Jaktetik',
    description: 'Respekt för viltet och besluten du fattar ensam.',
    image: images.categories.jaktetik,
    icon: 'HeartHandshake',
    chapters: etikChapters,
  },
  {
    id: 'jakt-och-sakerhet',
    order: 9,
    title: 'Jakt och säkerhet',
    description: 'Grundregler, kulfång, rikoschetter och viltolyckor.',
    image: images.categories.sakerhet,
    icon: 'ShieldCheck',
    chapters: sakerhetChapters,
  },
  {
    id: 'lagstiftning',
    order: 10,
    title: 'Lagstiftning',
    description: 'Jaktlagen, jaktförordningen, vapenlagen och jakttider.',
    image: images.categories.lagstiftning,
    icon: 'Scale',
    chapters: lagstiftningChapters,
  },
  {
    id: 'praktisk-jakt',
    order: 11,
    title: 'Praktisk jakt',
    description: 'Skottecken, eftersök och vägen från skott till färdigt kött.',
    image: images.categories.praktisk,
    icon: 'Backpack',
    chapters: praktiskChapters,
  },
  {
    id: 'artkannedom',
    order: 12,
    title: 'Artkännedom',
    description: 'Metodik för säker artbestämning i fält.',
    image: images.categories.artkannedom,
    icon: 'Binoculars',
    chapters: artkannedomChapters,
  },
]

export const allChapters: TheoryChapter[] = theoryCategories.flatMap(
  (category) => category.chapters,
)

export const chaptersById: Record<string, TheoryChapter> = Object.fromEntries(
  allChapters.map((chapter) => [chapter.id, chapter]),
)

export const categoriesById: Record<CategoryId, TheoryCategory> = Object.fromEntries(
  theoryCategories.map((category) => [category.id, category]),
) as Record<CategoryId, TheoryCategory>

export const totalChapterCount = allChapters.length

export function categoryTitle(id: CategoryId): string {
  return categoriesById[id]?.title ?? id
}
