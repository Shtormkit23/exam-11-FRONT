import React, {useEffect} from "react";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../store/actions/productsActions";
import ProductItem from "../../components/ProductItem/ProductItem";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container direction="row" justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">
            Products
          </Typography>
        </Grid>
      </Grid>
      <Grid item container direction="row" spacing={2}>
        {products.map(product => {
          return <ProductItem
            key={product._id}
            id={product._id}
            title={product.title}
            price={product.price}
            image={product.image}
            category={product.category}
          />
        })}
      </Grid>
    </Grid>
  );
};

export default Products;