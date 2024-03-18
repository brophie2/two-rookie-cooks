import { IngredientList, Ingredient, Quantity } from "@/interfaces/recipes";
import RecipeVideo from "./recipe-video";

type Props = {
  title: string;
  content: string;
  excerpt: string;
  method: string[];
  ingredientLists: IngredientList[];
  serves: string;
  iframeUrl?: string;
};

const RecipeBody = ({
  title,
  content,
  excerpt,
  method,
  ingredientLists,
  serves,
  iframeUrl,
}: Props) => {
  return (
    <div className="mx-auto">
      <Paragraphs paragraphs={excerpt} />
      <Paragraphs paragraphs={content} />
      <p>{serves}</p>

      <div className="flex flex-col md:flex-row">
        {iframeUrl && (
          <div className="flex-none pb-8 md:pr-8">
            <RecipeVideo title={title} url={iframeUrl} />
          </div>
        )}

        <div>
          {ingredientLists.map((ingredientList, i) => (
            <div key={i}>
              <h3>{ingredientList.title ?? "Ingredients"}</h3>
              <ul>
                {ingredientList.ingredients.map((ingredient, ii) => (
                  <li key={ii}>{getIngredientText(ingredient)}</li>
                ))}
              </ul>
            </div>
          ))}

          <h3>Method</h3>
          <ol>
            {method.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

const getIngredientText = (ingredient: Ingredient): string => {
  if (ingredient.overrideText) return ingredient.overrideText;

  let quantityText =
    ingredient.quantity && getQuantityText(ingredient.quantity);
  let ingredientText = [quantityText, ingredient.name, ingredient.notes].filter(
    (a) => a
  );

  return ingredientText.join(" ");
};

const getQuantityText = (quantity: Quantity): string => {
  let quantityText = quantity.amount;
  if (quantity.unit) {
    ["g", "kg", "L", "ml"].indexOf(quantity.unit) == -1 &&
      (quantityText += " ");
    quantityText += quantity.unit;
  }

  return quantityText;
};

export const Paragraphs = ({ paragraphs }: { paragraphs: string }) => (
  <>
    {paragraphs.split("\n").map((paragraph, i) => (
      <p key={i}>{paragraph}</p>
    ))}
  </>
);

export default RecipeBody;
