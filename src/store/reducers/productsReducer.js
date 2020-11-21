import {
  CATEGORIES_FETCH_FAILURE,
  CATEGORIES_FETCH_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  FETCH_FAILURE,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCTS_SUCCESS
} from "../actionTypes";

const initialState = {
  products: [],
  productError: null,
  product: null,
  error: null,
  categories: null
};

const productsReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {...state, products: action.products};
    case CREATE_PRODUCT_FAILURE:
      return {...state, productError: action.error};
    case FETCH_PRODUCT_SUCCESS:
      return {...state, product: action.product};
    case FETCH_FAILURE:
      return {...state, error: action.error};
    case CATEGORIES_FETCH_SUCCESS:
      return { ...state, categories: action.data};
    case CATEGORIES_FETCH_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default productsReducer;