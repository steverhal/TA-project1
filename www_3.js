const http = require("http");
//moodul päringu parimiseks
const url = require("url");
//moodul failitee haldamiseks
const path = require("path");
//moodul failide haldamiseks, ASYNC puhul on vaja seda toetavat erilisemat moodulit
//const fs = require("fs");
const fs = require("fs").promises;
const dateTimeET = require("./src/dateTimeET.js");
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Stever Hallika, veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Stever Hallika, veebiprogrammeerimine</h1>\n\t<p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna ülikoolis</a> ning ei sisalda tõsiseltvõetavalt sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageBanner ='<img src="veebiprogrammeerimine_2026_TA.jpg" alt="" width="450">';
const pageFoot = '\n</body>\n</html>'; 
 
http.createServer(async function(req, res) { 
	//parsin url-i 
	console.log("Päring: " + req.url); 
	let currentURL = url.parse(req.url, true); 
	console.log("Parsituna: " + currentURL.pathname); 
	 
	//hakkame erinevaid lehti jaotama -> routes (marsruudid) 
	 
	if(currentURL.pathname === "/") { 
		res.writeHead(200, {"Content-type": "text/html"}); 
		res.write(pageHead); 
		res.write(pageBanner); 
		res.write(pageBody); 
		res.write("\n\t<p>Täna on " + dateTimeET.weekday() + ", " + dateTimeET.fullDate(1) + "</p>"); 
		res.write("\n\t<p>Kellaaeg veebilehe avamise hetkel: " + dateTimeET.fullTime() + "</p>"); 
		res.write('\n\t<img src="/avaleht.jpg" alt="spongebob" width="300">'); 
		res.write("\n\t<ul>"); 
		res.write("\n\t\t<li><a href='/vanasona'>Tänane vanasõna</a></li>"); 
		res.write("\n\t\t<li><a href='/minust'>Minust</a></li>"); 
		res.write("\n\t</ul>"); 
		res.write(pageFoot); 
		return res.end(); 
	} 
	 
	else if (currentURL.pathname === "/vanasona") { 
		res.writeHead(200, {"Content-type": "text/html"}); 
		res.write(pageHead); 
		res.write(pageBanner); 
		res.write("\t<h1>Eesti vanasõnad</h1>\n\t<hr>"); 
		try { 
			const data = await fs.readFile(path.join(__dirname, "txt", "vanasonad.txt"), "utf8"); 
			const vanasonad = data.split("\n"); 
			const juhuslik = Math.floor(Math.random() * vanasonad.length); 
			res.write("\t<p>" + vanasonad[juhuslik] + "</p>\n"); 
			res.write('\t<img src="/vanasona.jpg" alt="Vanasõna" width="300">\n'); 
			res.write("\t<hr>\n"); 
		} catch (err) { 
			res.write("\t<p>Vanasõnade faili ei leitud.</p>\n"); 
		} 
		res.write("\t<p><a href='/'>Tagasi avalehele</a></p>"); 
		res.write(pageFoot); 
		return res.end();		 
	} 
	 
	else if (currentURL.pathname === "/minust") { 
		res.writeHead(200, {"Content-type": "text/html"}); 
		res.write(pageHead); 
		res.write(pageBanner); 
		res.write("\t<h1>Minust</h1>\n\t<hr>\n\t<p>Minu nimi on Stever Hallika. Õpin Tallinna Ülikoolis informaatikat, suunal tarkvaraarendus. Tulin TLÜ-sse õppima, kuna kuulsin tuttavatelt palju positiivset tagasisidet sellest koolist ja seetõttu otsustasin, et TLÜ on minule kõige sobilikum.</p>\n\t<p>Mind huvitavad arvutid, tarkvaraarendus, autod, muusika ja palju muud.</p>"); 
		res.write('\t<img src="/minust.jpg" alt="ina" width="300">\n'); 
		res.write("\t<hr>\n"); 
		res.write("\t<p><a href='/'>Tagasi avalehele</a></p>"); 
		res.write(pageFoot); 
		return res.end(); 
	} 
	 
	else if(path.extname(currentURL.pathname) === ".jpg") { 
		let picPath = path.join(__dirname, "pic", currentURL.pathname); 
		console.log(picPath); 
		try { 
			const data = await fs.readFile(picPath); 
			res.writeHead(200, {"Content-type": "image/jpeg"}); 
			res.end(data); 
		} catch (err) { 
			res.writeHead(404, {"Content-type": "text/plain; charset=utf8"}); 
			return res.end("Pilti ei leitud"); 
		} 
	} 
	 
	else { 
		res.end("Viga 404, ei leia sellist lehte!"); 
	} 
}).listen(5110);