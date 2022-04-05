import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";
import * as os from "os";

const discountedPrice = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);

const printShopName = () =>  `${os.userInfo().username.toUpperCase()} - Cart ${process.pid}`;

const printDelimiter = (startFinisc, innerSymbol, n) => `${startFinisc} ${innerSymbol.repeat(n)} ${startFinisc}`;

const formatList = (list) => {
    let prodotto;
    for ( let codice of list ) {
        prodotto = products.find(product => product.ean = codice);
        console.log(`   [${codice}]\t${prodotto.name}\t\t${prodotto.price}`);
    }
}

const sumTotale = (lista) => {
    let totale = 0;
    let prodotto;
    if (lista != null){
        for (let codice of lista) {
            prodotto = products.find(product => product.ean == codice);
            totale += prodotto.price;
        }
    }
    return totale;
}

const printPromo = (user) => {

}

const getDate = () => {
    let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    let date = new Date();
    return date.toLocaleString(`it-IT`, options);
}

const getUser = (uuid) => users.find(user => user.uuid === uuid);

export {
    discountedPrice,
    printShopName,
    getUser,
    printDelimiter,
    getDate,
    sumTotale,
    formatList,
    printPromo
};