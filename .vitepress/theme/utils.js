export function getTags(posts) {
  let data = {}
  for (let i = 0; i < posts.length; i++) {
    const tags = posts[i].frontMatter.tags
    if (tags) {
      tags.forEach((item) => {
        if (data[item]) {
          data[item].push(posts[i])
        } else {
          data[item] = []
          data[item].push(posts[i])
        }
      })
    }
  }
  return data
}