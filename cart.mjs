import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";
import { separatore } from "./core-cart.mjs";

console.log('Promo', promoCode);
console.log('Products', products);
console.log('Users', users);
console.log('Cart', carts);

console.log('Discount', core.discountedPrice(100, 0.2));

for (let cartRow of carts) { 
    console.log(separatore);
    const {user: cardUserUUID, products}=cartRow;
    const user = core.getUser(cartUserUUID);
    const portafoglio = user.wallet;
    const name = user.formatProductName.firstName;
    const surname = user.formatProductName.lastName;

    console.log(creditoResiduo(user));

    // genera ricevuta
}