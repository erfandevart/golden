import { PRODUCTS_WITH_THOUSAND_MULTIPLIER } from "../constants/products";

/**
 * فرمت کردن قیمت با جداکننده هزارگان فارسی
 * @param {number|null} price - قیمت
 * @param {string} productId - ID محصول
 * @returns {string} قیمت فرمت شده
 */
export function formatPrice(price, productId) {
  if (price === null || price === undefined) return "—";

  const finalPrice = PRODUCTS_WITH_THOUSAND_MULTIPLIER.includes(productId)
    ? price * 1000
    : price;

  return new Intl.NumberFormat("fa-IR").format(finalPrice);
}

/**
 * دریافت واحد قیمت بر اساس نوع محصول
 * @param {string} productId - ID محصول
 * @returns {string} واحد قیمت
 */
export function getPriceUnit(productId) {
  return productId === "ounce_gold" ? "دلار" : "تومان";
}

