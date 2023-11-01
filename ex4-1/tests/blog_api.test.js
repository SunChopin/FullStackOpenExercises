const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')



describe('test get request', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('test uid existence', async () => {
    const blogs = await Blog.find({})
    expect(blogs[0].toJSON().id).toBeDefined();
  })
  test('token-based blog can be added', async () => {
    const newBlog = {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }

    const savedBlog = {
      id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const contents = blogsAtEnd.map(n => n.content)
    expect(blogsAtEnd).toContainEqual(savedBlog)
  },100000)

  test('token-based blog can be added', async () => {

    const newBlog = {
      title: "React",
      author: "Michael Chan",
      url: "https://reactpatterns.com/"
    }

    Token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvdCIsImlkIjoiNjQzODgzNDE3YzFmZjkyMzVmNzI2ODEyIiwiaWF0IjoxNjgxNDI1MjM1fQ.5Bzk02YkTKor2nEJcHaEpdoMRIZAafRnLHYGJ4Mb6PY'
    
    result = await api
      .post('/api/blogs')
      //.set('Authorization', Token)
      .set('Content-Type',  'application/json')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('token not found')
 
  }, 100000)

  test('missing value of likes', async () => {
    const newBlog = {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
      const blog = await Blog.findOne({_id: "5a422bc61b54a676234d17fc"})
      expect(blog.likes).toBe(0)
  }, 100000)

  test('missing value of title or url', async () => {
    const newBlog = {
      _id: "5a422bc61b54a676234d17fc",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
 
  }, 100000)

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
  
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
  
      const blogsAtEnd = await helper.blogsInDb()
  
      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )
  
      expect(blogsAtEnd).not.toContainEqual(blogToDelete)    
    })
  })
  
  describe('update of a blog', () => {
    test('succeeds with status code 200 if blog updated', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
  
      const blogNew = {
        likes: 57
      }
  
      // const blogReturn = {
      //   id: "5a422a851b54a676234d17f7",
      //   title: "React patterns",
      //   author: "Michael Chan",
      //   url: "https://reactpatterns.com/",
      //   likes: 57,
      //   __v: 0
      // }
  
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogNew)
        .expect(200)
  
      const blogsAtEnd = await helper.blogsInDb()
  
      console.log(blogsAtEnd[0])
  
      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length
      )
      expect(blogsAtEnd[0].likes).toBe(blogNew.likes)    
    })
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()
  
    const newUser = {
      username: 'rt',
      name: 'Superuser',
      password: 'salainen',
    }
  
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    //expect(result.body.error).toContain('expected `username` to be unique')
  
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
