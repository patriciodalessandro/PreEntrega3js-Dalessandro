const cart = JSON.parse(localStorage.getItem("cart-products")) || [];


// LLAMADOS AL DOM 
const cartProducts = document.querySelector("#cart-products");
const cartEmptyAlert = document.querySelector("#cart-empty");
const cartActions = document.querySelector("#cart-actions");
const cartEnd = document.querySelector("#cart-end");
const emptyCartButton = document.querySelector("#cart-actions-empty");
const buyButton = document.querySelector("#cart-actions-buy");
const priceTotal = document.querySelector("#total-price");

// FUNCIÓN QUE RENDERIZA LOS PRODUCTOS ALMACENADOS EN EL CARRITO
function deployCart() {
    if (cart.length === 0) {
        cartEmptyAlert.classList.remove("disabled");
        cartProducts.classList.add("disabled");
        cartActions.classList.add("disabled");
        // cartEnd.classList.add("disabled");
        return; }
    
    cartEmptyAlert.classList.add("disabled");
    cartProducts.classList.remove("disabled");
    cartActions.classList.remove("disabled");
    // cartEnd.classList.add("disabled");

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
            <button id="${producto.id}" class="cart-product-delete">
                <i class="bi bi-x-lg"></i>
            </button>`;
        cartProducts.append(div);
    });

    activateDeleteButtons();
    getTotalPrice();
}

// FUNCIÓN PARA ACTIVAR LOS BOTONES DE ELIMINACIÓN DE PRODUCTOS DEL CARRITO
function activateDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".cart-product-delete");
    deleteButtons.forEach(button => {
        button.addEventListener("click", deleteFromCart);
    });
}

// FUNCIÓN PARA ELIMINAR UN PRODUCTO ESPECÍFICO DEL CARRITO CUANDO SE HACE CLICK EN SU BOTÓN DE ELIMINACIÓN
function deleteFromCart(event) {
    Toastify({
        text: "PRODUCTO ELIMINADO",
        duration: 500,
        destination: "./cart.html",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #555, #e5533d)",
          borderRadius: "8px",
          fontSize: "12px"
        },
        offset: {
            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 100 // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function(){} // Callback after click
      }).showToast();
    const buttonId = event.currentTarget.id;
    const targetProductIndex = cart.findIndex(producto => producto.id === buttonId);
    if (targetProductIndex !== -1) {
        cart.splice(targetProductIndex, 1);
    }
    localStorage.setItem("cart-products", JSON.stringify(cart));
    deployCart();
}

// EVENTO CLICK SOBRE EL BOTÓN VACIAR CARRITO
emptyCartButton.addEventListener("click", emptyCart);

//FUNCION PARA VACIAR EL CARRITO
function deleteProducts() {
    cart.length = 0;
    localStorage.setItem("cart-products", JSON.stringify(cart));
    deployCart();
    getTotalPrice();
}

//FUNCIÓN PARA MOSTRAR LOS ALERTAS DEL BOTÓN VACIAR CARRITO
function emptyCart() {
    if (cart.length >= 1) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "custom-confirm-button",  // Clase personalizada para el botón "Sí, vaciar carrito"
                cancelButton: "custom-cancel-button"    // Clase personalizada para el botón "Quiero mis productos"
            },
            buttonsStyling: false // No usar los estilos de Bootstrap
        });

        swalWithBootstrapButtons.fire({
            title: "¿Estás seguro?",
            text: "¡Vas a eliminar todos los productos!",
            icon: "warning",
            iconHtml: '<i class="bi bi-exclamation-square" style="font-size: 4.5rem; color: #0f1820;"></i>',
            showCancelButton: true,
            confirmButtonText: "Sí, vaciar carrito",
            cancelButtonText: "Quiero mis productos",
            reverseButtons: true 
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "¡Carrito borrado!",
                    text: "Carrito eliminado",
                    icon: "success",
                    iconHtml: '<i class="bi bi-trash3-fill" style="font-size: 4.5rem; color: #0f1820;"></i>'
                });

                deleteProducts();
            } else {
                // Aquí aplicamos estilos para la ventana "Carrito salvado"
                swalWithBootstrapButtons.fire({
                    title: "¡Carrito salvado!",
                    text: "Perfecto, puedes continuar con tu compra",
                    icon: "error",
                    iconHtml: `<i class="bi bi-hand-thumbs-up" style="font-size: 4.5rem; color: #0f1820;"></i>`,
                    customClass: {
                        confirmButton: "custom-cancel-button" // Aseguramos que este tenga el color verde
                    }
                });
            }
        });
    }
}




// EVENTO CLICK SOBRE EL BOTÓN FINALIZAR COMPRA
buyButton.addEventListener("click", buyCart);

// FUNCIÓN PARA VACIAR EL CARRITO UNA VEZ QUE SE FINALIZA LA COMPRA
function buyCart() {
    if (cart.length >= 1) {
        Swal.fire({
            title: "¡Compra realizada con éxito!",
            text: "Gracias por confiar en Lutto",
            icon: "",
            iconHtml: `<i class="bi bi-emoji-laughing" style="font-size: 4.5rem; color: #0f1820;"></i>`,
            confirmButtonText: "Aceptar",
            customClass: {
              confirmButton: "custom-confirm-confirm-button"
            }
          });
          
    }
        deleteProducts();
        getTotalPrice();
    // cart.length = 0;
    // localStorage.setItem("cart-products", JSON.stringify(cart));
    // cartEmptyAlert.classList.add("disabled");
    // cartProducts.classList.add("disabled");
    // cartActions.classList.add("disabled");
    // cartEnd.classList.remove("disabled");
}

// FUNCIÓN PARA CALCULAR Y MOSTRAR EL PRECIO TOTAL DE LOS PRODUCTOS DENTRO DEL CARRITO
function getTotalPrice() {
    const getTotal = cart.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    priceTotal.innerText = `$${getTotal}`;
}

// DISPARO INICIAL DE LA PÁGINA CART 
deployCart();