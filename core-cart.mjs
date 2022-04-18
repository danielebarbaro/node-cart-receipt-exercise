import {carts, products, promoCode, users} from "./dataset.mjs"; 
import * as fs from "fs"; //file system (fs)
import * as os from "os"; //sistema operativo (os)
//import { Console } from "console";


//funzione iterativa
//function getUser(uuid){
  //  let user = users.find(user => uuid === user.uuid);
    //return user;
//}


// Ripetizione: String.prototype.repeat()
//function getProduct(productId){
  //  let product = products.find(product => productId === product.ean);
    //return product;
//}

/*const getProduct = function (productId){
     
    return products.find(product => productId === product.ean);
}*/

const discountedPrice = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);
const createDelimiter = (openClose, symbol, times) => `${openClose} ${symbol.repeat(times)} ${openClose}`;
const printShopName = () => {
    const {username} = os.userInfo();
    return `${username.toUpperCase()} - Cart ${process.pid}`;
}

//ARROW FUNCTION : 
const getUser = (uuid) => users.find(user => user.uuid === uuid);

const formatProductList = (product) => (products)
const formatProductName = (product) => product.toLowerCase().charAt(0).toUpperCase() + product.toLowerCase().slice(1);


const filterType = (products, type) => product;


const sumCartItem = (products) => (products);
 
const getPercentageFromPromoCode = function (promoCodeName){

    if(promoCodeName !== '' 
       && promoCodeName !== undefined
       && promoCodeName !== null) {

        let rate = promoCode.find(item => promoCodeName === item.name);
        return rate.percentage;
        
    }
    return 0;
    
    
}

const printReceipt = (content, filename) => fs.writeFileSync(filename, content);

const getProductByCart = (products) => products;

const getUserDiscount = () => 0;

const receiptFileName = (uuid, date) => '';

const getProduct = (productId) => products.find(product => product.ean === productId)


export {
    discountedPrice,
    createDelimiter,
    printShopName,
    getUser,
    formatProductName,
    filterType,
    sumCartItem,
    formatProductList,
    printReceipt,
    getProductByCart,
    getUserDiscount,
    receiptFileName,
    getProduct,
    getPercentageFromPromoCode,
};