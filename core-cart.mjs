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
    var data = ''
    var mese = ''
    
    var oggi = new Date();
    let giorno = oggi.toLocaleString('en-us', {weekday: 'long'});
    switch(oggi.getMonth()){
        case 0: mese += 'Gen'; break;
        case 1: mese += 'Feb'; break;
        case 2: mese += 'Mar'; break;
        case 3: mese += 'Apr'; break;
        case 4: mese += 'Mag'; break;
        case 5: mese += 'Giu'; break;
        case 6: mese += 'Lul'; break;
        case 7: mese += 'Ago'; break;
        case 8: mese += 'Set'; break;
        case 9: mese += 'Ott'; break;
        case 10: mese += 'Nov'; break;
        case 11: mese += 'Dic'; break;
    }
    return data = '\t' + giorno + '\t'+ mese + ' ' + oggi.getDate() + ' ' +oggi.getFullYear()
    
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

const formatProductName = (product => product);
//Modo più giusto per scrivere la funzione:
//funzione anonima:
/*
const getProduct= function (productId){
    return products.find(product => productId === product.ean)
}*/



//const formatProductList = (products => products)
//const getProductByCart = (products => products);
//const filterType = (products, type) => product
//const sumCartItem = (products)=> (products)
//const printReceipt = (contents, filename)=> '';
//const createDeLimiter = (openClose, symbol, times)=> ''
//const getUserDiscount = () => 0;
//const ReceiptFileName = (uuid, date)=>'';

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
