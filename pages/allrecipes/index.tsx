import Container from "@/components/common/container";
import Header from "@/components/common/header";
import Layout from "@/components/common/layout";
import RecipeListItem from "@/components/recipe/recipe-list-item";
import RecipeTitle from "@/components/recipe/recipe-title";
import Recipe from "@/interfaces/recipes";
import { getAllRecipes } from "@/lib/api";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  allRecipes: Recipe[];
};

export default function AllRecipes({ allRecipes }: Props) {
  const router = useRouter();
  return (
    <>
      <Header />
      <Layout>
        <Container>
          {router.isFallback ? (
            <RecipeTitle>Loading…</RecipeTitle>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-16">
              {allRecipes.map((recipe) => (
                <RecipeListItem
                  key={recipe.title}
                  title={recipe.title}
                  slug={recipe.slug}
                  coverImage={recipe.coverImage}
                />
              ))}
            </div>
          )}
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const allRecipes = getAllRecipes([
    "title",
    "date",
    "slug",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allRecipes },
  };
};
