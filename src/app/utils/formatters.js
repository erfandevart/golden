import { PRODUCTS_WITH_THOUSAND_MULTIPLIER } from "../constants/products";

export function formatPrice(price, productId) {
  if (price === null || price === undefined) return "—";

  const finalPrice = PRODUCTS_WITH_THOUSAND_MULTIPLIER.includes(productId)
    ? price * 1000
    : price;

  return new Intl.NumberFormat("fa-IR").format(finalPrice);
}

export function getPriceUnit(productId) {
  return productId === "ounce_gold" ? "دلار" : "تومان";
}

