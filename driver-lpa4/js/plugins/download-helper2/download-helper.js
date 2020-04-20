/**
 * Download Helpers
 * @copyright SlimWare Utilities, Inc.
 * @author Bob Bryant
 * @version 1.0.0
 */
(function($){
    $.downloadHelper = function(el){        
		$(el).on('click', function() {
			// Visibility hack to load in background images
			$('#download-helper-overlay').css('display', 'none').css('visibility', 'visible').fadeIn('fast').on('click', function() { $('#download-helper-overlay').fadeOut('fast'); });
		});
    };
    
    $.fn.downloadHelper = function(){
		var browser = '';
		var userAgent = navigator.userAgent ? navigator.userAgent.toLowerCase() : '';
		var overlayHtml = $('<div id="download-helper-overlay"><div class="download-helper-overlay-bg"></div><div id="download-helper"><div></div></div></div>');
		
		// Firefox
		var uMatch = navigator.userAgent.match(/Firefox\/(.*)$/), ffVersion;
		if (uMatch && uMatch.length > 1) {
			ffVersion = parseFloat(uMatch[1]);
			
			// Show FF when ver >= 20
			if(ffVersion >= 20) {
				$('#download-helper', overlayHtml).css("top", "0px");
				browser = 'ff';
			}
		}
		// Show IE when ver >= 9
		if(userAgent.indexOf('msie 9') > 0 || userAgent.indexOf('msie 10') > 0 || userAgent.indexOf('edge/') > 0 || (userAgent.indexOf('trident/7.0') > 0 && userAgent.indexOf('rv:11') > 0)) {
			$('#download-helper', overlayHtml).css("bottom", "80px");
			browser = 'ie';
		} else if (userAgent.indexOf('chrome') > 0) { // Chrome
			browser = 'chrome';
		}		
		if (browser.length) {
			$('#download-helper > div', overlayHtml).addClass('download-helper-'+browser);
		}
		overlayHtml.appendTo('body');
		
        return this.each(function(){(new $.downloadHelper(this))});
    };
})(jQuery);

