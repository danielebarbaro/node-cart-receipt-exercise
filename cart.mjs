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
    receiptText.concat(core.printDelimiter(`+`, '-', 50));
    receiptText.concat( `\n`, `${core.printShopName()}`);
    receiptText.concat( `\n`, `${core.getDate()}`);
    receiptText.concat( `\n`, core.printDelimiter(`*`, '-', 50));
    receiptText.concat( `\n`, core.formatList(cartRow.products));
    receiptText.concat( `\n`, core.printDelimiter(`*`, '-', 50));
    receiptText.concat( `\n`, `   Totale:\t\t\t\t${core.sumTotale(cartRow.products, user)}`);
    receiptText.concat( `\n`, core.printDelimiter(`*`, '-', 50));
    receiptText.concat(core.printPromo(cartRow.products ,user));
    receiptText.concat( `\n`, core.printDelimiter(`**`, '-', 50));
    receiptText.concat( `\n`, `   ${user.firstName} ${user.lastName} ha un credito residuo di ${((user.wallet) - core.totaleScontato(user, core.sumTotale(cartRow.products , user))).toFixed(2)}`);
    receiptText.concat( `\n`, core.printDelimiter(`**`, '-', 50));

    console.log(receiptText);
    core.printReceipt(receiptText, counterCart);
    counterCart++;
}