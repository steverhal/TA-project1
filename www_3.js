const http = require("http");
const dateTimeET = require("./src/dateTimeET.js");
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Stever Hallika, veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Stever Hallika, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna ülikoolis</a> ning ei sisalda tõsiseltvõetavalt sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageFoot = '\n</body>\n</html>';

http.createServer(function(req, res) {
    res.writeHead(200, {"Content-type": "text/html"});
	res.write(pageHead);
	res.write(pageBody);
	res.write("<p>Täna on " + dateTimeET.weekday() + ", " + dateTimeET.fullDate(1) + "</p>");
	res.write("<p>Kellaaeg veebilehe avamise hetkel: " + dateTimeET.fullTime() + "</p>");
	res.write(pageFoot);
	return res.end();
}).listen(5110);