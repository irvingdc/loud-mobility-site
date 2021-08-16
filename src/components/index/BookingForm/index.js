import React, { useState } from "react"
import * as classes from "./index.module.less"
import Layout from "components/shared/Layout"
import Input from "components/shared/Input"
import Radio from "components/shared/Radio"
import ImageInput from "components/shared/ImageInput"
import background from "images/O.svg"

export default () => {
    let [values, setValues] = useState({
        newsletter_signup: false,
        terms_and_conditions: true,
        pickuptime: "9:00-12:00"
    });

    let [loading, setLoading] = useState(false);
    let [sent, setSent] = useState(false);
    let [validateNow, setValidateNow] = useState(false);

    let terminate = () => {
        setSent(true);
    };

    let handleChange = (value, name) => {
        setValidateNow(false);
        setValues({ ...values, [name]: value });
    };

    let handleRadioChange = item => {
        handleChange(item.value, "pickuptime")
    }

    let sendData = async (e) => {
        e.preventDefault();
        setValidateNow(true);

        /* if (
            loading ||
            !values.name ||
            !values.email ||
            !values.message ||
            !values.company_name ||
            !values.company_size
        ) {
            return false;
        }

        setLoading(true); */

        /* let data = {
            ...values,
            form: "contactForm",
        }; */
        /* fetch(`/website/leads/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "success") {
                    setLoading(false);
                    terminate();
                } else throw data;
            })
            .catch((error) => {
                console.error("Error:", error);
                setLoading(false);
                alert(
                    "An error happened, please send us an email to info@loudmobility.com"
                );
            }); */
    };

    return <div className={classes.container} id="booking">
        <h3>Revive Your Ride </h3>

        <Layout>
            <form onSubmit={e => e.preventDefault()}>
                <div className={classes.smallInputContainer}>
                    <Input
                        placeholder="CHOOSE YOUR SERVICE"
                        onChange={handleChange}
                        label="Service"
                        value={values["services"] == undefined ? '' : values["services"]}
                        name="services"
                        type="select"
                        options={['SOLO', 'RIDER', 'TEAM']}
                        disabled={loading || sent}
                        required
                        validateNow={validateNow}
                    />
                </div>

                <div className={classes.smallInputContainer}></div>

                <div className={classes.smallInputContainer}>
                    <Input
                        placeholder="XX"
                        onChange={handleChange}
                        label="Number of bikes"
                        value={values["number_bikes"]}
                        name="number_bikes"
                        type="number"
                        disabled={loading || sent}
                        required
                        validateNow={validateNow}
                    />
                </div>

                <div className={classes.smallInputContainer}>
                    <Input
                        placeholder="XX"
                        onChange={handleChange}
                        label="Name"
                        value={values["name"]}
                        name="name"
                        type="text"
                        disabled={loading || sent}
                        required
                        validateNow={validateNow}
                    />
                </div>

                <div className={classes.smallInputContainer}>
                    <Input
                        placeholder="XX"
                        onChange={handleChange}
                        label="Email"
                        value={values["email"]}
                        name="email"
                        type="email"
                        disabled={loading || sent}
                        required
                        validateNow={validateNow}
                    />
                </div>
                <div className={classes.smallInputContainer}>
                    <Input
                        placeholder="ENTER POSTCODE TO SEARCH"
                        onChange={handleChange}
                        label="Pick up and Drop off address*"
                        value={values["address"]}
                        name="address"
                        type="text"
                        disabled={loading || sent}
                        required
                        validateNow={validateNow}
                    />
                </div>
                <div className={classes.smallInputContainer}>
                    <span className={classes.label}>Pick Up Time</span>
                    <Radio
                        optionA={{
                            label: "9:00-12:00",
                            value: "9:00-12:00"
                        }}
                        optionB={{
                            label: "12:00-15:00",
                            value: "12:00-15:00"
                        }}
                        selectedValue={values.pickuptime}
                        onChange={handleRadioChange} />
                </div>

                <div className={classes.smallInputContainer}>
                    <ImageInput
                        onChange={handleChange}
                        label={values["image"] == undefined ? "IMAGE" : values["image"]}
                        value={values["image"]}
                        name="image"
                        type="image"
                        disabled={loading || sent}
                        required={false}
                        validateNow={validateNow}
                    />
                </div>
                <div className={classes.spaceHolder}></div>

                <div className={classes.largeInputContainer}>
                    <Input
                        onChange={handleChange}
                        label={"I've read and understand the Terms & conditions."}
                        value={values["terms_and_conditions"]}
                        name="terms_and_conditions"
                        type="checkbox"
                        disabled={loading || sent}
                        required
                        validateNow={validateNow}
                    />
                </div>

                <div className={classes.largeInputContainer}>
                    <Input
                        onChange={handleChange}
                        label={"Keep me updated with promotions and events."}
                        value={values["newsletter_signup"]}
                        name="newsletter_signup"
                        type="checkbox"
                        disabled={loading || sent}
                        required={false}
                        validateNow={validateNow}
                    />
                </div>

                <button onClick={sendData}>
                    Book Now
                </button>
            </form>

        </Layout>
        <img src={background} alt="Background Image" />
    </div>
}