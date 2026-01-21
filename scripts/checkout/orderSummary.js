import {cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import { products } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions} from '../../data/deliveryOptions.js';

const today = dayjs();
const deliveryDate = today.add(7, 'days'); //adding days to current date
// console.log(deliveryDate.format('dddd, MMMM D'));

//create a fn to show immediate effect while changing delivery options without repfreshing the page
export function renderOrderSummary(){
  //storing result
  let cartSummaryHTML ='';

  cart.forEach((cartItem) => {

    //product id out of cart
    const productId = cartItem.productId;

    //to save result
    let matchingProduct;
    products.forEach((product) => {
      //check if id = productId
      if(product.id === productId){
        matchingProduct = product;
      }
      //now we have access to details of each product
      //using deduplicating
    });

    const deliveryOptionId = cartItem.deliveryOptionId;
    
    let deliveryOption;
    
    deliveryOptions.forEach((option) => {
      if(option.id === deliveryOptionId){
        deliveryOption = option;
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays, 'days'
    );
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML +=  `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>
        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">
                  ${cartItem.quantity}
                </span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link"
              data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div> 
    `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem){
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      //getting todays date
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays, 'days'
      );
      const dateString = deliveryDate.format('dddd, MMMM D');

      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;
      
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      //for each delivery option generating html
      html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : '' }
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
      `
    });

    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  //functionality in delete link to remove product from cart
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    //for each link adding event listener
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      
      //getting specific container we need to remove using id
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      
      container.remove(); //removes container from page
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      //getting values out of data attribute 
      const {productId, deliveryOptionId} = element.dataset;
      //updating ids
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}


