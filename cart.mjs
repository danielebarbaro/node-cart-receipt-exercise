import {carts, products, promoCode, users} from "./dataset.mjs"; // i dati sono presenti in dataset.mjs
import * as core from "./core-cart.mjs";                        // i metodi e ciò che è presente in core-cart.mjs può essere richiamato in cart.mjs scrivendo "core" prima del nome 
                                                               // della cosa da richiamare. Un po' come "ereditarli" da un' altra classe
console.log('Promo', promoCode);
console.log('Products', products);
console.log('Users', users);
console.log('Cart', carts);

console.log('Discount',core.discountedPrice(200, 0.20));

for (let cartRow of carts) {        // of vuol dire "fammi vedere l' oggetto del carrello". Se andiamo a vedere il file dataset vediamo che ogni cart contiene id utente e prodotti. 
    console.log('INIZIO DEL NODO')                          // questo for cicla i carrelli e stampa quelle proprietà
    console.log('Riga del carrello da stampare', cartRow); // cartRow si riferisce alla riga del carrello che stiamo ciclando (nell' insieme dei carts)

    let prodottiUtente = cartRow.products; // prodottiUtente è un array di prodotti
    let UUIDCorrente = cartRow.user;       // per ogni oggetto nel carrello voglio accedere alle proprietà dell' utente e dei prodotti. E salvarle in 2 variabili: UUIDCorrente e ProdottiUtente
    let totaleOrdine = 0;                 // inizializzo il totale ordine a 0
    

    let ean ='';
    let nomeProdotto = '';
    let prezzoProdotto = '';

    //console.log('Utente corrente', UUIDCorrente,'\n');
    //console.log('Prodotti utente corrente', prodottiUtente, '\n');

    let user = core.getUser(UUIDCorrente); // uso il metodo getUser che ho creato in core-cart.mjs. getUser serviva a restituire tutti i dati dell' utente che corripsonde all' id passato.
    //console.log('Utente completo', user);

    //let nomeUtente = `${user.firstName} + '' + ${user.lastName}`; // come la riga sotto ma scritta coi backtick
    let nomeUtente = user.firstName + '' + user.lastName; // creo una variabile che contiene il nome e cognome dell' utente. Scritta con i + come facciamo in java e C#
    let disponibilitaUtente = user.wallet;
    let promoUtente = user.promo;
    

    
    

    //console.log(`${nomeUtente} ha un codice sconto `);
    //console.log(`${nomeUtente} ha un buono sconto del ${rate}%`);

    if(prodottiUtente.length < 1){ // se il carrello dell' utente ha prodotti, può acquistare. il .length abbinato ad un array (come prodottiUtente ritorna il numero di righe contenute in un array. I prodotti nel carrello erano tra []. una riga = 1 prodotto.
    console.log(`${nomeUtente} non ha prodotti nel carrello.`);
    }

    if(disponibilitaUtente > 0){
        console.log(`${nomeUtente} ha il portafoglio pieno`);
        console.log('Utente si chiama: ', nomeUtente, '\n');
        console.log('Utente ha disponibile: ', disponibilitaUtente, 'Euro \n');
    
    }else{
        console.log(`${nomeUtente} ha il portafoglio vuoto`);
    }

    for (let item of prodottiUtente ) {
        let prodCorrente = core.getProduct(item); // uso il metodo getProduct che ho creato in core-cart.mjs. getProduct serviva a restituire tutti i dati del prodotto che corripsonde all' id passato.
        console.log(prodCorrente);                                                  
         ean = prodCorrente.ean;                     // ean di un prodotto. ad es: [120193]
         nomeProdotto = prodCorrente.name;           // nome di un prodotto ad es: Alpi
         prezzoProdotto = prodCorrente.price;        // prezzo di un prodotto ad es: 22.10
        let rigaRicevuta = `\t [${ean}] \t\t ${nomeProdotto} \t ${prezzoProdotto}`; // creo una riga che contiene l' ean, il nome e il prezzo del prodotto.
        totaleOrdine += prezzoProdotto;              // aggiungo il prezzo del prodotto all' importo totale dell' ordine.

        if (promoUtente  !== '' 
        && promoUtente !== undefined 
        && promoUtente !== null) {
            let rate = core.getPercentageFromPromoCode(promoUtente); // uso il metodo getPercentageFromPromoCode che ho creato in core-cart.mjs. getPercentageFromPromoCode serviva a restituire il valore del buono sconto promozionale passato come parametro.
            console.log(`\t Codice promo: \t\t ${promoUtente}`);
            let discountedPriceValue = core.discountedPrice(totaleOrdine, rate);
            console.log(` Prezzo scontato:`, discountedPriceValue);
        }
         

        console.log(rigaRicevuta, '\n');

        if (disponibilitaUtente < totaleOrdine) {
            console.log(`${nomeUtente} non ha abb. soldi per comprare`);
        
        }
        
        // per fare le righe per delimitare gli scontrini *--------* e +--------+ usare la funzione .repeat
    }
    
}
