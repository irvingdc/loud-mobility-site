import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Nav from "components/shared/Nav";
import Intro from "components/index/Intro";
import BookingCards from "components/index/BookingCards";
import BookingForm from "components/index/BookingForm";
import QuotesBlock from "components/index/QuotesBlock";
import Partners from "components/index/Partners";
import Footer from "components/shared/Footer";
import Meta from "components/shared/Meta";

export const IndexPageTemplate = ({
  title,
}) => (
  <>
    <Nav />
    <Meta url="/" />
    <Intro title={title}/>
    <BookingCards />
    <BookingForm />
    <QuotesBlock />
    <Partners />
    <Footer />
  </>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <IndexPageTemplate
      title={frontmatter.title}
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
      }
    }
  }
`
