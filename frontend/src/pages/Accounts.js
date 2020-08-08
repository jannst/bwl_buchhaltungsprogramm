import React from "react";
import { useGet } from "restful-react";

export const Accounts = (props) => {
    const { data: randomDogImage } = useGet({
        path: "https://dog.ceo/api/breeds/image/random",
    });

    return <div>
        <h1>{props.type}</h1>
        <img alt="Here's a good boye!" src={randomDogImage && randomDogImage.message} />
    </div>;
};