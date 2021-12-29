var CronJob = require('cron').CronJob;
import { Currencies, CurrencyRates } from '../../data/models';
import fetch from '../fetch';

const cron = app => {

	new CronJob('0 0 1,13 * * *', async function () { // Run every day on 1.00 AM and 1.00 PM

		console.log("/********************************************/");
		console.log("HOLY MOLY CURRENCY RATES CRON STARTED");

		// Get the base currency symbol
		const baseCurrency = await Currencies.findOne({
			where: { isBaseCurrency: true }
		});
		const symbol = baseCurrency.dataValues.symbol;

		// Fetch rates from fixer api
		//const URL = 'http://api.fixer.io/latest?base=' + symbol;
		const URL = 'https://api.coinbase.com/v2/exchange-rates?currency=' + symbol;
		const resp = await fetch(URL);
		const { data } = await resp.json();
		const currencyData = data.rates;

		// Prepare data and rates from fixer then store them into currency rates table
		let baseData = {
			currencyCode: symbol,
			rate: 1.00,
			isBase: true
		};
		let ratesData = Object.keys(currencyData).map(function (data) {
			return { "currencyCode": data, rate: currencyData[data] };
		});
		ratesData.push(baseData);

		if (ratesData && ratesData.length > 0) {
			// Clean the table before store anything
			await CurrencyRates.truncate();
			// Lets do bulk create of currency rates
			const updateRates = await CurrencyRates.bulkCreate(ratesData);
		}

		console.log("HOLY MOLY CURRENCY RATES CRON COMPLETED");
		console.log("/********************************************/");

	}, null, true, 'America/Los_Angeles');

};

export default cron;