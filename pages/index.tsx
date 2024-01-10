import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroRecipe from "../components/hero-recipe";
import Layout from "../components/layout";
import { getAllRecipes } from "../lib/api";
import Header from "@/components/header";
import Script from "next/script";
import Recipe from "@/interfaces/recipes";
import { useEffect } from "react";

type Props = {
  allRecipes: Recipe[];
};

export default function Index({ allRecipes }: Props) {
  const heroRecipe = allRecipes.find((recipe) => recipe.title == "Ramen Eggs");
  const moreRecipes = allRecipes.filter(
    (recipe) => recipe.title != "Ramen Eggs"
  );

  useEffect(() => {
    document.title = "Two Rookie Cooks";  
  }, []);

  return (
    <>
      <GoogleAnalytics />
      <Layout>
        <Container>
          <Header />
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
