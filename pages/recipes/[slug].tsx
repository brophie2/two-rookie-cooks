import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import Container from "../../components/common/container";
import Header from "../../components/common/header";
import Layout from "../../components/common/layout";
import RecipeBody from "../../components/recipe/recipe-body";
import RecipeHeader from "../../components/recipe/recipe-header";
import RecipeTitle from "../../components/recipe/recipe-title";
import { getAllRecipes, getRecipeBySlug } from "../../lib/api";
import Recipe from "@/interfaces/recipes";
import { useEffect } from "react";

type Props = {
  recipe: Recipe;
  allRecipes: Recipe[];
};

export default function Recipe({ recipe, allRecipes }: Props) {
  const title = `${recipe.title}`;
  useEffect(() => {
    document.title = title;
  }, [title]);

  const router = useRouter();

  if (!router.isFallback && !recipe?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Header allRecipes={allRecipes} />
      <Layout>
        <Container>
          {router.isFallback ? (
            <RecipeTitle>Loading…</RecipeTitle>
          ) : (
            <>
              <article className="mb-32">
                <Head>
                  <title>{title}</title>
                  <meta property="og:image" content={recipe.ogImage} />
                </Head>
                <RecipeHeader
                  title={recipe.title}
                  coverImage={recipe.coverImage}
                  date={recipe.date}
                />
                <RecipeBody {...recipe} />
              </article>
            </>
          )}
        </Container>
      </Layout>
    </>
  );
}

type Params = {
  params: {
    slug: string;
    allRecipes: Recipe[]
  };
};

export async function getStaticProps({ params }: Params) {
  const allRecipes = getAllRecipes([
    "title",
    "date",
    "slug",
    "coverImage",
    "excerpt",
    "ogImage",
  ]);

  const recipe = getRecipeBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "content",
    "ogImage",
    "coverImage",
    "ingredientLists",
    "excerpt",
    "method",
    "serves",
  ]);

  return {
    props: {
      recipe: recipe,
      allRecipes: allRecipes
    },
  };
}

export async function getStaticPaths() {
  const recipes = getAllRecipes(["slug"]);

  return {
    paths: recipes.map((recipe) => {
      return {
        params: {
          slug: recipe.slug,
        },
      };
    }),
    fallback: false,
  };
}
