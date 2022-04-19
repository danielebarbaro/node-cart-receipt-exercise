import {carts, products, promoCode, users} from "./dataset.mjs";
import * as core from "./core-cart.mjs";
import fs from 'fs';

var dir = './receipts';

if(!fs.existsSync(dir))
{
	fs.mkdirSync(dir);
}

for(let cartRow of carts)
{
	let user = core.getUser(cartRow.user);
    let uuid = user.uuid;
    let nome = user.firstName;
    let cognome = user.lastName;
    let prodottiUtente = cartRow.products;
    let promo = user.promo;
    let sconto = core.getPercentageFromPromoCode(promo);
    let scontoEffettivo;
    let totaleScontato;
    let residuo;
    let ricevuta = '';
	
    if(prodottiUtente.length > 0 )
	{
		let totale = 0;
		let portafoglio = user.wallet;
		
        for(let oggetti of prodottiUtente)
		{
			let oggetto = core.getProduct(oggetti);
			let prezzo = oggetto.price;
			
			totale = prezzo + totale;
        }
		
        scontoEffettivo = sconto * totale;
		totaleScontato = totale - scontoEffettivo;
		residuo = portafoglio - totaleScontato;
		
        if((portafoglio + scontoEffettivo) > totale)
		{
			var oggi = new Date();
			var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
			const dataOggi = `${oggi.toLocaleDateString("it-IT", options)}`;
			const currentTime = `${oggi.getHours()}-${oggi.getMinutes()}-${oggi.getSeconds()}`;
			
			const delimitatore = '-';
			ricevuta += `+${delimitatore.repeat(50)}+\n`;
			ricevuta += `${core.printShopName()}\n`;
			ricevuta += `${dataOggi}\n`;
			ricevuta += `*${delimitatore.repeat(50)}*\n`;
			
			for(let a of prodottiUtente)
			{
				let oggetto = core.getProduct(a);
				let prezzo = oggetto.price;
				let codice = oggetto.ean;
				let nomeOggetto = oggetto.name;
				
				ricevuta += (`${codice}\t${core.formatMaiuscoloParole(nomeOggetto)}\t${prezzo.toFixed(2)}`);
				ricevuta += `\n`;
			}
			
			ricevuta += `*${delimitatore.repeat(50)}*\n`;
			ricevuta += `Totale: ${totale.toFixed(2)}\n`;
			ricevuta += `+${delimitatore.repeat(50)}+\n`;
			
			if (sconto !== 0)
			{
				ricevuta += `Sconto: ${scontoEffettivo.toFixed(2)}\n`;
				ricevuta += `Totale scontato: ${totaleScontato.toFixed(2)}\n`;
				ricevuta += ` \n`;
				ricevuta += `Codice Promo: ${promo}\n`;
				ricevuta += `**${delimitatore.repeat(50)}**\n`;
				ricevuta += `${nome} ${cognome} ha un credito residuo ${residuo.toFixed(2)}\n`;
			}
			else
			{
				let residuo = portafoglio - totale;
				
				ricevuta += `${nome} ${cognome} ha un credito residuo ${residuo.toFixed(2)}\n`;
			}
			
			ricevuta += ``;
			ricevuta += `**${delimitatore.repeat(50)}**\n`;
			
			fs.writeFileSync(`./receipts/${uuid}_receipt_${dataOggi}_${currentTime}.txt`,ricevuta);
		}
	}
	
	console.log(ricevuta);
}