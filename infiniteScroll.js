/**
 * Handles infinite scrolling by detecting when the user reaches the bottom of the page.
 * @param {Function} callback - The function to call when more items should be loaded.
 * @param {number} threshold - Distance from the bottom (in pixels) to trigger the callback.
 */
export function setupInfiniteScroll(callback, threshold = 100) {
  let isThrottled = false;

  const handleScroll = () => {
    if (isThrottled) return;

    isThrottled = true;

    // Use requestAnimationFrame for smooth performance
    requestAnimationFrame(() => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - threshold) {
        callback();
      }
      isThrottled = false;
    });
  };

  window.addEventListener("scroll", handleScroll);

  // Return a cleanup function
  return () => window.removeEventListener("scroll", handleScroll);
}
