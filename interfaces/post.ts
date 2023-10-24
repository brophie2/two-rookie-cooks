

type PostType = {
  slug: string
  title: string
  date: string
  coverImage: string
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
  ingredients: string[]
}

export default PostType
