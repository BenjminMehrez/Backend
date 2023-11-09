let cartId = 0;
let saveCart;

function updateCartList(products) {
  let cartContainer = document.getElementById('carrito');
  let cartContent = '';

  products.forEach((product) => {
    console.log(product);
    cartContent +=`
    <div class="row">
      <div class="col-md-3 mt-5">
        <div class="card">
              <h2>Carrito de compras</h2>
              <img src ="https://i1.t4s.cz/products/107165-001/puma-future-ultimate-fg-ag-547185-107165-002-960.webp"${product.thumbnail}" class="w-100 card-img-top">
              <div class="card-body">
                  <h5 class="cart-title">${product.product.title}</h5>
                  <p class="cart-title">Categoría: ${product.product.category}</p>
                  <p class="cart-title">ID: ${product.product._id}</p>
                  <p class="cart-title">Descripción: ${product.product.description}</p>
                  <p class="cart-title">$${product.product.price}</p>
              </div>
              <p class="">Cantidad: ${product.quantity}</p>
              <button data-cid="${cartId}" data-pid="${product.product._id}" class="remove-from-cart" onclick="removeProductFromCart('${cartId}', '${product.product._id}')">Eliminar</button>
        </div>

        </div>
    </div>

            `
        ;
  });

  cartContainer.innerHTML = cartContent;
}

fetch('/api/carts/', {
  method: 'POST',
  body: JSON.stringify({ products: []}),
  headers: {
    'Content-Type': 'application/json',
  },
}).then((result) => {
  result.json().then((data) => {
    cartId = data._id;
  });
});

function addCart(id) {
  fetch(`/api/carts/${cartId}/`, {
    method: 'POST',
    body: JSON.stringify({
      pid: id,
      quantity: 1,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((result) => {
    result.json().then((data) => {
      saveCart = data.cart.products;
      console.log(saveCart);
      updateCartList(saveCart);
    });
  });
}

function removeProductFromCart(cid, pid) {
  const url = `/api/carts/${cid}/product/${pid}`;
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('No se pudo eliminar el producto del carrito');
      }
    })
    .then((data) => {
      const updatedCart = data.cart.products;
      console.log(updatedCart);
    })
    .catch((error) => {
      console.error(error);
    });
}