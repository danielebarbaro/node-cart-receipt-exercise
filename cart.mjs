import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";

for (let cartRow of carts) {
    
     let prodottoutente = cartRow.products;
     let uuidcorrrente = cartRow.user;
     let totaleordine =0;
     let residuo = 0;
     
     let ean =``;
     let nomeprodotto=``;
     let prezzoprodotto=``;
     const limite = '-';
     console.log(`\n`);
     console.log(`+ ${limite.repeat(35)}+`);  
     console.log(`utente corrente`, uuidcorrrente, `\n`)
     const event = new Date(2022, 4, 19);
     console.log(event.toDateString());
     let user= core.getUser(uuidcorrrente);
     let nomeutente = user.firstName +` `+ user.lastName;
     let disponibilitautente= user.wallet;
     let promoutente = user.promo;
     
     if(prodottoutente.length<1)
     {
         console.log(`* ${limite.repeat(35)}*`);
         console.log(`${nomeutente} non ha prodotti nel carrello `)
         console.log(`* ${limite.repeat(35)}*`);
     }

     if(disponibilitautente>0)
     {
         console.log(`utente si chiama:`, nomeutente, `\n`);
         console.log(`utente ha  disponibile`, disponibilitautente, ` Euro\n`);
         console.log(`* ${limite.repeat(35)}*`);

     }else{
         console.log(`${nomeutente} ha il portafoglio vuoto`);
         console.log(`* ${limite.repeat(35)}*`);
         }
     
     for(let cartRow of prodottoutente){

        let prodcorrente= core.getProduct(cartRow);
        let ean = prodcorrente.ean;
        let nomeprodotto=prodcorrente.name;
        let prezzoprodotto=prodcorrente.price;
        let rigaRicevuta = `\t[${ean}]\t ${nomeprodotto}  \t\t ${prezzoprodotto}`
        console.log(rigaRicevuta, `\n`);
        //totaleordine+=prezzoprodotto;
        totaleordine = core.totalvalue(prezzoprodotto, totaleordine);
        
    }
    
    console.log(`\t Totale`, totaleordine.toFixed(2));
    if(promoutente !== ``  && promoutente !== undefined && promoutente !==null){
        
        let rate = core.getPercentagefromPromocode(promoutente);
        console.log(`+ ${limite.repeat(35)}+`);
        console.log(`Sconto: ${rate}`)
        totaleordine=totaleordine*rate;
        console.log(`Totale Scontato:`, totaleordine);
         if(disponibilitautente <= totaleordine)
         {
             console.log(`${nomeutente} non ha abbastanza soldi`)
             console.log(`* ${limite.repeat(35)}*`);
         }else {
        
        
        console.log(`\n\n`);
        console.log(` \t codice PROMO \t\t${promoutente}`);
        console.log(`+ ${limite.repeat(35)}+`);
        console.log(`\n\n`);
        console.log(`** ${limite.repeat(35)}**`);
        residuo=disponibilitautente-totaleordine;
        console.log(`\t${nomeutente} ha un credito residuo`, residuo.toFixed(2));
        console.log(`** ${limite.repeat(35)}**`);
        
    }
    }
       residuo=disponibilitautente-totaleordine;
        console.log(`\t${nomeutente} ha un credito residuo`, residuo.toFixed(2));
        console.log(`** ${limite.repeat(35)}**`);
         console.log(`* ${limite.repeat(35)}*`);
 }
    