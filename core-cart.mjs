import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";
import * as os from "os";


const discountedPrice = (price, rate ) => ((price * (1 - rate))).toFixed(2);
const scontoApplicato = (prezzo, sconto) => (prezzo*(sconto*100))/100
//(100, 0.25 ) => (100 * (1 - 0.25))

const getUser = (uuid) => users.find(user => user.uuid === uuid);

const getProduct = (ean) => products.find(product => product.ean === ean);

const formatProductName = (product) => product.toLowerCase().charAt(0).toUpperCase() + product.toLowerCase().slice(1);

const filterType = (products,type) => {for( pr of products) {pr.type === type ? true : false}};

const sumCartItem = (user) => {
   var somma = 0;
for (let product of carts) {
   if (user.uuid == product.user)
   {
      product.products.forEach(prodo =>
      somma += getProduct(prodo).price)
   }
}
return somma;
}

const createDelimiter = (openClose, symbol, times) => '+ ' + '-'.repeat(50) + ' +';
const createDelimiter2 = (openClose, symbol, times) => '* ' + '-'.repeat(50) + ' *';
const createDelimiter3 = (openClose, symbol, times) => '** ' + '-'.repeat(50) + ' **';

const calculateWallet = (wallet, totale) => wallet - totale;
const assicuredWallet = (tot) => tot >= 0 ? "'s remaining credit: " + tot.toFixed(2) + "€": false ;
const walletTrueFalse = (wallet,somma) => wallet-somma >= 0 ? true  :  false;

const getUserDiscount = function (promo) { 
   if(promo == '' || promo == undefined)
   return 0
   else {
      for (let codice of promoCode){
         if (codice.name === promo)
          return codice.percentage
      }
   
   }
   };

const printReceipt = (content, filename) => fs.writeFileSync(filename, content);



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
    scontoApplicato,
    walletTrueFalse,
    printReceipt,
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
