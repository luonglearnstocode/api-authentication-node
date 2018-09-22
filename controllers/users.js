module.exports = {
  signUp: async (req, res, next) => {
    console.log('UsersController signup called')
  },
  signIn: async (req, res, next) => {
    console.log('UsersController signin called')
  },
  secret: async (req, res, next) => {
    console.log('UsersController secret called')
  }
}
