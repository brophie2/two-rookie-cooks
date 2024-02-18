import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  title: string
  src: string
  slug?: string
  className?: string
}

const CoverImage = ({ title, src, slug, className }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn(className ?? "shadow-sm w-full", {
        "hover:shadow-lg transition-shadow duration-200": slug,
      })}
      priority={true}
      width={1300}
      height={630}
    />
  );
  return (
    <div className="sm:mx-0 ">
      {slug ? (
        <Link
          as={`/recipes/${slug}`}
          href="/recipes/[slug]"
          aria-label={title}
          className="hover:underline"
        >
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}

export default CoverImage
