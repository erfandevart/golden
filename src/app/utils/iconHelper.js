import { PRODUCT_MAP } from "../constants/products";

export function getProductIconType(productId) {
  const product = PRODUCT_MAP.find((p) => p.id === productId);
  if (!product) return "gold";

  if (product.kind === "sekke") return "coin";
  if (product.kind === "currency") return "currency";
  return "gold";
}

