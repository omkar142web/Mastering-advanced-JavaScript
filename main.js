import { products } from "./products.js";
import { filterProducts } from "./filters.js";
import { sortProducts } from "./sort.js";
import { renderProducts } from "./render.js";
import { setupInfiniteScroll } from "./infiniteScroll.js";

// State
const ITEMS_PER_PAGE = 6;
let currentPage = 1;
let filteredAndSortedProducts = [];
let currentSort = "default";

// Select DOM Elements
const searchInput = document.getElementById("search-input");
const categoryFilters = document.querySelectorAll(".category-filter");
const noResults = document.getElementById("no-results");

// Custom Sort Dropdown Elements
const sortContainer = document.querySelector(".sort-container");
const sortButton = document.getElementById("sort-button");
const sortDropdown = document.getElementById("sort-dropdown");
const selectedSortText = document.getElementById("selected-sort");
const sortItems = document.querySelectorAll("#sort-dropdown li");

function updateList() {
  const searchTerm = searchInput.value;
  const selectedCategories = Array.from(categoryFilters)
    .filter((cb) => cb.checked)
    .map((cb) => cb.value);

  // Reset pagination when filters change
  currentPage = 1;

  filteredAndSortedProducts = filterProducts(products, searchTerm, selectedCategories);
  filteredAndSortedProducts = sortProducts(filteredAndSortedProducts, currentSort);

  renderCurrentView();

  if (noResults) {
    noResults.classList.toggle("hidden", filteredAndSortedProducts.length !== 0);
  }
}

function renderCurrentView() {
  const end = currentPage * ITEMS_PER_PAGE;
  const visibleProducts = filteredAndSortedProducts.slice(0, end);
  
  renderProducts(visibleProducts, filteredAndSortedProducts.length);
}

function loadMore() {
  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  
  if (currentPage < totalPages) {
    currentPage++;
    renderCurrentView();
  }
}

// Custom Dropdown Logic
if (sortButton) {
  sortButton.addEventListener("click", (e) => {
    e.stopPropagation();
    sortContainer.classList.toggle("open");
  });
}

// Close dropdown when clicking outside
document.addEventListener("click", () => {
  sortContainer.classList.remove("open");
});

sortItems.forEach(item => {
  item.addEventListener("click", () => {
    const val = item.getAttribute("data-value");
    const label = item.textContent;

    // Update State
    currentSort = val;
    selectedSortText.textContent = label;

    // Update active class
    sortItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    // Close and update
    sortContainer.classList.remove("open");
    updateList();
  });
});

// Event Listeners for Filters
if (searchInput) {
  searchInput.addEventListener("input", updateList);
}

categoryFilters.forEach((filter) => {
  filter.addEventListener("change", updateList);
});

// Initialize Infinite Scroll
setupInfiniteScroll(loadMore);

// Initial Render
updateList();
