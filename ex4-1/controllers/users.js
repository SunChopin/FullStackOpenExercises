const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
//const Blog = require('../models/blog')
//const helper = require('../tests/test_helper')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
      .populate('blog', { url: 1, title: 1, author: 1})
    response.json(users)
  })

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password || password.length < 3) {
    return response.status(400).json({ 
      error: 'password empty or invalid' 
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter