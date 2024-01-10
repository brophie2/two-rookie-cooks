import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import Container from "../../components/container";
import Header from "../../components/header";
import Layout from "../../components/layout";
import RecipeBody from "../../components/recipe-body";
import RecipeHeader from "../../components/recipe-header";
import RecipeTitle from "../../components/recipe-title";
import { getAllRecipes, getRecipeBySlug } from "../../lib/api";
import Recipe from "@/interfaces/recipes";
import { useEffect } from "react";

type Props = {
  recipe: Recipe;
};

export default function Recipe({ recipe }: Props) {
  const router = useRouter();

  if (!router.isFallback && !recipe?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  const title = `${recipe.title}`;

  useEffect(() => {
    document.title = title;  
  }, []);
  return (
    <Layout>
      <Container>
        <Header />
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
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const recipe = getRecipeBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "content",
    "ogImage",
    "coverImage",
    "ingredients",
    "excerpt",
    "method",
    "serves"
  ]);

  return {
    props: {
      recipe,
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
