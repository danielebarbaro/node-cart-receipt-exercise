import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";
import { prependOnceListener } from "process";
import { Console } from "console";

console.log('Promo', promoCode);
console.log('Products', products);
console.log('Users', users);
console.log('Cart', carts);
console.log('Price', price);

console.log('Discount', core.discountedPrice(100, 0.2));

for (let cartRow of carts) {

    console.log('inizio del nodo')


    let cartUserUUID = cartRow.user;
    let products = cartRow.products;

    //const {user: cartUserUUID, products} = cartRow;
    const user = core.getUser(cartUserUUID);
    //const {uuid, firstName, lastName, wallet, isTeacher, promo} = user;
    
    const portafoglio =user.wallet;
    const name=user.firstName;
    const surname=user.lastName;

    console.log('${name} ${surname} ha un portafoglio di ${portafoglio} euro');
    console.log('${name} ${surname} vorrebbe comprare', products);
   

for(let curretProduct of products){


    console.log('voglio  estrarre', currentProduct);
    let prodotto = core.getProduct(currentProduct);
    console.log('[${prodotto.ean}] ${prodotto.name} ${prodotto.price} ')
}


console.log('fine del nodo')
    products.forEach(product =>   {

        let prodotto = core.getProduct(product);
        console.log('prodotto', prodotto);
    })
   
   let prodottoCorrente = core.getProductByCart(productId);
   


   
    // console.log("riga del carrello da stampare", cartRow)
    // console.log("UUID", uuid)
    // console.log("Prodotti", prodotti )

    // genera ricevuta




}