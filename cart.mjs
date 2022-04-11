import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";

/*
console.log('Promo', promoCode);
console.log('Products', products);
console.log('Users', users);
console.log('Cart', carts);

console.log('Discount', core.discountedPrice(100, 0.2));
*/

let contatore = 0;

for (let cartRow of carts) {

    let scontrino = ``;
    
    // Genera ricevuta
    
    const {user : cartUserUUID, products} = cartRow;
    const user = core.getUser(cartUserUUID);

    scontrino = scontrino + core.createDelimiter(`+`, `-`, 50) + `\n`;
    scontrino = scontrino + `${core.printShopName()}` + `\n`;
    scontrino = scontrino + `${core.getData()}` + `\n`;
    scontrino = scontrino + core.createDelimiter(`*`, `-`, 50) + `\n`;
    scontrino = scontrino + core.formatProductList(cartRow.products) + `\n`
    scontrino = scontrino + core.createDelimiter(`*`, `-`, 50) + `\n`;
    scontrino = scontrino + core.sumCartItem(cartRow.products) + `\n`
    scontrino = scontrino + core.createDelimiter(`+`, `-`, 50) + `\n`;
    scontrino = scontrino + core.createDelimiter(`**`, `-`, 50) + `\n`;
    scontrino = scontrino + `${user.firstName} ${user.lastName} ha un credito residuo di ${((user.wallet) - core.discountedPrice(core.getProduct(cartRow.products).price)).toFixed(2)}` + `\n`;
    scontrino = scontrino + core.createDelimiter(`**`, `-`, 50) + `\n`;

    core.printReceipt(scontrino, contatore);
    contatore++;
    
}

