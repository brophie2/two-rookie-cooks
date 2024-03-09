import Link from "next/link";
import CoverImage from "../home/cover-image";

type Props = {
  title: string;
  slug: string;
  coverImage: string;
};

const RecipeListItem = ({ title, slug, coverImage }: Props) => {
  return (
    <div>
      <Link as={`/recipes/${slug}`} href="/recipes/[slug]">
        <div className="border rounded-lg overflow-hidden hover:shadow-xl">
          <CoverImage title={title} src={coverImage} />
          <h3 className="text-lg leading-snug mt-4 mx-4">{title}</h3>
        </div>
      </Link>
    </div>
  );
};

export default RecipeListItem;
