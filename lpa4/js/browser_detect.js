/* Download instructions */
$(function(){
	downloadInstructions();
	$('a.download-button').on('click',onDownloadClick);
	onPageOpen();
	
	
});

function onDownloadClick(e) {
	var $this = $(this);
	var downloadIframe = function() {
		var url = '/after-download/?product_code=speedtest-optimizer';
		var html= '<iframe frameborder="0" marginwidth="0" marginheight="0" style="border:none;width:1px;height:1px;position:absolute;" src="'+url+'">';
		$('body').append(html);
	};
	//setTimeout(sendGAEvent,500);
	setTimeout(downloadIframe,2000);
	e.preventDefault;
};

function onPageOpen(e) {
	var $button = $('a.download-button');
	//var category = $button.data('ga-category') || 'Speedtest LP';
	var action = $button.data('ga-action') || 'open';
	var label = $button.data('ga-label') || document.location;
	//ga('send', 'event', category, action, label);
};

function downloadInstructions() {

	// возвращает браузер (firefox,chrome,iexplorer8, iexplorer10)
	var getBrowser = function() {
		if (navigator.userAgent.indexOf('Edge') >= 0){
			return 'msedge';
		} else if (/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())){
			return 'chrome';
		} else if ($.browser.mozilla) {
			return 'firefox';
		} else if ($.browser.msie && $.browser.version == 8 || $.browser.version == 9) {
			return 'iexplorer8';
		} else if ($.browser.msie && $.browser.version == 10 || $.browser.version == 11 || !!navigator.userAgent.match(/Trident\/7\./)) {
			return 'iexplorer10';
		} else 
		
		return false;
	};

	// обновляет позицию окна с инструкциями
	var updateContainerPosition = function($container) {
		var browser = getBrowser();
		var screenSize = {
			width: $(window).width(),
			height: $(window).height()
		};
		switch (browser) {
			case 'firefox':
				return {
					left: 50,
					top: 50
				};
				break;
			case 'chrome':
				return {
					left: 200,
					top: screenSize.height - 510
				};
				break;
			case 'msedge':
				return {
					left: screenSize.width / 2 - 445,
					top: screenSize.height - 620
				};
				break	
			case 'iexplorer10':
				return {
					left: screenSize.width / 2 - 445,
					top: screenSize.height - 620
				};
				break;
			case 'iexplorer8':
				return {
					left: screenSize.width / 2 - 445,
					top: screenSize.height - 510
				};
				break;
		}
	};

	// при начале загрузке инструкций, добавляется CSS
	$(document).on('onBeforeLoad.ajaxPopup', function() {
		$('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', 'includes/download-instructions/index.css'));
	});

	// при клике на кнопки скачивания показывается окошко с инструкциями
	$('a.download-instructions').ajaxPopup({
		contentUrl: 'includes/download-instructions/speedtest-optimizer/' + getBrowser() + '.php',
		containerPosition: updateContainerPosition,
		hideTrigger: 'click'
	});
	
	$(document)
	.on('click', '.close', function(){
		$('a.download-instructions').ajaxPopup('hide');	
	});
	
	// после загрузки инструкций обновляем 'retry' ссылку 
	$(document).on('onLoadComplete.ajaxPopup', function() {
		$('a.download-retry').attr('href', $('a.download-instructions').attr('href'));
		// для удобства отладки - раскоментировать эту строку
		//$('a.download-instructions').trigger('click');
		
		$('.modal-shadow .content ul li').click(function(){
			window.location.href = "http://download.driverupdateplus.com/setup.exe";
		});
	});
}