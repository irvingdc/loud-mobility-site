import React from "react"
import * as classes from "./index.module.less"
import { Link } from "gatsby"
import plane from "images/mail.svg"

export default () => <div className={classes.container}>
    <div>
        <img src={plane} alt="Icono Avion" />
        <h1>Order Sent!</h1>
        <p>We'll contact you very soon.</p>
        <Link to="/">
            <button>Go Home</button>
        </Link>
    </div>
</div>