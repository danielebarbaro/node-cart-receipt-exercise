import {carts, products, promoCode as promoCodes, users} from "./dataset.mjs"; // Importo "promoCode" come "promoCodes" per consistenza con tutti gli altri array (carts, products, users)
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

const capitalize = (str) => `${str[0].toUpperCase()}${str.substring(1).toLowerCase()}`;

const header = () => `${myUsername} Cart - ${myPid}\n${new Date().toDateString()}`;

const frame = (sideStr, centralChar, width) => `${sideStr} ${centralChar.repeat( width - ((sideStr.length * 2) + 2) )} ${sideStr}`;

const alignLeftRight = (strLeft, strRight, width) => strLeft + (" ".repeat(width-strLeft.length) + strRight).slice(-(width-strLeft.length));

const formatProduct = (product) => alignLeftRight(`[${product.ean}]    ${capitalize(product.name)}`,`${product.price.toFixed(2)}    `,50);

const getProductByEan = (ean) => products.find(product => product.ean === ean);

const getUserByUuid = (uuid) => users.find(user => user.uuid === uuid);

const getPromoByName = (name) => promoCodes.find(promoCode => promoCode.name === name);

const getDiscountedPrice = (price, discount) => safeSubtraction(price, price * discount);

const checkout = function(cart) {
    
    if (cart.products.length === 0)
        throw {name : "CartEmptyError", message : "This cart is empty!"};
    
    let cartUser = getUserByUuid(cart.user);
    let cartProducts = cart.products.map(ean => getProductByEan(ean));
    
    let cartDiscount = (cartUser.promo === undefined || cartUser.promo.length === 0) ? 0 : getPromoByName(cartUser.promo).percentage; // Se promo è undefined o stringa vuota imposto lo sconto a zero, altrimenti imposto lo sconto secondo la promozione.
    
    let totalUndiscounted = cartProducts.reduce( (subtotal, product) => safeSum(subtotal, product.price), 0); // Lo zero alla fine è il valore iniziale di subtotal.
    let totalDiscounted = cartProducts.reduce( (subtotal, product) => safeSum(subtotal, getDiscountedPrice(product.price, cartDiscount)), 0); // Lo zero alla fine è il valore iniziale per subtotal.
    
    if (safeSubtraction(cartUser.wallet, totalDiscounted) < 0)
        throw {name : "BalanceTooLowError", message : "This user's balance is too low to purchase the products in their cart!"};
    
    cartUser.wallet = safeSubtraction(cartUser.wallet, totalDiscounted);
    
    
    
    // Preparare ricevuta e abbiamo quasi finito.
    
    //let receipt = {
    //    user: cartUser,
    //    products: cartProducts
    //}
        
    let receipt = [];

    receipt.push(frame("+", "-", 54));
    receipt.push(header());
    
    receipt.push(frame("*", "-", 54));
    
    cartProducts.forEach(product => receipt.push(alignLeftRight(`   [${product.ean}]    ${capitalize(product.name)}`, `${product.price.toFixed(2)}    `, 54)));
    
    receipt.push(frame("*", "-", 54));
    
    receipt.push(alignLeftRight("   Totale:", `${totalUndiscounted.toFixed(2)}    `, 54));
    
    receipt.push(frame("+", "-", 54));
    
    if (cartDiscount > 0) {
        
        receipt.push(alignLeftRight("   Sconto:", `${safeSubtraction(totalUndiscounted,totalDiscounted).toFixed(2)}    `, 54));
        receipt.push(alignLeftRight("   Totale scontato:", `${totalDiscounted.toFixed(2)}    `, 54));
        receipt.push("");
        receipt.push(alignLeftRight("   CODICE PROMO:", `${cartUser.promo.toUpperCase()}    `, 54));
        receipt.push(frame("+", "-", 54));
        
    }
    
    receipt.push("");
    
    receipt.push(frame("**", "-", 54));
    
    receipt.push(`   ${capitalize(cartUser.firstName)} ${capitalize(cartUser.lastName)} ha un credito residuo di ${cartUser.wallet.toFixed(2)}`);
    
    receipt.push(frame("**", "-", 54));
    
    return receipt.join("\n");
    
}



// Main

try {
    
    console.log(checkout(carts[1]));
    
} catch (exception) {
    
    console.log(`${exception.name}: ${exception.message}`);
    
    // Fare qualcosa se il carrello è vuoto.
    
}
