import React from "react"
import * as classes from "./index.module.less"
import Layout from "components/shared/Layout"
import logo from "images/logo.svg"
import { Link } from "gatsby"

export default () => {
    return <Layout>
        <nav className={classes.flex}>
            <Link to="/">
                <img src={logo} alt="Logo" />
            </Link>
            <ul>
                <li>
                    <Link to="/#services">Services</Link>
                </li>
                <li><Link to="/#booking">Booking</Link></li>
                <li><Link to="/#blog">Blog</Link></li>
            </ul>
        </nav>
    </Layout>
}