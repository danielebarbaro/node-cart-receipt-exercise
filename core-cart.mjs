import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";
import * as os from "os";

// Calcola il prezzo scontato
const discountedPrice = (price, rate) => (price * (1 - rate)).toFixed(2);

// Crea i "delimitatori"
const createDelimiter = (openClose, symbol, times) => `${openClose} ${symbol.repeat(times)} ${openClose}`;

// Stampa il nome dello shop
const printShopName = () => `${os.userInfo().username.toUpperCase()} - Cart ${(process.pid)}`;

// Cerca il nome dell'utente
const getUser = (uuid) => (users.find(user => user.uuid === uuid));

// Genera la data
const getData = () => {
    let formatData = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    let data = new Date();

    return data.toLocaleString(`it-IT`, formatData);
}

// Cerca la percentuale della promo
/*
const getPercentageFromPromoCode = (promoCodeName) => {
    if (promoCode !== `` 
        && promoCode !== undefined
        && promoCode !== null) {

            let rate = promoCode.find(promo => promoCodeName === promo.name);
            return rate.percentage;
        }
        
    return 0;
}
*/

// Forma una stringa con tutti prodotti correnti
const formatProductList = (lista) => {
    let listaProdotti = ``;
    lista.forEach(codice => {        
        let prodotto = products.find(product => product.ean === codice);
        
        // Formattazione per le parole composte
        let formattedName = '';
        let multiName = prodotto.name.split(' ');

        if (multiName.length > 1) {
            for (let piece of multiName) {
                formattedName += `${formatProductName(piece)} `;
            }
        } else {
            formattedName = `${formatProductName(prodotto.name)}`;
        }

        listaProdotti += `\n` + `\t` + `[${prodotto.ean}]`
        + `\t` 
        + formattedName + `\t\t`
        + prodotto.price + `\t\t\t`;
    });
    return listaProdotti;
}

// Formatta il nome all'interno dello scontrino
const formatProductName = (product) => {
    return product.toLowerCase().charAt(0).toUpperCase() + product.toLowerCase().slice(1)
}

// Fa la somma dei prezzi
const sumCartItem = (lista) => {
    let somma = 0;
    lista.forEach(codice => {
        let prodotto = products.find(product => product.ean === codice);
        somma += prodotto.price;
    });
    return somma.toFixed(2);
}

// Stampa la parte di scontrino con la promo
const printReceiptPromo = (lista, utente) => {
    let promo = ``;
    let somma = sumCartItem(lista);
    if (utente.promo !== `` && utente.promo !== undefined) {
        let sconto = promoCode.find(codice => codice.name === utente.promo);
        let sommaScontata = discountedPrice(somma, sconto.percentage);
        promo = `Sconto:${`\t`.repeat(4)} ${((somma) - (sommaScontata)).toFixed(2)}\n\tTotale Scontato:\t${sommaScontata}${`\n`.repeat(2)}\tCODICE PROMO:${`\t`.repeat(2)}${sconto.name}`
    }
    return promo;
}

// Calcola il totale scontato
const sumCartItemWithPromo = (utente, totale) => {
    if (utente.promo !== `` && utente.promo != undefined) {
        let sconto = promoCode.find(promoCode => promoCode.name === utente.promo);
        return discountedPrice(totale, sconto.percentage);
    } else return 0;
}

// Stampa lo scontrino in un file "scontrinoN.txt"
const printReceipt = (testo, contatore) => {
    fs.writeFile(`./receipt/scontrino${contatore}.txt`, testo, err => {
        if (err) console.error(err);
        return
    });
}

// Prende il prodotto
//const getProduct = (product) => products.find(product => product.ean);

// Funzioni esportato
export {
    discountedPrice,
    printShopName,
    getUser,
    sumCartItem,
    formatProductList,
    printReceipt,
    createDelimiter,
    getData,
    formatProductName,
    printReceiptPromo,
    sumCartItemWithPromo
};