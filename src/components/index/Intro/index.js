import React, { useState } from "react"
import Radio from "../../shared/Radio"
import * as classes from "./index.module.less"
import house from "images/Home.svg"
import tool from "images/Service.svg"
import hand from "images/Booking.svg"
import Layout from "components/shared/Layout"
import { Link } from "gatsby"

const Item = ({ img, label }) =>
    <li className={classes.iconItem}>
        <div>
            <img src={img} alt={label} />
        </div>
        <h2>
            {label}
        </h2>
    </li>

export default ({ title }) => {

    let [service, setService] = useState("services")

    let handleChange = item => {
        setService(item.value)
    }

    return <div className={classes.container}>
        <h1>
            {title}
        </h1>
        <div className={classes.first}>
            <div>
                <Radio
                    selectedValue={service}
                    onChange={handleChange}
                    optionA={{ value: "services", label: <Link to="#services">Choose Service</Link> }}
                    optionB={{ value: "booking", label: <Link to="#booking">Book Now</Link> }}
                />
            </div>
        </div>
        <div className={classes.second}>
            <Layout>
                <ul>
                    <Item
                        img={hand}
                        label="Booking"
                    />
                    <Item
                        img={house}
                        label="Collection"
                    />
                    <Item
                        img={tool}
                        label="Service"
                    />
                    <Item
                        img={house}
                        label="Delivery"
                    />
                </ul>
            </Layout>
        </div>
    </div>
}