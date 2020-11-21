import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProduct} from "../../store/actions/productsActions";
import FullProductCard from "../../components/FullProductCard/FullProductCard";

const FullProduct = (props) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.product);
    const id = props.match.params.id;

    useEffect(() => {
        dispatch(fetchProduct(id));
    }, [dispatch, id]);

    return (
        <>
            <div>
                {product &&
                <FullProductCard
                    key={product._id}
                    id={product._id}
                    title={product.title}
                    description={product.description}
                    image={product.image}
                    userProduct={product.user}
                    category={product.category}
                    price={product.price}
                />}
            </div>
        </>
    );
};

export default FullProduct;