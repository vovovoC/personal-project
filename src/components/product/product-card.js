import PropTypes from "prop-types";
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StarIcon from "@mui/icons-material/Star";
import actions from "src/store/constants";

export const ProductCard = ({
  product,
  id,
  dispatch,
  busket,
  removeFromBusket,
  addToBusket,
  ...rest
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      {...rest}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Avatar
            alt="Product"
            src={product.image}
            variant="square"
            sx={{
              width: "100px",
              height: "100px",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="span"
            sx={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {product.name}
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="span"
            sx={{ fontWeight: "bold" }}
          >
            {product.price}$
          </Typography>
        </Box>
        {!busket[id] ? (
          <Button
            variant="contained"
            size="small"
            disableElevation
            sx={{ width: "100%", marginTop: "20px" }}
            onClick={() => addToBusket(product, id)}
          >
            Add to store
          </Button>
        ) : (
          <Button
            variant="contained"
            size="small"
            color="error"
            disableElevation
            sx={{ width: "100%", marginTop: "20px" }}
            onClick={() => removeFromBusket(id)}
          >
            Remove from busket
          </Button>
        )}
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <MonetizationOnIcon color="action" />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1, fontSize: "12px" }}
              variant="body2"
            >
              {product.sold_items} items sold
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            {Array.from({ length: product.star }).map((i, key) => (
              <StarIcon color="primary" key={key} />
            ))}
            {Array.from({ length: 3 - product.star }).map((i, key) => (
              <StarBorderIcon color="primary" key={key} />
            ))}
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
