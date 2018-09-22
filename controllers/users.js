const User = require('../models/user')

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body
    // check if email already exists
    const foundUser = await User.findOne({ email })
    if (foundUser) return res.status(403).json({ error: 'Email already exists' })
    // create new user
    const newUser = new User({ email, password })
    await newUser.save()
    res.status(201).json(newUser)
  },
  signIn: async (req, res, next) => {
    console.log('UsersController signin called')
  },
  secret: async (req, res, next) => {
    console.log('UsersController secret called')
  }
}
