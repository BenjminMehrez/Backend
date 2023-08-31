const socket = io();



socketClient.on("enviodeproducts",(obj)=>{
  updateProductList(obj)
})


function updateProductList(products) {
  let div = document.getElementById("list-products");
  let productos = "";

  products.forEach((product) => {
    productos += `
    <div class="container">
    <div class="caja">
        <div><span>ID: </span>
            <p>${product.id}</p>
        </div>
        <div><span>Nombre: </span>
            <p>${product.title}</p>
        </div>
        <div><span>Precio: </span>
            <p>${product.price}</p>
        </div>
        <div><span>Descripcion: </span>
            <p>${product.description}</p>
        </div>
        <div><span>Thumbnails: </span>
            <p>${product.thumbnails}</p>
        </div>
        <div><span>Status: </span>
            <p>${product.status}</p>
        </div>
        <div><span>Stock: </span>
            <p>${product.stock}</p>
        </div>
    </div>

</div>
        
        `;
  });

  div.innerHTML = productos;
}


let form = document.getElementById("formulario");
form.addEventListener("submit", (evt) => {
evt.preventDefault();

let title = form.elements.title.value;
let description = form.elements.description.value;
let price = form.elements.price.value;
let thumbnail = form.elements.thumbnail.value;
let code = form.elements.code.value;
let stock = form.elements.stock.value;

socketClient.emit("addProduct", {
  title,
  description,
  stock,
  price,
  thumbnail,
  code,
});

form.reset();
});

document.getElementById("delete-btn").addEventListener("click", function () {
  const deleteidinput = document.getElementById("id-prod");
  const deleteid = parseInt(deleteidinput.value);
  socketClient.emit("deleteProduct", deleteid);
  deleteidinput.value = "";
})

