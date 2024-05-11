import {
  IngredientList,
  Ingredient,
  Quantity,
  CookingDuo,
} from "@/interfaces/recipes";
import RecipeVideo from "./recipe-video";
import { useState } from "react";

type Props = {
  title: string;
  content: string;
  excerpt: string;
  method: string[];
  ingredientLists: IngredientList[];
  serves: string;
  iframeUrl?: string;
  cookingDuo?: CookingDuo;
};

const RecipeBody = ({
  title,
  content,
  excerpt,
  method,
  ingredientLists,
  serves,
  iframeUrl,
  cookingDuo,
}: Props) => {
  const [cookingDuoMode, setCookingDuoMode] = useState<boolean>(false);
  return (
    <div className="mx-auto">
        {iframeUrl && (
          <div className="flex-none pb-8 md:pl-8 md:float-right">
            <RecipeVideo title={title} url={iframeUrl} />
          </div>
        )}

        <div>
          <Paragraphs paragraphs={excerpt} />
          <Paragraphs paragraphs={content} />
        </div>
        <p>{serves}</p>
      <div>
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

          {cookingDuo && (
            <div>
              <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center mb-8 md:mb-4">
                <h3 className="m-0">
                  {cookingDuoMode ? "Cooking Duo Mode" : "Method"}
                </h3>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mb-4 md:mb-0 rounded-md"
                  onClick={() => setCookingDuoMode(!cookingDuoMode)}
                >
                  {cookingDuoMode
                    ? "Disable Cooking Duo Mode"
                    : "Enable Cooking Duo Mode"}
                </button>
              </div>
              {cookingDuoMode && (
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <h4>Cook 1</h4>
                    <ol>
                      {cookingDuo.cook1.method.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <h4>Cook 2</h4>
                    <ol>
                      {cookingDuo.cook2.method.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          )}

          {!cookingDuoMode && (
            <>
              {!cookingDuo && <h3>Method</h3>}
              <ol>
                {method.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </>
          )}
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
