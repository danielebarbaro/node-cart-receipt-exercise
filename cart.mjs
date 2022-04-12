import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";
import { serialize } from "v8";


for(let user of users){

console.log(core.createDelimiter())
console.log("  Processing " + core.formatProductName(user.firstName) + " " + core.formatProductName(user.lastName) + " cart:");
console.log("  " + "TUE APR 12 2022");
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
      
   }
}
totscont = somma - core.discountedPrice2(somma,core.getUserDiscount(user.promo));

console.log("  Totale:\t" + somma.toFixed(2));

if(somma > 0 && core.discountedPrice2(somma,core.getUserDiscount(user.promo)) > 0){

console.log(core.createDelimiter())
   console.log("  Sconto Applicato:\t" + core.discountedPrice2(somma,core.getUserDiscount(user.promo)));
   console.log("  Totale scontato:\t" + totscont.toFixed(2));
   console.log("\n");
   if(user.promo == undefined || user.promo === '')
   console.log("");
   else{
   console.log("  CODICE PROMO:\t\t" + user.promo);
   }
console.log(core.createDelimiter()) 
console.log("\n")
}





var totcred = core.calculateWallet(user.wallet,totscont);

console.log(core.createDelimiter3())
console.log(   "  " + core.formatProductName(user.firstName) 
       + " " + core.formatProductName(user.lastName) 
       + core.assicuredWallet(totcred))
console.log(core.createDelimiter3())

console.log("\n\n\n\n");

}
/*
   + -------------------------------------------------- +
   KOALA Cart - 43874
   Mon Apr 04 2022
   * -------------------------------------------------- *
      [812302]    Firenze 		    9.99
      [912301]    Roma 		    9.99
      [912304]    Torino 		    9.99
      [912303]    Pisa 		    9.99
   * -------------------------------------------------- *
      Totale: 			           39.96

   + -------------------------------------------------- +
      Sconto: 			            9.99
      Totale Scontato: 		   29.97

      CODICE PROMO:               SPRING
   + -------------------------------------------------- +

   ** -------------------------------------------------- **
      Marsellus Wallace ha un credito residuo di 6.03
   ** -------------------------------------------------- **
*/