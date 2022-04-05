import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";

/*console.log('Promo', promoCode);
console.log('Products', products);
console.log('Users', users);
console.log('Cart', carts);

console.log('Discount', core.discountedPrice(100, 0.2));*/

for (let cartRow of carts) {

    // genera ricevuta
    console.log(`\n\n`);
    const { user: uuid, products} = cartRow;
    const user = core.getUser(uuid);
    console.log(core.printDelimiter(`+`, '-', 50));
    console.log(`${core.printShopName()}`);
    console.log(`${core.getDate()}`);
    console.log(core.printDelimiter(`*`, '-', 50));
    core.formatList(cartRow.products);
    console.log(core.printDelimiter(`*`, '-', 50));
    console.log(`   Totale:\t\t\t${core.sumTotale(cartRow.products, user)}`);
    console.log(core.printDelimiter(`*`, '-', 50));
    let spesa = (user.promo !== `` || user.promo != undefined ? core.printPromo(cartRow.products ,user) : console.log(`\n`));
    console.log(core.printDelimiter(`**`, '-', 50));
    console.log(`   ${user.firstName} ${user.lastName} ha un credito residuo di ${((user.wallet) - spesa).toFixed(2)}`);
    console.log(core.printDelimiter(`**`, '-', 50));

}