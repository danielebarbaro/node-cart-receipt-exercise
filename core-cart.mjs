import {carts, products, promoCode, users} from "./dataset.mjs";
import * as os from "os";

//INTESTAZIONE SCONTRINO
const printShopName = () => {
    const {username} = os.userInfo();
    return `${username.toUpperCase()} - Cart ${process.pid}`;
}
const heading = function(){
    let d = new Date()
    return d.toDateString()
}


//UTENTE E PRODOTTI
const getUser = (uuid)=> users.find(user=>user.uuid === uuid);
const getProduct = (productId) => products.find(product => product.ean === productId)


//SCONTO
const getPercentageFromPromoCode = function(promoCodeName){
    if(promoCodeName!=''&& promoCodeName!=undefined&&promoCodeName!=null){
        let rate = promoCode.find(item=> promoCodeName===item.name);
        return rate.percentage
    }
}
const discountedPrice = (price, rate) => (price * (1 - rate)).toFixed(2);


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


export{
    discountedPrice,
    getPercentageFromPromoCode,
    getUser,
    getProduct,
    formatCart,
    righe,
    heading,
    printShopName
}