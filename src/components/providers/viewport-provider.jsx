import {useMemo, useState} from "react";
import {ViewportContext} from "../../context/ViewportContext.jsx";
import {useMediaQuery, useTheme} from "@mui/material";
const ViewportProvider = ({children}) => {
  const theme = useTheme();
  const isTabletUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isPcUp = useMediaQuery(theme.breakpoints.up('md'));
  const [menuOpen, setMenuOpen] = useState(false);
  const viewport = useMemo(() => {
    if (isPcUp) return {viewport: "pc", menuOpen, setMenuOpen};
    if (isTabletUp) return {viewport: "tablet", menuOpen, setMenuOpen};
    return {viewport: "phone", menuOpen, setMenuOpen};
  }, [isPcUp, isTabletUp, menuOpen]);
  return <ViewportContext.Provider value={viewport}>
    {children}
  </ViewportContext.Provider>
}

export default ViewportProvider;