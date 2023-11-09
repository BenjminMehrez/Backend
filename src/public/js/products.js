fetch('http://localhost:8080/api/products')
  .then((response) => response.json())
  .then((data) => {
    updateProductList(data.payload);
  })
function updateProductList(products) {
  let div = document.getElementById('product');

  let productos = '';
  products.forEach((product) => {
    productos += `
    <div class="row">
      <div class="col-md-3 mt-5">
        <div class="card">
          <img src ="https://i1.t4s.cz/products/107165-001/puma-future-ultimate-fg-ag-547185-107165-002-960.webp"${product.thumbnail}" class="w-100 card-img-top">
            <div class="card-body">
              <h2 class="card-title text-center">${product.title}</h2>
                    <p class="card-text text-center">Categoria: ${product.category}</p>
                    <p class="text-center">ID:${product._id}</p>
                    <p class="text-center">code:${product.code}</p>
                    <p class="text-center">Info: ${product.description}</p>
                    <p class="text-center">STOCK:${product.stock}</p>
                    <p class="text-center">$${product.price}</p>
            </div>
            <div class="btn">
              <button class="" id="${product._id}" onclick="addCart('${product._id}')"> Añadir al carrito </button>
            </div>
          </div>

      </div>
    </div>

      `;
  });

  div.innerHTML = productos;
}
