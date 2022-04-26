import {carts, products, promoCode, users} from "./dataset.mjs"; 
import * as fs from "fs"; 
import * as os from "os"; 

//CALCOLA PREZZO SCONTATO
const discountedPrice = (price, rate) => (price * (1 - rate)).toFixed(2);


//TROVA ID UTENTE
function getUser(uuid){
    let user = users.find(user => uuid === user.uuid);
    return user;
}


//TROVA ID PRODOTTO
const getProduct = (productId) => products.find(product => product.ean === productId)


//TROVA PERCENTUALE SCONTO
const getPercentageFromPromoCode = function (promoCodeName){

    if(promoCodeName !== '' && promoCodeName !== undefined && promoCodeName !== null) {
    let rate = promoCode.find(item => promoCodeName === item.name);
    return rate.percentage;
    }
return 0;
}


//INFO MACCHINA
const printShopName = () => {
    const {username} = os.userInfo();
    return `${username.toUpperCase()} - Cart ${process.pid}`;
}


//ELABORA DATA
const heading = function(){
    let d = new Date()
    return d.toDateString()
}


//FORMATTAZIONE PRODOTTI
function format(products) {
    
    let result = '';
    let resultProductLowerCase = products.toLowerCase();

    let firstLetter = resultProductLowerCase.charAt(0);
    let firstLetterUpperCaseUpperCase = firstLetter.toUpperCase();

    let lastPartOfString = resultProductLowerCase.slice(1);

    result = `${firstLetterUpperCaseUpperCase}${lastPartOfString}`

    return result;
}

//FORMATTAZIONE CARRELLO
const formatCart = (item) => {
    
   
    let formattedName = '';
    let productName = item.name

    let multiName = productName.split(' ');

    for (let piece of multiName) {
        if(piece!= multiName[0])
            formattedName += ' '
            
        formattedName += format(piece);
    }

    return formattedName;
}

//SEPARATORI
const righe= function(del){
    let righe=''
    for(let i=0;i<55;i++)
        righe+='-'
    return del+righe+del
}

//ESPORTATORE COSTANTI
export {
    discountedPrice,
    printShopName,
    getUser,
    heading,
    righe,
    formatCart,
    getProduct,
    getPercentageFromPromoCode
};