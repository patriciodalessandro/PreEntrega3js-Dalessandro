//MOSTRAR PRODUCTOS DEL STOCK DEL ARCHIVO PRODUCTS.JSON

let productos = [];

fetch("./js/products.json")
    .then(response => response.json())
    .then(data => {
        productos = data
        mostrarProductos(productos);  // TODOS LOS PRODUCTOS CARGADOS INICIALMENTE //
    });



// LLAMADOS A DOM

let productContainer = document.querySelector("#product-container"); //contenedor de los productos que filtre
const buttonsFilter = document.querySelectorAll(".btn-filter"); //botones que filtran
const mainTitle = document.querySelector ("#main-title"); // TITULO PRINCIPAL para editarlo
let buyButtons = document.querySelectorAll(".btn-add-to-cart"); //boton agregar al carrito
const cartNumber = document.querySelector("#cart-number"); // NUMERO DEL CARRITO, lo traemos para actualizarlo



// FUNCIONES DE LA PÁGINA

//función que cargará los productos seleccionados mediante el filtro
//al inicio se invoca con todos los productos, después el evento de filtros pasará por parámetro cual se cargará

function mostrarProductos(productosElegidos) { 
    productContainer.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("product-item");
        div.innerHTML = `<img class="product-img" src="${producto.imagen}"
                        alt="${producto.titulo}">
                    <h3 class="product-description">${producto.titulo}</h3>
                    <p class="product-price">$${producto.precio}</p>
                    <button class="btn-add-to-cart" id="${producto.id}">Agregar al carrito</button>`
        productContainer.append(div);
    })
    agregarBotonesComprar();
}




//Evento en todos los botones de categoria para que si se clickea, se filtren los productos y se cambie el nombre del titulo principal.

buttonsFilter.forEach(boton => { 
    boton.addEventListener("click", (event) => {  
        if (event.currentTarget.id != "show-all"){

            const productoCategoria = productos.find(producto => producto.categoria.id === event.currentTarget.id)
            mainTitle.innerText = productoCategoria.categoria.nombre;
            const productosFiltrados = productos.filter(producto => producto.categoria.id === event.currentTarget.id );
            mostrarProductos(productosFiltrados);

        } else {
            mainTitle.innerText = "TODOS LOS PRODUCTOS";
            mostrarProductos(productos);
        }
        
    })
});
//función para agregar el evento click a los botones Agregar al Carrito
function agregarBotonesComprar() {
    buyButtons = document.querySelectorAll(".btn-add-to-cart")
    buyButtons.forEach(button => {
        button.addEventListener("click", addToCart)
        //cada vez que se haga click se va a ejecutar la función que los agrega al carrito
        //se le pasa a esa función ese evento como parámetro
    })
}


// ARRAY DEL CARRITO Y ACTUALIZACIÓN DE LOCAL STORAGE

let cart = localStorage.getItem("cart-products") ? JSON.parse(localStorage.getItem("cart-products")) : [];
if (cart.length) {
    updateCartNumber();
}



//esta función va a buscar el id en el producto clickeado y lo va a comparar con el id del array productos 
//buscando en PRODUCTOS el que coincida con ese ID lo agrega en la constante que se usará para pushearlos al carrito
//antes de pushear vamos a buscar en el carrito los productos que ya tenemos. 
//si ya lo tenemos agrega 1 y sino vamos a mandar una copia de ese producto con push
function addToCart(event){
    const idButton = event.currentTarget.id;
    const addedProduct = productos.find(producto => producto.id === idButton);
    const productInCart = cart.find(product => product.id === idButton);
    
    if (productInCart) {
        productInCart.cantidad++;
    } else {
        //creamos una copia del producto que encontramos en el array(productos), para no afectar la cantidad en ese array
        const productCopy = { ...addedProduct, cantidad: 1 };
        cart.push(productCopy);
    }
    updateCartNumber()
    localStorage.setItem("cart-products", JSON.stringify(cart));
    
    Toastify({
        text: "PRODUCTO AGREGADO",
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

}

// FUNCIÓN PARA ACTUALIZACIÓN DEL NÚMERO DEL CARRITO Y DEL MISMO EN EL LOCAL STORAGE
function updateCartNumber() {
    let totalItems = cart.reduce((acc, product) => acc + product.cantidad, 0);
    cartNumber.innerText = totalItems;
}

