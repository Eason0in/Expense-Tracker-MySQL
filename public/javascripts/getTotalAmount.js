const getTotalAmount = records => {
  const total = records.reduce((sum, { amount }) => sum + amount, 0).toLocaleString()
  return total
}

module.exports = getTotalAmount
