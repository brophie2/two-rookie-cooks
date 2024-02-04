import Container from "../components/common/container";
import MoreStories from "../components/home/more-stories";
import HeroRecipe from "../components/home/hero-recipe";
import Layout from "../components/common/layout";
import { getAllRecipes } from "../lib/api";
import Header from "@/components/common/header";
import Script from "next/script";
import Recipe from "@/interfaces/recipes";
import { useEffect } from "react";

type Props = {
  allRecipes: Recipe[];
};

export default function Index({ allRecipes }: Props) {
  const heroRecipe = allRecipes.find((recipe) => recipe.title == "Ramen Eggs");
  const moreRecipes = allRecipes
    .filter((recipe) => recipe.title != "Ramen Eggs")
    .slice(0, 6);

  useEffect(() => {
    document.title = "Two Rookie Cooks";
  }, []);

  return (
    <>
      <GoogleAnalytics />
      <Header allRecipes={allRecipes} />
      <Layout>
        <Container>
          {heroRecipe && (
            <HeroRecipe
              title={heroRecipe.title}
              coverImage={heroRecipe.ogImage}
              date={heroRecipe.date}
              slug={heroRecipe.slug}
              excerpt={heroRecipe.excerpt}
            />
          )}
          {moreRecipes.length > 0 && <MoreStories recipes={moreRecipes} />}
        </Container>
      </Layout>
    </>
  );
}

const GoogleAnalytics = () => (
  <>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG}`}
    />
    <Script id="google-analytics">
      {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'GA_MEASUREMENT_ID');
        `}
    </Script>
  </>
);

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
