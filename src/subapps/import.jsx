export const SUBAPPS = {
  ficPocket: {
    label: "FicPocket",
    route: "/ficPocket",
    RouteLoader: () => import("./fic-pocket/import.jsx")
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
};
