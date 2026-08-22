import platformPreview1 from "@/assets/platform-preview-1.png.asset.json";
import platformPreview2 from "@/assets/platform-preview-2.png.asset.json";
import platformPreview3 from "@/assets/platform-preview-3.png.asset.json";
import platformAll from "@/assets/platform-all.png.asset.json";
import platformPocketFm from "@/assets/platform-pocket-fm.png.asset.json";
import platformKukuFm from "@/assets/platform-kuku-fm.png.asset.json";
import platformKukuTv from "@/assets/platform-kuku-tv.png.asset.json";
import platformPratilipiFm from "@/assets/platform-pratilipi-fm.png.asset.json";
import platformEight from "@/assets/platform-eight.png.asset.json";
import platformHeadfone from "@/assets/platform-headfone.png.asset.json";
import platformStoryTv from "@/assets/platform-story-tv.png.asset.json";
import genrePreview1 from "@/assets/genre-preview-1.png.asset.json";
import genrePreview2 from "@/assets/genre-preview-2.png.asset.json";
import genrePreview3 from "@/assets/genre-preview-3.png.asset.json";
import genreHorror from "@/assets/genre-horror.webp.asset.json";
import genreFantasy from "@/assets/genre-fantasy.webp.asset.json";
import genreDrama from "@/assets/genre-drama.webp.asset.json";
import genreAction from "@/assets/genre-action.webp.asset.json";
import genreLove from "@/assets/genre-love.webp.asset.json";
import genreRagsToRiches from "@/assets/genre-rags-to-riches.webp.asset.json";
import genreHiddenIdentity from "@/assets/genre-hidden-identity.webp.asset.json";
import genreMystery from "@/assets/genre-mystery.webp.asset.json";
import genreCrime from "@/assets/genre-crime.webp.asset.json";
import genreAdventure from "@/assets/genre-adventure.webp.asset.json";
import genreRomance from "@/assets/genre-romance.webp.asset.json";
import genreSuspenseThriller from "@/assets/genre-suspense-thriller.webp.asset.json";
import genreRebirth from "@/assets/genre-rebirth.webp.asset.json";
import genreSuperpower from "@/assets/genre-superpower.webp.asset.json";
import genreSciFi from "@/assets/genre-sci-fi.webp.asset.json";
import languageHindi from "@/assets/language-hindi.png";
import languageEnglish from "@/assets/language-english.png";
import request1 from "@/assets/request-1.png";
import request2 from "@/assets/request-2.png";
import request3 from "@/assets/request-3.png";
import topwear from "@/assets/cat-topwear.jpg";
import bottomwear from "@/assets/cat-bottomwear.jpg";
import footwear from "@/assets/cat-footwear.jpg";
import newArrival from "@/assets/cat-new.jpg";
import hoodie from "@/assets/cat-hoodie.jpg";
import bag from "@/assets/cat-bag.jpg";

export type SubCategory = {
  title: string;
  image: string;
  route: string;
};

export type Category = {
  id: string;
  title: string;
  tint: string; // css var name for the pastel background
  items: SubCategory[];
  /** Circle thumbnails shown on the collapsed card (defaults to first 3 item images). */
  previews?: string[];
  /** Expanded grid shows images only, no text labels. */
  imageOnly?: boolean;
  /** Expanded grid items render with 0% corner radius and no border. */
  squareItems?: boolean;
  /** CSS aspect-ratio for expanded grid items (defaults to "1 / 1"). */
  itemAspect?: string;
  /** Grid column count for expanded items (defaults to 3). */
  columns?: number;
  /** Card is visible but does not expand or navigate. */
  disabled?: boolean;
  /** Special tap action handled by the page instead of expansion. */
  action?: "request-story";
};

export const categories: Category[] = [
  {
    id: "platform",
    title: "Platform",
    tint: "var(--tint-pink)",
    previews: [platformPreview1.url, platformPreview2.url, platformPreview3.url],
    imageOnly: true,
    itemAspect: "1054 / 1492",
    items: [
      { title: "All Platforms", image: platformAll.url, route: "/platforms" },
      { title: "Pocket FM", image: platformPocketFm.url, route: "/platforms/pocket-fm" },
      { title: "Kuku FM", image: platformKukuFm.url, route: "/platforms/kuku-fm" },
      { title: "Kuku TV", image: platformKukuTv.url, route: "/platforms/kuku-tv" },
      { title: "Pratilipi FM", image: platformPratilipiFm.url, route: "/platforms/pratilipi-fm" },
      { title: "EIGHT", image: platformEight.url, route: "/platforms/eight" },
      { title: "Headfone", image: platformHeadfone.url, route: "/platforms/headfone" },
      { title: "Story TV", image: platformStoryTv.url, route: "/platforms/story-tv" },
    ],
  },
  {
    id: "genres",
    title: "Genres",
    tint: "var(--tint-blush)",
    previews: [genrePreview1.url, genrePreview2.url, genrePreview3.url],
    imageOnly: true,
    squareItems: true,
    itemAspect: "1386 / 1920",
    items: [
      { title: "Horror", image: genreHorror.url, route: "/genres/horror" },
      { title: "Romance", image: genreRomance.url, route: "/genres/romance" },
      { title: "Fantasy", image: genreFantasy.url, route: "/genres/fantasy" },
      { title: "Drama", image: genreDrama.url, route: "/genres/drama" },
      { title: "Suspense & Thriller", image: genreSuspenseThriller.url, route: "/genres/suspense-thriller" },
      { title: "Action", image: genreAction.url, route: "/genres/action" },
      { title: "Love", image: genreLove.url, route: "/genres/love" },
      { title: "Rags to Riches", image: genreRagsToRiches.url, route: "/genres/rags-to-riches" },
      { title: "Hidden Identity", image: genreHiddenIdentity.url, route: "/genres/hidden-identity" },
      { title: "Rebirth", image: genreRebirth.url, route: "/genres/rebirth" },
      { title: "Mystery", image: genreMystery.url, route: "/genres/mystery" },
      { title: "Crime", image: genreCrime.url, route: "/genres/crime" },
      { title: "Adventure", image: genreAdventure.url, route: "/genres/adventure" },
      { title: "Superpower", image: genreSuperpower.url, route: "/genres/superpower" },
      { title: "Sci-fi", image: genreSciFi.url, route: "/genres/sci-fi" },
    ],
  },
  {
    id: "language",
    title: "Language",
    tint: "var(--tint-blush)",
    previews: [languageHindi, languageEnglish],
    columns: 2,
    itemAspect: "912 / 512",
    items: [
      { title: "Hindi", image: languageHindi, route: "/language/hindi" },
      { title: "English", image: languageEnglish, route: "/language/english" },
    ],
  },
  {
    id: "new-arrivals",
    title: "New Listings",
    tint: "var(--tint-pink)",
    disabled: true,
    items: [
      { title: "This Week", image: newArrival, route: "/new/this-week" },
      { title: "Just Dropped", image: topwear, route: "/new/just-dropped" },
      { title: "Back In Stock", image: footwear, route: "/new/back-in-stock" },
      { title: "Editors Picks", image: bag, route: "/new/editors-picks" },
      { title: "Season Edit", image: hoodie, route: "/new/season-edit" },
      { title: "Limited", image: bottomwear, route: "/new/limited" },
    ],
  },
  {
    id: "trending",
    title: "Trending",
    tint: "var(--tint-blush)",
    disabled: true,
    items: [
      { title: "Most Loved", image: hoodie, route: "/trending/most-loved" },
      { title: "Bestsellers", image: topwear, route: "/trending/bestsellers" },
      { title: "Under ₹999", image: bottomwear, route: "/trending/under-999" },
      { title: "Street Style", image: footwear, route: "/trending/street" },
      { title: "Minimal", image: newArrival, route: "/trending/minimal" },
      { title: "Gifting", image: bag, route: "/trending/gifting" },
    ],
  },
  {
    id: "request-story",
    title: "Request a Story",
    tint: "var(--tint-pink)",
    previews: [request1, request2, request3],
    action: "request-story",
    items: [],
  },
];
