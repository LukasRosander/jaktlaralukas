/**
 * Central registry of bundled imagery.
 *
 * Importing the assets here (instead of using string paths) lets Vite hash and
 * optimise them, and gives us one place to swap in CDN URLs later.
 */
import avatarLukas from '@/assets/images/avatar-lukas.webp'
import catArtkannedom from '@/assets/images/cat-artkannedom.webp'
import catEkologi from '@/assets/images/cat-ekologi.webp'
import catGrunder from '@/assets/images/cat-grunder.webp'
import catJaktetik from '@/assets/images/cat-jaktetik.webp'
import catJaktformer from '@/assets/images/cat-jaktformer.webp'
import catJakthundar from '@/assets/images/cat-jakthundar.webp'
import catLagstiftning from '@/assets/images/cat-lagstiftning.webp'
import catPraktisk from '@/assets/images/cat-praktisk.webp'
import catSakerhet from '@/assets/images/cat-sakerhet.webp'
import catSkytte from '@/assets/images/cat-skytte.webp'
import catVapen from '@/assets/images/cat-vapen.webp'
import heroForest from '@/assets/images/hero-forest.webp'
import speciesAlg from '@/assets/images/species-alg.webp'
import speciesGrasand from '@/assets/images/species-grasand.webp'
import speciesHare from '@/assets/images/species-hare.webp'
import speciesKronhjort from '@/assets/images/species-kronhjort.webp'
import speciesRadjur from '@/assets/images/species-radjur.webp'
import speciesRav from '@/assets/images/species-rav.webp'
import speciesTjader from '@/assets/images/species-tjader.webp'
import speciesVildsvin from '@/assets/images/species-vildsvin.webp'
import textureForestDark from '@/assets/images/texture-forest-dark.webp'

export const images = {
  heroForest,
  textureForestDark,
  avatarLukas,
  categories: {
    grunder: catGrunder,
    vilt: speciesAlg,
    ekologi: catEkologi,
    jaktformer: catJaktformer,
    jakthundar: catJakthundar,
    vapen: catVapen,
    skytte: catSkytte,
    jaktetik: catJaktetik,
    sakerhet: catSakerhet,
    lagstiftning: catLagstiftning,
    praktisk: catPraktisk,
    artkannedom: catArtkannedom,
  },
  species: {
    alg: speciesAlg,
    radjur: speciesRadjur,
    vildsvin: speciesVildsvin,
    kronhjort: speciesKronhjort,
    tjader: speciesTjader,
    rav: speciesRav,
    hare: speciesHare,
    grasand: speciesGrasand,
  },
} as const
