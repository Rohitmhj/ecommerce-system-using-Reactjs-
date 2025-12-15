import React from "react";
import dayjs from "dayjs";
import formatmoney from "../../utils/money";
import "./orders.css";
import Header from "../../Components/Header";
import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import Track from "./Track";
function Orders({ cart }) {
  <title>orders</title>;
  const [order, setOrders] = useState([]);

  useEffect(() => {
    const getOrdersData = async () => {
    let response= await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    };
    getOrdersData();
  }, []);

  return (
    <>
      <title>orders</title>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {order.map((orders) => {
            return (
              <div key={orders.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(orders.orderTimeMs).format("MMMM D")}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{formatmoney(orders.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{orders.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {orders.products.map((orderProduct) => {
                    let totalquantity = 0;
                    totalquantity += orderProduct.quantity;
                    return (
                      <Fragment key={orderProduct.id}>
                        <div className="product-image-container">
                          <img src={orderProduct.product.image} />
                        </div>
                        <div className="product-details">
                          <div className="product-name">
                            {orderProduct.name}
                          </div>
                          <div className="product-delivery-date">
                            {`Arriving on: ${dayjs(
                              orderProduct.estimatedDeliveryTimeMs
                            ).format("MMMM D")}`}
                          </div>
                          <div className="product-quantity">{`Quantity: ${totalquantity}`}</div>
                          <button className="buy-again-button button-primary">
                            <img
                              className="buy-again-icon"
                              src="images/icons/buy-again.png"
                            />
                            <span className="buy-again-message">
                              Add to Cart
                            </span>
                          </button>
                        </div>
                        <Track />
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Orders;
