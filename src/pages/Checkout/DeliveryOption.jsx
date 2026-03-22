import axios from "axios";
import dayjs from "dayjs";
import formatmoney from "../../utils/money";
function DeliveryOption({deliveryOption,cartItem,loadCart}) {
  return (
    <div className="delivery-options">
      {deliveryOption.map((deliveryoption) => {
        let pricestring = "FREE Shipping";
        if (deliveryoption.priceCents > 0) {
          pricestring = `${formatmoney(deliveryoption.priceCents)}-Shipping`;
        }
        const UpdateDeliveryoption= async()=>{
            await axios.put(`/api/cart-items/${cartItem.productId}`,
              {deliveryOptionId:deliveryoption.id});
            
            await loadCart();
        }
        return (
         
            <div key={deliveryoption.id} className="delivery-options-title" onClick={UpdateDeliveryoption}>
            Choose a delivery option:
          
          <div className="delivery-option">
              <input
                type="radio"
                checked={deliveryoption.id === cartItem.deliveryOptionId}
                onChange={() => { } }
                className="delivery-option-input"
                name={`delivery-option-${cartItem.productId}`} />
              <div>
                <div className="delivery-option-date">
                  {dayjs(deliveryoption.estimatedDeliveryTimeMs).format(
                    "dddd, MMMM D"
                  )}
                </div>
                <div className="delivery-option-price">{pricestring}</div>
              </div>
            </div>
         </div>
        );
      })}
    </div>
  );
}

export default DeliveryOption;
