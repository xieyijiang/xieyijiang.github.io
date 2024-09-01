import { globby } from 'globby'
import matter from 'gray-matter'
import fs from 'fs-extra'
// import { resolve } from 'path'

export async function getPosts(pageSize = 10) {
  const paths = await globby(['posts/**.md'])

  let posts = await Promise.all(
    paths.map(async (item) => {
      const content = await fs.readFile(item, 'utf-8')
      const { data } = matter(content)
      data.date = _convertDate(data.date)
      return {
        frontMatter: data,
        regularPath: `/${item.replace('.md', '.html')}`
      }
    })
  )
  posts.sort(_compareDate)
  return posts
}

function _convertDate(date = new Date().toString()) {
  const json_date = new Date(date).toJSON()
  return json_date.split('T')[0]
}

function _compareDate(obj1, obj2) {
  return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1
}