console.log("Creator Store is ready!");

// 1. Create an empty cart
const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

// 2. Connect JavaScript to HTML elements
const totalDisplay = document.getElementById("cart-total");
const cartCountDisplay = document.getElementById("cart-count");
const cartItemsDisplay = document.getElementById("cart-items");
const cartToggle = document.getElementById("cart-toggle");
const cartPanel = document.getElementById("cart-panel");
const clearCartButton = document.getElementById("clear-cart");

// 3. Function to add products to the cart
function addToCart(newProduct) {
  const existingItem = cart.find(
    (item) => String(item.id) === String(newProduct.id),
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...newProduct, quantity: 1 });
  }

  updateCart();
}

// 4. Function to update the cart display
function updateCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
  let total = 0;
  let itemCount = 0;

  // Calculate subtotal and total quantity
  for (let item of cart) {
    total += item.price * item.quantity;
    itemCount += item.quantity;
  }

  // Update the cart count and subtotal
  cartCountDisplay.textContent = itemCount;
  totalDisplay.textContent = `KSh ${total.toLocaleString()}`;

  // Clear the previous cart display
  cartItemsDisplay.innerHTML = "";

  // Display an empty message when there are no products
  if (cart.length === 0) {
    cartItemsDisplay.innerHTML = "<p>Your cart is currently empty.</p>";
    return;
  }

  // Display products with quantity controls
  for (let item of cart) {
    cartItemsDisplay.innerHTML += `
      <div class="cart-item">
        <p>${item.name}</p>

        <button type="button" data-action="decrease" data-id="${item.id}">
          −
        </button>

        <span>${item.quantity}</span>

        <button type="button" data-action="increase" data-id="${item.id}">
          +
        </button>

        <strong>KSh ${(item.price * item.quantity).toLocaleString()}</strong>
        <button type="button" data-action="remove" data-id="${item.id}">
  Remove
</button>
      </div>
    `;
  }
}

// 5. Connect all Add to Cart buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const product = {
      id: button.dataset.productId,
      name: button.dataset.productName,
      price: Number(button.dataset.productPrice),
    };

    addToCart(product);
  });
});

// 6. Make the cart open and close
cartToggle.addEventListener("click", function () {
  cartPanel.hidden = !cartPanel.hidden;

  cartToggle.setAttribute("aria-expanded", String(!cartPanel.hidden));
});

// 7. Handle increase and decrease buttons inside the cart
cartItemsDisplay.addEventListener("click", function (event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const item = cart.find(
    (cartItem) => String(cartItem.id) === String(button.dataset.id),
  );

  if (!item) return;

  if (button.dataset.action === "increase") {
    item.quantity++;
  } else if (button.dataset.action === "decrease") {
    item.quantity--;

    if (item.quantity <= 0) {
      cart.splice(cart.indexOf(item), 1);
    }
  } else if (button.dataset.action === "remove") {
    cart.splice(cart.indexOf(item), 1);
  }

  updateCart();
});

// 8. Clear all products from the cart
clearCartButton.addEventListener("click", function () {
  cart.length = 0;
  updateCart();
});

// 9. Display the initial empty cart
updateCart();
