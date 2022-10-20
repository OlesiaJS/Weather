const axios = require('axios');
exports.handler = async (event, context) => {
    let response;
    const API_ENDPOINT = 'https://maps.googleapis.com/maps/api/place/photo?photoreference=AcYSjRgMZ1a8ip3S9UGULT0pGoRYB5T-WGU8Kb0JOomReFeKfzAM2uAhDy_myDzjT36bz9-AGPrGq6W5YZz50C0i4vWS4XYpakrnQx103UAkYOgoGlfox4EhtrSQ01FwHjS7M8TZSGNaYGsMu6rKXGrr8kEAUj3-hro2yw2cLjTpwhohb_Iv&key=AIzaSyBIhFd5eMzeNnx1ziS1KQJ7qqPtEaty53g&maxwidth=400&maxheight=400';
    try {
        response = await axios.get(API_ENDPOINT);
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