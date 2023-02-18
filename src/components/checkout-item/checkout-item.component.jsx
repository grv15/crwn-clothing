import React, { useContext } from "react";
import "./checkout-item.styles.scss";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ CheckoutItem }) => {
  const { clearItemFromCart, addItemToCart, removeItemFromCart } =
    useContext(CartContext);

  const clearHandler = () => clearItemFromCart(CheckoutItem);
  const addItemHandler = () => addItemToCart(CheckoutItem);
  const removeItemHandler = () => removeItemFromCart(CheckoutItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={CheckoutItem.imageUrl} alt={`${CheckoutItem.name}`} />
      </div>

      <span className="name">{CheckoutItem.name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="value">{CheckoutItem.quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{CheckoutItem.price}</span>
      <div className="remove-button" onClick={clearHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
