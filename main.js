(function() { 

var id = 'b7qr499xjo7p7xegdeupcp2qpoc7yg';
var channel = ["ESL_SC2", "OgamingSC2", "cretetion", "FreeCodeCamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

// Определяем какой status у канала ON air или OFF
var findStatus = function(channelName) {  
	var request = new XMLHttpRequest();	
	request.open('GET', 'https://wind-bow.gomix.me/twitch-api/streams/' + channelName + '?&client_id=' + id, true);
	//	/users/:user || /channels/:channel || /streams/:stream
	
	request.onload = function() {

	if (this.status >= 200 && this.status < 400) {
		// Success!
		var data = JSON.parse(this.response);
		this.stream = Boolean(data.stream);

		// Передаем название канали и его status в следующую func
		channelInfo(channelName, this.stream);		

	} else {
		// We reached our target server, but it returned an error
		console.log('error');
		}
	};
	request.onerror = function() {
		  // There was a connection error of some sort
	};
	request.send();
	// return this.stream;
}


var channelInfo = function(channelName, status) {

	var request = new XMLHttpRequest();

	// BEFORE https://api.twitch.tv/kraken  
	// AFTER https://wind-bow.gomix.me/twitch-api
	
	request.open('GET', 'https://wind-bow.gomix.me/twitch-api/channels/' + channelName + '?&client_id=' + id, true);

	request.onload = function() {
	  if (this.status >= 200 && this.status < 400) {
	    var data = JSON.parse(this.response);

	    // Записываем необходимые нам данные
	    var logo = data.logo,
	    	url = data.url,
	    	title = data.status;

	    // Передаем все данные в функцию вывода	
		outer(channelName, logo, url, title, status);

	  } else {
	    console.log('error');
	  }
	};
	request.onerror = function() {

	};
	request.send();
}

var outer = function(channelName, logo, link, title, status) {
	if (status) {
		// console.log(logo, link, title);		
		out.innerHTML += '<div class=\'visibile online\'><img src=\'' + logo + '\'><a href=\'' + link + '\'>' + channelName + '</a><span class=\'title\'>' + title + '</span></div>'; 
	}	else {
		// console.log(logo, link, 'offline');
		out.innerHTML += '<div class=\'visibile offline\'><img src=\'' + logo + '\'><a href=\'' + link + '\'>' + channelName + '</a><span class=\'title\'>offline</span></div>'; 
	}
}


// Прогоняем все каналы
for (var i = 0; i < channel.length; i++) { 
	findStatus(channel[i]);
}

// EVENTS

all.addEventListener('click', function() {
	var visibile = document.querySelectorAll('.visibile');
	// e - element
	visibile.forEach( function(e) {
		e.style.display = 'block';
	});
});

on.addEventListener('click', function() {
	var online = document.querySelectorAll('.online');
	var offline = document.querySelectorAll('.offline');

	offline.forEach( function(e) {
		e.style.display = 'none';
	});
	online.forEach( function(e) {
		e.style.display = 'block';
	});
});

off.addEventListener('click', function() {
	var online = document.querySelectorAll('.online');
	var offline = document.querySelectorAll('.offline');

	offline.forEach( function(e) {
		e.style.display = 'block';
	});
	online.forEach( function(e) {
		e.style.display = 'none';
	});	
});

// Получилось расплывчато, голова к ночи не варит today :) 
search.addEventListener('keyup', function() {
	// Собираем в массив все каналы
	var visibile = document.querySelectorAll('.visibile');
	// Регулярное выражение из input'a 
	var regex = new RegExp(this.value, 'gi');

	// Пробегаем по каждому каналу чтобы найти где есть совпадения
	// е - один эллемент массива (канал)

	visibile.forEach(function(e) {
		// Берем название канала из ссылки
		var local = e.querySelector('a')
		var str = local.innerHTML;
		var res = str.match(regex);

		// Все что не подходит убираем
		if (!res) { 
			e.style.display = 'none';
		} 	else {
			// При нажатии backspace обновляем результат	
			e.style.display = 'block';
		}

	});
});

})();

