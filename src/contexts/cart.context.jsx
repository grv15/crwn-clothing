/**
 * !========================IMPORTENT========================
 *
 * !1.  isCartOpen is boolean variable which is by default
 * !    false that means the cart popup will be closed unless cart icon is clicked.
 * !2.  setIsCartOpen is function that changes isCartToOpen to true or false and
 * !    is Called at navigation page by cart icon.
 * !3.  cartItems is an empty array by default which holds the item(s) with
 * !    quantity as additional object key/value. This array is modified by
 * !    addItemToCart method. This array is finally displayed in cart popup.
 * !4.  addItemToCart is an method which adds or update the cartItems array.
 * !    Internally, this method calls an another method named addCartItem.
 * !5.  addCartItem method has followings:-
 * !        a. First, It will check existing item in cartItems array.
 * !        b. If not found, it will ass productToAdd to cartItems array with additional
 * !           quantity variable, eg=> ...cartItems, { ...ProductToAdd, quantity: 1 }].
 * !        c. If Found, this will update that perticular item's quantity to one.
 * !6.  cartCount variable is to show how many items are in the cart popup inside cart icon.
 * !7.  removeItemFromCart method is vise-versa of addItemToCart. 
 * !8.  clearCartItem method is for removing item row from checkout page and update cartItems.
 * !9.  cartTotal variable is to show total cart value (sum of total quantity per item * price per item).    
 */

import { createContext, useEffect, useState } from "react";

export const addCartItem = (cartItems, ProductToAdd) => {
  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === ProductToAdd.id
  );
  if (existingItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === ProductToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...ProductToAdd, quantity: 1 }];
};

export const removeCartItem = (cartItems, productToRemove) => {
  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

  if (existingItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const clearCartItem = (cartItems, productToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (CurrentTotal, CurentCartItem) => CurrentTotal + CurentCartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (CurrentTotal, CurentCartItem) =>
        CurrentTotal + CurentCartItem.quantity * CurentCartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear));
  };

  const addItemToCart = (ProductToAdd) => {
    setCartItems(addCartItem(cartItems, ProductToAdd));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
