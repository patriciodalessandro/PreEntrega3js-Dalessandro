let cart = JSON.parse(localStorage.getItem("cart-products"));


// LLAMADOS AL DOM 
const cartProducts = document.querySelector("#cart-products");
const cartEmptyAlert =document.querySelector("#cart-empty");
const cartActions = document.querySelector("#cart-actions");
const cartEnd = document.querySelector("#cart-end");
const deleteButtons = document.querySelectorAll(".cart-product-delete");
const emptyCartButton  = document.querySelector("#cart-actions-empty");
const buyButton = document.querySelector("#cart-actions-buy")
const priceTotal = document.querySelector("#total-price");

 

function deployCart(){

    if (cart.length >= 1) {
    
        cartEmptyAlert.classList.add("disabled");
        cartProducts.classList.remove("disabled");
        cartActions.classList.remove("disabled")
        cartEnd.classList.add("disabled")
    
    
        cartProducts.innerHTML = "";    
    
    
        cart.forEach(producto => {
            const div = document.createElement("div");
                div.classList.add("cart-product");
                div.innerHTML = `
                            <img class="cart-product-img" src="${producto.imagen}" alt="${producto.nombre}">
                            <div class="cart-product-description">
                                <small>Nombre producto</small>
                                <h3>${producto.titulo}</h3>
                            </div>
                            <div class="cart-product-amount">
                                <small>Cantidad</small>
                                <p>${producto.cantidad}</p>
                            </div>
                            <div class="cart-product-price">
                                <small>Precio</small>
                                <p>$${producto.precio}</p>
                            </div>
                            <div class="cart-product-subtotal">
                                <small>Subtotal</small>
                                <p>$${producto.precio * producto.cantidad}</p>
                            </div>
                            <button id="${producto.id}" class="cart-product-delete"><i class="bi bi-x-lg"></i></button>
                            `
                            ;
                
                cartProducts.append(div);
    
        });
    
    } else {
        cartEmptyAlert.classList.remove("disabled");
        cartProducts.classList.add("disabled");
        cartActions.classList.add("disabled")
        cartEnd.classList.add("disabled")
    }
    activateDeleteButtons()
    getTotalPrice()
}



function activateDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".cart-product-delete");
    deleteButtons.forEach(button => {
        button.addEventListener("click", deleteFromCart);
    });
}



function deleteFromCart(event){
    const buttonId = event.currentTarget.id;
    const targetProductIndex = cart.findIndex(producto => producto.id === buttonId);
    cart.splice(targetProductIndex, 1);
    deployCart();
    localStorage.setItem("cart-products",JSON.stringify(cart))
}

emptyCartButton.addEventListener("click", emptyCartAction);

function emptyCartAction(){
    cart.length = 0;
    localStorage.setItem("cart-products", JSON.stringify(cart));
    deployCart();
}


buyButton.addEventListener("click", buyCart)


function buyCart() {
    cart.length = 0;
    localStorage.setItem("cart-products", JSON.stringify(cart));
    cartEmptyAlert.classList.add("disabled");
    cartProducts.classList.add("disabled");
    cartActions.classList.add("disabled")
    cartEnd.classList.remove("disabled")
}



function getTotalPrice() {
    const getTotal = cart.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    priceTotal.innerText = `$${getTotal}`;
}


deployCart();

