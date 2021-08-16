import React from "react";
import * as classes from "./index.module.less";
import background from "images/L.svg";
import Quote from "components/shared/Quote";
import Layout from "components/shared/Layout";

export default () => {
  return (
    <div className={classes.container}>
      <h3>Word on the street is...</h3>
      <Layout>
        <Quote
          content="Loud is such a great idea. The subscription service is going to save me a ton of hassle taking care of my road bike."
          author="Erkut - Tower Hamlets"
        />
        <Quote
          content="I love that loud are already working with my favorite bike shop. There's a real sense of community."
          author="Antony - Crouch End"
        />
        <Quote
          content="This has been a live saver for our family. Thanks for saving the bike we dug out from the garage. We are now ciclying to school every day."
          author="Kathleen - Balham"
        />
      </Layout>
      <img src={background} alt="Background Image" />
    </div>
  );
};