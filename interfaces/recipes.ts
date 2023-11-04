interface Recipe {
  slug: string;
  title: string;
  coverImage: string;
  date: string;
  ogImage: string;
  excerpt: string;
  stroy: string;
  ingredients: Ingredient[];
  method: string[];
  content: string;
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
