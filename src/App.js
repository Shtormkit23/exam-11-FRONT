import React from 'react';
import {Switch, Route} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import AppToolbar from "./components/AppToolbar/AppToolbar";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import {useSelector} from "react-redux";
import NewProduct from "./containers/NewProduct/NewProduct";
import Products from "./containers/Products/Products";
import FullProduct from "./containers/FullProduct/FullProduct";
import CategoryProducts from "./containers/CategoryProducts/CategoryProducts";

const App = () => {
    const user = useSelector(state => state.users.user);
    return (
        <>
            <CssBaseline/>
            <AppToolbar user={user}/>
            <main>
                <Container>
                    <Switch>
                        <Route path="/" exact component={Products}/>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/products/new" exact component={NewProduct}/>
                        <Route path="/products/:id" exact component={FullProduct}/>
                        <Route path="/category" exact component={CategoryProducts}/>
                        <Route render={() => <h1>404 Not Found</h1>}/>
                    </Switch>
                </Container>
            </main>
        </>
    )
};

export default App;