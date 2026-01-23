// //variable to save data
// //creating an object inside array to group multiple values together
// //data structure - list of products
// //combination of arrays and objects
// const products = [
//   {
//     image: "images/products/athletic-cotton-socks-6-pairs.jpg",
//     name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//     rating: {
//       stars: 4.5,
//       count: 87
//     },
//     priceCents: 1090
//   },
//   {
//     image: "images/products/intermediate-composite-basketball.jpg",
//     name: "Intermediate Size Basketball",
//     rating: {
//       stars: 4,
//       count: 127
//     },
//     priceCents: 2095
//   },
//   {
//     image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
//     name: "Adults Plain Cotton T-Shirt - 2 Pack",
//     rating: {
//       stars: 4.5,
//       count: 56
//     },
//     priceCents: 799
//   },
//   {
//     image: "images/products/black-2-slot-toaster.jpg",
//     name: "2 Slot Toaster - Black",
//     rating: {
//       stars: 5,
//       count: 2197
//     },
//     priceCents: 1899
//   }
// ];

//getting variable from cart.js file
import{ cart, addTocART } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

//after generate html 
//combining all html together using string
let productsHTML = '';

//generate html
//looping through product array using forEach()
products.forEach((product) => {
//now for each product or object we will create html using template string
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

//now using DOM to get productsHTML on webpage
//look for element which contains all our products
//we have product-conatiner, give it a class to access in js
document.querySelector('.js-products-grid').innerHTML = productsHTML;

//function for updating cart quantity
function updateCartQuantity(){
  //variable to store total quantity
    let cartQuantity = 0;
    //total quantity of cart
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    })
    
    //accesing cart to update cart quantity
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

//now we will work on add to cart button
//add a class to js-add-to-cart-button
//and looping through each button using forEach()
document.querySelectorAll('.add-to-cart-button').forEach((button) =>{
    button.addEventListener('click', () => {
    //adding product to cart
    //using data attribute  to access id of the product
    //and accessing it using dataset
    const productId = button.dataset.productId;
    addTocART(productId);
    updateCartQuantity();
  });
});
