import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";


/*console.log(`Promo`, promoCode);
console.log(`Products`, products);
console.log(`Users`, users);
console.log(`Cart`, carts);
console.log(`Price`, price);*/
//console.log(`Discount`, core.discountedPrice(100, 0.2));

for (let cartRow of carts) {
    
    
    // console.log(`riga del carrello da stampare`, cartRow)

     let prodottoUtente = cartRow.products;
     let UUIDCorrente = cartRow.user;
     let TotaleOrdine =0;
     
     let ean =``;
     let nomeProdotto=``;
     let prezzoProdotto=``;
     console.log(`*------------------------------------------*`);
     console.log(`utente corrente`, UUIDCorrente, `\n`)
     //console.log(`prodotti utente corrente`, prodottoUtente, `\n`)
     
     let user= core.getUser(UUIDCorrente);
     
     let nomeUtente = user.firstName +` `+ user.lastName;
     let disponibilitaUtente= user.wallet;
     let promoUtente = user.promo;

     
     if(prodottoUtente.length<1){
         console.log(`${nomeUtente} non ha prodotti nel carrello `)
         console.log(`*------------------------------------------*`);
     }


     if(disponibilitaUtente>0){
         console.log(`utente si chiama:`, nomeUtente, `\n`);
         //console.log(`${nomeUtente} ha il portafoglio pieno`)
     console.log(`utente ha  disponibile`, disponibilitaUtente, ` Euro\n`);
     console.log(`*------------------------------------------*`);


     }else {
         console.log(`${nomeUtente} ha il portafoglio vuoto`)
         console.log(`*------------------------------------------*`);
     }
     


     for(let cartRow of prodottoUtente){

        let prodCorrente= core.getProduct(cartRow);
        let ean = prodCorrente.ean;
        let nomeProdotto=prodCorrente.name;
        let prezzoProdotto=prodCorrente.price;
        let rigaRicevuta = `\t[${ean}] \t\t ${nomeProdotto} \t ${prezzoProdotto}`
        console.log(rigaRicevuta, `\n`);
        TotaleOrdine+= prezzoProdotto;
        //let discountedPriceValue = core.discountedPrice(TotaleOrdine);
        //console.log(`\t Totale`, discountedPriceValue);
     }

     if(promoUtente !== ``  && promoUtente !== undefined && promoUtente !==null){

        let rate = core.getPercentagefromPromocode(promoUtente);
        console.log(`*------------------------------------------*`);
        console.log(`${nomeUtente} ha ${rate} di  sconto `)
         console.log(` \t codice promo \t\t${nomeUtente}`);
         console.log(`*------------------------------------------*`);
         let discountedPriceValue = core.discountedPrice(TotaleOrdine);
         
         console.log(`\t Totale`, discountedPriceValue);
         console.log(`*------------------------------------------*`);
         let residuovalue= core.residuo(discountedPriceValue);
         console.log(`\t${nomeUtente} ha il credito residuo`, residuovalue);
         console.log(`*------------------------------------------*`);
     }
     if(disponibilitaUtente <= TotaleOrdine){
         console.log(`${nomeUtente} non ha abbastanza soldi`)
         console.log(`*------------------------------------------*`);
     }
    // genera ricevuta
}
