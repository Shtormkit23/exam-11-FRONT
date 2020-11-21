import React from "react";
import {Button} from "@material-ui/core";
import {NavLink} from "react-router-dom";

const AnonymousMenu = () => {
    return (
        <>
            <Button component={NavLink} to="register" color="inherit">Register</Button>
            <p>or</p>
            <Button component={NavLink} to="/login" color="inherit">Login</Button>
        </>
    );
};

export default AnonymousMenu;