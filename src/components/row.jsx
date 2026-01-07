import Box from "@mui/material/Box";
import {useViewport} from "../context/ViewportContext.jsx";

/**
 * Box that places children in a row and places them in a column when viewport is smaller than pc
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Row = (props) => {
  const {children} = props;
  const viewport = useViewport();
  return <Box {...props} flexDirection={viewport !== "pc" ? "column" : "row"}>
    {children}
  </Box>
}

export default Row;