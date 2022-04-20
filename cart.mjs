import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs"; //estensione può essere mjs o js per aver facilità nell'importare i dati e le funzionalità
import { printShopName } from "./core-cart.mjs";

// console.log('Promo', promoCode);
// console.log('Products', products);
// console.log('Users', users);
// console.log('Cart', carts);

//console.log('SHOP NAME: ', core.printShopName());


for (let cartRow of carts) { //quale utente appartiene questo carrelo e quali prodotti ha comprato l'utente
    

    //console.log('RIGA DEL CARRELLO DA STAMPARE', cartRow, '\n')
    let prodottiUtente = cartRow.products;
    let UUIDCorrente = cartRow.user;
    let totaleOrdine = 0;

    let ean = '';
    let nomeProdotto = '';
    let prezzoProdotto ='';
    let rigaRicevuta = '';

    console.log('\nUtente corrente', UUIDCorrente, '\n')
    let user = core.getUser(UUIDCorrente);
    //console.log('User: ',user, '\n');
    console.log(printShopName());

    const getDate = () => 
        {
            let dayFormatting = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
            let date = new Date();
            return date.toLocaleString(`it-IT`, dayFormatting);
        }

    console.log(getDate());
    

    let nomeUtente = user.firstName + ' ' + user.lastName;
    let disponibilitaUtente = user.wallet;
    let promoUtente = user.promo;

    let rate = core.getPercentageFromPromoCode(promoUtente);



    if(prodottiUtente.lenght < 1){
        console.log(`${nomeUtente} NON HA PRODOTTI NEL CARRELLO.`)
    }


    if(disponibilitaUtente > 0){
        //console.log(`${nomeUtente}, ha il portafoglio pieno `)
        console.log(" * ----------------------------------------------------- * ");
        console.log('Utente si chiama',nomeUtente, '\n');
        console.log('Utente ha disponibilità',disponibilitaUtente, 'Euro \n');
        console.log(`${nomeUtente} ha ${rate} di sconto`)
        console.log(" * ----------------------------------------------------- * ");

    }else{
        console.log(`${nomeUtente} ha il portafoglio VUOTO `)
    }

    console.log('Prodotti utente corrente',prodottiUtente, '\n')


    for(let item of prodottiUtente){
        let prodCorrente = core.getProduct(item);
        let ean = prodCorrente.ean;
        let nomeProdotto = prodCorrente.name;
        let prezzoProdotto = prodCorrente.price;
        let rigaRicevuta = ` \t [${ean}] \t ${nomeProdotto} \t ${prezzoProdotto}`

        console.log(rigaRicevuta,'\n')
        totaleOrdine += prezzoProdotto;
    }

   /*
    const sumCartItem = (list) => {
        let total = 0;
        if (list != null){
            for (let codice of list) {
                let prodotto = products.find(product => product.ean === codice);
                total += prodotto.price;
            }
        }
        return total.toFixed(2);
    }

    console.log(sumCartItem()); */
    
    //print total
    console.log(" * ----------------------------------------------------- * ");
    totaleOrdine += prezzoProdotto
    console.log (`\nTotal products: \t\t ${Number.parseFloat(totaleOrdine).toFixed(2)}`);
    console.log(" + ----------------------------------------------------- + ");

    //applied discount
    let discount = core.getPercentageFromPromoCode(promoUtente)*totaleOrdine;
    console.log(`\nDiscount: \t\t ${Number.parseFloat(discount).toFixed(2)}`);

    //updated total with discount
    let totalDiscount = core.discountedPrice(totaleOrdine, rate);
    console.log(`\n Total Discount: \t\t`,totalDiscount);
    console.log(`\n PROMOCODE: \t\t `, promoUtente);
    console.log(" + ----------------------------------------------------- + ");
    console.log(" ** ----------------------------------------------------- ** ");


    if(promoUtente === '' 
       && promoUtente !== undefined
       && promoUtente === null) {
        console.log(`\n PROMO CODE: \t\t ${promoUtente}  `);
        let discountedPrice = core.discountedPrice(totaleOrdine, rate);
        console.log('discountPriceValue ',discountedPriceValue);
    }

    if(disponibilitaUtente < totaleOrdine){
        console.log(` ${nomeUtente} NON HA ABBASTANZA SOLDI PER COMPRARE.`)
    }
 
   console.log(" ** ----------------------------------------------------- ** ");



}

