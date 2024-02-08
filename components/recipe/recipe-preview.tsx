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
      <Link
        as={`/recipes/${slug}`}
        href="/recipes/[slug]"
    >
        <div className='border rounded-lg overflow-hidden hover:shadow-xl'>
          <div className="mb-5">
            <CoverImage title={title} src={coverImage} />
          </div>
          <div className='m-4'>
            <h3 className="text-3xl mb-3 leading-snug">
              {title}
            </h3>
            <div className="text-sm mb-4">
              <DateFormatter dateString={date} />
            </div>
            <div className='text-base'>
              <Paragraphs paragraphs={excerpt} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default RecipePreview
