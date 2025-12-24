import Dashboard from "./routes/dashboard.jsx"
import NoteListPage from "./routes/list.jsx"
import {Route, Routes} from "react-router";

const baseRoute = "NotePocket/"
const NotePocket = () => {

  return <Routes>
    <Route path={baseRoute} element={<Dashboard />} />
    <Route path={baseRoute} element={<NoteListPage />} />
    <Route path={baseRoute + "/*"} element={<Dashboard />} />
  </Routes>
}

export default NotePocket