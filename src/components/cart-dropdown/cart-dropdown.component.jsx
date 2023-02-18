import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/button.component";
import "./cart-dropdown.styles.scss";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../../contexts/cart.context";

const CartDropdown = () => {
  const navigate =useNavigate();

const CheckoutHandler=()=>{
  navigate('/checkout');
}


  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem itemProps={item} key={item.id} />
        ))}
      </div>
      <Button onClick={CheckoutHandler}>Go to checkout</Button>
    </div>
  );
};

export default CartDropdown;
