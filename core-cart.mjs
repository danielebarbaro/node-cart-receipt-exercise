import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";
import * as os from "os";


const discountedPrice = (price, rate = 0.10 ) => (price * (1 - rate)).toFixed(2);
const discountedPrice2 = (price, rate = 0.10 ) => (price * rate).toFixed(2);
//(price, rate ) => (price * (1 - rate))

const getUser = (uuid) => users.find(user => user.uuid === uuid);

const getProduct = (ean) => products.find(product => product.ean === ean);

const formatProductName = (product) => product.toLowerCase().charAt(0).toUpperCase() + product.toLowerCase().slice(1);

const filterType = (products,type) => {for( pr of products) {pr.type === type ? true : false}};

const sumCartItem = (user) => {
   var somma = 0;
for (let cartRow of carts) {
   if (user.uuid == cartRow.user)
   {
      cartRow.products.forEach(product =>
      somma += core.getProduct(product).price)
   }
}
return somma;
}

const createDelimiter = (openClose, symbol, times) => '+ -------------------------------------------------- +';
const createDelimiter2 = (openClose, symbol, times) => '* -------------------------------------------------- *';
const createDelimiter3 = (openClose, symbol, times) => '** -------------------------------------------------- **';

const calculateWallet = (wallet, totale) => wallet - totale;
const assicuredWallet = (tot) => tot >= 0 ? "'s remaining credit: " + tot.toFixed(2) + "€":' has not enough money for this order' ;

const getUserDiscount = function (promo) {
   if(promo == '' || promo == undefined)
   return 0
   else{
    users.find(promo => promo === promoCode.name) 
   return promoCode.percentage
   }
   };




export {
    discountedPrice,
    getUser,
    getProduct,
    formatProductName,
    filterType,
    sumCartItem,
    createDelimiter,
    createDelimiter2,
    createDelimiter3,
    calculateWallet,
    getUserDiscount,
    assicuredWallet,
    discountedPrice2,
};

/*
    + -------------------------------------------------- +
    NOMEMACCHINA Cart - 43874
    Mon Apr 04 2022
    * -------------------------------------------------- *
       [120193]    Alpi 		    22.10
       [812302]    Firenze 		    9.99
       [912301]    Roma 		    9.99
       [912303]    Pisa 		    9.99
    * -------------------------------------------------- *
       Totale: 			  52.07
    + -------------------------------------------------- +
    
    ** -------------------------------------------------- **
       Winston Wolf ha un credito residuo di 15.25
    ** -------------------------------------------------- **
*/
