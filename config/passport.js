const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const db = require('../models')
const User = db.User
const bcrypt = require('bcryptjs')

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email'
      },
      (email, password, done) => {
        User.findOne({ where: { email } }).then(user => {
          if (!user) {
            return done(null, false, { message: '這個email沒有註冊' })
          }

          bcrypt.compare(password, user.password, (err, isMac) => {
            if (err) throw err
            if (isMac) {
              return done(null, user)
            } else {
              done(null, false, { message: 'email或密碼不正確' })
            }
          })
        })
      }
    )
  )

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName']
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ where: { email: profile._json.email } }, (err, user) => {
          if (!user) {
            const randomPassword = Math.random()
              .toString(36)
              .slice(-8)

            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(randomPassword, salt, (err, hash) => {
                const { email, name } = profile._json
                const newUser = new User({ email, name, password: hash })
                newUser
                  .save()
                  .then(user => {
                    return done(null, user)
                  })
                  .catch(err => console.log(err))
              })
            })
          } else {
            return done(null, user)
          }
        })
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findByPk(id).then(user => {
      done(null, user)
    })
  })
}
