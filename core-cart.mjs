import {carts, products, promoCode, users} from "./dataset.mjs";

import * as fs from "fs";   /*File system*/
import * as os from "os";   /**/

const discountedPrice = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);

const getUser = function(uuid) {
	
	let user = users.find(user => uuid === user.uuid);
	
	return user;
}

const getProduct = function(ean) {
	
	let product = products.find(product => ean === product.ean);
	
	return product;
}
const getPercentageFromPromoCode = function(promoCodeName) {
	
	if(promoCodeName !== '' && promoCodeName !== undefined && promoCodeName !== null)
	{
		let sconto = promoCode.find(item => promoCodeName === item.name);
		
		return sconto.percentage;
	}
	
	return 0;
}

const formatMaiuscoloNome = function(stringa) {
	
	return `${stringa[0].toUpperCase()}${stringa.substring(1).toLowerCase()}`;
}

const formatMaiuscoloParole = function(stringa) {
	
	let nuovaStringa = [];
	
	stringa.split(` `).forEach(parola => nuovaStringa.push(formatMaiuscoloNome(parola)));
	
	return nuovaStringa.join(` `);
}

const printShopName = () => {
	
	const {username} = os.userInfo();
	
	return `${username.toUpperCase()} - cart ${process.pid}`;
}

export {
	
	discountedPrice,
	getPercentageFromPromoCode,
	getProduct,
	getUser,
	formatMaiuscoloNome,
	formatMaiuscoloParole,
	printShopName
};