interface Recipe {
  slug: string;
  title: string;
  coverImage: string;
  date: string;
  ogImage: string;
  excerpt: string;
  stroy: string;
  ingredients: Ingredient[];
  methods: string[];
  content: string;
}

export interface Ingredient {
    name: string;
    amount?: string;
}

export default Recipe;
