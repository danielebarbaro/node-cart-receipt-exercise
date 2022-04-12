import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";

//console.log('Promo', promoCode);
//console.log('Products', products);
//console.log('Users', users);
//console.log('Cart', carts);

//console.log('Discount', core.discountedPrice(100, 0.2));

for (let cartRow of carts) {


    let UUIDCorrente=cartRow.user;
    let prodottiUtente=cartRow.products;
    //console.log(UUIDCorrente);
    // genera ricevuta
    
    let user = core.getUser(cartRow.user);



    console.log(user,'\n');
    console.log(prodottiUtente,'\n');
    
}

