export function sortProducts(items, sortValue) {
  const sorted = [...items];

  switch (sortValue) {
    case "low-high":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "high-low":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "rating-high":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case "rating-low":
      sorted.sort((a, b) => a.rating - b.rating);
      break;
    case "reviews-high":
      sorted.sort((a, b) => b.reviewsCount - a.reviewsCount);
      break;
    case "reviews-low":
      sorted.sort((a, b) => a.reviewsCount - b.reviewsCount);
      break;
    default:
      // Default sorting (original order)
      break;
  }

  return sorted;
}
