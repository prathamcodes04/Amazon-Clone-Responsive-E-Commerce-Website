export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));

  if(!cart){
    cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
  }
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

//function to get product by id and adding it to cart
export function addTocART(productId){
  let matchingItem;
  //productName and quantity saved in item
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });
  
  //updating cart
  if(matchingItem){
    matchingItem.quantity += 1;
  } else{
    //pushing product
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

//to remove pdt from cart
export function removeFromCart(productId){
  const newCart = [];
  
  //this loop contains all cart items that dont match productId
  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  //replacing cart with newCart
  cart = newCart;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
  //loop through cart to find pdt
  let matchingItem;
  //productName and quantity saved in item
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  //updating deliveryOptionId
  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function loadCart(fun) { //call fun after loading all products
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    console.log(xhr.response);
    fun();
  });

  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}