module.exports = {
  setDateFormat: (req, res, next) => {
    req.body.date = req.body.date.replace(/\-/g, '/')
    next()
  }
}
