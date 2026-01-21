export const cart = [];

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
