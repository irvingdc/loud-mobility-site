const fetch = require('node-fetch')

let API_KEY = "ak_ksdk4bsyiEE6rl63vzXtJLk5kXu4E";

exports.handler = async (event, context) => {
    let data
    try {
        const API_ENDPOINT = `https://api.ideal-postcodes.co.uk/v1/autocomplete/addresses?api_key=${API_KEY}&query=${event.queryStringParameters.query}`
        console.log("API_ENDPOINT: ", API_ENDPOINT)
        let response = await fetch(API_ENDPOINT)
        data = await response.json()
        // handle response
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            body: JSON.stringify({
                error: err.message
            })
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}