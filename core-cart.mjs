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

/*const helloworld = (name => ' hello $ {name}');

const printShopName = () => {
    const {username} = os.userInfo();
    return '${name.toUpperCase()} - Cart ${process.pid}';
}
//funzioni
function nomeprodotto(product){
    const formatProductName = (product) => product;
    return formatProductName;
}
console.log(nomeprodotto, formatProductName);
function tipo(prodfuct, Type){
    const filterType = (product, Type ) => product;
    return filterType;
}
console.log(tipo, filterType);
function somma(product){
    const sumCartItem= (products) => (products);
    //ho dei dubbi per come farla
    return sumCartItem;
}
const formatProductList= (products) => products;
const printReceipt= (uuid, receipt) => {
    fs.writeFile('./receipts/${uuid}_recepit_${genDate()}.txt', receipt, err =>{
        if(err){
            console.log(err)
            return
        }
    });

};
const createDelimiter= (openClose, symbol, times) => '${openClose} ${symbol.repeat(times)} ${openClose}';
const getUserDiscount = () =>0;
const receiptFileName = (uuid, date) => '';
*/