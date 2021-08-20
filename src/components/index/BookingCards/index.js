import React from "react"
import * as classes from "./index.module.less"
import background from "images/D.svg"
import Card from "components/shared/Card"
import Layout from "components/shared/Layout"

export default ({ packages, setService }) => {

    let { package1, package2, package3 } = packages

    let book = val => {
        console.log("booking selected", val)
        setService(val)
    }

    return <div className={classes.container} id="services">
        <Layout>
            <Card
                label={package1.name}
                price={package1.price}
                list={package1.bullets}
                link={package1.link}
                onBook={book}
            />
            <Card
                label={package2.name}
                price={package2.price}
                list={package2.bullets}
                link={package2.link}
                dark
                extra="(per service)"
                onBook={book}
            />
            <Card
                label={package3.name}
                price={package3.price}
                list={package3.bullets}
                link={package3.link}
                extra="(per service)"
                onBook={book}
            />
        </Layout>
        <img src={background} alt="Background Image" />
    </div>
}