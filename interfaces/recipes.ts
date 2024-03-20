interface Recipe {
  slug: string;
  title: string;
  coverImage: string;
  date: string;
  ogImage: string;
  excerpt: string;
  stroy: string;
  ingredientLists: IngredientList[];
  method: string[];
  content: string;
  serves: string;
  iframeUrl?: string;
}

export interface IngredientList {
  title?: string; 
  ingredients: Ingredient[]
}

export interface Ingredient {
  name: string;
  quantity?: Quantity;
  notes: string;
  overrideText: string;
}

export interface Quantity {
  amount: string;
  unit?: string;
}

export default Recipe;
