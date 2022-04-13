import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";   /*File system*/
import * as os from "os";   /**/

const discountedPrice = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);

/*const discountedPrice = function (price, rate = 20.0){

    let result = price - ((price * rate) / 100.0);

    return result;
}*/

/*const getUser = (uuid) => users.find(user => user.uuid === uuid);*/

const getUser = function (uuid){

    let user = users.find(user => uuid === user.uuid);

    return user;
}

/*const getProduct = (productId) => products.find(product => productId === product.ean);*/

const getProduct = function(productId){

    return products.find(product => productId === product.ean);
}

const getPercentageFromPromoCode = function(promoCodeName){

    if(promoCodeName !== '' && promoCodeName !== undefined && promoCodeName !== null)
    {
        let rate = promoCode.find(item => promoCodeName === item.name);

        return rate.percentage;
    }

    return 0;
}

export {

    discountedPrice,
    getUser,
    getProduct,
    getPercentageFromPromoCode
};