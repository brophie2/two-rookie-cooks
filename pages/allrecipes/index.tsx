import Container from '@/components/common/container';
import Header from '@/components/common/header';
import Layout from '@/components/common/layout';
import RecipeListItem from '@/components/recipe/recipe-list-item';
import RecipeTitle from '@/components/recipe/recipe-title';
import Recipe from '@/interfaces/recipes';
import { getAllRecipes } from '@/lib/api';
import { useRouter } from 'next/router';
import React from 'react'

type Props = {
    allRecipes: Recipe[];
  };

export default function index({ allRecipes }: Props) {
  const router = useRouter();
  return (
    <Layout>
      <Container>
      <Header />
      {router.isFallback ? (
          <RecipeTitle>Loading…</RecipeTitle>
        ) : (
          <div className='grid md:grid-cols-3 gap-4'>
            {allRecipes.map(recipe => 
              <RecipeListItem key={recipe.title} title={recipe.title} slug={recipe.slug} coverImage={recipe.ogImage}/>
              )}
          </div>
        )}
      </Container>
    </Layout>
  )
};

export const getStaticProps = async () => {
    const allRecipes = getAllRecipes([
      "title",
      "date",
      "slug",
      "coverImage",
      "excerpt",
      "ogImage",
    ]);

    return {
      props: { allRecipes },
    };
  };