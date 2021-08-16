import React from "react"
import * as classes from "./index.module.less"
import background from "images/D.svg"
import Card from "components/shared/Card"
import Layout from "components/shared/Layout"

export default () => {

    let book = val => {
        console.log("booking selected", val)
    }

    return <div className={classes.container} id="services">
        <Layout>
            <Card
                label="SOLO"
                price="29.99"
                list={[
                    "Single service for a single bike",
                    "Get a fair quote from a trusted partner",
                    "Hassle free fixes and maintenance"
                ]}
                onBook={book}
            />
            <Card
                label="RIDER"
                extra="(per service)"
                price="14.99"
                dark
                list={[
                    "Regular servicing to keep your bike roadworthy year-round",
                    "Keep your costs low withthis package",
                    "No need to keep booking with service reminders"
                ]}
                onBook={book}
            />
            <Card
                label="TEAM"
                extra="(per service)"
                price="18.99"
                list={[
                    "A single service for 3 or more bikes",
                    "Get fair individual quotes from a trusted partner",
                    "Hassle free fixes and maintenance for the whole team"
                ]}
                onBook={book}
            />
        </Layout>
        <img src={background} alt="Background Image" />
    </div>
}