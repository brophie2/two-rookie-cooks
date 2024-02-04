import DateFormatter from '../common/date-formatter'
import Link from 'next/link'
import { Paragraphs } from '../recipe/recipe-body'
import CoverImage from '../home/cover-image'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  slug: string
}

const RecipePreview = ({
  title,
  coverImage,
  date,
  excerpt,
  slug,
}: Props) => {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          as={`/recipes/${slug}`}
          href="/recipes/[slug]"
          className="hover:underline"
        >
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <Paragraphs paragraphs={excerpt} />
    </div>
  );
}

export default RecipePreview
