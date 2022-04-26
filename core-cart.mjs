import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";
import * as os from "os";

console.log('MATTEOPC');

//const discountedPrice  = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);


const totalvalue = function (price, total){
    let result= total;
    return result+= price;
}

//arrow function
const getUser = function (uuid){
    let user = users.find(user => user.uuid === uuid);
    return user;
} 

const getProduct = function (productId){
    return products.find(product => productId === product.ean)
}


const getPercentagefromPromocode = function (promoCodeName){
    if(promoCodeName !==``
    && promoCodeName !== undefined
    && promoCodeName !==null){
        
        let rate = promoCode.find(promo => promoCodeName === promo.name);
        return rate.percentage;
    
    }
    
    return 0;
}

export {
    getUser,
    getPercentagefromPromocode,
    getProduct,
    totalvalue
//    discountedPrice,
};

