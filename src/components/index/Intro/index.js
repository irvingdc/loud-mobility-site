import React, { useState } from "react"
import Radio from "../../shared/Radio"
import * as classes from "./index.module.less"
import Layout from "components/shared/Layout"
import marked from "marked"
import { scrollTo } from "src/utils/functions"

const Item = ({ img, label }) =>
    <li className={classes.iconItem}>
        <div>
            <img src={img} alt={label} />
        </div>
        <h2>
            {label}
        </h2>
    </li>

export default ({ title, topIcons }) => {

    let [service, setService] = useState("services")

    let handleChange = item => {
        setService(item.value)
        scrollTo(item.value)
    }

    return <div className={classes.container}>
        <div dangerouslySetInnerHTML={{ __html: marked(title) }} className={classes.title}>
        </div>
        <div className={classes.first}>
            <div>
                <Radio
                    selectedValue={service}
                    onChange={handleChange}
                    optionA={{ value: "services", label: "Choose Service" }}
                    optionB={{ value: "booking", label: "Book Now" }}
                />
            </div>
        </div>
        <div className={classes.second}>
            <Layout>
                <ul>
                    <Item
                        img={topIcons.icon1.image.publicURL || topIcons.icon1.image}
                        label={topIcons.icon1.label}
                    />
                    <Item
                        img={topIcons.icon2.image.publicURL || topIcons.icon2.image}
                        label={topIcons.icon2.label}
                    />
                    <Item
                        img={topIcons.icon3.image.publicURL || topIcons.icon3.image}
                        label={topIcons.icon3.label}
                    />
                    <Item
                        img={topIcons.icon4.image.publicURL || topIcons.icon4.image}
                        label={topIcons.icon4.label}
                    />
                </ul>
            </Layout>
        </div>
    </div>
}