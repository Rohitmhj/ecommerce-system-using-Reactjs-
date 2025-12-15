import { Routes, Route } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import Orders from "./pages/Order/Orders";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import Tracking from "./pages/tracking";
import CartItemsDetails from "./pages/Checkout/cartItems-details";

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <>
      <Routes>
        <Route index="/" element={<HomePage cart={cart} loadcart={loadCart}/>} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} CartItemsDetails={CartItemsDetails}/>} />
        <Route path="/orders" element={<Orders cart={cart} />} />
        <Route path="/tracking" element={<Tracking />} />
      </Routes>
    </>
  );
}

export default App;
