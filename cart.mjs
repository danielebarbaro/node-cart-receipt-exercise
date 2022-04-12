import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";

// Variabile che serve per numerare gli scontrini
let contatore = 0;

for (let cartRow of carts) {

    // Stringa dello scontrino
    let scontrino = ``;
    
    // Genera ricevuta
    
    const {user : cartUserUUID, products} = cartRow;
    const user = core.getUser(cartUserUUID);

    scontrino += `\n` + core.createDelimiter(`+`, `-`, 50) + `\n`;
    scontrino += `${core.printShopName()}` + `\n`;
    scontrino += `${core.getData()}` + `\n`;
    scontrino += core.createDelimiter(`*`, `-`, 50)
    scontrino += core.formatProductList(cartRow.products) + `\n`
    scontrino += core.createDelimiter(`*`, `-`, 50) + `\n`;
    scontrino += core.sumCartItem(cartRow.products) + `\n`;
    scontrino += core.createDelimiter(`+`, `-`, 50) + `\n` + `\n`;
    scontrino += core.createDelimiter(`**`, `-`, 50) + `\n`;
    scontrino += `\t` + `${user.firstName} ${user.lastName} ha un credito residuo di ${((user.wallet) - core.discountedPrice(core.getProduct(cartRow.products).price)).toFixed(2)}` + `\n`;
    scontrino += core.createDelimiter(`**`, `-`, 50) + `\n`;

    core.printReceipt(scontrino, contatore);
    contatore++;
    
}

