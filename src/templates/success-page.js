import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Nav from "components/shared/Nav";
import Success from "components/shared/Success";
import Meta from "components/shared/Meta";

export const SuccessPageTemplate = ({
  icon,
  content,
  isPreview
}) => {
  return <>
    <Nav isPreview={isPreview} />
    <Meta url="/success/" />
    <Success content={content} icon={icon} />
  </>
}

SuccessPageTemplate.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  content: PropTypes.string,
}

const SuccessPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <SuccessPageTemplate
      content={frontmatter.content}
      icon={frontmatter.icon}
    />
  )
}

SuccessPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default SuccessPage

export const pageQuery = graphql`
  query SuccessPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "success-page" } }) {
      frontmatter {
        content
        icon {
          image{
            publicURL
          }
          alt
        }
      }
    }
  }
`
