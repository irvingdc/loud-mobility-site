import React from "react"
import * as classes from "./index.module.less"
import Layout from "components/shared/Layout"
import logo from "images/logo.svg"
import { Link } from "gatsby"

export default () => {
    return <Layout>
        <footer className={classes.footerNav}>
            <ul>
                <li><Link to="/#team">Meet the team</Link></li>
                <li><Link to="/#terms">Terms and Condition</Link></li>
                <li><Link to="/#insurance">Insurance</Link></li>
                <li><Link to="/#contact">Contact Us</Link></li>
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