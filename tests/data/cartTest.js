import { addTocART, cart, loadFromStorage } from "../../data/cart.js";

describe("test suite: addToCart", () => {
  it("adds an existing product to the cart", () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1"
        }
      ]); //return in string only
    });
    loadFromStorage();

    addTocART("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); //checks how many times this method is called, (1) -> expected time to be called

    //check if 1st product matches its id
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    //checking quantity
    expect(cart[0].quantity).toEqual(2);
  });

  it("adds a new product to the cart", () => {
    spyOn(localStorage, "setItem"); //to prevent our main to not get changed

    //creating mock using spyOn() - (localStorage.getItem('cart'))
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]); //return in string only
    });
    loadFromStorage();

    addTocART("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); //checks how many times this method is called, (1) -> expected time to be called

    //check if 1st product matches its id
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    //checking quantity
    expect(cart[0].quantity).toEqual(1);
  });
});
