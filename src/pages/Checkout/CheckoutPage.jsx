/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import PaymentSummary from "./PaymentSummary";
import "./Checkout.css";
import "./checkout-header.css";
import OrderSummary from "./OrderSummary";
function CheckoutPage({ cart, loadCart }) {
  const [deliveryOption, setDeliveryOption] = useState([]);
  const [paymentSummary, setpaymentsummary] = useState([null]);

  useEffect(() => {
    const ordersummary = async () => {
      let response = await axios.get("/api/payment-summary");
      setpaymentsummary(response.data);
    };
    ordersummary();
  },[cart]);
  useEffect(() => {
    const fetchCheckoutData = async () => {
      let response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime"
      );

      setDeliveryOption(response.data);
    };
    fetchCheckoutData();
  }, []);
  return (
    <>
      <title>Checkout Page</title>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <a className="return-to-home-link" href="/">
              3 items
            </a>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            deliveryOption={deliveryOption}
            cart={cart}
            loadCart={loadCart}
          />

          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
