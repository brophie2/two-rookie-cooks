import Recipe from '@/interfaces/recipes'
import RecipePreview from '../recipe/recipe-preview';

type Props = {
  recipes: Recipe[];
};

const MoreStories = ({ recipes }: Props) => {
  return (
    <section>
      <h1 className="mb-8 text-2xl md:text-4xl font-bold tracking-tighter leading-tight">
        More Recipes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-x-8 gap-y-10 sm:gap-y-8 mb-32">
        {recipes.map((recipe) => (
          <RecipePreview
            key={recipe.slug}
            title={recipe.title}
            coverImage={recipe.coverImage}
            date={recipe.date}
            slug={recipe.slug}
            excerpt={recipe.excerpt}
          />
        ))}
      </div>
    </section>
  );
}

export default MoreStories
