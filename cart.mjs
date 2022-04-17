import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";

//console.log('Promo', promoCode);
//console.log('Products', products);
//console.log('Users', users);
//console.log('Cart', carts);

//console.log('Discount', core.discountedPrice(100, 0.2));

var dir = './receipts';

if (!core.fs.existsSync(dir)){
        core.fs.mkdirSync(dir);
    }

for (let cartRow of carts) {
/*

    let UUIDCorrente=cartRow.user;
    let prodottiUtente=cartRow.products;
    //console.log(UUIDCorrente);
    // genera ricevuta
    
    let user = core.getUser(cartRow.user);



    console.log(user,'\n');
    console.log(prodottiUtente,'\n');*/

    let user=core.getUser(cartRow.user);
    let uuid=user.uuid;
    let promo=user.promo;
    let sconto=core.getPercentageFromPromoCode(promo)
    let prodottiUtente=cartRow.products;
    let nome=user.firstName;
    let cognome=user.lastName;
    let scontoEffettivo;
    let totaleScontato;
    let rimanenza;
    let ricevuta='';



   if (prodottiUtente.length>0){
        let portafoglio=user.wallet;
        let totale=0;
        for (let oggetta of prodottiUtente){
            let oggetto=core.getProduct(oggetta);
            let prezzo=oggetto.price;
            totale=prezzo+totale;
        }
        scontoEffettivo=sconto*totale;
        totaleScontato=totale-scontoEffettivo;
        rimanenza=portafoglio-totaleScontato;




        if((portafoglio+scontoEffettivo)>totale){
            //stampa inizio

            var today  = new Date();
            var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
            const data=`${today.toLocaleDateString("en-US", options)}`;

            const dataOra=`${today.toLocaleTimeString("en-US",options)}`;
            const trattino='-';
            ricevuta+=`+${trattino.repeat(50)}+\n`
            ricevuta+=`NOMEMACCHINA Cart - 43874\n`;
            ricevuta+=`${data}\n`;
            ricevuta+=`*${trattino.repeat(50)}*\n`;

            //stampa codice, nome prodotto e prezzo
            for(let a of prodottiUtente){
                let oggetto=core.getProduct(a);
                let prezzo=oggetto.price;
                let codice=oggetto.ean;
                let nomeoggetto=oggetto.name;
                ricevuta+=core.maiuscoloParole(`[${codice}] ${nomeoggetto} ${prezzo.toFixed(2)}`);
                ricevuta+=`\n`
            }

            //stampa totale
            ricevuta+=`*${trattino.repeat(50)}*\n`;
            ricevuta+=`totale: ${totale.toFixed(2)}\n`;
            ricevuta+=`+${trattino.repeat(50)}+\n`;


            //stampa sconto e credito
            if (sconto!==0){
                ricevuta+=`Sconto: ${scontoEffettivo.toFixed(2)}\n`;
                ricevuta+=`Totale scontato: ${totaleScontato.toFixed(2)}\n`;
                ricevuta+=` \n`;
                ricevuta+=`CODICE PROMO: ${promo}\n`;
                ricevuta+=`**${trattino.repeat(50)}**\n`;
                ricevuta+=`${nome} ${cognome} ha un credito residuo ${rimanenza.toFixed(2)}\n`;
        
            }
            else{
                let rimanenza=portafoglio-totale;
                ricevuta+=`${nome} ${cognome} ha un credito residuo ${rimanenza.toFixed(2)}\n`;
            }



            ricevuta+=``;
            ricevuta+=`**${trattino.repeat(50)}**\n`;

           
            core.fs.writeFileSync(`./receipts/${uuid}_receipt_${data}.txt`,ricevuta);
        }
    }
    console.log(ricevuta);
    
}

