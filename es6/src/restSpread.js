export function totalPrice(vat, ...items) {
  let sum = 0;
  
  items.forEach((item) => {sum+= item});
  
  return sum + (sum*(vat/100));
}
