import React from 'react';

import {
    CardImg
} from "reactstrap";
const loadingthumbnail = require("assets/img/loading.gif");

export const LoaderGif = (reason, loaded_item) => {
    console.log((reason, loaded_item));
    
    return reason && <div style={{ width: "5rem" }} className="mx-auto text-center" >
        <CardImg top alt="loader" src={loadingthumbnail} /> {`Loading ${loaded_item}`} </div>

}