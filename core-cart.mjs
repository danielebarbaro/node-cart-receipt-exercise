import {carts, products, promoCode, users} from "./dataset.mjs"; 
import * as fs from "fs"; 
import * as os from "os"; 

//CALCOLA PREZZO SCONTATO
const discountedPrice = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);


//TROVA ID UTENTE
function getUser(uuid){
    let user = users.find(user => uuid === user.uuid);
    return user;
}


//TROVA ID PRODOTTO
const getProduct = (productId) => products.find(product => product.ean === productId)


//TROVA PERCENTUALE SCONTO
const getPercentageFromPromoCode = function (promoCodeName){

    if(promoCodeName !== '' 
       && promoCodeName !== undefined
       && promoCodeName !== null) {

    let rate = promoCode.find(item => promoCodeName === item.name);
    return rate.percentage;
    }
    return 0;
}


//NON LO SO
const printShopName = () => {
    const {username} = os.userInfo();
    return `${username.toUpperCase()} - Cart ${process.pid}`;
}


//ELABORA DATA
const heading = function(){
    let d = new Date()
    return d.toDateString()
}


//NON LO SO
const formatProductName = (product) => product;

const filterType = (products, type) => product;

const sumCartItem = (products) => (products);

const formatProductList = (products) => products;

const printReceipt = (content, filename) => '';

const createDelimiter = (openClose, symbol, times) => ''

const getProductByCart = (products) => products;

const getUserDiscount = () => 0;

const receiptFileName = (uuid, date) => '';


//ESPORTATORE COSTANTI
export {
    discountedPrice,
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