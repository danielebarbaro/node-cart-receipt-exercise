import {carts, products, promoCode as promoCodes, users} from "./dataset.mjs"; // Importo "promoCode" come "promoCodes" per consistenza con tutti gli altri array (carts, products, users)

import * as fs from "fs";
import * as os from "os";



// Mie funzioni

const safeSum = (a, b) => ((a * 100) + (b * 100)) / 100; // Javascript e i decimali non vanno d'accordo.
const safeSubtraction = (a, b) => ((a * 100) - (b * 100)) / 100;

const capitalize = (str) => `${str[0].toUpperCase()}${str.substring(1).toLowerCase()}`;

const frame = (sideStr, centralChar, width) => `${sideStr} ${centralChar.repeat( width - ((sideStr.length * 2) + 2) )} ${sideStr}`;
const alignLeftRight = (strLeft, strRight, width) => strLeft + (" ".repeat(width-strLeft.length) + strRight).slice(-(width-strLeft.length));

const getProductByEan = (ean) => products.find(product => product.ean === ean);
const getUserByUuid = (uuid) => users.find(user => user.uuid === uuid);
const getPromoByName = (name) => promoCodes.find(promoCode => promoCode.name === name);


const discountedPrice = (price, discount) => safeSubtraction(price, price * discount);

//const discountedPrice = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);



// Export

export {
    safeSum,
    safeSubtraction,
    capitalize,
    frame,
    alignLeftRight,
    getProductByEan,
    getUserByUuid,
    getPromoByName,
    discountedPrice    
};
