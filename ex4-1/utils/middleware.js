const jwt = require('jsonwebtoken')
const User = require('../models/user')
const errorHandler = (error, request, response, next) => {
  //console.error(error.message)
  //console.error(error.name)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  // code that extracts the token
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('bearer ')) {
    request.token = authorization.replace('bearer ', '')
    // console.log(request.token)
  }

  next()
}

const userExtractor = async (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({ error: 'token not found' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(400).json({ error: 'invalid user' })
  }

  request.user = user
  next()
}

module.exports = {
  tokenExtractor, errorHandler, userExtractor
}