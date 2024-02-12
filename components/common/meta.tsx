import Head from "next/head";

const Meta = () => {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/two-rookie-cooks-logo.webp"
      />
      <link
        rel="icon"
        type="image/webp"
        sizes="32x32"
        href="/favicon/two-rookie-cooks-logo.webp"
      />
      <link
        rel="icon"
        type="image/webp"
        sizes="16x16"
        href="/favicon/two-rookie-cooks-logo.webp"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/two-rookie-cooks-logo.webp" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta name="description" content={"two rookie cooks"} />
      {/* <meta property="og:image" content={HOME_OG_IMAGE_URL} /> */}
    </Head>
  );
};

export default Meta;
