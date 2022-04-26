import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

export const ProductListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: -1,
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        Products
      </Typography>
      <Box sx={{ m: 1 }}>
        {/* <Button color="primary" variant="contained">
          Add products
        </Button> */}
      </Box>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h6">Sort By</Typography>
          <Box sx={{ maxWidth: 250, marginTop: "20px" }}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="price"
              onChange={props.onRadioGroupChange}
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="price"
                sx={{ fontSize: "12px" }}
                control={<Radio />}
                label="Price"
              />
              <FormControlLabel value="star" control={<Radio />} label="rating" />
              <FormControlLabel
                value="sold_items"
                control={<Radio />}
                label="Number of sold items"
              />
            </RadioGroup>
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
