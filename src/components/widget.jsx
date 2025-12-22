import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Divider} from "@mui/material";


const Widget = (props) => {
  const {children, title, actionBar} = props;
  return <Box
    bgcolor="white"
    borderRadius="16px"
    padding="16px"
    display="flex"
    flexDirection="column"
    gap="16px"
    minWidth={0}
    maxWidth="100%"
    {...props}
  >
    {(title || actionBar) && (<Box>
      <Box display="flex" flexDirection="row" alignItems="center" >
        {title && <Typography>{title}</Typography>}
        {actionBar}
      </Box>
      <Divider />
    </Box>)}
    {children}
  </Box>
}

export default Widget;