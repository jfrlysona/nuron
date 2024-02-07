import React, { createContext } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
export const CartContext = createContext();
function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage("cart", []);
  function addCart(item) {
    const index = cart.findIndex((x) => x.id === item.id);
    if (index === -1) {
      setCart([...cart, { ...item, count: 1 }]);
      return;
    }
    cart[index].count++;
    setCart([...cart]);
  }
  function increaseCount(item) {
    const index = cart.findIndex((x) => x.id === item.id);
    cart[index].count++;
    setCart([...cart]);
  }
  function decreaseCount(item) {
    const index = cart.findIndex((x) => x.id === item.id);
    if (cart[index].count === 0) {
      removeItem(item);
      return prevCart.filter((x) => x.id !== item.id);
    }
    cart[index].count--;
    setCart([...cart]);
  }
  function removeItem(item) {
    console.log(item);
    setCart(cart.filter((x) => x.id !== item.id));
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
