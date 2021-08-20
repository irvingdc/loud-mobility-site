import React from "react"
import * as classes from "./index.module.less"
import Layout from "components/shared/Layout"
import logo from "images/logo.svg"
import { Link, graphql, StaticQuery } from 'gatsby'

export default () => (
    <StaticQuery
      query={graphql`
        query FooterQuery {
            allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "footer" } } }) {
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

      render={(data, count) =>  <Layout>
        {/* {console.log("footer_data:",data.allMarkdownRemark.edges[0].node.frontmatter.links)}  */}
        
        <footer className={classes.footerNav}>
            <ul>
                {data.allMarkdownRemark.edges[0].node.frontmatter.links.map(({
                    label, linkURL
                })=> <li><Link to={linkURL}>{label}</Link></li>)}
            </ul>
        </footer>

        <div className={classes.flex}>
            <div>Loud Mobility Ltd. 2021</div>
            <Link to="/">
                <img src={logo} alt="Logo" />
            </Link>
        </div>
        
    </Layout>
    }
    />
  )
  