const dateFormattedET = function(monthStyle = 0){
	let timeNow = new Date();
	const monthNamesET = ['jaanuar', 'veebruar', 'märts', 'aprill', 'mai', 'juuni', 'juuli', 'august', 'september', 'oktoober', 'november', 'detsember'];
	const monthNamesFolkET = ['näärikuu', 'küünlakuu', 'paastukuu', 'jüripäevakuu', 'lehekuu', 'niidukuu', 'heinakuu', 'lõikuskuu', 'mihklikuu', 'viinakuu', 'talvekuu', 'jõulukuu'];
	const monthNames = monthStyle === 1 ? monthNamesFolkET : monthNamesET;
	return timeNow.getDate() + '. ' + monthNames[timeNow.getMonth()] + ' ' + timeNow.getFullYear();
}

const weekdayFormattedET = function(){
	let timeNow = new Date();
	const weekdayNamesET = ['pühapäev', 'esmaspäev', 'teisipäev', 'kolmapäev', 'neljapäev', 'reede', 'laupäev'];
	return weekdayNamesET[timeNow.getDay()];
}

const addLeadZero = function(numValue){
	numValue = numValue.toString();
	if(numValue.length < 2){
		numValue = numValue.padStart(2, '0');
	}
	return numValue;
}

const timeFormattedET = function(){
	let timeNow = new Date();
	let hourNow = timeNow.getHours();
	let minuteNow = timeNow.getMinutes();
	let secondNow = timeNow.getSeconds();
	let timeFormatted = hourNow + ':' + addLeadZero(minuteNow) + ':' + addLeadZero(secondNow);
	return timeFormatted;
}

//ekspordin kõik vajaliku
module.exports = {fullDate: dateFormattedET, fullTime: timeFormattedET, weekday: weekdayFormattedET}