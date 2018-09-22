const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

// create a schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10) // generate a salt
    const passowrdHash = await bcrypt.hash(this.password, salt) // passwordHash = salt + hash
    this.password = passowrdHash // reassign hashed password over original one
    next()
  } catch (error) {
    next(error)
  }
})

userSchema.methods.isValidPassword = async function (pw) {
  try {
    return await bcrypt.compare(pw, this.password)
  } catch (error) {
    throw new Error(error)
  }
}

// create a model
const User = mongoose.model('User', userSchema)

// export the model
module.exports = User
