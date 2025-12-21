export const BASE_URI = "https://brainstore-backend-r1d4.onrender.com"

export const FICTION_SCHEMA = {
  title: "Title",
  characters: "Characters",
  ffCathegory: "Fanfiction Cathegory",
  orCathegory: "Original Cathegory",
  genre: "Genre",
  original: "Original",
  status: "Story status",
  tags: "Tags",
  finishedReading: "History",
  notes: "Notes",
  linkToOriginal: "Link to original",
  summary: "Summary",
  content: "Content",
  linkToDisk: "Link to saved copy",
}
export const CHAPTER_SCHEMA = {
  title: "title",
  description: "Description",
  notes: "Notes",
  content: "Content",
}

export const GENRES = {
  fluff: "Fluff",
  smut: "Smut",
  crack: "Crack",
  angst: "Angst",
}

export const FFCATHEGORIES = {
  oneshot: "Oneshot",
  series: "Series",
}

export const ORCATHEGORIES = {
  movie: "Movie",
  game: "Game",
  book: "Book",
  animation: "Animation",
  tvSeries:"TV Series",
  anime: "Anime",
  manga: "Manga",
  manhwa: "Manhwa"
}

export const STATUS = {
  hiatus: "Hiatus",
  completed: "Completed",
  ongoing: "Ongoing",
  dropped: "Dropped"
}

export const SIDE_MENU_ITEMS = [
  {title: "Character list", id: "goonCave", url: "/characters"},
  {title: "Fiction Archive", id: "fictionArchive", url: "/fiction"},];