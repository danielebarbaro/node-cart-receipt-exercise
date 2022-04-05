import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";
import * as os from "os";

const discountedPrice = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);

const printShopName = () =>  `${os.userInfo().username.toUpperCase()} - Cart ${process.pid}`;

const printDelimiter = (startFinisc, innerSymbol, n) => {
    let delimiter = "";
    delimiter += startFinisc;
    delimiter += " ";
    for (let index = 0; index < n; index++){
        delimiter += innerSymbol;
    }
    delimiter += " ";
    delimiter += startFinisc;
    console.log(delimiter);
}

const sumTotale = (uuid) => {
    products.reduce((sum, item) =>{
        if(item.uuid === uuid){
            sum += item.price;
        }        
    })
}

const getDate = () => {
    let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    let date = new Date();
    return date.toLocaleString(`it-IT`, options);
}

const formatList = (productList) => {

} 
const getUser = (uuid) => users.find(user => user.uuid === uuid);

const getProduct = (ean) => products.find(product => product.ean === ean);

export {
    discountedPrice,
    printShopName,
    getUser,
    getProduct,
    printDelimiter,
    getDate,
    sumTotale
};