import fs from "fs";
import { join } from "path";
import YAML from "yaml";

const recipesDirectory = join(process.cwd(), "_recipes");

export function getRecipeSlugs() {
  return fs.readdirSync(recipesDirectory);
}

export function getRecipeBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.yaml$/, "");
  const fullPath = join(recipesDirectory, `${realSlug}.yaml`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const data = YAML.parse(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });
  return items;
}

export function getAllRecipes(fields: string[] = []) {
  const slugs = getRecipeSlugs();
  const recipes = slugs
    .map((slug) => getRecipeBySlug(slug, fields))
    // sort recipe by date in descending order
    .sort((recipe1, recipe2) => (recipe1.date > recipe2.date ? -1 : 1));
  return recipes;
}
