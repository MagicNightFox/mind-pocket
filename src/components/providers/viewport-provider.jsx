import {useMemo} from "react";
import {ViewportContext} from "../../context/ViewportContext.jsx";
import {useMediaQuery, useTheme} from "@mui/material";
const ViewportProvider = ({children}) => {
  const theme = useTheme();
  const isTabletUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isPcUp = useMediaQuery(theme.breakpoints.up('md'));
  const viewport = useMemo(() => {
    if (isPcUp) return "pc";
    if (isTabletUp) return "tablet";
    return "phone";
  }, [isPcUp, isTabletUp]);
  return <ViewportContext.Provider value={viewport}>
    {children}
  </ViewportContext.Provider>
}

export default ViewportProvider;