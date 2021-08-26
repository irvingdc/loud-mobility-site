import React from 'react'
import * as classes from './index.module.less'
import Layout from 'components/shared/Layout'
import logo from 'images/logo.svg'
import { Link, graphql, StaticQuery } from 'gatsby'

export default ({ isPreview }) =>
  isPreview ? (
    <Layout>
      <nav className={classes.flex}>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </nav>
    </Layout>
  ) : (
    <StaticQuery
      query={graphql`
        query NavQuery {
          allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "nav" } } }
          ) {
            edges {
              node {
                id
                frontmatter {
                  links {
                    label
                    linkURL
                  }
                }
              }
            }
          }
        }
      `}
      render={(data, count) => (
        <Layout>
          <nav className={classes.flex}>
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
            <ul>
              {data.allMarkdownRemark.edges[0]?.node.frontmatter.links.map(
                ({ label, linkURL }) => (
                  <li>
                    <Link to={linkURL}>{label}</Link>
                  </li>
                )
              )}
            </ul>
          </nav>
        </Layout>
      )}
    />
  )
