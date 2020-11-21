import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import imageNotAvailable from "../../assets/images/notfound_0.png";
import {apiURL} from "../../constants";
import {useSelector} from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import {deleteProduct} from "../../store/actions/productsActions";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 1000,
        margin: "0 auto",
        fontSize: 25
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    }
}));



const FullProductCard = ({title, image, description, userProduct, category, price, id}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    let user = useSelector(state => state.users.user);

    let cardImage = imageNotAvailable;
    if (image) {
        cardImage = apiURL + "/uploads/" + image;
    }

    let check;
    userProduct && user && (check = userProduct._id === user._id);

    return (
        <Card className={classes.root}>
            <CardHeader
                title={title}
            />
            <CardMedia
                className={classes.media}
                image={cardImage}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Price: {price} $
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Author: {userProduct.username}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Category: {category.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Phone: {userProduct.phone}
                </Typography>
                {check && (
                    <button
                        onClick={() => dispatch(deleteProduct(id))}
                    >
                        <MdDeleteForever size="30px" />
                    </button>
                )}
            </CardContent>
        </Card>
    );
};

export default FullProductCard;