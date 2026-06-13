const productGrid = document.getElementById("product-grid");
const countNum = document.getElementById("count-num");

/**
 * Renders products to the grid.
 * @param {Array} items - The subset of products to render.
 * @param {number} totalCount - The total number of filtered products (for the counter).
 */
export function renderProducts(items, totalCount) {
  if (!productGrid || !countNum) return;

  productGrid.innerHTML = "";

  items.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ""}
      <div class="product-img-container">
        <img src="${product.image}" alt="${product.title}" class="product-img" loading="lazy">
      </div>
      <div class="product-info">
        <h4 class="product-title">${product.title}</h4>
        <p class="product-desc">${product.description}</p>
        <div class="product-price">₹${product.price}</div>
        <div class="product-rating">⭐ ${product.rating} <span>(${product.reviewsCount})</span></div>
      </div>
    `;

    productGrid.appendChild(card);
  });

  // Show "Showing X of Y" or just X
  countNum.textContent = `${items.length} of ${totalCount}`;
}
