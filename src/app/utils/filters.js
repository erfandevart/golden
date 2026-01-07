import { PRODUCT_MAP } from "../constants/products";

/**
 * فیلتر کردن لیست محصولات بر اساس نوع، عیار و جستجو
 * @param {string} typeFilter - فیلتر نوع (all, gold, sekke, currency)
 * @param {string} karatFilter - فیلتر عیار (all, 18, 20, 21, 24)
 * @param {string} query - متن جستجو
 * @returns {Array} لیست فیلتر شده
 */
export function filterProducts(typeFilter, karatFilter, query) {
  return PRODUCT_MAP.filter((p) => {
    if (typeFilter !== "all" && p.kind !== typeFilter) return false;
    if (
      karatFilter !== "all" &&
      p.karat !== null &&
      String(p.karat) !== String(karatFilter)
    )
      return false;
    if (query && !p.label.includes(query)) return false;
    return true;
  });
}

