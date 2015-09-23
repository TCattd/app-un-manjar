/*
 * Toasty v0.1.0 (with mods from TCattd)
 * Show Dan Forden's Toasty from Mortal Kombat as an Easter Egg for your website
 * (c)2014 Rubén Torres - rubentdlh@gmail.com
 * Released under the MIT license
 */

 (function($) {

 	//singleton
 	var singleToasty;

 	function Toasty(elem, options){
 		this.options=options;
 	}

 	Toasty.prototype = {

 		//initialize including neccesary elements in DOM
 		init: function(){
 			//Add to dom needed elements
 			$("body").append('<div id="toasty-guy-dan"><img src="'+ this.options.image +'" alt="toasty"></div>');
 			$("body").append('<div id="toasty-guy-two"><img src="'+ this.options.imagetwo +'" alt="toastytwo"></div>');

			$('#toasty-guy-dan, #toasty-guy-two').css('position', 'fixed');
			$('#toasty-guy-dan, #toasty-guy-two').css('right', '-170px');
			$('#toasty-guy-dan, #toasty-guy-two').css('bottom', '0px');
			$('#toasty-guy-dan, #toasty-guy-two').css('z-index', '1');
 		},

 		pop: function(){
			$("#toasty-guy-dan").addClass("show-dan");
			setTimeout( function(){ $("#toasty-guy-dan").removeClass("show-dan"); }, 1000);
 		},

 		pap: function(){
			$("#toasty-guy-two").addClass("show-two");
			setTimeout( function(){ $("#toasty-guy-two").removeClass("show-two"); }, 1000);
 		}

 	}

 	$.fn.toasty = function(options) {

 		this.each(function(){
			// Check if we should operate with some method
			if (/^(pop)$/i.test(options)) {
				// Normalize method's name
				options = options.toLowerCase();
				switch(options){
					case 'pop':
						singleToasty.pop();
						break;
				}
			} else if(/^(pap)$/i.test(options)) {
				// Normalize method's name
				options = options.toLowerCase();
				switch(options){
					case 'pap':
						singleToasty.pap();
						break;
				}
			} else if (typeof options == 'object' || !options) {
				options = $.extend({}, $.fn.toasty.defaults, options);
				if(!singleToasty){
					singleToasty = new Toasty($(this), options);
					singleToasty.init();
				}
			}
 		});

	}

	$.fn.toasty.defaults = {
 		image: 'toasty.png',
 		imagetwo: 'toastytwo.png',
 	};

})(jQuery);
