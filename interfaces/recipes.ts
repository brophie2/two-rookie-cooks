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
  cookingDuo?: CookingDuo;
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

export interface CookingDuo {
  cook1: LabelledMethod; 
  cook2: LabelledMethod;
}

export interface LabelledMethod {
  title?: string; 
  method: string[]
}

export default Recipe;
