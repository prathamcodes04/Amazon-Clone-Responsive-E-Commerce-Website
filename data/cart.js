export let cart = [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
  },{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }
];

//function to get product by id and adding it to cart
export function addTocART(productId){
  let matchingItem;
  //productName and quantity saved in item
  cart.forEach((cartItem) => {
    if(productId === cartItem.productName){
      matchingItem = cartItem;
    }
  });
  
  //updating cart
  if(matchingItem){
    matchingItem.quantity += 1;
  } else{
    //pushing product
    cart.push({
      productId,
      quantity: 1
    });
  }
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
}
