import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";


/*console.log(`Promo`, promoCode);
console.log(`Products`, products);
console.log(`Users`, users);
console.log(`Cart`, carts);
console.log(`Price`, price);*/
//console.log(`Discount`, core.discountedPrice(100, 0.2));

for (let cartRow of carts) {
    
    
     console.log(`riga del carrello da stampare`, cartRow)

     let prodottoUtente = cartRow.products;
     let UUIDCorrente = cartRow.user;
     let TotaleOrdine =0;
     
     
     
     let ean =``;
     let nomeProdotto=``;
     let prezzoProdotto=``;
     
     console.log(`utente corrente`, UUIDCorrente, `\n`)
     //console.log(`prodotti utente corrente`, prodottoUtente, `\n`)
     
     let user= core.getUser(UUIDCorrente);
     
     let nomeUtente = user.firstName +` `+ user.lastName;
     let disponibilitaUtente= user.wallet;
     let promoUtente = user.promo;

     
     if(prodottoUtente.length<1){
         console.log(`${nomeUtente} non ha prodotti nel carrello `)
     }


     if(disponibilitaUtente>0){
         console.log(`${nomeUtente} ha il portafoglio pieno`)
         console.log(`utente si chiama:`, nomeUtente, `\n`);
     console.log(`utente ha  disponibile`, disponibilitaUtente, ` Euro\n`);


     }else {
         console.log(`${nomeUtente} ha il portafoglio vuoto`)
     }
     
     for(let cartRow of prodottoUtente){

        let prodCorrente= core.getProduct(cartRow);
        let ean = prodCorrente.ean;
        let nomeProdotto=prodCorrente.name;
        let prezzoProdotto=prodCorrente.price;
        let rigaRicevuta = `\t[${ean}] \t\t ${nomeProdotto} \t ${prezzoProdotto}`
        console.log(rigaRicevuta, `\n`);
        TotaleOrdine-= prezzoProdotto;
     }

     if(promoUtente !== `` 
        && promoUtente !== undefined
        && promoUtente !==null){

            let rate = core.getPercentagefromPromocode(promoUtente);

     console.log(`${nomeUtente} ha ${rate} di  sconto `)
         console.log(` \t codice rpromo \t\t${nomeUtente}`);
         let discountedPriceValue = core.discountedPrice(TotaleOrdine, rate);
         console.log(`discountPriceValue`, discountedPriceValue);
     }
     if(disponibilitaUtente <= TotaleOrdine){
         console.log(`${nomeUtente} non ha abbastanza soldi`)
     }
    // genera ricevuta
}
/* 
    let cartUserUUID = cartRow.user;
    let products = cartRow.products;
    //const {user: cartUserUUID, products} = cartRow;
    const user = core.getUser(cartUserUUID);
    //const {uuid, firstName, lastName, wallet, isTeacher, promo} = user;
    const portafoglio =user.wallet;
    const name=user.firstName;
    const surname=user.lastName;
    console.log(`${name} ${surname} ha un portafoglio di ${portafoglio} euro`);
    console.log(`${name} ${surname} vorrebbe comprare`, products);
for(let curretProduct of products){
    console.log(`voglio  estrarre`, currentProduct);
    let prodotto = core.getProduct(currentProduct);
    console.log(`[${prodotto.ean}] ${prodotto.name} ${prodotto.price} `)
}
    products.forEach(product =>   {
        let prodotto = core.getProduct(product);
        console.log(`prodotto`, prodotto);
    })
   let prodottoCorrente = core.getProductByCart(productId);
    // console.log("UUID", uuid)
    // console.log("Prodotti", prodotti )*/