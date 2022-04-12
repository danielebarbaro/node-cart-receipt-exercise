import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";
import { Console } from "console";

console.log('Promo', promoCode);
console.log('Products', products);
console.log('Users', users);
console.log('Cart', carts);

console.log('Discount', core.discountedPrice(100, 0.2));

for (let cartRow of carts) {

    // genera ricevuta
    const {user:CartUserUUID, products}= cartRow;
    const user = core.getUser(cartUserUUID);

    const portafoglio=user.wallet;
    const name= user.firstName;
    const surname=user.lastName;

    console.log('${name} ${surname} ha un portafoglio di ${portafoglio} euro');
    console.log('${name} ${surname} vorrebbe comprare',products);

    for(currentProduct of products){
        console.log('Voglio estrarre', currentProduct);
        let prodotto = core.getProduct(currentProduct);
        console.log('[${prodotto.ean}] ${prodotto.name} ${prodotto.price}')
        //console.log('Prodotto estratto con nome:',prodotto.name)

    }
    console.log("Fine del nodo");
}