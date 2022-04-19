import {carts, products, promoCode, users} from "./dataset.mjs"; //

import * as fs from "fs"; //file system (fs)
import * as os from "os"; //sistema operativo (os)

const discountedPrice = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);

const delimiter = (symbol, dem, times) => `${symbol} ${dem.repeat(times)} ${symbol}`;

const helloWorld = (name => `Hello ${name}`);

function getUser(uuid){
    let user = users.find(user => uuid === user.uuid);
    return user;
}

const getProduct = (productId) => products.find(product => product.ean === productId);


const getPercentageFromPromoCode = function (promoCodeName){

    if(promoCodeName !== '' 
       && promoCodeName !== undefined
       && promoCodeName !== null) {

    let rate = promoCode.find(item => promoCodeName === item.name);
    return rate.percentage;
    }
    return 0;
    
    
}

const getNameFromPromoCode = function (promoCodeName){

    if(promoCodeName !== '' 
       && promoCodeName !== undefined
       && promoCodeName !== null) {

    let rate = promoCode.find(item => promoCodeName === item.name);
    return rate.name;
    }
    return 0;
    
    
}

const data = function(){
    let currentDate = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();
return console.log(`${cDay}/${cMonth}/${cYear}`);
}


const printShopName = () => {
    const {username} = os.userInfo();
    return `${username.toUpperCase()} - Cart ${process.pid}`;
}


//const formatProductName = (product) => product;

//const filterType = (products, type) => product;

//const sumCartItem = (products) => (products);

//const formatProductList = (products) => products;

//const printReceipt = (content, filename) => '';

const createDelimiter = (openClose, symbol, times) => `${openClose}${symbol.repeat(times)} ${openClose}`;

//const getProductByCart = (products) => products;

//const getUserDiscount = () => 0;

//const receiptFileName = (uuid, date) => '';

export {
    discountedPrice,
    helloWorld,
    printShopName,
    getUser,
  // formatProductName,
    //filterType,
    //sumCartItem,
    //formatProductList,
    //printReceipt,
    createDelimiter,
    //getProductByCart,
    //getUserDiscount,
    //receiptFileName,
    getProduct,
    getPercentageFromPromoCode,
    delimiter,
    getNameFromPromoCode,
    data

};