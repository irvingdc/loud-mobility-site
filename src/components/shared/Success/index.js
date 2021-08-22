import React from "react"
import * as classes from "./index.module.less"
import { Link } from "gatsby"
import marked from "marked"

export default ({ content, icon }) => <div className={classes.container}>
    <div>
        <img src={icon.image.publicURL || icon.image} alt={icon.alt} />
        <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        <Link to="/">
            <button>Go Home</button>
        </Link>
    </div>
</div>