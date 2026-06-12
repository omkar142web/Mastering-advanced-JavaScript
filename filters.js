export function filterProducts(products, searchTerm, selectedCategories) {
  const term = searchTerm.toLowerCase();

  return products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term);

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    return matchesSearch && matchesCategory;
  });
}
