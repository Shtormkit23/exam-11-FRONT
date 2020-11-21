import React from "react";
import {useDispatch, useSelector} from "react-redux";
import ProductForm from "../../components/ProductForm/ProductForm";
import {createProduct as onProductCreated} from "../../store/actions/productsActions";
import {Redirect} from "react-router-dom";

const NewProduct = () => {
  const dispatch = useDispatch();
  let userName = useSelector(state => state.users.user);

  const createProduct = productData => {
    dispatch(onProductCreated(productData));
  };

  return (
      <>
      {userName ?
            <>
              <h1>New product</h1>
              <ProductForm onSubmit={createProduct} />
            </>
            : <Redirect to="/login"/>}
        </>
  );
};

export default NewProduct;