const axios = require('axios');

exports.handler = async (event, context) => {
    let response;
    console.log(event);
    const API_ENDPOINT = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + event.queryStringParameters?.city + '&key=AIzaSyBIhFd5eMzeNnx1ziS1KQJ7qqPtEaty53g&inputtype=textquery&fields=name,photos';
    try {
        response = await axios.get(API_ENDPOINT);
        // handle response
    } catch (err) {
        return 'Error';
    }
    return {
        statusCode: 200,
        body: JSON.stringify({
            data: response.data
        })
    };
};