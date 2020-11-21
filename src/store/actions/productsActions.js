import axios from "../../axiosApi";
import {
  CATEGORIES_FETCH_FAILURE,
  CATEGORIES_FETCH_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_SUCCESS,
  FETCH_FAILURE,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCTS_SUCCESS, PRODUCT_DELETE_FAILURE
} from "../actionTypes";

import { push } from "connected-react-router";

const fetchProductsSuccess = products => {
  return {type: FETCH_PRODUCTS_SUCCESS, products};
};

const fetchProductSuccess = product => {
  return {type: FETCH_PRODUCT_SUCCESS, product};
};

const fetchFailure = error => {
  return {type: FETCH_FAILURE, error};
};

export const creatProductFailure = error => {
  return {type: CREATE_PRODUCT_FAILURE, error};
};

const createProductSuccess = () => {
  return {type: CREATE_PRODUCT_SUCCESS};
};

export const productDeleteFailure = error => ({
  type: PRODUCT_DELETE_FAILURE, error
});

export const categoriesFetchSuccess = data => ({
  type: CATEGORIES_FETCH_SUCCESS,
  data
});
export const categoriesFetchFailure = error => ({
  type: CATEGORIES_FETCH_FAILURE,
  error
});

export const fetchProducts = () => {
  return async dispatch => {
    try {
      await axios.get("/products").then(response => {
        dispatch(fetchProductsSuccess(response.data));
      })
    } catch (e) {
      if (e.response && e.response.data) {
        dispatch(fetchFailure(e.response.data));
      } else {
        dispatch(fetchFailure({global: "No internet"}));
      }
    }
  };
};

export const fetchCategoryProducts = (category) => {
  return async dispatch => {
    try {
      await axios.get(`/products?category=${category}`).then(response => {
        dispatch(fetchProductsSuccess(response.data));
      })
    } catch (e) {
      if (e.response && e.response.data) {
        dispatch(fetchFailure(e.response.data));
      } else {
        dispatch(fetchFailure({global: "No internet"}));
      }
    }
  };
};

export const createProduct = productData => {
  return async (dispatch, getState) => {
    try {
      const token = getState().users.user.token;
      const headers = {'Authorization': token};
      await axios.post("/products", productData, {headers})
      dispatch(createProductSuccess());
      dispatch(push("/"));
    }catch (e) {
      alert(123)
      dispatch(creatProductFailure(e.response.data));
    }
  };
};

export const fetchProduct = (id) => {
  return async dispatch => {
    try {
      await axios.get(`/products/${id}`).then(response => {
        dispatch(fetchProductSuccess(response.data));
      })
    } catch (e) {
      if (e.response && e.response.data) {
        dispatch(fetchFailure(e.response.data));
      } else {
        dispatch(fetchFailure({global: "No internet"}));
      }
    }
  };
};

export const deleteProduct = id => {
  return async (dispatch, getState) => {
    try {
      const token = getState().users.user.token;
      const headers = {'Authorization': token};
      await axios.delete(`/products/${id}`, { headers });
      dispatch(push("/"));
    } catch (e) {
      if (e.response) {
        dispatch(productDeleteFailure(e.response.data));
      } else {
        dispatch(
            productDeleteFailure({ global: "Network error or no internet" })
        );
      }
    }
  };
};

export const fetchCategories = () => {
  return async dispatch => {
    try {
      const response = await axios.get("/categories");
      dispatch(categoriesFetchSuccess(response.data));
    } catch (e) {
      if (e.response) {
        dispatch(categoriesFetchFailure(e.response.data));
      } else {
        dispatch(
            categoriesFetchFailure({ global: "Network error or no internet" })
        );
      }
    }
  };
};



