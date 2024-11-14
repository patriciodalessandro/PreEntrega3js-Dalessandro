// PRODUCTOS
const productos = [
    // REMERAS Y CAMISAS
    {
        id: "remera-01",
        titulo: "Remera Rayada",
        imagen: "./img/remeras_y_camisas/remera_rayada.png",
        categoria: {
            nombre: "REMERAS",
            id: "remeras"
        },
        precio: 10000,
        cantidad: 1
    },
    {
        id: "remera-02",
        titulo: "Remera Gris",
        imagen: "./img/remeras_y_camisas/remera_gris.png",
        categoria: {
            nombre: "REMERAS Y CAMISAS",
            id: "remeras"
        },
        precio: 8000,
        cantidad: 1
    },
    {
        id: "remera-03",
        titulo: "Remera Looney Tunes",
        imagen: "./img/remeras_y_camisas/oversize_looney_tunes.png",
        categoria: {
            nombre: "REMERAS Y CAMISAS",
            id: "remeras"
        },
        precio: 12000,
        cantidad: 1
    },
    {
        id: "remera-04",
        titulo: "Musculosa acanalada",
        imagen: "./img/remeras_y_camisas/musculosa_acanalada.png",
        categoria: {
            nombre: "REMERAS Y CAMISAS",
            id: "remeras"
        },
        precio: 6000,
        cantidad: 1
    },
    {
        id: "remera-05",
        titulo: "Camisa Rosa",
        imagen: "./img/remeras_y_camisas/camisa_rosa.png",
        categoria: {
            nombre: "REMERAS Y CAMISAS",
            id: "remeras"
        },
        precio: 42000,
        cantidad: 1
    },
    {
        id: "remera-06",
        titulo: "Camisa Rayada",
        imagen: "./img/remeras_y_camisas/camisa_rayada.png",
        categoria: {
            nombre: "REMERAS Y CAMISAS",
            id: "remeras"
        },
        precio: 46000,
        cantidad: 1
    },
    {
        id: "remera-07",
        titulo: "Camisa Jean",
        imagen: "./img/remeras_y_camisas/camisa_jean.png",
        categoria: {
            nombre: "REMERAS Y CAMISAS",
            id: "remeras"
        },
        precio: 52000,
        cantidad: 1
    },
    {
        id: "remera-08",
        titulo: "Camisa Encaje",
        imagen: "./img/remeras_y_camisas/camisa_encaje.png",
        categoria: {
            nombre: "REMERAS Y CAMISAS",
            id: "remeras"
        },
        precio: 36000,
        cantidad: 1
    },

    // CAMPERAS
    {
        id: "campera-01",
        titulo: "Campera Bomber",
        imagen: "./img/camperas/campera_bomber.png",
        categoria: {
            nombre: "CAMPERAS",
            id: "camperas"
        },
        precio: 62000,
        cantidad: 1
    },
    {
        id: "campera-02",
        titulo: "Campera de cuero",
        imagen: "./img/camperas/campera_de_cuero.png",
        categoria: {
            nombre: "CAMPERAS",
            id: "camperas"
        },
        precio: 75000,
        cantidad: 1
    },
    {
        id: "campera-03",
        titulo: "Campera jean",
        imagen: "./img/camperas/campera_jean.png",
        categoria: {
            nombre: "CAMPERAS",
            id: "camperas"
        },
        precio: 60000,
        cantidad: 1
    },
    {
        id: "campera-04",
        titulo: "Canguro negro",
        imagen: "./img/camperas/canguro_negro.png",
        categoria: {
            nombre: "CAMPERAS",
            id: "camperas"
        },
        precio: 45000,
        cantidad: 1
    },
    {
        id: "campera-05",
        titulo: "Trench beige",
        imagen: "./img/camperas/trench_beige.png",
        categoria: {
            nombre: "CAMPERAS",
            id: "camperas"
        },
        precio: 72000,
        cantidad: 1
    },

    // PANTALONES
    {
        id: "pantalon-01",
        titulo: "Pantalón cargo claro",
        imagen: "./img/pantalones/cargo_claro.png",
        categoria: {
            nombre: "PANTALONES",
            id: "pantalones"
        },
        precio: 59000,
        cantidad: 1        
    },
    {
        id: "pantalon-02",
        titulo: "Joggin negro",
        imagen: "./img/pantalones/joggin_negro.png",
        categoria: {
            nombre: "PANTALONES",
            id: "pantalones"
        },
        precio: 42000,
        cantidad: 1
    },
    {
        id: "pantalon-03",
        titulo: "Pantalón engomado",
        imagen: "./img/pantalones/pantalon_engomado.png",
        categoria: {
            nombre: "PANTALONES",
            id: "pantalones"
        },
        precio: 50000,
        cantidad: 1
    },
    {
        id: "pantalon-04",
        titulo: "Pantalón de jean clásico",
        imagen: "./img/pantalones/pantalon_jean.png",
        categoria: {
            nombre: "PANTALONES",
            id: "pantalones"
        },
        precio: 55000,
        cantidad: 1
    },
    {
        id: "pantalon-05",
        titulo: "Pantalón de sarga",
        imagen: "./img/pantalones/pantalon_sarga.png",
        categoria: {
            nombre: "PANTALONES",
            id: "pantalones"
        },
        precio: 51900,
        cantidad: 1
    }
];



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


mostrarProductos(productos);  // TODOS LOS PRODUCTOS CARGADOS INICIALMENTE //


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
    

}

// FUNCIÓN PARA ACTUALIZACIÓN DEL NÚMERO DEL CARRITO Y DEL MISMO EN EL LOCAL STORAGE


function updateCartNumber() {
    let totalItems = cart.reduce((acc, product) => acc + product.cantidad, 0);
    cartNumber.innerText = totalItems;
}

