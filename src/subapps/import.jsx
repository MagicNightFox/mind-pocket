export const SUBAPPS = {
  ficPocket: {
    label: "FicPocket",
    route: "/ficPocket",
    loader: () => import("./fic-pocket/import.jsx")
  },
  cookPocket: {
    label: "CookPocket",
    route: "/cook",
    loader: () => import("./cook-pocket/import.jsx"),
  },
  gamePocket: {
    label: "GamePocket",
    loader: () => import("./game-pocket/import.jsx"),
  },
  notePocket: {
    label: "NotePocket",
    loader: () => import("./note-pocket/index.jsx"),
  }
};
