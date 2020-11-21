import React from "react";
import {Grid, Card, CardHeader, Typography} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import {ArrowForward} from "@material-ui/icons";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import imageNotAvailable from "../../assets/images/notfound_0.png";
import {apiURL} from "../../constants";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
  card: {
    height: "100%"
  },
  media: {
    height: 200,
    width: 200,
    padding: "56.25%"
  },
  title: {
    minHeight: 70,
    fontSize: 19,
    padding: "0 10px",
    marginTop: "-20px"
  }
});

const ProductItem = ({id, title, price, image, category}) => {
  const classes = useStyles();
  let cardImage = imageNotAvailable;
  if (image) {
    cardImage = apiURL + "/uploads/" + image;
  }
  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Card className={classes.card}>
        <CardHeader/>
        <Typography className={classes.title}>
          {title}
        </Typography>
        <CardMedia
          image={cardImage}
          className={classes.media}
        />
        <CardContent>
          Price: {price} $
          <Typography className={classes.pos} color={"textSecondary"}>
            {category.title}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={`/products/${id}`}>
            <ArrowForward />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

ProductItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  category: PropTypes.object.isRequired
}
export default ProductItem;