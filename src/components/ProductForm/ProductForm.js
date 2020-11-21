import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import FileInput from "../Form/FileInput";
import Select from "@material-ui/core/Select";
import FormElement from "../Form/FormElement";
import {useSelector} from "react-redux";


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    }
  },
}));

const ProductForm = ({onSubmit}) => {
  const classes = useStyles();
  const error = useSelector(state => state.products.productError);
  const [state, setState] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: ""
  });

  const submitFormHandler = e => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(state).forEach(key => {
      formData.append(key, state[key]);
    });
    onSubmit(formData);
  };

  const inputChangeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };
  const fileChangeHandler = e => {
    const name = e.target.name;
    const file = e.target.files[0];

    setState(prevState => ({...prevState, [name]: file}));
  };

  const getFieldError = fieldName => {
    try {
      return error.errors[fieldName].message;
    } catch(e) {
      return undefined;
    }
  };

  return (
    <form
      className={classes.root}
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <FormElement
          error={getFieldError("title")}
          name="title"
          label="Title"
          value={state.title}
          onChange={inputChangeHandler}
      />
      <FormElement
          error={getFieldError("price")}
          name="price"
          label="Price"
          value={state.price}
          onChange={inputChangeHandler}
      />
      <FormElement
          error={getFieldError("description")}
          name="description"
          label="Description"
          value={state.description}
          onChange={inputChangeHandler}
      />
      <FormControl fullWidth className={classes.margin} variant="outlined">
        <FileInput
          label="Image"
          name="image"
          onChange={fileChangeHandler}
        />
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>
        <Select
            native
            value={state.category}
            onChange={inputChangeHandler}
            label="Category"
            inputProps={{
              name: 'category',
              id: 'outlined-category-native-simple',
            }}
            required={true}
        >
          <option aria-label="None" value="" />
          <option value={"5fb8c2394a084e6451506536"}>Animals</option>
          <option value={"5fb8c2394a084e6451506537"}>The property</option>
          <option value={"5fb8c2394a084e6451506538"}>Transport</option>
        </Select>
      </FormControl>
      <FormControl fullWidth className={classes.margin} variant="outlined">
        <Button type="submit" color="primary">Create</Button>
      </FormControl>
    </form>
  );
};

export default ProductForm;