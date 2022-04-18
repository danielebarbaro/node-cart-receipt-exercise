import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";
import * as os from "os";


const discountedPrice = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);

//arrow function
/*const getUser=(uuid)=>users.find(user=>user.uuid===uuid);*/
//funzione dichiarativa
/*function getUser(uuid){
    let user=user.find(user=>uuid===user.uuid);
    return user;
}*/
//funzione anonima
const getUser=function(uuid){
    let user=users.find(user=>uuid===user.uuid);
    return user;
}


//arrow function
/*const getProduct=(ean)=>products.find(product=>product.ean===ean);*/
//funzione dichiarativa
/*function getProduct(ean){
    let product=product.fint(product=>ean===product.ean);
    return product;
}*/
//funzione anonima
const getProduct=function(ean){
    let product=products.find(product=>ean===product.ean);
    return product;
}

const getPercentageFromPromoCode = function(promoCodeName){
    if (promoCodeName!=='' && promoCodeName!==undefined && promoCodeName!==null){
        let sconto=promoCode.find(item=>promoCodeName===item.name);
        return sconto.percentage;
    }
    return 0;
}

const maiuscoloNome = function(stringa){
    return`${stringa[0].toUpperCase()}${stringa.substring(1).toLowerCase()}`
}

const maiuscoloParole = function(stringa){
    let nuovastringa=[];
    stringa.split(' ').forEach(parola =>  nuovastringa.push(maiuscoloNome(parola)));
    return nuovastringa.join(" ");
}

const printShopName = () => {
    const {username} = os.userInfo();
    return `${username.toUpperCase()} - Cart ${process.pid}`;
}


export {
    discountedPrice,
    getUser,
    getProduct,
    getPercentageFromPromoCode,
    maiuscoloNome,
    maiuscoloParole,
    printShopName,
    
};