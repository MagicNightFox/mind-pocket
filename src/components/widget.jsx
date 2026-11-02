import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Divider} from "@mui/material";
import {useState} from "react";

/**
 * @param props
 * @param {String} props.title
 * @param {React.JSX.Element} props.actionBar
 * @returns {React.JSX.Element}
 * @constructor
 */
const Widget = (props) => {
  const {children, title, actionBar, ...other} = props;
  const [hover, setHover] = useState(false);
  return <Box
      bgcolor="white"
      borderRadius="16px"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      overflow="scroll"
      {...other}
  >
    {(title || actionBar) && (<Box>
      <Box display="flex" flexDirection="row" alignItems={title ? "space-between" : "end"} padding="12px 16px 0px">
        {title && <Typography variant="overline" fontFamily="Intel One Mono" sx={{ color: 'text.secondary', letterSpacing: '0.08em', flexGrow: 1 }}>{title}</Typography>}
        {hover && actionBar}
      </Box>
    </Box>)}
    {children}
  </Box>
}

export default Widget;