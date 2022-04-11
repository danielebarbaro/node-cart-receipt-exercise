import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";
import { serialize } from "v8";


for(let user of users){

console.log(core.createDelimiter())
console.log("  Processing " + core.formatProductName(user.firstName) + " " + core.formatProductName(user.lastName) + " cart:");
console.log(core.createDelimiter2())

for (let cartRow of carts) {
    
   
   if (user.uuid == cartRow.user)
   cartRow.products.forEach(product => console.log("  ["
    + core.getProduct(product).ean + "]   "
    + core.formatProductName(core.getProduct(product).name) 
    + "  \t"+core.getProduct(product).price.toFixed(2) + "€"))
   
}

console.log(core.createDelimiter2())

var somma = 0;
var totscont = 0;
for (let cartRow of carts) {
   if (user.uuid == cartRow.user)
   {
      cartRow.products.forEach(product =>
      somma += core.getProduct(product).price)
      if(user.promo === undefined || user.promo.length === 0 )
         somma += 0;
      else{
      for(let promo of promoCode)
         totscont = core.discountedPrice(somma,core.getUserDiscount(user))
      }
   }
}

console.log("  Totale non scontato:\t" + somma.toFixed(2));
console.log("  Totale scontato:\t" + totscont);

console.log("\n\n")


var totcred = core.calculateWallet(user.wallet,somma);

console.log(core.createDelimiter3())
console.log(   "  " + core.formatProductName(user.firstName) 
       + " " + core.formatProductName(user.lastName) 
       + "'s remaining credit: " + core.assicuredWallet(totcred))
console.log(core.createDelimiter3())

console.log("\n\n");

}
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