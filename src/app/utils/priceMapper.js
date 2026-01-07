import { PRODUCT_API_MAP } from "../constants/products";

/**
 * تبدیل ID محصول به قیمت از داده‌های API
 * @param {string} productId - ID محصول
 * @param {Object} rates - داده‌های API
 * @returns {number|null} قیمت یا null
 */
export function getProductPrice(productId, rates) {
  const apiKey = PRODUCT_API_MAP[productId];
  return apiKey ? rates?.[apiKey] ?? null : null;
}

