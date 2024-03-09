import DateFormatter from "../common/date-formatter";
import CoverImage from "../home/cover-image";
import RecipeTitle from "./recipe-title";

type Props = {
  title: string;
  coverImage: string;
  date: string;
};

const RecipeHeader = ({ title, coverImage, date }: Props) => {
  return (
    <>
      <RecipeTitle>{title}</RecipeTitle>
      <div className="flex justify-center items-center">
        <div className="max-w-2xl mb-8 md:mb-16 sm:mx-0 w-168">
          <CoverImage title={title} src={coverImage} />
        </div>
      </div>

      <div className="mx-auto">
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
};

export default RecipeHeader;
