import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";

for (let cartRow of carts) {
    
     let prodottoutente = cartRow.products;
     let uuidcorrrente = cartRow.user;
     let totaleordine =0;
     let totscont=0;
     let residuo = 0;
     
     let ean =``;
     let nomeprodotto=``;
     let prezzoprodotto=``;
     const limite = '-';
     console.log(`\n`);
     console.log(`+ ${limite.repeat(50)}+`);  
     //console.log(`utente corrente`, uuidcorrrente, `\n`)
     const event = new Date(2022, 4, 19);
     console.log(event.toDateString());
     let user= core.getUser(uuidcorrrente);
     let nomeutente = user.firstName +` `+ user.lastName;
     let disponibilitautente= user.wallet;
     let promoutente = user.promo;
     
     if(prodottoutente.length<1)
     {
         console.log(`* ${limite.repeat(50)}*`);
         console.log(`${nomeutente} non ha prodotti nel carrello `)
         console.log(`* ${limite.repeat(50)}*`);
     }

     if(disponibilitautente>0)
     {
         console.log(`* ${limite.repeat(50)}*`);

     }else{
         console.log(`${nomeutente} ha il portafoglio vuoto`);
         console.log(`* ${limite.repeat(50)}*`);
         }
     
     for(let cartRow of prodottoutente){

        let prodcorrente= core.getProduct(cartRow);
        let ean = prodcorrente.ean;
        let nomeprodotto=prodcorrente.name;
        let prezzoprodotto=prodcorrente.price;
        let rigaRicevuta = `\t[${ean}]\t ${nomeprodotto}\t ${prezzoprodotto}`
        console.log(rigaRicevuta, `\n`);
        //totaleordine+=prezzoprodotto;
        totaleordine = core.totalvalue(prezzoprodotto, totaleordine);
        
    }
    console.log(`* ${limite.repeat(50)}*`);
    console.log(`\t Totale:\t\t`, totaleordine.toFixed(2));
    console.log(`+ ${limite.repeat(50)}+`);
    if(promoutente !== ``  && promoutente !== undefined && promoutente !==null){
        
        let rate = core.getPercentagefromPromocode(promoutente);
        totscont=totaleordine*rate;
        console.log(`Sconto: \t ${totscont.toFixed(2)}`)
        totaleordine=totaleordine-totscont;
        console.log(`Totale Scontato:\t` , totaleordine.toFixed(2));
         if(disponibilitautente <= totaleordine)
         {
             console.log(`${nomeutente} non ha abbastanza soldi`)
             console.log(`* ${limite.repeat(50)}*`);
         }else {
        
        
        console.log(`\n`);
        console.log(`CODICE PROMO: \t\t${promoutente}`);
        console.log(`+ ${limite.repeat(50)}+`);
        console.log(`** ${limite.repeat(50)}**`);
     
    }
    }
    if(disponibilitautente >= totaleordine)
    {
        residuo=disponibilitautente-totaleordine;
        console.log(`\t${nomeutente} ha un credito residuo`, residuo.toFixed(2));
        console.log(`** ${limite.repeat(50)}**`);
    }else{
         console.log(`${nomeutente} non ha abbastanza soldi`)
        console.log(`** ${limite.repeat(50)}**`);
    }
    

 }
    