import { PRODUCT_API_MAP } from "../constants/products";

export function getProductPrice(productId, rates) {
  const apiKey = PRODUCT_API_MAP[productId];
  return apiKey ? rates?.[apiKey] ?? null : null;
}

