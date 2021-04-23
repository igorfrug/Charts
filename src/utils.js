//Parsing data from API
function parseData(data) {
	const newLocal = [];
	let dArr = newLocal
	let date = new Date(data.time_now * 1000)
	console.log(data.time_now)
	for (let d of data.result) {
		//for real time data
		d.date = date
		//for static data
		//d.date=new Date(d.timestamp)
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;
		d.turnover = +d.turnover;
		dArr.push(d);
	};
	return dArr;
}
// Call API
export async function getData() {
	try {
		let res = await fetch(`https://api.bybit.com/public/linear/kline?symbol=BTCUSDT&interval=1&limit=200&from=${Math.floor(Date.now() / 1000 - 11700)}`);
		const data = await res.json();
		console.log(data);
		//for real time data
		if (data.result.length > 1) {
			const promiseMSFT = parseData(data);
			//for static data
			//const promiseMSFT=parseData(data);
			return promiseMSFT;
		}
	} catch (err) {
		console.log('WAIT', err);
	}
}