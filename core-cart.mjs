import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";
import * as os from "os";

console.log('MATTEOPC');

const discountedPrice = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);

//arrow function
//const getUser = (uuid) => users.find(user => user.uuid === uuid);
const getUser = function (uuid){
    let user = users.find(user => user.uuid === uuid);
    return user;
} 

/* function getUser(uuid){
    let user = user.find
    return user;
}*/
//const getPRoduct = (productId) => products.find(product => product.ean === productId)

/*function getProduct(productId){
    let product = product.find(product => productId === product.ean);
    return product;
} funzioned ichiarativa*/

const getProduct = function (productId){
    return products.find(product => productId === product.ean)
}


const getPercentagefromPromocode = function (promoCodeName){
   if(promoCodeName !==``
    && promoCodeName !== undefined
    && promoCodeName !==null){
       
       let rate = promoCode.find(promo => promoCodeName === promo.name);
       console.log(rate)
       return rate.percentage;
    
    
    }
    
    return 0;
}

export {
    discountedPrice,
    getUser,
    getPercentagefromPromocode,
    getProduct
};