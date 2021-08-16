import React from "react";
import * as classes from "./index.module.less";
import background from "images/L.svg";
import Quote from "components/shared/Quote";
import Layout from "components/shared/Layout";

export default ({ testimonials }) => {
  return (
    <div className={classes.container}>
      <h3>{testimonials.heading}</h3>
      <Layout>
        <Quote
          content={testimonials.testimonial1.text}
          author={testimonials.testimonial1.name}
          image={testimonials.testimonial1.image}
        />
        <Quote
          content={testimonials.testimonial2.text}
          author={testimonials.testimonial2.name}
          image={testimonials.testimonial2.image}
        />
        <Quote
          content={testimonials.testimonial3.text}
          author={testimonials.testimonial3.name}
          image={testimonials.testimonial3.image}
        />
      </Layout>
      <img src={background} alt="Background Image" />
    </div>
  );
};