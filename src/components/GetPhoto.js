import axios from "axios";
import { useState } from "react";

// function GetPhoto(inputLocationName) {
//     const ApiKey = 'AIzaSyBIhFd5eMzeNnx1ziS1KQJ7qqPtEaty53g';
//     fetch('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + inputLocationName + '&key=' + ApiKey + '&inputtype=textquery&fields=name,photos')
//         .then(response => response.json())
//         .then(data => {
//             let photoRef = initialPlacesRequest?.data?.candidates?.[0]?.photos?.[0]?.photo_reference;
//         })
//         .then(photoRef => fetch('https://maps.googleapis.com/maps/api/place/photo?photoreference=' + photoRef + '&key=' + ApiKey + '&maxwidth=700&maxheight=700'))
//         .then(el => el.json())
//         .then(data => {
//             console.log(data);
//         });
//     return (
//         <div className="comparison-card-image"
//             style={{ backgroundImage: `url(${city.image})` }}
//         >
//             <img src={city.image} />
//         </div>
//     );
// };

async function GetPhoto({ city, cityChange, imgUrl }) {

    const [imageUrl, setImageUrl] = useState(' ');
    const city_state = city;
    const ApiKey = 'AIzaSyBIhFd5eMzeNnx1ziS1KQJ7qqPtEaty53g';
    const proxyUrl = "https://github.com/Rob--W/cors-anywhere/";
    const placesRequestUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${city_state}&key=${ApiKey}&inputtype=textquery&fields=name,photos`;
    console.log('ehfff');
    const initialPlacesRequest = await axios
        .get(proxyUrl + placesRequestUrl)
        .catch(console.error);
    const photoRef = initialPlacesRequest?.data?.candidates?.[0]?.photos?.[0]?.photo_reference;
    console.log(photoRef);
    if (photoRef) {
        const imageLookupURL = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef}&key=${ApiKey}&maxwidth=700&maxheight=700`;
        const imageURLQuery = await fetch(proxyUrl + imageLookupURL)
            .then(r => r.blob())
            .catch(console.error);
        const newImage = URL.createObjectURL(imageURLQuery);
        setImageUrl(newImage); //declared earlier
        cityChange(image);
    }




    return (
        <div className="comparison-card-image"
            style={{ backgroundImage: `url(${imageUrl})` }}
        >
            <img src={imageUrl} alt="" />
        </div>
    );

}




export default GetPhoto;