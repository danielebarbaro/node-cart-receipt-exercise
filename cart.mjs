import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";

/*console.log('Promo', promoCode);
console.log('Products', products);
console.log('Users', users);
console.log('Cart', carts);

console.log('Discount', core.discountedPrice(100, 0.2));*/
let counterCart = 0;
for (let cartRow of carts) {

    let receiptText = ``;
    // genera ricevuta
    //console.log(`\n\n`);
    const { user: uuid, products} = cartRow;
    const user = core.getUser(uuid);
    receiptText += core.printDelimiter(`+`, '-', 50) + `\n`;
    receiptText += `${core.printShopName()}` + `\n`;
    receiptText += `${core.getDate()}` + `\n`;
    receiptText += core.printDelimiter(`*`, '-', 50) + `\n`;
    receiptText += core.formatList(cartRow.products) + `\n`;
    receiptText += core.printDelimiter(`*`, '-', 50) + `\n`;
    receiptText += `   Totale:${`\t`.repeat(4)}${core.sumTotale(cartRow.products, user)}` + `\n`;
    receiptText +=  core.printDelimiter(`*`, '-', 50) + `\n`;
    receiptText +=  core.printPromo(cartRow.products ,user) + `\n`;
    receiptText +=  core.printDelimiter(`**`, '-', 50) + `\n`;
    receiptText += `   ${user.firstName} ${user.lastName} ha un credito residuo di ${((user.wallet) - core.totaleScontato(user, core.sumTotale(cartRow.products , user))).toFixed(2)}` + `\n`;
    receiptText +=  core.printDelimiter(`**`, '-', 50) + `\n`;

    //console.log(receiptText);
    core.printReceipt(receiptText, counterCart);
    counterCart++;
}