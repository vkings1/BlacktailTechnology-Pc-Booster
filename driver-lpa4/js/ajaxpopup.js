/**
 * Плагин для подгрузки и показа всплывающего окна
 * 
 * Плагин имеет следующие методы:
 * 1)
 * $('.some-class').ajaxPopup(['init',] options) - метод инициализации
 * options объект со следующими свойствами:
 *		contentUrl - string URL, из которого скачать инструкции
 *		showTrigger - string 'manual', 'click', etc on $('.some-class')
 *		hideTrigger - string 'manual', 'click', etc on $(document)
 *		containerPosition - позиция окна с контейнером. может быть объектом или функцией
 *			объект: { top: xxx, left: xxx}
 *			function($container){ return { top:xxx,left:xxx}; }
 * 2)
 * $('.some-class').ajaxPopup('show') - метод показа инстуркции
 * 3)
 * $('.some-class').ajaxPopup('hide') - метод сокрытия инструкции
 * 
 * Плагин вызывает следующие события на $(document)
 * onBeforeLoad.ajaxPopup - при вызове метода init
 * onLoadComplete.ajaxPopup - когда данные с контентом загружены
 * show.ajaxPopup - когда окно показано
 * hide.ajaxPopup - когда окно скрыто
 * 
 * @example Пример простого вызова:
 *	$(document).on('onBeforeLoad.ajaxPopup', function() {
 *		$('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', '/some-url-to-popup.css'));
 *	});
 *	$('a.download-instructions').ajaxPopup({
 *		contentUrl: '/some-url-to-instruction'
 *	});
 *	
 * @example Пример вызова с кастомным позиционированием
 * $('a.download-instructions').ajaxPopup({
 *		contentUrl: '/some-url-to-instruction',
 *		containerPosition: function($container) {
 *			return {
 *				top: ($(window).height() / 3 - $container.height() / 2),
 *				left: ($(window).width() / 2 - $container.width() / 2)
 *			};
 *		}
 *	});
 * 
 * 
 * @author Pavel Lebedev <pavel.lebedev@auslogics.com>
 * @copyright (c) Auslogics
 */
(function($) {

	// имя плагина, используется для уставки событий
	var pluginName = 'ajaxPopup';
	// настройки плагина
	var settings = {};
	// бокс в DOM с плагином
	var $pluginContainer;

	var defaultSettings = {
		contentUrl: '',
		containerPosition: function($container) {
			return {
				top: ($(window).height() / 2 - $container.height() / 2),
				left: ($(window).width() / 2 - $container.width() / 2)
			};
		},
		showTrigger: 'click',
		hideTrigger: 'click',
		modalContainerCSS: 'modal-container',
		modalShadowCSS: 'modal-shadow'
	};

	// публичные методы
	var publicMethods = {
		// инициализация, навешивание событий и т.п.
		init: function(options) {
			settings = $.extend(defaultSettings, options);
			privateMethods['initWindowContent'].call(this);
			if (settings.hideTrigger !== 'manual') {
				$(document).on(settings.hideTrigger, events.onMissClick);
			}
			return this.each(function() {
				if (settings.showTrigger !== 'manual') {
					$(this).on(settings.showTrigger, events.onClick);
				}
			});
		},
		// показ всплывающего окна
		show: function() {
			$pluginContainer.css({
				'height': $(document).height(),
				'width': '100%'
			});
			// показываем окошко
			var $container = $('.'+settings.modalContainerCSS, $pluginContainer);
			$container.show().css({
				display: 'block',
				width: 'auto',
				height: 'auto',
				overflow: 'visible'
			});
			// settings.containerPosition можно использовать как объект, а можно как функцию
			if (typeof settings.containerPosition === 'object') {
				$container.css(settings.containerPosition);
			} else {
				$container.css(settings.containerPosition.call(this, $container));
			}
			$(document).trigger('show.' + pluginName);
		},
		// сокрытие окна инструкций
		hide: function() {
			var $container = $('.'+settings.modalContainerCSS, $pluginContainer);
			$container.hide();
			$pluginContainer.css({
				width: 1,
				height: 1
			});
			$(document).trigger('hide.' + pluginName);
		}
	};

	// приватные методы
	var privateMethods = {
		// старт загрузки инструкции
		initWindowContent: function() {
			$(document).trigger('onBeforeLoad.' + pluginName);
			$pluginContainer = $("<div class='"+settings.modalShadowCSS+"'></div>");
			$('body').append($pluginContainer);
			$pluginContainer.load(settings.contentUrl, function() {
				$(document).trigger('onLoadComplete.' + pluginName);
			});
		}
	};

	// события
	var events = {
		// при клике (перед отрисовки окна)
		onClick: function(e) {
			publicMethods['show'].call(this);
		},
		// при клике мимо окна
		onMissClick: function(e) {
			var $target = $(e.target);
			if ($target.hasClass(settings.modalShadowCSS)) {
				publicMethods['hide'].call(this);
			}
		}
	};

	$.fn.ajaxPopup = function(method) {
		if (publicMethods[method]) {
			return publicMethods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return publicMethods.init.apply(this, arguments);
		} else {
			$.error('Can\'t find method `' + method + '` in the jQuery.' + pluginName);
		}
	};
})(jQuery);
