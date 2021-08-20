import React from "react"
import * as classes from "./index.module.less"
import Layout from "components/shared/Layout"
import logo from "images/logo.svg"
import { Link } from "gatsby"



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

      render={(data, count) => <Layout>
        {console.log("footer_data:",data)} 
        <footer className={classes.footerNav}>
            <ul>
                <li><Link to="/#team">Meet the team</Link></li>
                <li><Link to="/#terms">Terms and Condition</Link></li>
                <li><Link to="/#insurance">Insurance</Link></li>
                <li><a target="_blank" href="mailto:info@loudmobility.com">Contact Us</a></li>
            </ul>
        </footer>


        <div className={classes.flex}>
            <div>Loud Mobility Ltd. 2021</div>
            <Link to="/">
                <img src={logo} alt="Logo" />
            </Link>
        </div>
        
    </Layout>}
    />
  )
  