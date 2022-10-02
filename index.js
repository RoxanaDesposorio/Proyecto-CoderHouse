//declaración de mis variables
let idMateriales = '';
let precio = '';
let cuotas = '';

class ElementoCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

//Aqui declaro los elementos del DOM, que se van a usar con el getElementById 

const contenedor = document.getElementById("contenedor");
const resultado = document.getElementById("resultado");
const contenedorCarritoCompras = document.getElementById("items")

const obtenerElementosCarrito = () => {
    return JSON.parse(localStorage.getItem("carrito")) || [] ;
}

let elementosCarrito = obtenerElementosCarrito();

const materiales = [
    { id: 1, nombre: "Caja De Guantes", precio: 28, marca: "Endoglove", img: "./img/guantes.jpg" },
    { id: 2, nombre: "Alginato c/u", precio: 38, marca: "Zhermack", img: "./img/alginato1.jpg" },
    { id: 3, nombre: "Anestesico local 2%", precio: 80, marca: "New Stetic", img: "./img/anestesia.jpg" },
    { id: 4, nombre: "Yeso tipo III", precio: 20, marca: "Pentadur", img: "./img/yeso piedra.jpg" },
    { id: 5, nombre: "Tensiometro", precio: 150, marca: "Sinoheart", img: "./img/tensiometro.jpg" },
    { id: 6, nombre: "Pasta Profiláctica", precio: 35, marca: "Shine", img: "./img/pasta profilactica.jpg" },
    { id: 7, nombre: "Caja de Radiografías", precio: 200, marca: "Ultra-Speed", img: "./img/radiografías.jpg" },
    { id: 8, nombre: "Máquina de Rayos", precio: 9500, marca: "Gnatus", img: "./img/rayos.jpg" },
    { id: 9, nombre: "Ultrasonido Dental", precio: 1650, marca: "Woodpedcker", img: "./img/ultrasonido.jpg" },
    { id: 10, nombre: "Caja de Resinas z350", precio: 650, marca: "3M", img: "./img/resina.jpg" },
    { id: 11, nombre: "Caja De Resinas z250", precio: 450, marca: "Endoglove", img: "./img/resina z250.jpg" },
    { id: 12, nombre: "Adhesivo 6g", precio: 124.50, marca: "Fgm", img: "./img/adhesivo 6g.jpg" },
    { id: 13, nombre: "Cemento Dual", precio: 80, marca: "New Stetic", img: "./img/cemento dual.jpg" },
    { id: 14, nombre: "Cemento Endodóntico", precio: 85, marca: "Sealer 26", img: "./img/sealer 26.jpg" },
    { id: 15, nombre: "Lámpara led H", precio: 420, marca: "Woodpedcker", img: "./img/lampara led h.jpg" },
    { id: 16, nombre: "Lámpara led F", precio: 750, marca: "Woodpedcker", img: "./img/lampara led f.jpg" },
    { id: 17, nombre: "Colorímetro", precio: 196, marca: "Ivoclar", img: "./img/colorimetro.jpg" },
    { id: 18, nombre: "Anestesia Topica", precio: 25, marca: "Benzotop", img: "./img/anestesia topica benzotop.jpg" },
    { id: 19, nombre: "Jeringa Carpule", precio: 16.50, marca: "Dentalteach", img: "./img/jeringa carpule.jpg" },
    { id: 20, nombre: "Microbrush", precio: 11.60, marca: "3M", img: "./img/microbrush.jpg" },
];

//Este for recorre mi array y por cada objeto se agrega a la pagina
for (const {id,nombre,precio,img}  of materiales) {

    //Se crea el boton de agregar al carrito
    let botonAgregar = document.createElement("button");
    botonAgregar.className = "btn btn-success";
    botonAgregar.innerText = "Agregar";

    //Se crea el cuerpo del producto
    let div = document.createElement("div");
    div.className = "card-body";
    div.innerHTML =
        `<h5>${nombre}</h5>
    <p>$ ${precio} USD</p>`

    // Aqui se esta creando la imagen y se le esta mandando la ruta de la imagen
    let imagen = document.createElement("img");
    imagen.src = img;
    imagen.className = "card-img-top";
    imagen.alt = nombre;

    // //Card
    // //Esto vendria a ser el contenedor de la imagen y el cuerpo del producto
    let carta = document.createElement("div");
    carta.className = "card m-2 p-2";
    carta.style = "width: 18rem";

    // //Por ende aqui se le agrega la imagen y luego el item, que seria el cuerpo
    carta.append(imagen);
    carta.append(div);
    carta.append(botonAgregar)

    //Aqui al boton agregar de la linea 66, se le agrega un evento para cuando se toque
    botonAgregar.onclick = () => {

        
        //Esta funcion verifica si el producto ya esta en el carrito, si no esta, lo agrega. Adicionalmente se esta agregando al localstorage
        let elementoExistente = elementosCarrito.find((elem) => elem.producto.id == id);
        // console.log(elementoExistente);

        if (elementoExistente) {
            elementoExistente.cantidad += 1;
            localStorage.setItem("carrito", JSON.stringify(elementosCarrito));
        } else {
            let elementoCarrito = new ElementoCarrito({id,nombre,precio}, 1);
            elementosCarrito.push(elementoCarrito);
            localStorage.setItem("carrito", JSON.stringify(elementosCarrito));
        }

        //Aqui se llama a la funcion que muestra el carrito
        dibujarCarrito();
        
        //mensaje que aparece cuando se agrega un producto al carrito
        swal({
            title: '¡Producto agregado!',
            text: `${nombre} agregado al carrito`,
            icon: 'success',
            buttons: {
                cerrar: {
                    text: "Cerrar",
                    value: false
                },
                carrito: {
                    text: "Ir al carrito",
                    value: true
                }
            }
        }).then((decision) => {
            if (decision) {
                const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), { keyboard: true });
                const modalToggle = document.getElementById('toggleMyModal');
                myModal.show(modalToggle);
            } else {
                swal("Puede seguir comprando");
            }
        });


    }

    //Aqui se agrega la carta al contenedor de productos
    contenedor.append(carta)

}


const buscarMaterial = (id) => materiales.find((material) => material.id === id);


//filtro por nombre
const filtrarPorNombre = (nombre) => materiales.filter((material) => {
    return material.nombre.toLowerCase().includes(nombre.toLowerCase());
});

// dibuja el carrito
const contenedorFooterCarrito = document.querySelector("#footer");

//Esta let sera el precio total de la compra. Lo vamos a utilizar en la funcion dibujarCarrito y tambien en la funcion de comprar.
let totalCompra = 0

//Esta funcion dibuja el carrito
function dibujarCarrito() {
    contenedorCarritoCompras.innerHTML = "";

    elementosCarrito.forEach(
        (elemento) => {
            let renglonesCarrito = document.createElement("tr");

            renglonesCarrito.innerHTML = `
                <td>${elemento.producto.id}</td>
                <td>${elemento.producto.nombre}</td>
                <td><input id="cantidad-producto-${elemento.producto.id}" type="number" value="${elemento.cantidad}" min="1" max="1000" step="1" style="width: 50px;"/></td>
                <td>$ ${elemento.producto.precio}</td>
                <td>$ ${elemento.producto.precio * elemento.cantidad}</td>
                <td><button id="eliminar-producto-${elemento.producto.id}" type="button" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button></td>

            `;
            contenedorCarritoCompras.append(renglonesCarrito);

            //Agregar evento a input de renglón en carrito
            let inputCantidadProducto = document.getElementById(`cantidad-producto-${elemento.producto.id}`);
            inputCantidadProducto.addEventListener('change', (ev) => {
                let nuevaCantidad = ev.target.value;
                elemento.cantidad = nuevaCantidad;
                dibujarCarrito();
            });


            //Agregar evento a eliminar producto
            let botonEliminarProducto = document.getElementById(`eliminar-producto-${elemento.producto.id}`);
            botonEliminarProducto.addEventListener('click', () => {

                let indiceEliminar = elementosCarrito.indexOf(elemento);
                elementosCarrito.splice(indiceEliminar, 1);
                //Cuando se elimina un producto, tambien se elimina del localstorage, para que este actualizado
                localStorage.setItem("carrito", JSON.stringify(elementosCarrito));
                dibujarCarrito();
            });


        }
    );

    const valorInicial = 0;
    totalCompra = elementosCarrito.reduce(
        (previousValue, currentValue) => previousValue + currentValue.producto.precio * currentValue.cantidad,
        valorInicial
    );

    //Esto hace la comparacion, si no hay productos en el carrito, se muestra el mensaje de que el carrito esta vacio
    if (elementosCarrito.length == 0) {
        contenedorFooterCarrito.innerHTML = `<th scope="row" colspan="6">Carrito vacío - comience a comprar!</th>`;
    } else {
        contenedorFooterCarrito.innerHTML = `<th scope="row" colspan="6">Total de la compra: ${totalCompra}</th>`;
    }



}

dibujarCarrito()

//Esto es nuestro buscador, esta filtrando por nombre 
// Solo que con los resultados de la busqueda
const busqueda = () => {
    resultado.innerHTML = "";
    let input = document.getElementById("input").value;

    const filtro = filtrarPorNombre(input);

    filtro.forEach((material) => {

        let botonAgregar = document.createElement("button");
        botonAgregar.className = "btn btn-success";
        botonAgregar.innerText = "Agregar";

        let item = document.createElement("div");
        item.className = "card-body";

        item.innerHTML =
            `        <h5>${material.nombre}</h5>
        <p>$ ${material.precio} USD</p>`
        item.append(botonAgregar);

        let imagen = document.createElement("img");
        imagen.src = material.img;
        imagen.className = "card-img-top";
        imagen.alt = material.nombre;
        //Card
        let carta = document.createElement("div");
        carta.className = "card m-2 p-2";
        carta.style = "width: 18rem";
        carta.append(imagen);
        carta.append(item);

        botonAgregar.onclick = () => {

            let elementoExistente =
                elementosCarrito.find((elem) => elem.producto.id == item.id);

            if (elementoExistente) {
                elementoExistente.cantidad += 1;
                localStorage.setItem("carrito", JSON.stringify(elementosCarrito));

            } else {
                let elementoCarrito = new ElementoCarrito(material, 1);
                elementosCarrito.push(elementoCarrito);
                localStorage.setItem("carrito", JSON.stringify(elementosCarrito));

            }

            dibujarCarrito();

            swal({
                title: '¡Producto agregado!',
                text: `${material.nombre} agregado al carrito`,
                icon: 'success',
                buttons: {
                    cerrar: {
                        text: "cerrar",
                        value: false
                    },
                    carrito: {
                        text: "ir a carrito",
                        value: true
                    }
                }
            }).then((decision) => {
                if (decision) {
                    const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), { keyboard: true });
                    const modalToggle = document.getElementById('toggleMyModal');
                    myModal.show(modalToggle);
                } else {
                    swal("No quieres ir al carrito");
                }
            });
        }
        resultado.append(carta);
    })


}

//Evento para el btn principal

let boton = document.getElementById("btnPrincipal");

boton.addEventListener("click", busqueda);




const calculoDescuento = (precio, cuotas) => {
    return precio / cuotas - (precio / cuotas) * 0.1;
};
function dividir(cuotas, precio) {
    // precio = buscarMaterial(idMateriales).precio;
    switch (cuotas) {
        case 3:
            return calculoDescuento(precio, cuotas);
            break;
        case 6:
            return calculoDescuento(precio, cuotas);
            break;
        case 12:
            return calculoDescuento(precio, cuotas);
            break;
        default:
            return precio / cuotas;
            break;
    }
}

//Nuestra ultima funcion, para pagar.
const pagar = () => {
    if (totalCompra) {
        alert("Ingrese la cantidad de cuotas.");
        const cuotas = parseInt(prompt("Solo con 3, 6 o 12 cuotas obtiene el 10% de descuento."));
        let resultado = dividir(cuotas, totalCompra);
        swal({
            title: '¡Compra realizada!',
            text: `Y El monto a pagar seria de: ${resultado.toFixed(2)} soles en "${cuotas} cuotas".`,
            icon: 'success',

        }
        );

        //Vaciamos nuestro localstorage y nuestro carrito.
        localStorage.clear();
        elementosCarrito = [];
        dibujarCarrito()

    }
    else {
        alert("No hay productos en el carrito");
    }
}

