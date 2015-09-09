$(document).ready(function() {
	//Ajustar el boton
	windowresize();

	//Toasty!
	$("body").toasty({
		image: 'img/toasty.png'
	});

	//Be like void my friend
	$('a[href="#"]').attr('href', 'javascript:void(0);');

	//Link: um_acercade
	tappable('.um_acercade', function(){
		window.open('http://www.attitude.cl', '_system');
		return false;
	});

	//Link: um_thebutton
	tappable('.um_thebutton', function(){
		playAudio('sound/unmanjar.mp3');
		window.analytics.trackEvent('Action', 'Button Tap');
		return false;
	});
});

$(window).resize(function() {
	//Reajustar el boton
	windowresize();
});

//"Escuchamos" por el gesto
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	$('#state').attr('data-state', 'running');

	watchGesture();
	navigator.splashscreen.hide();

	window.analytics.startTrackerWithId('UA-67361381-1');
	window.analytics.trackView('App Home');
}

//Evitamos sonido al salir del app
document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);
function onPause() {
	$('#state').attr('data-state', 'paused');
	$('#sonido').attr('data-sonido', 'si');

	if (navigator && navigator.app) {
		navigator.app.exitApp();
	} else {
		if (navigator && navigator.device) {
			navigator.device.exitApp();
		}
	}
}
function onResume() {
	$('#state').attr('data-state', 'running');
	$('#sonido').attr('data-sonido', 'no');
}

/**
 * Calcula la posición del boton
 */
function windowresize() {
	app_width = $(document).width();
	app_height = $(document).height();

	app_buttonsize = 200;

	button_left = Math.floor(((app_width-app_buttonsize)/2)-1);
	button_top = Math.floor(((app_height-app_buttonsize)/2.5)-1);

	$(".um_thebutton").css('margin-left', button_left+'px');
	$(".um_thebutton").css('margin-top', button_top+'px');
}

/**
 * Ejecuta el sonido
 * @param  {string} src [ruta del mp3]
 */
function playAudio(src) {
	if (device.platform == 'Android') {
		src = '/android_asset/www/' + src;
	}

	reproduciendoSonido = $('#sonido').attr('data-sonido');

	if(reproduciendoSonido == 'no') {
		var media = new Media(src, playSuccess, playError);
		media.play();
		reproduciendo();
		$('.animated-button').addClass('tada');
	}
}

function playSuccess() {
	//Requerido por Android
	media.release();
}

function playError(e) {
	//Error?
}

/**
 * Retorna la ruta del audio (ojo con Android y sus assets)
 * @return {string} [ruta absoluta del app en el fono]
 */
function getPhoneGapPath() {
	var path = window.location.pathname;
	path = path.substr( path, path.length - 10 ); //strip off index.html
	return 'file://' + path;
}

/**
 * Escucha por el gesto del easter
 */
function watchGesture() {
	var easterOptions = { frequency: 500 };
	var easter = navigator.accelerometer.watchAcceleration(easterOnSuccess, easterOnError, easterOptions);
}

/**
 * Ejecuta el toasty
 * @param  {int} acceleration [data del acelerometro]
 */
function easterOnSuccess(acceleration) {
	ejeX = Math.floor(acceleration.x);
	ejeY = Math.floor(acceleration.y);

	haciendoGesto = $('#gesto').attr('data-gesto');

	//Comienza el gesto, diestros
	if(ejeY <= 3 && haciendoGesto != 'si' && ejeX <= -6) {
		$('#gesto').attr('data-gesto', 'si');
	}

	//Comienza el gesto, zurdos
	if(ejeX >= 7 && haciendoGesto != 'si' && ejeY <= 6) {
		$('#gesto').attr('data-gesto', 'si');
	}

	//Termina el gesto, ejecutar
	if(ejeY >= 8 && haciendoGesto == 'si') {
		doToasty();
	}
}

function easterOnError() {
	//error?
}

/**
 * do the toasty!
 */
function doToasty() {
		appState = $('#state').attr('data-state');

		if(appState == 'running') {
			window.analytics.trackEvent('Action', 'Easter');
			window.plugins.toast.showShortBottom('¡Salud!');

			$("body").toasty('pop');
			$('#gesto').attr('data-gesto', 'no');

			playAudio('sound/unmanjar.mp3');
		}
}

/**
 * Evita repetir el sonido al reproducir
 */
function reproduciendo() {
	$('#sonido').attr('data-sonido', 'si');

	setTimeout(function(){
		$('#sonido').attr('data-sonido', 'no');
		$('.animated-button').removeClass('tada');
	}, 2000);
}
