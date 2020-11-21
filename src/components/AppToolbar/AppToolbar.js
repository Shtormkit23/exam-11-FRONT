import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import Container from "@material-ui/core/Container";
import UserMenu from "../Menu/UserMenu";
import AnonymousMenu from "../Menu/AnonymousMenu";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../store/actions/productsActions";
import LinkCategory from "../Link/Link";

const useStyles = makeStyles(theme => ({
  mainLink: {
    color: "inherit",
    textDecoration: "none",
    "&:hover": {
      color: "inherit"
    },
    fontFamily: "Montserrat",
    textTransform: "uppercase"
  },
  staticToolbar: {
    marginBottom: theme.spacing(2)
  },
  container: {
    display: "flex"
  },dropDownBtn: {
    color: theme.palette.common.white,
    flexGrow: 1
  },
  link: {
    textDecoration: "none",
    color: "black"
  }
}));

const AppToolbar = ({user}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();
  let categories = useSelector(state => state.products.categories);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <AppBar>
        <Toolbar>
          <Container className={classes.container}>
            <Typography variant="h6">
              <Link to="/" className={classes.mainLink}>Flea market</Link>
            </Typography>
            <>
              <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  className={classes.dropDownBtn}
              >
                Select Category
              </Button>
              <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
              >
                <MenuItem><a href="/" className='button' ><span>All categories</span></a></MenuItem>
                {categories !== null && categories.map(category => {
                  return <LinkCategory
                      key={category._id}
                      id={category._id}
                      name={category.title}
                  />
                })}
              </Menu>
            </>
            {user ?
                <UserMenu user={user}/>
                : <AnonymousMenu/>
            }
          </Container>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.staticToolbar}/>
    </>
  );
};

AppToolbar.propTypes = {
  user: PropTypes.object
};

export default AppToolbar;