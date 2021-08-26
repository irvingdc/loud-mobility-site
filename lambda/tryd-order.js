const fetch = require('node-fetch')

async function generateToken() {
    let data
    try {
        let body = JSON.stringify({
            "email": process.env.GATSBY_TRYD_USER,
            "password": process.env.GATSBY_TRYD_PASSWORD
        })
        console.log("Token request body: ", body)
        let response = await fetch("https://206g8znkq6.execute-api.eu-west-2.amazonaws.com/dev/baggeddeliveryauth", {
            method: 'post',
            body,
            headers: { 'Content-Type': 'application/json' },
        })
        data = await response.json()
        console.log("Token generation response: ", data)
        if (!+data.error) {
            return data.response
        }
        else {
            throw new Error(data.errorText)
        }
    }
    catch (e) {
        console.log("ERROR: ", e)
        return null
    }
}

async function createOrder(bodyString, token) {
    let data
    try {
        let {
            name,
            email,
            phone_number,
            number_bikes,
            address,
            service
        } = JSON.parse(bodyString)
        let body = JSON.stringify({
            "customerName": name.slice(0, 35),
            "customerEmail": email.slice(0, 70),
            "customerPhone": "" + phone_number,
            "deliveryAddressName": "Address",
            "deliveryAddress": address.slice(0, 70),
            "deliveryPostCode": (address && address.split(",")[address.length - 1]) || "UNAVAILABLE",
            "numberOfItems": "" + number_bikes,
            "externalOrderId": `${service}_${new Date().getTime()}`
        })
        console.log("Order body: ", body)
        console.log("Order token: ", token)
        let response = await fetch("https://206g8znkq6.execute-api.eu-west-2.amazonaws.com/dev/deliveryplaceorderformadmin", {
            method: 'post',
            body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
        data = await response.json()
        console.log("Order creation response: ", data)
        if (!(+data.error)) {
            return data.response
        }
        else {
            throw new Error(JSON.stringify(data.errorText))
        }
    }
    catch (e) {
        console.log("ERROR: ", e)
        return null
    }
}

exports.handler = async (event, context) => {
    try {
        let token = await generateToken()
        if (token) {
            let orderCreated = await createOrder(event.body, token)
            if (!orderCreated) {
                throw new Error("Error while creating order")
            }
        }
        else {
            throw new Error("Error while getting token")
        }
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "success"
            })
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            body: JSON.stringify({
                error: err.message
            })
        }
    }
}
