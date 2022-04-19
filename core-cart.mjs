import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";
import * as os from "os";

const discountedPrice = (price, rate) => (price * (1 - rate)).toFixed(2);

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
       
       return rate.percentage;
    
    
    }
    
    return 0;
}

const delimitatore = function (apertura, simbolo, n) {

    return `${apertura} ${simbolo.repeat(n)} ${apertura}` 
}

const nomeMacchina = () => `${os.userInfo().username.toUpperCase()} Cart - ${(process.pid)} `

const oggiData = () => {
    let formatodata = {weekday: `short`, year: `numeric`, month: `short`, day: `numeric`}
    let data = new Date();
    return data.toLocaleString(`it-IT`, formatodata);
}


export {
    discountedPrice,
    getUser,
    getPercentagefromPromocode,
    getProduct,
    delimitatore,
    nomeMacchina,
    oggiData
};