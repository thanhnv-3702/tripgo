export function formatVnd(amount: number): string {
  return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
}

export function formatRating(rating: number, reviewCount: number): string {
  return `★ ${rating.toFixed(1)} (${reviewCount})`;
}
