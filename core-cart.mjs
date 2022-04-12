import {carts, products, promoCode, users} from "./dataset.mjs"; //

import * as fs from "fs"; 
import * as os from "os"; 

const discountedPrice = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);

const helloWorld = (name => `Hello ${name}`);

function getUser(uuid){
    let user = users.find(user => uuid === user.uuid);
    return user;
}

const getProduct = (productId) => products.find(product => product.ean === productId)

const getPercentageFromPromoCode = function (promoCodeName){

    if(promoCodeName !== '' 
       && promoCodeName !== undefined
       && promoCodeName !== null) {

    let rate = promoCode.find(item => promoCodeName === item.name);
    return rate.percentage;
    }
    return 0;
    
    
}
const printShopName = () => {
    const {username} = os.userInfo();
    return `${username.toUpperCase()} - Cart ${process.pid}`;
}


const formatProductName = (product) => product;

const filterType = (products, type) => product;

const sumCartItem = (products) => (products);

const formatProductList = (products) => products;

const printReceipt = (content, filename) => '';

const createDelimiter = (openClose, symbol, times) => ''

const getProductByCart = (products) => products;

const getUserDiscount = () => 0;

const receiptFileName = (uuid, date) => '';

export {
    discountedPrice,
    helloWorld,
    printShopName,
    getUser,
    formatProductName,
    filterType,
    sumCartItem,
    formatProductList,
    printReceipt,
    createDelimiter,
    getProductByCart,
    getUserDiscount,
    receiptFileName,
    getProduct,
    getPercentageFromPromoCode
};