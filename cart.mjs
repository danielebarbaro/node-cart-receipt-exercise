import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";

for(let item of carts){
    
    let prodottiUtente = item.products;
    let user = core.getUser(item.user)
    let nomeUtente = user.firstName  +` `+ user.lastName;
    let disponibilitaUtente = user.wallet;
    let discountPromo = user.promo;
    let del1=`+`
    let del2=`*`
    let del3=`**`
    
    console.log(core.righe(del1))

    //CONTROLLO PRESENZA DI PRODOTTI NEL CARRELLO
    if (prodottiUtente<1){
        console.log(nomeUtente, `non ha prodotti nel carrello`)
        console.log(core.righe(del2))
    }
    else{
        
    //INTESTAZIONE SCONTRINO
        console.log(core.heading())
        console.log(core.righe(del2))
    //NOME UTENTE
        console.log(`${nomeUtente}\nDisponibilità: ${disponibilitaUtente}\n`)

    //CARRELLO
        let tot=0;
        for(let item of prodottiUtente){
            let prodCorrente= core.getProduct(item)
            let ean = prodCorrente.ean;
            let nomeProdotto = core.formatCart(prodCorrente)
            let prezzoProdotto = prodCorrente.price;
            let rigaRicevuta = `\t [${ean}]\t\t${nomeProdotto}\t ${prezzoProdotto}`
            
            console.log(rigaRicevuta)

            tot+=prodCorrente.price;

        }
        
        console.log(core.righe(del2))

    //TOTALE    
        console.log(`\nTotale\t\t\t\t\t\t${tot.toFixed(2)}`)
    
        
        console.log(core.righe(del1))

    //EVENTUALE SCONTO
        let rate = core.getPercentageFromPromoCode(discountPromo)
        let discountedTot = core.discountedPrice(tot,rate)
        let discount= tot-discountedTot

        if(user.promo!=undefined && user.promo!='' && user.promo!= null){
            console.log(`Sconto \t\t\t\t\t\t  ${discount.toFixed(2)}`)
            console.log(`Totale Scontato :\t\t\t\t ${discountedTot}`)
            console.log(core.righe(del1))
        }

        //CONTROLLO DISPONIBILITA' UTENTE E STAMPA DEL CREDITO RESIDUO
        let residuo= disponibilitaUtente-tot;
        let residuoPromo= disponibilitaUtente-discountedTot;

        console.log('\n')
        console.log(core.righe(del3))

        if(user.promo!=undefined && user.promo!='' && user.promo!= null)
            if(disponibilitaUtente<discount){
                console.log(nomeUtente,'ha un credito insufficiente per l\'acquisto')
            }
            else 
                console.log(`${nomeUtente} ha un credito residuo di ${residuoPromo.toFixed(2)}`)
        else{
            if(disponibilitaUtente<tot)
                console.log(nomeUtente,'ha un credito insufficiente per l\'acquisto')
            else
                console.log(`${nomeUtente} ha un credito residuo di ${residuo.toFixed(2)}`)
        }
        console.log(core.righe(del3))
    }
    
    console.log('\n\n')

}


