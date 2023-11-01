const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const helper = require('../tests/test_helper')
const middleware = require('../utils/middleware')
// blogsRouter.get('/', (request, response) => {
//   Blog
//     .find({})
//     .then(blogs => {
//       response.json(blogs)
//     })
// })

// blogsRouter.post('', (request, response) => {
//   const blog = new Blog(request.body)

//   blog
//     .save()
//     .then(result => {
//       response.status(201).json(result)
//     })
// })


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1})
  response.json(blogs)
  //response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const blog = new Blog(request.body)
  const user = request.user
  blog.user = user._id
  const savedBlog = await blog.save()
  user.blog = user.blog.concat(savedBlog._id)
  await user.save()
  returnedBlog = await savedBlog.populate('user', { username: 1, name: 1})
  //console.log(returnedBlog)
  response.status(201).json(returnedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  blog.comments = blog.comments.concat(request.body.newComments)
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true})
  response.status(200).json(updatedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if ( blog.user.toString() === user.id.toString() ) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'unauthorized user' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true, runValidators: true})
  returnedBlog = await updatedBlog.populate('user', { username: 1, name: 1})
  response.status(200).json(returnedBlog)
})

module.exports = blogsRouter