let cart = localStorage.getItem("cart-products");
cart = JSON.parse(cart) || [];

// LLAMADOS AL DOM 

const cartContainer = document.querySelector("#cart-container");
const emptyButton = document.querySelector("#cart-actions-empty");
const priceTotal = document.querySelector("#total");
const buyButton = document.querySelector("#cart-actions-buy")