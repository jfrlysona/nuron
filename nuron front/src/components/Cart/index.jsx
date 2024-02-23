import React, { useContext } from "react";
import "./index.scss";
import { CartContext } from "../../context/CartProvider";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
function Cart() {
  const { cart, increaseCount, decreaseCount, removeItem } =
    useContext(CartContext);
  const { decode } = useContext(UserContext);
  const navigate = useNavigate();

  const total = cart.reduce((prev, next) => {
    const itemPrice =
      next.bids && next.bids.length > 0
        ? Math.max(...next.bids.map((bid) => bid.bidPrice))
        : next.price;
    return prev + next.count * itemPrice;
  }, 0);
  const finalPrice = total + 10;
  return (
    <section id="cart">
      <div className="container">
        <div className="cart-items">
          <h2>NFTs</h2>
          {cart.length > 0 ? (
            cart.map((x) => (
              <div className="cart-item" key={x._id}>
                <img src={x.image} alt="nft image" />
                <Link to={"/nft/" + x._id}>{x.name}</Link>
                <div className="count">
                  <i
                    className="fa-light fa-minus"
                    onClick={() => decreaseCount(x)}
                  ></i>
                  <span>{x.count}</span>
                  <i
                    className="fa-light fa-plus"
                    onClick={() => increaseCount(x)}
                  ></i>
                </div>
                <p>
                  $
                  {x.bids && x.bids.length > 0
                    ? Math.max(...x.bids.map((bid) => bid.bidPrice)).toFixed(2)
                    : x.price.toFixed(2)}
                </p>
                <i
                  className="fa-light fa-trash"
                  onClick={() => removeItem(x)}
                ></i>
              </div>
            ))
          ) : (
            <p className="empty">
              Cart is empty. <Link to={"/shop"}>Back to Shop</Link>
            </p>
          )}
        </div>
        <div className="totals">
          <h2>Totals</h2>
          <div className="total">
            <p>
              Subtotal <span>${total.toFixed(2)}</span>
            </p>
            <p>
              Shipping
              {cart.length > 0 ? <span>$10.00</span> : <span>$0.00</span>}
            </p>
            <p>
              Total
              {cart.length > 0 ? (
                <span>${finalPrice.toFixed(2)}</span>
              ) : (
                <span>$0.00</span>
              )}
            </p>
          </div>
          <button onClick={decode ? null : () => navigate("/login")}>
            PROCEED CHECKOUT
          </button>
        </div>
      </div>
    </section>
  );
}

export default Cart;
