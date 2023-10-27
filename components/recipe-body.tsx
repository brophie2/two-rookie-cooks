import { Ingredient, Quantity } from "@/interfaces/recipes";

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
          <li key={i}>{getIngredientText(ingredient)}</li>
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

const getIngredientText = (ingredient: Ingredient): string => {
  if (ingredient.overrideText) return ingredient.overrideText;

  let quantityText = ingredient.quantity && getQuantityText(ingredient.quantity)
  let ingredientText = [
    quantityText,
    ingredient.name,
    ingredient.notes,
  ].filter(a => a);
  
  return ingredientText.join(" ")
};

const getQuantityText = (quantity: Quantity): string => {
    let quantityText = quantity.amount;
    if (quantity.unit) {
      ["g", "L"].indexOf(quantity.unit) == -1 && (quantityText += " ");
      quantityText += quantity.unit
    }

    return quantityText;
}

const Paragraphs = ({ paragraphs }: { paragraphs: string }) => (
  <>
    {paragraphs.split("\n").map((paragraph, i) => (
      <p key={i}>{paragraph}</p>
    ))}
  </>
);

export default RecipeBody;
