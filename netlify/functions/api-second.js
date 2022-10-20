const fetch = require('fetch');

exports.handler = async (event, context) => {
    console.log('event', event);
    console.log('context', context);
    let imageURLQuery;
    const API_ENDPOINT = 'https://maps.googleapis.com/maps/api/place/photo?photoreference=AcYSjRg6YhFdqulFPCkd7fKDzopmfQfgKjFQHUYM4C-BEZLaOaGArk_qT628o36_CKtZc8b5SuPtl1QKko6o0GXfktW6-gznxjQwGI3hiAiJXr5cZ0V1L_ZuCAPbnpjX3PIFmXRl5LuKPn7cJxDJYp2aFpPV5ZLbjFcC94ybvZfe2HwBGbTI&key=AIzaSyBIhFd5eMzeNnx1ziS1KQJ7qqPtEaty53g&maxwidth=700&maxheight=700';
    try {
        imageURLQuery = await fetch(API_ENDPOINT);
        console.log(response, imageURLQuery);
        // // handle response
        // .then(r => r.blob())
        // .catch(console.error);
    } catch (err) {
        return 'Error';
    }
    return {
        statusCode: 200,
        body: JSON.stringify({
            data: imageURLQuery.data
        })
    };
};