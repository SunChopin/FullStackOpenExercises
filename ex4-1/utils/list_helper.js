const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
    return sum + item.likes
  }

	return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else {
    const max = blogs.reduce((a, b) => Math.max(a, b.likes), 0)
    const isMax = (element) => element.likes === max
    const indexMax = blogs.findIndex(isMax)
  
    return {
      title: blogs[indexMax].title,
      author: blogs[indexMax].author,
      likes: blogs[indexMax].likes
    }
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else {
    const returnValue = _.chain(blogs)
    .countBy('author')
    .map((number, name) => ({
      author: name,
      blogs: number
    }))
    .maxBy('blogs')
    .value()
    //console.log(returnValue)
    return returnValue
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else {
    const returnValue = _.chain(blogs)
    .groupBy('author')
    .map((value, key) => ({
      author: key,
      likes: _.sumBy(value, 'likes'),
    }))
    .maxBy('likes')
    .value()
    //console.log(returnValue)
    return returnValue
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}