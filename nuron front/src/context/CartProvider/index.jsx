import React, { createContext } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
export const CartContext = createContext();
function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage("cart", []);
  const total = cart.reduce(
    (prev, next) => prev + next.count * next.unitPrice,
    0
  );
  function addCart(item) {
    const index = cart.findIndex((x) => x.id === item._id);
    if (index === -1) {
      setCart([...cart, { ...item, count: 1 }]);
      return;
    } else {
      removeItem(item);
    }
  }
  function increaseCount(item) {
    const index = cart.findIndex((x) => x.id === item._id);
    cart[index].count++;
    setCart([...cart]);
  }
  function decreaseCount(item) {
    const index = cart.findIndex((x) => x.id === item._id);
    if (cart[index].count === 1) {
      return;
    }
    cart[index].count--;
    setCart([...cart]);
  }
  function removeItem(item) {
    setCart(cart.filter((x) => x.id !== item._id));
  }
  function isCart(item) {
    return cart.findIndex((x) => x.id === item._id) === -1 ? false : true;
  }
  const data = {
    cart,
    addCart,
    increaseCount,
    decreaseCount,
    removeItem,
  };
  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
}

export default CartProvider;
