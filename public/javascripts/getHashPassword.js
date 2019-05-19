const bcrypt = require('bcryptjs')
module.exports = initPassword => {
  const getPasswordHash = new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject(err)
      return resolve(salt)
    })
  })

  const getPasswordHash2 = salt => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(initPassword, salt, (err, hash) => {
        if (err) return reject(err)
        return resolve(hash)
      })
    })
  }

  ;(async () => {
    return await getPasswordHash2(await getPasswordHash)
  })()
}
