import Box from "@mui/material/Box";
import {useViewport} from "../context/ViewportContext.jsx";

/**
 * Box that places children in a row and places them in a column when viewport is smaller than pc
 * @param props
 * @param props.gap
 * @param {"flex","grid"} props.display
 * @returns {React.JSX.Element<Box>}
 * @constructor
 */
const Row = (props) => {
  const {children, gap = "16px", display="flex"} = props;
  const {viewport} = useViewport();
  return <Box display={display}
              gap={gap}
              flexDirection={viewport !== "pc" ? "column" : "row"}
              width="100%"
              {...props}
  >
    {children}
  </Box>
}

export default Row;