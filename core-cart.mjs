import {carts, products, promoCode as promoCodes, users} from "./dataset.mjs"; // Importo "promoCode" come "promoCodes" per consistenza con tutti gli altri array (carts, products, users)

import * as fs from "fs";
import * as os from "os";



// Mie funzioni

const safeSum = (a, b) => ((a * 100) + (b * 100)) / 100; // Javascript e i decimali non vanno d'accordo.
const safeSubtraction = (a, b) => ((a * 100) - (b * 100)) / 100;

const capitalize = (str) => `${str[0].toUpperCase()}${str.substring(1).toLowerCase()}`; // Prima lettera maiuscola, altre lettere minuscole.

const frame = (sideStr, centralChar, width) => `${sideStr} ${centralChar.repeat( width - ((sideStr.length * 2) + 2) )} ${sideStr}`; // Genera una linea separatrice.

const alignLeftRight = (strLeft, strRight, width) => strLeft + (" ".repeat(width-strLeft.length) + strRight).slice(-(width-strLeft.length)); // Allinea due stringhe, la prima a sinistra, la seocnda a destra e aggiunge spazi vuoti al centro fino a raggiungere una lunghezza totale uguale a "width".

const getProductByEan = (ean) => products.find(product => product.ean === ean); // Restituisce un oggetto "product" cercando all'interno di "products" in base all "ean".
const getUserByUuid = (uuid) => users.find(user => user.uuid === uuid); // Restituisce un oggetto "user" cercando all'interno di "users" in base all "uuid".
const getPromoByName = (name) => promoCodes.find(promoCode => promoCode.name === name); // Restituisce un oggetto "promoCode" cercando all'interno di "promoCodes" in base all "name".

const discountedPrice = (price, discount) => safeSubtraction(price, price * discount); // Calcola un prezzo scontato usando "safeSubtraction" ("toFixed" restituirebbe una stringa). 

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
