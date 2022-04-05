import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";

/*console.log('Promo', promoCode);
console.log('Products', products);
console.log('Users', users);
console.log('Cart', carts);

console.log('Discount', core.discountedPrice(100, 0.2));*/

for (let cartRow of carts) {

    // genera ricevuta
    const { user: uuid, products} = cartRow;
    const user = core.getUser(uuid);
    core.printDelimiter(`+`, '-', 50);
    console.log(`${core.printShopName()}`);
    console.log(`${core.getDate()}`);
    core.printDelimiter(`*`, '-', 50);
    for (let item in cartRow.products){
        console.log(`   ${item.ean}    ${item.name}\t\t${item.price}`);
    }
    core.printDelimiter(`*`, '-', 50);
    console.log(`   Totale:\t\t\t${core.sumTotale(uuid)}`);
    core.printDelimiter(`*`, '-', 50);
    console.log(`\n`);
    core.printDelimiter(`**`, '-', 50);
    console.log(`   ${user.firstName} ${user.lastName} ha un credito residuo di ${user.wallet.toFixed(2)}`);
    core.printDelimiter(`**`, '-', 50);

}