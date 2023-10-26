import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-recipe";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Post from "../interfaces/post";
import Header from "@/components/header";
import Script from "next/script";

type Props = {
  allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts.find(post => post.title == "Ramen Eggs");
  const morePosts = allPosts.filter((post) => post.title != "Ramen Eggs");
  return (
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

      <Layout>
        <Container>
          <Header />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={"/assets/recipe/ramen-eggs/feature.jpg"}
              date={heroPost.date}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
