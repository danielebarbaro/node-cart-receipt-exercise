import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";
import * as os from "os";
import { randomUUID } from "crypto";

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
    let product=product.fint(product=>ean===product.ean);
    return product;
}


export {
    discountedPrice,
    getUser,
    getProduct,
};