const getTotalAmount = records => {
  const total = records.reduce((sum, { amount }) => sum + amount, 0)
  return total
}

module.exports = getTotalAmount
