import React from "react";
import MenuItem from "@material-ui/core/MenuItem";


const LinkCategory = (props) => {
    return (
        <>
            <MenuItem><a href={`/category?category=${props.id}`}><span>{props.name}</span></a></MenuItem>
        </>
    );
};

export default LinkCategory;