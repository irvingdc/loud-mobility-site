import React, { useState } from 'react'
import * as classes from './index.module.less'
import Layout from 'components/shared/Layout'
import Input from 'components/shared/Input'
import Radio from 'components/shared/Radio'
import ImageInput from 'components/shared/ImageInput'
import background from 'images/O.svg'
import Autocomplete from '../../shared/Autocomplete/Autocomplete'

const encode = (data) => {
    const formData = new FormData()
    Object.keys(data).map((key) => {
        if (key === 'file') {
            formData.append(key, data[key], data[key].name)
        } else {
            formData.append(key, data[key])
        }
    })
    return formData
}

export default ({ service, setService }) => {
    let [values, setValues] = useState({
        newsletter_signup: false,
        terms_and_conditions: true,
        pickuptime: '9:00-12:00',
    })

    let [loading, setLoading] = useState(false)
    let [validateNow, setValidateNow] = useState(false)

    let handleChange = (value, name) => {
        setValidateNow(false)
        setValues({ ...values, [name]: value })
    }

    let handleServiceChange = (value, name) => {
        setService(value)
    }

    let handleRadioChange = (item) => {
        handleChange(item.value, 'pickuptime')
    }

    let sendData = async (e) => {
        e.preventDefault()
        setValidateNow(true)
        if (
            loading ||
            !service ||
            !values.name ||
            !values.email ||
            !values.phone_number ||
            !values.number_bikes ||
            !values.address ||
            !values.terms_and_conditions
        ) {
            return false
        }

        setLoading(true)
        try {
            let results = await Promise.all([sendEmail(), createTrydOrder()])
            console.log("RESULTS", results)
            //if (results[0] && results[1]) {
            //    console.log("should redirect")
                redirect()
            //}
            //else throw new Error("Error during requests")
        } catch (error) {
            console.log("ERROR", error.message)
            sendErrorMessage()
        }
    }

    let sendEmail = async () => {
        try {
            await fetch('/', {
                method: 'POST',
                body: encode({
                    ...values,
                    service,
                    'form-name': 'booking-form',
                }),
            })
        }
        catch (e) {
            console.log("ERROR WHILE SENDING EMAIL", e)
            return false
        }
        return true
    }

    let createTrydOrder = async () => {
        try {
            let response = await fetch('/.netlify/functions/tryd-order', {
                method: 'POST',
                body: JSON.stringify({
                    ...values,
                    service,
                }),
            })
            let data = response.json()
            if (data.message === "success") {
                return true
            }
            else {
                throw new Error("Server error")
            }
        }
        catch (e) {
            console.log("ERROR WHILE CREATING TRYD ORDER", e)
            return false
        }
    }

    let sendErrorMessage = () => {
        setLoading(false)
        alert('An error happened, please send us an email to info@loudmobility.com')
    }

    let redirect = () => {
        if (typeof window !== "undefined") {
            window.location.replace("/success")
        }
    }

    return (
        <div className={classes.container} id="booking">
            <h3>Revive Your Ride </h3>

            <Layout>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    name="booking-form"
                    data-netlify="true"
                    method="post"
                    action="/"
                >
                    <input type="hidden" name="form-name" value="booking-form" />
                    <input type="hidden" name="address" value="" />
                    <input type="hidden" name="email" value="" />
                    <input type="hidden" name="file" value="" />
                    <input type="hidden" name="name" value="" />
                    <input type="hidden" name="newsletter_signup" value="" />
                    <input type="hidden" name="number_bikes" value="" />
                    <input type="hidden" name="phone_number" value="" />
                    <input type="hidden" name="pickuptime" value="" />
                    <input type="hidden" name="service" value="" />
                    <input type="hidden" name="terms_and_conditions" value="" />
                    <div className={classes.smallInputContainer}>
                        <Input
                            placeholder="CHOOSE YOUR SERVICE"
                            onChange={handleServiceChange}
                            label="Service"
                            value={service == undefined ? '' : service}
                            name="service"
                            type="select"
                            options={['SOLO', 'RIDER', 'TEAM']}
                            disabled={loading}
                            required
                            validateNow={validateNow}
                        />
                    </div>

                    <div className={classes.smallInputContainer}>
                        <Input
                            placeholder=""
                            onChange={handleChange}
                            label="Name"
                            value={values['name']}
                            name="name"
                            type="text"
                            disabled={loading}
                            required
                            validateNow={validateNow}
                        />
                    </div>

                    <div className={classes.smallInputContainer}>
                        <Input
                            placeholder=""
                            onChange={handleChange}
                            label="Email"
                            value={values['email']}
                            name="email"
                            type="email"
                            disabled={loading}
                            required
                            validateNow={validateNow}
                        />
                    </div>

                    <div className={classes.smallInputContainer}>
                        <Input
                            placeholder=""
                            onChange={handleChange}
                            label="Phone Number"
                            value={values['phone_number']}
                            name="phone_number"
                            type="number"
                            disabled={loading}
                            required
                            validateNow={validateNow}
                        />
                    </div>

                    <div className={classes.smallInputContainer}>
                        <Input
                            placeholder=""
                            onChange={handleChange}
                            label="Number of bikes"
                            value={values['number_bikes']}
                            name="number_bikes"
                            type="number"
                            disabled={loading}
                            required
                            validateNow={validateNow}
                        />
                    </div>

                    <div className={classes.postCodeContainer}>
                        <Autocomplete
                            placeholder="ENTER POSTCODE TO SEARCH"
                            formOnChange={handleChange}
                            label="Pick up and Drop off address*"
                            value={values['address']}
                            name="address"
                            required={true}
                            validateNow={validateNow}
                            disabled={loading}
                        />
                    </div>

                    <div className={classes.smallInputContainer}>
                        <span className={classes.label}>Pick Up Time</span>
                        {/* TODO: use disabled on the Radio component */}
                        <Radio
                            optionA={{
                                label: '9:00-12:00',
                                value: '9:00-12:00',
                            }}
                            optionB={{
                                label: '12:00-15:00',
                                value: '12:00-15:00',
                            }}
                            selectedValue={values.pickuptime}
                            onChange={handleRadioChange}
                        />
                    </div>

                    <div className={classes.smallInputContainer}>
                        {/* TODO: use disabled on the ImageInput component */}
                        <ImageInput
                            onChange={handleChange}
                            name="file"
                            disabled={loading}
                        />
                    </div>
                    <div className={classes.spaceHolder}></div>

                    <div className={classes.largeInputContainer}>
                        <Input
                            onChange={handleChange}
                            // TODO: add Terms & Conditions page
                            label={"I've read and understand the Terms & Conditions."}
                            value={values['terms_and_conditions']}
                            name="terms_and_conditions"
                            type="checkbox"
                            disabled={loading}
                            required
                            validateNow={validateNow}
                        />
                    </div>

                    <div className={classes.largeInputContainer}>
                        <Input
                            onChange={handleChange}
                            label={'Keep me updated with promotions and events.'}
                            value={values['newsletter_signup']}
                            name="newsletter_signup"
                            type="checkbox"
                            disabled={loading}
                            required={false}
                            validateNow={validateNow}
                        />
                    </div>

                    <button onClick={sendData}>
                        {loading ? 'Sending...' : 'Book Now'}
                    </button>
                </form>
            </Layout>
            <img src={background} alt="Background Image" />
        </div>
    )
}
