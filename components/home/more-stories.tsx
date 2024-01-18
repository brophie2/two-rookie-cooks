import RecipePreview from './recipe-preview'
import Recipe from '@/interfaces/recipes'

type Props = {
  recipes: Recipe[];
};

const MoreStories = ({ recipes }: Props) => {
  return (
    <section>
      <h1 className="mb-8 text-5xl font-bold tracking-tighter leading-tight">
        More Recipes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-14 lg:gap-x-20 gap-y-10 md:gap-y-10 mb-32">
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
