export function currencyFormat(value: number) {
  const num = value + "";
  return "R$ " + num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
