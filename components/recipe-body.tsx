import { Ingredient } from "@/interfaces/recipes";

type Props = {
  content: string;
  excerpt: string;
  methods: string[];
  ingredients: Ingredient[];
};

const RecipeBody = ({ content, excerpt, methods, ingredients }: Props) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Paragraphs paragraphs={excerpt} />
      <Paragraphs paragraphs={content} />
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((ingredient, i) => (
          <li key={i}>
            {ingredient.amount
              ? `${ingredient.amount} ${ingredient.name}`
              : ingredient.name}
          </li>
        ))}
      </ul>

      <h3>Method</h3>
      <ol>
        {methods.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

const Paragraphs = ({ paragraphs }: { paragraphs: string }) => (
  <>
    {paragraphs.split("\n").map((paragraph, i) => (
      <p key={i}>{paragraph}</p>
    ))}
  </>
);

export default RecipeBody;
