import './App.css'
import {lazy, useState} from "react"
import {BrowserRouter, Route, Routes} from "react-router";
import SidePanel from "./components/side-panel/side-panel.jsx";
import {useAuth} from "./context/AuthContext.jsx";
import {CircularProgress, Box} from "@mui/material";
import CopyrightComponent from "./components/copyright-component.jsx";
import {useViewport} from "./context/ViewportContext.jsx";

const LoginPage = lazy(() => import("./routes/unauthenticated/login-page.jsx"));
const AccountPage = lazy(() => import("./routes/account/account-page.jsx"));
const PersonalDashboardPage = lazy(() => import("./routes/personal-dashboard.jsx"));
const AboutUnAuthPage = lazy(() => import("./routes/unauthenticated/about-app.jsx"));
const AboutAuthPage = lazy(() => import("./routes/about.jsx"));
const SchedulePage = lazy(() => import("./routes/schedule-route.jsx"));
const PageNotFound = lazy(() => import("./routes/page-not-found.jsx"))
const FictionListPage = lazy(() => import("./routes/fiction/fiction-list-route.jsx"));
const CharacterListPage = lazy(() => import("./routes/character/character-list-route.jsx"));
const CharacterDetailPage = lazy(() => import("./routes/character/character-detail-route.jsx"));
const NotesDashboardPage = lazy(() => import("./routes/notes/dashboard.jsx"));
const InventoryPage = lazy(() => import("./routes/household/inventory/inventory.jsx"));
const ProductDetailPage = lazy(() => import("./routes/household/inventory/product-detail-route.jsx"));
const InventoryAddBatchPage = lazy(() => import("./routes/household/inventory/inventory-batch-add-route.jsx"));

function App() {
  const {user, loading} = useAuth();

  if(loading) {
    return <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="80vh">
      <CircularProgress/>
    </Box>
  } else if(!user){
    return <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/about" element={<AboutUnAuthPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <CopyrightComponent />
    </BrowserRouter>
  }

  return <BrowserRouter>
    <Box sx={{display:"flex", minHeight: "100vh", overflowX:"hidden", bgcolor: "#FAFAFA"}} >
      <SidePanel/>
      <Box flexGrow={1} sx={{overflowX:"hidden"}} position="relative">
        <Routes>
          {/* General Routes */}
          <Route path="/" element ={<PersonalDashboardPage />} />
          <Route path="/about" element={<AboutAuthPage />} />
          <Route path="/account" element ={<AccountPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/notes" element={<NotesDashboardPage />} />

          {/* Notes Feature Routes (Nested) */}
          <Route path="/notes">
            <Route index element={<NotesDashboardPage />} />
            <Route path="list" element={<PageNotFound />} />
            <Route path=":noteId" element={<PageNotFound />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>

          {/* Journal Feature Routes (Nested) */}
          <Route path="/journal">
            <Route index element={<PageNotFound />} />
            <Route path="list" element={<PageNotFound />} />
            <Route path=":noteId" element={<PageNotFound />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>

          {/* Shifting Feature Routes (Nested) */}
          <Route path="/shifting">
            <Route index element={<PageNotFound />} />
            <Route path="list" element={<PageNotFound />} />
            <Route path=":noteId" element={<PageNotFound />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>

          {/* Fiction Feature Routes (Nested) */}
          <Route path="/fiction">
            <Route index element={<FictionListPage />} />
            <Route path="list" element={<FictionListPage />} />
            <Route path="simp-list" element={<CharacterListPage />} />
            <Route path=":fictionId" element={<SchedulePage />} />
            <Route path="character">
              <Route path="list" element={<CharacterListPage />} />
              <Route path=":characterId" element={<CharacterDetailPage />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>

          {/* Gaming Feature Routes (Nested) */}
          <Route path="/gaming">
            <Route index element={<PageNotFound />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>

          {/* Inventory Feature Routes (Nested) */}
          <Route path="/inventory">
            <Route index element={<InventoryPage />} />
            <Route path="product">
              <Route path=":id" element={<ProductDetailPage />}/>
            </Route>
            <Route path ="batch" element={<InventoryAddBatchPage />}/>
            <Route path="list" element={<PageNotFound />} />
            <Route path=":id" element={<PageNotFound />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>

          {/* Recipes Feature Routes (Nested) */}
          <Route path="/recipes">
            <Route index element={<PageNotFound />} />
            <Route path="list" element={<PageNotFound />} />
            <Route path=":noteId" element={<PageNotFound />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>

          {/* Catch-all for 404s */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <CopyrightComponent/>
      </Box>
    </Box>
  </BrowserRouter>
}

export default App
