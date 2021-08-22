import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Nav from "components/shared/Nav";
import Intro from "components/index/Intro";
import BookingCards from "components/index/BookingCards";
import BookingForm from "components/index/BookingForm";
import BlogRoll from "components/blog/BlogRoll";
import QuotesBlock from "components/index/QuotesBlock";
import Partners from "components/index/Partners";
import Footer from "components/shared/Footer";
import Meta from "components/shared/Meta";
import { scrollTo } from "src/utils/functions"

export const IndexPageTemplate = ({
  title,
  topIcons,
  partners,
  testimonials,
  packages,
  isPreview
}) => {
  let [service, setService] = useState(null)

  let handleServiceChange = val => {
    console.log("handleServiceChange", val)
    setService(val)
    scrollTo("booking")
  }
  return <>
    <Nav isPreview={isPreview} />
    <Meta url="/" />
    <Intro title={title} topIcons={topIcons} />
    <BookingCards packages={packages} setService={handleServiceChange} />
    <BookingForm service={service} setService={handleServiceChange} />
    {isPreview ? null : <BlogRoll />}
    <QuotesBlock testimonials={testimonials} />
    <Partners partners={partners} />
    {isPreview ? null : <Footer />}
  </>
}

const IconType = PropTypes.shape({
  label: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
})

const TestimonialType = PropTypes.shape({
  text: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
})

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  topIcons: PropTypes.shape({
    icon1: IconType,
    icon2: IconType,
    icon3: IconType,
    icon4: IconType,
  }),
  testimonials: PropTypes.shape({
    heading: PropTypes.string,
    testimonial1: TestimonialType,
    testimonial2: TestimonialType,
    testimonial3: TestimonialType,
  }),
  partners: PropTypes.shape({
    items: PropTypes.array,
    heading: PropTypes.string
  }),
  packages: PropTypes.shape({
    link: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    list: PropTypes.array
  })
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <IndexPageTemplate
      title={frontmatter.title}
      topIcons={frontmatter.topIcons}
      partners={frontmatter.partners}
      testimonials={frontmatter.testimonials}
      packages={frontmatter.packages}
    />
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        topIcons { 
          icon1 {
            image{
              publicURL
            }
            label
          }
          icon2 {
            image{
              publicURL
            }
            label
          }
          icon3 {
            image{
              publicURL
            }
            label
          }
          icon4 {
            image{
              publicURL
            }
            label
          }
        }

        packages{
          package1{
            bullets
            link
            name
            price
          }
          package2{
            bullets
            link
            name
            price
          }
          package3{
            bullets
            link
            name
            price
          }
        }

        testimonials { 
          heading
          testimonial1 {
            image{
              publicURL
            }
            name
            text
          }
          testimonial2 {
            image{
              publicURL
            }
            name
            text
          }
          testimonial3 {
            image{
              publicURL
            }
            name
            text
          }
        }

        partners {
          heading
          items {
            image {
              publicURL
            }
            alt
          }
        }
        
      }
    }
  }
`
