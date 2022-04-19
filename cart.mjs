import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";


/*console.log(`Promo`, promoCode);
console.log(`Products`, products);
console.log(`Users`, users);
console.log(`Cart`, carts);
console.log(`Price`, price);*/
//console.log(`Discount`, core.discountedPrice(100, 0.2));

for (let cartRow of carts) {
    
    
    let prodottoUtente = cartRow.products;
    let UUIDCorrente = cartRow.user;
    let TotaleOrdine = 0;
    let discountedPriceValue = 0;
    
    
    
    let ean =``;
    let nomeProdotto=``;
    let prezzoProdotto=``;
    
    let user= core.getUser(UUIDCorrente);
    
    let nomeUtente = user.firstName +` `+ user.lastName;
    let disponibilitaUtente = user.wallet;
    let promoUtente = user.promo;
    // genera ricevuta
    if(prodottoUtente.length<1){
        console.log(`${nomeUtente} non ha prodotti nel carrello \n`)
    }
        
    else{
         console.log(`${core.delimitatore(`+`, `-`, 50)}`)
         console.log(`${core.nomeMacchina()}`)
         console.log(`${core.oggiData()}`)
         console.log(`${core.delimitatore(`*`, `-`, 50)}\n`)         
         for(let cartRow of prodottoUtente){
             
             let prodCorrente= core.getProduct(cartRow);
             let ean = prodCorrente.ean;
             let nomeProdotto=prodCorrente.name;
             let prezzoProdotto=prodCorrente.price;
             let rigaRicevuta = `\t[${ean}] \t\t ${nomeProdotto} \t ${prezzoProdotto}`
             console.log(rigaRicevuta, `\n`);
             TotaleOrdine += prezzoProdotto;
            }
            console.log(`${core.delimitatore(`*`, `-`, 50)}`)  
            console.log(`Totale: `, TotaleOrdine.toFixed(2))
            console.log(`${core.delimitatore(`+`, `-`, 50)}`)
            
            if(promoUtente !== `` 
            && promoUtente !== undefined
            && promoUtente !== null){
                
               let rate = core.getPercentagefromPromocode(promoUtente);
               discountedPriceValue = core.discountedPrice(TotaleOrdine, rate);
               console.log(`Sconto: `, (TotaleOrdine - discountedPriceValue).toFixed(2))
               console.log(`Totale Scontato: `, discountedPriceValue);
               console.log(`\nCODICE PROMO: `, promoUtente)
               console.log(`${core.delimitatore(`+`, `-`, 50)}`)         
               console.log(`\n${core.delimitatore(`**`, `-`, 50)}`)         
               console.log(`${nomeUtente} ha un credito residuo di ${(disponibilitaUtente - discountedPriceValue).toFixed(2)}`)
               console.log(`${core.delimitatore(`**`, `-`, 50)}`)         
            }
            else{
            console.log(`\n${core.delimitatore(`**`, `-`, 50)}`)         
            console.log(`${nomeUtente} ha un credito residuo di ${(disponibilitaUtente - TotaleOrdine).toFixed(2)}`)
            console.log(`${core.delimitatore(`**`, `-`, 50)}`)         
        }
            
            console.log(`\n`)   
        }
        
    }
    