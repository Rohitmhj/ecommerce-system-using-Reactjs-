import dayjs from "dayjs";
import CartItemsDetails from "./cartItems-details";
import DeliveryOption from "./DeliveryOption";
import axios from "axios";

function OrderSummary({ deliveryOption, cart, loadCart }) {
  return (
    <div className="order-summary">
      {deliveryOption.length > 0 &&
        cart.map((cartItem) => {
          const selectedoption = deliveryOption.find((deliveryoption) => {
            return deliveryoption.id === cartItem.deliveryOptionId;
          });
          const deleteItem = async () => {
            await axios.delete(`/api/cart-items/${cartItem.productId}`);
            await loadCart();
          };
          return (
            <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {dayjs(selectedoption.estimatedDeliveryTime).format(
                  "dddd, MMMM D"
                )}
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image" src={cartItem.product.image} />
                <CartItemsDetails
                  cartItem={cartItem}
                  deleteItem={deleteItem}
                  loadCart={loadCart}
                />

                <DeliveryOption
                  deliveryOption={deliveryOption}
                  cartItem={cartItem}
                  loadCart={loadCart}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default OrderSummary;
