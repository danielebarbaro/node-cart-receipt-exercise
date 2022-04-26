
import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";
import * as os from "os";

const discountedPrice = (price, rate) => (price * (1 - rate)).toFixed(2);

const calculateDiscountedPrice = function (price, rate){
    return price * (1-rate);
}
//cerchiamo lo user per uuid, perciò la freccia qui sotto.
const getUser = (uuid)=> users.find(user=>user.uuid === uuid);
//ean lo trovi nel dataset dove ci sono i prodotti
const getProduct = (productId) => products.find(product => product.ean === productId)

const printShopName = () =>{
    const machine = os.userInfo();
    const machineName = machine.username;
    const pid = process.pid
    return `   ${machineName.toUpperCase()} - Cart ${pid}`;
}

const formatData = ()=>{
    return new Date().toDateString();   
}
const getPercentFromPromocode = function (promoCodeName){
    if(promoCodeName !=='' && promoCodeName !== undefined && promoCodeName !== null){
        let rate = promoCode.find(item => promoCodeName === item.name);
        return rate.percentage;
    }
    return 0;
}

const divisorio = (div, lung)=>{
    let result = ''
    let cont=0
        for(cont=0;cont<lung;cont++){
            if (cont == 0 || cont == lung-1)
                result += div
            else if(cont == 1 || cont == (lung-2))
                result += ' '
            else
                result += '-'
}
    return result;
}

 const formatArrow = (product) => product.toLowerCase().charAt(0).toUpperCase() + product.toLowerCase().slice(1);
function formatProductName (productName){
    let formattedName = '';
    let multiName = productName.split(' ');
    for (let piece of multiName){
        if(piece !== multiName[0]){
            formattedName += ' ';
        }
        formattedName+= `${formatArrow(piece)}`
    }
    return formattedName;
}

export{
    discountedPrice,
    calculateDiscountedPrice,
    getUser,
    getProduct,
    getPercentFromPromocode,
    formatProductName,
    divisorio,
    printShopName,
    formatData
}

