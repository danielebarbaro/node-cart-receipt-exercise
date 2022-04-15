import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";
import * as os from "os";

console.log('MATTEOPC');

const discountedPrice =  function (price) {
    let result = 0;
    for (let product of products) {
        result += product.price;
    }
    return result;
}
const residuo = function (price){
    let result = price;
    for (let product of products) {
        result -= product.price;
    }
    return result;
}
//const discountedPrice  = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);


const createDelimiter= (openClose, symbol, times) => `${openClose} ${symbol.repeat(times)} ${openClose}`;
//arrow function
//const getUser = (uuid) => users.find(user => user.uuid === uuid);
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
        console.log(rate)
        return rate.percentage;
        
    }
    
    return 0;
}
const printReceipt= (uuid, receipt) => {
    fs.writeFile('./receipts/${uuid}_recepit_${genDate()}.txt', receipt, err =>{
        if(err){
            console.log(err)
            return
        }
    });

};

export {
    getUser,
    getPercentagefromPromocode,
    getProduct,
    createDelimiter,
    printReceipt,
    discountedPrice,
    residuo
};

