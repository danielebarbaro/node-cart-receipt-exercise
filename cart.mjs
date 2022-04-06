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
    receiptText += core.printDelimiter(`+`, '-', 50);
    receiptText += `\n${core.printShopName()}`;
    receiptText += `\n${core.getDate()}`;
    receiptText +=`\n` + core.printDelimiter(`*`, '-', 50);
    receiptText += core.formatList(cartRow.products);
    receiptText +=`\n`+ core.printDelimiter(`*`, '-', 50);
    receiptText += `\n   Totale:${`\t`.repeat(8)}${core.sumTotale(cartRow.products, user)}`;
    receiptText += `\n` + core.printDelimiter(`*`, '-', 50);
    receiptText += `\n` + core.printPromo(cartRow.products ,user);
    receiptText += `\n`+ core.printDelimiter(`**`, '-', 50);
    receiptText += `\n   ${user.firstName} ${user.lastName} ha un credito residuo di ${((user.wallet) - core.totaleScontato(user, core.sumTotale(cartRow.products , user))).toFixed(2)}`;
    receiptText += `\n`+  core.printDelimiter(`**`, '-', 50);

    //console.log(receiptText);
    core.printReceipt(receiptText, counterCart);
    counterCart++;
}