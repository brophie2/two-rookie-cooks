import Container from "@/components/common/container";
import Dropdown from "@/components/common/dropdown";
import Header from "@/components/common/header";
import Layout from "@/components/common/layout";
import RecipeListItem from "@/components/recipe/recipe-list-item";
import RecipeTitle from "@/components/recipe/recipe-title";
import Recipe from "@/interfaces/recipes";
import { getAllRecipes } from "@/lib/api";
import { useRouter } from "next/router";
import React, { useState } from "react";

type Props = {
  allRecipes: Recipe[];
};

export default function AllRecipes({ allRecipes }: Props) {
  const router = useRouter();
  const [ sortedRecipes, setSortedRecipes ] = useState(allRecipes);
  const [ filterTitle, setFilterTitle ] = useState('Filter');

  const showRecipes = (
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
  );

  return (
    <>
      <Header />
      <Layout>
        <Container>
          {router.isFallback ? (
            <RecipeTitle>Loading…</RecipeTitle>
          ) : (
            <>
              <h1 className="mb-16 text-4xl font-bold tracking-tighter leading-tight">
                All Recipes
              </h1>
              <div className="pb-8">
                <Dropdown
                  title={filterTitle}
                  dropdownOptions={[
                    {
                      name: "Name (A-Z)",
                      action: () => {
                          setSortedRecipes([
                          ...allRecipes.sort((recipe1, recipe2) =>
                            recipe1.title < recipe2.title ? -1 : 1
                          ),
                        ]);
                        setFilterTitle("Name (A-Z)")
                        },
                      
                    },
                    {
                      name: "Name (Z-A)",
                      action: () => {
                          setSortedRecipes([
                            ...allRecipes.sort((recipe1, recipe2) =>
                              recipe1.title > recipe2.title ? -1 : 1
                            ),
                          ]);
                          setFilterTitle("Name (Z-A)")
                        }
                    },
                    {
                      name: "Date posted (Latest first)",
                      action: () => {
                        setSortedRecipes([
                          ...allRecipes.sort((recipe1, recipe2) =>
                            recipe1.date > recipe2.date ? -1 : 1
                          ),
                        ])
                        setFilterTitle("Date posted (Latest first)")
                      }
                    },
                    {
                      name: "Date posted (Earliest first)",
                      action: () => {
                        setSortedRecipes([
                          ...allRecipes.sort((recipe1, recipe2) =>
                            recipe1.date < recipe2.date ? -1 : 1
                          ),
                        ])
                        setFilterTitle("Date posted (Earliest first)")
                      }
                    },
                  ]}
                />
              </div>

              {showRecipes}
            </>
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
