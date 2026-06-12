import { products } from "./products.js";
import { filterProducts } from "./filters.js";
import { sortProducts } from "./sort.js";
import { renderProducts } from "./render.js";
import { setupInfiniteScroll } from "./infiniteScroll.js";

// State
const ITEMS_PER_PAGE = 6;
let currentPage = 1;
let filteredAndSortedProducts = [];

// Select DOM Elements
const searchInput = document.getElementById("search-input");
const categoryFilters = document.querySelectorAll(".category-filter");
const sortSelect = document.getElementById("sort-select");
const noResults = document.getElementById("no-results");

function updateList() {
  const searchTerm = searchInput.value;
  const selectedCategories = Array.from(categoryFilters)
    .filter((cb) => cb.checked)
    .map((cb) => cb.value);

  // Reset pagination when filters change
  currentPage = 1;

  filteredAndSortedProducts = filterProducts(products, searchTerm, selectedCategories);
  filteredAndSortedProducts = sortProducts(filteredAndSortedProducts, sortSelect.value);

  renderCurrentView();

  if (noResults) {
    noResults.classList.toggle("hidden", filteredAndSortedProducts.length !== 0);
  }
}

function renderCurrentView() {
  const end = currentPage * ITEMS_PER_PAGE;
  const visibleProducts = filteredAndSortedProducts.slice(0, end);
  
  // We pass total length to renderProducts for the counter
  renderProducts(visibleProducts, filteredAndSortedProducts.length);
}

function loadMore() {
  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  
  if (currentPage < totalPages) {
    currentPage++;
    renderCurrentView();
  }
}

// Event Listeners
if (searchInput) {
  searchInput.addEventListener("input", updateList);
}

categoryFilters.forEach((filter) => {
  filter.addEventListener("change", updateList);
});

if (sortSelect) {
  sortSelect.addEventListener("change", updateList);
}

// Initialize Infinite Scroll
setupInfiniteScroll(loadMore);

// Initial Render
updateList();
