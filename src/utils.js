export function displayAmount(amount, decimals) {
  amount = amount / (10 ** decimals)
  return Math.round(amount * 100) / 100
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}