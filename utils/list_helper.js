const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  const total = blogs.reduce((accumulator, incrementor) => {
    accumulator + incrementor
  }, 0)
  return total
}

module.exports = { dummy, totalLikes }
