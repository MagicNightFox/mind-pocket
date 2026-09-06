import Box from "@mui/material/Box";
import {useViewport} from "../context/ViewportContext.jsx";

/**
 * Box that places children in a row and places them in a column when viewport is smaller than pc
 * @param props
 * @returns {Box}
 * @constructor
 */
const Row = (props) => {
  const {children} = props;
  const {viewport} = useViewport();
  return <Box display="flex" flexDirection={viewport !== "pc" ? "column" : "row"} gap="16px" {...props} >
    {children}
  </Box>
}

export default Row;