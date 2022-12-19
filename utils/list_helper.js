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

module.exports = { dummy, totalLikes }
