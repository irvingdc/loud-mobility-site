import React from "react";
import { Helmet } from "react-helmet";
import logo from "images/logo.svg";
import METADATA from "src/utils/metadata.js";
import og from "images/og.jpeg";

export default ({
  url,
  defaultTitle,
  defaultDescription,
  defaultDeaturedImage,
}) => {
  let canonical =
    "https://www.loudmobility.com" +
    url
      ?.replace("https://www.loudmobility.com", "")
      .replace("http://www.loudmobility.com", "")
      .replace("https://loudmobility.com", "")
      .replace("http://loudmobility.com", "");
  let data = METADATA[url] || {};
  let { title, description, featuredImage } = data;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{defaultTitle || title}</title>
        <link
          rel="canonical"
          href={canonical.replace(/\/\/+/g, "/").replace(/:\//g, "://")}
        />
        <meta name="description" content={defaultDescription || description} />
        <link rel="shortcut icon" href={logo} />
        <meta name="theme-color" content="#000000" />
        <html lang="en" />
        
        <meta name="twitter:card" content="summary" />

        <meta property="og:title" content={title} />
        <meta
          property="og:image"
          content={
            defaultDeaturedImage ||
            `http://www.loudmobility.netlify.app${featuredImage || og}`
          }
        />
        <meta
          property="og:image:secure_url"
          content={
            defaultDeaturedImage ||
            `https://www.loudmobility.netlify.app${featuredImage || og}`
          }
        />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
      </Helmet>
    </>
  );
};
