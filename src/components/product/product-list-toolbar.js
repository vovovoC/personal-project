import {
  Box,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from "@mui/material";
import SearchBar from "../settings/search";

export const ProductListToolbar = (props) => (
  <Box {...props}>

<Typography sx={{ m: 1 }} variant="h4">
        China Express
      </Typography>
    <Box
      sx={{
        alignItems: "flex-end",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: -1,
      }}
    >
 <Box sx={{ width: 300, marginTop: "40px" }}>
    
    <FormControl sx={{ width: 250, marginTop: "20px" }}>  
    <InputLabel id="demo-simple-select-label" sx={{backgroundColor:"#f9fafc",paddingLeft: "2px",paddingRight: "2px"}}>Sort by</InputLabel>
        <Select
          aria-labelledby="demo-radio-buttons-group-label"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={props.onRadioGroupChange}
          name="radio-buttons-group"
        >
          <MenuItem 
            value="star"      
            >Rating</MenuItem>
          <MenuItem 
            value="price"
            >Price</MenuItem>
          <MenuItem 
            value="sold_items"
          >Number of sold items</MenuItem>
        </Select>
    </FormControl>
    </Box>
    <SearchBar searchProducts={props.searchProducts}/>
    </Box>
  </Box>
);
