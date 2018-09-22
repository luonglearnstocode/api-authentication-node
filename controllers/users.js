const JWT = require('jsonwebtoken')
const User = require('../models/user')
const { JWT_SECRET } = require('../config')

const signToken = user => {
  return JWT.sign({
    iss: 'authapi',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day
  }, JWT_SECRET)
}

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body

    // check if email already exists
    const foundUser = await User.findOne({ email })
    if (foundUser) return res.status(403).json({ error: 'Email already exists' })

    // create new user
    const newUser = new User({ email, password })
    await newUser.save()

    // create token
    const token = signToken(newUser)
    // respond with token
    res.status(201).json({ token })
  },
  signIn: async (req, res, next) => {
    const token = signToken(req.user) // generate token
    res.status(200).json({ token })
  },
  secret: async (req, res, next) => {
    res.json({ secret: 'resource' })
  }
}
