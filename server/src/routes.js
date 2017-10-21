const AuthenticationController = require('./controller/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AthenticationControllerPolicy')

module.exports = (app) => {
  app.post('/register',
  AuthenticationControllerPolicy.register,
  AuthenticationController.register)
}
