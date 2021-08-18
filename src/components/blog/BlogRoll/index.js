import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from 'components/blog/PreviewCompatibleImage'
import * as classes from "./index.module.less"

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className={classes.container} id="blog">
        <div className={classes.content}>
          {posts &&
            posts.map(({ node: post }) => (
              <Link className={classes.block} to={post.fields.slug}>
                {post.frontmatter.featuredimage ? (
                  <div className={classes.image}>
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.frontmatter.featuredimage,
                        alt: `Featured image thumbnail for post ${post.frontmatter.title}`,
                      }}
                    />
                  </div>
                ) : null}
                <header>
                  <h5>{post.frontmatter.title}</h5>
                  <p>
                    {post.frontmatter.description}
                  </p>
                </header>
              </Link>
            ))}
        </div>
      </div>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                description
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 500, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
