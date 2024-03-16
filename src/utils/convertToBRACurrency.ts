export function convertToBRACurrency(value: number) {
  let valueConverted = value
  if (typeof value === 'string') valueConverted = parseFloat(value)

  return Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(valueConverted)
}
