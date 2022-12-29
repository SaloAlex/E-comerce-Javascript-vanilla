// STOCK DE PRODUCTOS

const stockProductos = [
    {
        id: 1,
        nombre: "Sobrios",
        cantidad: 1,
        desc: "Se ajustan a todo tipo de estilos",
        precio: 1200,
        img: "https://cdn.pixabay.com/photo/2017/06/28/14/31/glasses-2450859__340.jpg",
      },
      {
        id: 2,
        nombre: "Intelectual",
        cantidad: 1,
        desc: "Para darle ese toque intelectual a tu look",
        precio: 1500,
        img: "https://cdn.pixabay.com/photo/2017/06/21/23/13/spec-2429032__340.jpg",
      },
      {
        id: 3,
        nombre: "Vintage",
        cantidad: 1,
        desc: "Estilo que nunca pasa de moda",
        precio: 1570,
        img:"https://cdn.pixabay.com/photo/2021/02/16/20/45/eye-glasses-6022344__340.jpg",
      },
      {
        id: 4,
        nombre: "Tendencia",
        cantidad: 1,
        desc: "Moda y tendencia en una pieza",
        precio: 2500,
        img: "https://cdn.pixabay.com/photo/2016/11/21/17/21/eyeglasses-1846595__340.jpg",
      },
      {
        id: 5,
        nombre: "Color Cool",
        cantidad: 1,
        desc: "Adaptalos a tu gusto",
        precio: 1200,
        img:   "https://cdn.pixabay.com/photo/2020/08/31/18/27/glasses-5533238__340.jpg",
      },
      {
        id: 6,
        nombre: "Urbanos",
        cantidad: 1,
        desc: "Exelentes para uso diario",
        precio: 1200,
        img:   "https://cdn.pixabay.com/photo/2017/07/02/21/34/glasses-2465912__340.jpg",
      },
      {
        id: 7,
        nombre: "Deportivos",
        cantidad: 1,
        desc: "Resistentes como vos en los deportes",
        precio: 1500,
        img: "https://cdn.pixabay.com/photo/2017/12/20/00/08/gatorz-3028956__340.jpg",
      },
      {
        id: 8,
        nombre: "Deluxes",
        cantidad: 1,
        desc: "Lujoso y diferentes ",
        precio: 1800,
        img: "https://cdn.pixabay.com/photo/2020/08/14/06/11/glasses-5486996__340.jpg",
      },
      {
        id: 9,
        nombre: "Elegantes",
        cantidad: 1,
        desc: "Lentes de sol con elegancia",
        precio: 2300,
        img: "https://cdn.pixabay.com/photo/2016/05/03/21/51/glasses-1370256__340.jpg",
      },
      {id: 10,
        nombre: "Diferentes",
        cantidad: 1,
        desc: "Deja que tus ojos descansen",
        precio: 2500,
        img: "https://cdn.pixabay.com/photo/2018/11/10/18/26/glasses-3807216__340.jpg",
      },
  ];
  let carrito = [];
  
  const contenedor = document.querySelector("#contenedor");
  const carritoContenedor = document.querySelector("#carritoContenedor");
  const vaciarCarrito = document.querySelector("#vaciarCarrito");
  const precioTotal = document.querySelector("#precioTotal");
  const activarFuncion = document.querySelector("#activarFuncion");
  const procesarCompra = document.querySelector("#procesarCompra");
  const totalProceso = document.querySelector("#totalProceso");
  const formulario = document.querySelector('#procesar-pago')
  const precioDolarText = document.getElementById('precio-dolar');

  // LLAMAR PRECIO DOLAR

  const precioDolar = fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales');

  const traerDolar = () => {
    precioDolar
    .then(res => res.json())
    .then(res => {
        console.log(res);
        const oficial = res.find(dolar => dolar.casa.agencia === '349');
        console.log(oficial);
        precioDolarText.innerText = `Dolar Oficial:  Compra $${oficial?.casa.compra} - Venta $${oficial?.casa.venta}`
    });
}
  
// FUNCION PROCESAR PEDIDOS

  if (activarFuncion) {
    activarFuncion.addEventListener("click", procesarPedido);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    
    mostrarCarrito();
    document.querySelector("#activarFuncion").click(procesarPedido);
  });
  if(formulario){
    formulario.addEventListener('submit', enviarCompra)
  }
  
  
  if (vaciarCarrito) {
    vaciarCarrito.addEventListener("click", () => {
      carrito.length = [];
      mostrarCarrito();
    });
  }
  
  if (procesarCompra) {
    procesarCompra.addEventListener("click", () => {
      if (carrito.length === 0) {
        Swal.fire({
          title: "¡Tu carrito está vacio!",
          text: "Compra algo para continuar con la compra",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } else {
        location.href = "compra.html";
      }
    });
  }
  
  stockProductos.forEach((prod) => {
    const { id, nombre, precio, desc, img, cantidad } = prod;
    if (contenedor) {
      contenedor.innerHTML += `
      <div class="card mt-3" style="width: 18rem;">
      <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">Precio: ${precio}</p>
        <p class="card-text">Descripcion: ${desc}</p>
        <p class="card-text">Cantidad: ${cantidad}</p>
        <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
      </div>
    </div>
      `;
    }
  });
  
  const agregarProducto = (id) => {
    const existe = carrito.some(prod => prod.id === id)
  
    if(existe){
      const prod = carrito.map(prod => {
        if(prod.id === id){
          prod.cantidad++
        }
      })
    } else {
      const item = stockProductos.find((prod) => prod.id === id)
      carrito.push(item)
    }
    mostrarCarrito()
  
  };
  
  const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
      modalBody.innerHTML = "";
      carrito.forEach((prod) => {
        const { id, nombre, precio, desc, img, cantidad } = prod;
        console.log(modalBody);
        modalBody.innerHTML += `
        <div class="modal-contenedor">
          <div>
          <img class="img-fluid img-carrito" src="${img}"/>
          </div>
          <div>
          <p>Producto: ${nombre}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad :${cantidad}</p>
        <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
          </div>
        </div>
        
    
        `;
      });
    }
  
    if (carrito.length === 0) {
      modalBody.innerHTML = `
      <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
      `;
    } else {
      // console.log("Algo");
    }
    carritoContenedor.textContent = carrito.length;
  
    if (precioTotal) {
      precioTotal.innerText = carrito.reduce(
        (acc, prod) => acc + prod.cantidad * prod.precio,
        0
      );
    }
  
    guardarStorage();
  };
  
  function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  
  function eliminarProducto(id) {
    const lentesId = id;
    carrito = carrito.filter((lentes) => lentes.id !== lentesId);
    mostrarCarrito();
  }
  function procesarPedido() {
    carrito.forEach((prod) => {
      const listaCompra = document.querySelector("#lista-compra tbody");
      const { id, nombre, precio, img, cantidad } = prod;
      if (listaCompra) {
        const row = document.createElement("tr");
        row.innerHTML += `
                <td>
                <img class="img-fluid img-carrito" src="${img}"/>
                </td>
                <td>${nombre}</td>
              <td>${precio}</td>
              <td>${cantidad}</td>
              <td>${precio * cantidad}</td>
              `;
        listaCompra.appendChild(row);
      }
    });
    totalProceso.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }
  
   function enviarCompra(e){
     e.preventDefault()
     const persona = document.querySelector('#persona').value
     const Correo = document.querySelector('#correo').value
  
     if(correo === '' || persona == ''){
       Swal.fire({
         title: "¡Debes completar tu email y nombre!",
         text: "Rellena el formulario",
         icon: "error",
         confirmButtonText: "Aceptar",
     })
   } else {
  
    const btn = document.getElementById('button');
  
     btn.value = 'Enviando...';
  
     const serviceID = 'default_service';
     const templateID = 'template_n8x3h2q';
  
     emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Finalizar compra';
        Swal.fire({
          title: "¡ Muchas gracias por tu compra!",
          text: "Tu correo fue enviado",
          icon: "success",
          confirmButtonText: "Aceptar",
      })
      }, (err) => {
        btn.value = 'Finalizar compra';
        alert(JSON.stringify(err));
      });
      
     const spinner = document.querySelector('#spinner')
     spinner.classList.add('d-flex')
     spinner.classList.remove('d-none')
  
     setTimeout(() => {
       spinner.classList.remove('d-flex')
       spinner.classList.add('d-none')
       formulario.reset()
  
       const alertExito = document.createElement('p')
       alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
       alertExito.textContent = 'Compra realizada correctamente'
       formulario.appendChild(alertExito)
  
       setTimeout(() => {
         alertExito.remove()
       }, 3000)
  
  
     }, 3000)
   }
   localStorage.clear()
   }
   traerDolar();
   