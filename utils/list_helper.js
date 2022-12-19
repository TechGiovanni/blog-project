const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  // console.log(blogs)
  if (blogs[0] === 0) {
    return 0
  }
  let total = 0
  blogs.forEach((blog) => {
    total += blog.likes
  })

  return total
}

const favoriteBlog = (blogs) => {
  let highestLikes = 0
  blogs.map((blog) => {
    if (highestLikes <= blog.likes) {
      highestLikes = blog.likes
    }
  })

  const highestBlog = blogs.find((blog) => highestLikes === blog.likes)

  return highestBlog
}

module.exports = { dummy, totalLikes, favoriteBlog }
