import React, { useContext } from "react";
import "./product-card.styles.scss";
import Button from "../button/button.component";
import { CartContext } from "../../contexts/cart.context";
const ProductCard = ({ Product }) => {
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => {
    addItemToCart(Product);
  };

  return (
    <div className="product-card-container">
      <img src={Product.imageUrl} alt={Product.name} />
      <div className="footer">
        <span className="name">{Product.name}</span>
        <span className="price">{Product.price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>
        Add To Card
      </Button>
    </div>
  );
};

export default ProductCard;
