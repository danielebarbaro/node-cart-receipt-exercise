import {carts, products, promoCodes, users} from "./dataset.mjs"; // Cambiato promoCode al plurale
import * as core from "./core-cart.mjs";

import * as fs from "fs";
import * as os from "os";


// Costanti
const machine = os.userInfo();
const myUsername = machine.username.toUpperCase(); // Nessuno di questi valori dovrebbe poter cambiare a runtime quindi non serve ricalcolarli ogni volta
const myPid = String(process.pid);



// Funzioni

const safeSum = (a, b) => ((a * 100) + (b * 100)) / 100; // Perchè a javascript viene l'ansia a fare i conti in virgola mobile.

const safeSubtraction = (a, b) => ((a * 100) - (b * 100)) / 100;

const header = () => `${myUsername} Cart - ${myPid}\n${new Date().toDateString()}`;

const frame = (sideChar, centralChar, length) => `${sideChar} ${centralChar.repeat(length-4)} ${sideChar}`;

const formatProduct = (product) => `[${product.ean}]\t${product.name}\t\t\t${product.price}`;

const getProductByEan = (ean) => products.find(product => product.ean === ean);

const getUserByUuid = (uuid) => users.find(user => user.uuid === uuid);

const getPromoByName = (name) => promoCodes.find(promoCode => promoCode.name === name);

const getDiscountedPrice = (price, discount) => safeSubtraction(price, price * discount);

const checkout = function(cart) {
    
    if (cart.products.length === 0) throw {name : "CartEmptyError", message : "This cart is empty!"};
    
    let cartUser = getUserByUuid(cart.user);
    let cartProducts = cart.products.map(ean => getProductByEan(ean));
    
    let cartDiscount = (cartUser.promo === undefined || cartUser.promo.length === 0) ? 0 : getPromoByName(cartUser.promo).percentage;

    let totalUndiscounted = cartProducts.reduce( (subtotal, product) => safeSum(subtotal, product.price), 0); // Lo zero alla fine è il valore iniziale di subtotal.
    let totalDiscounted = cartProducts.reduce( (subtotal, product) => safeSum(subtotal, getDiscountedPrice(product.price, cartDiscount)), 0); // Lo zero alla fine è il valore iniziale per subtotal.
    
    if (safeSubtraction(cartUser.wallet, totalDiscounted) < 0) throw {name : "BalanceTooLowError", message : "This user's balance is too low to purchase the products in their cart!"};
    
    
    
    console.log(cartUser.firstName, cartDiscount, totalUndiscounted, totalDiscounted);
    
    
    
    // Calcolare il totale, lo sconto, il totale scontato e verificare se l'utente può permettersi i prodotti...
    // ...Se non può:
    //throw {name : "BalanceTooLow", message : "The user balance is too low to purchase the products in the cart!"};
    
    //let receipt = {
    //    user: getUserByUuid(cart.user),
    //    products: cart.products.map(ean => getProductByEan(ean))
    //}
    
    //return receipt;
    
}



// Main

console.log(frame("+", "-", 54));

console.log(header());

console.log(frame("*", "-", 54));

let total = 0;

for (let productEan of carts[4].products) {
    
    let product = getProductByEan(productEan);
    
    console.log("   " + formatProduct(product));
    
    total += product.price;
    
}

console.log(frame("*", "-", 54));

console.log(`   Total:\t\t\t\t${total.toFixed(2)}`);

console.log(frame("+", "-", 54));



try {
    
    checkout(carts[0]);
    
} catch (exception) {
    
    console.log(`${exception.name}: ${exception.message}`);
    
    // Fare qualcosa se il carrello è vuoto.
    
}
