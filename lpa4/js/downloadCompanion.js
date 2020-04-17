(function(f,b){if(!b.__SV){var a,e,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");
for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=f.createElement("script");a.type="text/javascript";a.async=!0;a.src="//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";e=f.getElementsByTagName("script")[0];e.parentNode.insertBefore(a,e)}})(document,window.mixpanel||[]);
mixpanel.init("4c616bf9bf685152a2d86b045f3df17f");


var showAds = showAds || false;  //Variable to make ads ON/OFF
var jkResourcesdc	 = 'http://widgets.downloadcompanion.com/widget-v4/';
var dcwid= dcwid || '';		//publisher website id
var affiliateId= affiliateId || 1284;	//publisher affiliate Id
var mydcconf = mydcconf || [];		// array to hold the exe links	
var checkLinks = checkLinks || false;	// variable to fetch extension links if non extension links are also available
var followUpRedirect = followUpRedirect || false; //varibale to check if its a follow up redirect link
var pubMethodExists = (typeof scanDownloadLinks !== 'undefined' && typeof scanDownloadLinks === 'function');
// Method to run multiple js functions on click
//Funciton to handle click
var on = (function(){
    if (window.addEventListener) {
        return function(target, type, listener){
            target.addEventListener(type, listener, false);
        };
    }
    else {
        return function(object, sEvent, fpNotify){
            object.attachEvent("on" + sEvent, fpNotify);
        };
    }
}());

var DownloadLinkDetector = (function() {
    var allExtensions           = /(\.zip|\.exe|\.bin|\.gz|\.tar|\.mp3|\.rar|\.txt|\.asf|\.avi|\.iso|\.mpeg|\.mpg|\.mpga|\.ra|\.rm|\.wma|\.wmv|\.msi|\.bat|\.csv|\.cur|\.db|\.dll|\.font|\.ico|\.inf|\.jar|\.log|\.obj|\.ps|\.tab|\.ttf|\.txt|\.txt|\.wav|\.xml|\.dwg|\.doc|\.docx|\.ppt|\.pptx|\.xls|\.xlsx|\.rtf|\.torrent|\.msg|\.odt|\.pages|\.tex|\.wpd|\.wps|\.dat|\.gbr|\.ged|\.key|\.keychain|\.pps|\.sdf|\.tax2012|\.tax2014|\.vcf|\.aif|\.iff|\.m3u|\.m4a|\.mid|\.mpa|\.3g2|\.3gp|\.asx|\.m4v|\.mov|\.mp4|\.srt|\.vob|\.3dm|\.3ds|\.max|\.psd|\.ai|\.eps|\.indd|\.pct|\.pdf|\.xlr|\.accdb|\.dbf|\.mdb|\.pdb|\.sql|\.apk|\.app|\.gadget|\.pif|\.dxf|\.gpx|\.kml|\.kmz|\.fnt|\.fon|\.otf|\.cab|\.cpl|\.deskthemepack|\.dmp|\.drv|\.icns|\.hqx|\.mim|\.uue|\.7z|\.cbr|\.deb|\.pkg|\.rpm|\.sitx|\.tar.gz|\.zipx|\.cue|\.dmg|\.mdf|\.toast|\.vcd)/i;
	var downloadCompanionLoaded = false;
	if (mydcconf.length > 0) {
		if (checkLinks) {
			checkDownloadLinks();
		}
		customDownlaod();
	} else {
		checkDownloadLinks();
	}
	
    function checkDownloadLinks() {

      var links = document.links;
      var frames = []; // document.getElementsByTagName("frame");
      var iframes = []; // document.getElementsByTagName("iframe");
		if (pubMethodExists) {
			links = scanDownloadLinks();
		}
      addEventListener(links);

      if (frames.length > 0) {
        for (var size = 0; size < frames.length; size++) {
          addEventListener(frames[size].contentDocument.links);
        }
      }

      if (iframes.length > 0) {
        for (var size = 0; size < iframes.length; size++) {
          var doc = iframes[size].contentDocument;
          if (typeof doc != 'undefined')
            addEventListener(doc.links);
        }
      }

    }

    // check click events
    function addEventListener(list) {
      for (var size = 0; size < list.length; size++) {
        if (getLinkFileName(list[size])) {
         if (list[size].onclick) {
            list[size].click = list[size].onclick;
            //list[size].click();
            //list[size].onclick = onClickDetectDownload;
            on(list[size], "click", onClickDetectDownload);
          } else {
            //list[size].onclick = onClickDetectDownload;
        	on(list[size], "click", onClickDetectDownload);
          }
          if (!list[size].getAttribute("download")!=null) {
            list[size].setAttribute("download", "");
          }
        }
      }
    }

    function onClickDetectDownload(e) {
        var event =  e||window.event;
        var trgSrc = event.target||event.srcElement;
        var fileName = null;
      if(trgSrc.hasAttribute("href")){
		  if(!pubMethodExists) {
			trgSrc.title = "";
		  }
    	  window.activeDcLink = trgSrc;
    	  fileName = getLinkFileName(trgSrc);
      }else if(trgSrc.parentNode && trgSrc.parentNode.href){
			if(!pubMethodExists) {
				trgSrc.parentNode.title = "";
		  	}
    	  window.activeDcLink = trgSrc.parentNode;
    	  fileName = getLinkFileName(trgSrc.parentNode);
      }      

	    if (null != fileName && null != callbackOnDownload) {
	      setTimeout(callbackOnDownload, 1000);
	    }

	    return true;
    }
    function getLinkFileName(linkt) {
    	
    	var link = linkt.href;	
    	
      	if (link == null || link == '')
        return null;
      

		// remove html arguments
		var fileName = "";
		if(pubMethodExists) {
			fileName = linkt.title;
		} else {
			fileName = getDomainFromLink(link);
		}
		fileName = fileName.substring(fileName.lastIndexOf("/")+1);
		fileNameParts = fileName.split(".");
		
			// detect if this is a file
			if (!pubMethodExists) {
				if (!allExtensions.test(fileName))
			  	return null;
			}
		
		// extract file extension
		if(fileNameParts.length>1)
		var fileExtension = fileNameParts[fileNameParts.length-1];
		
		linkt.setAttribute("dc-fileName",fileName);
		linkt.setAttribute("dc-ext",fileExtension);
		return fileName;
        

      /*
		 * // remove html arguments var fileName =
		 * link.replace(getDomainFromLink(link), "").split('?');
		 *  // detect if this is a file if (!allExtensions.test(fileName[0]))
		 * return null;
		 *  // extract file extension var fileExtension =
		 * allExtensions.exec(fileName[0]);
		 *  // further remove all extra string from link fileName =
		 * fileName[0].split(fileExtension[0]);
		 * 
		 * //extract file name fileName =
		 * fileName[0].substr(fileName[0].lastIndexOf('/') + 1) +
		 * fileExtension[0];
		 * 
		 * linkt.setAttribute("dc-fileName",fileName);
		 * linkt.setAttribute("dc-ext",fileExtension[0]); return fileName;
		 */
    }

    function getDomainFromLink(data) {
      var a = document.createElement('a');
      a.href = data;
      return a.pathname;
    }

    /* cleans download links of html passed arguments('?password=test' */
    function getCleanDownloadableLink(link) {
      if (link == null || link == '')
        return null;

      // remove html arguments
      var fileLink = link.split('?');

      // detect if this is a file
      if (!allExtensions.test(fileLink[0]))
        return null;

      // extract file extension
      var fileExtension = allExtensions.exec(fileLink[0]);

      // further remove all extra string from link
      fileLink = fileLink[0].split(fileExtension[0]);

      // extract file name
      fileLink = fileLink[0] + fileExtension[0];
      console.log(fileLink);
      return fileLink;
    }

    function loadJavaScriptFile(url, success) {

      var script = document.createElement('script');
      script.src = url;
      var head = document.getElementsByTagName('head')[0],
      done = false;
      head.appendChild(script);
      // Attach handlers for all browsers
      script.onload = script.onreadystatechange = function () {
        if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
          done = true;
          success();
          script.onload = script.onreadystatechange = null;
          head.removeChild(script);
        }
      };
    }


    function callbackOnDownload() {
      if (typeof jQuery == 'undefined' || jQuery.fn.jquery != "1.10.2") {

        loadJavaScriptFile('http://code.jquery.com/jquery-1.10.2.min.js', function () {
          // Write your jQuery Code
          startDownloadCompanion();
        });

      }
      else {
        // jQuery was already loaded
        // Write your jQuery Code
        startDownloadCompanion();

      }
    }

    function startDownloadCompanion() {
      
      if (!downloadCompanionLoaded) {
        loadJavaScriptFile(jkResourcesdc+"download-helper/js/download-helper-v4.js?dg=77", function () {
          downloadCompanionLoaded = true;
          window.mydc.browserDiv();
        });
        
      } else {
        window.mydc.browserDiv();
      }

    }
    
    // Function for custom download
    function customDownlaod() {
    	for (var size = 0; size < mydcconf.length; size++) {
		if (!mydcconf[size].id) {
    			var element = document.createElement("A"); 
    			if (!followUpRedirect) {
					element = setFileNameAndType(element,mydcconf[size]);
				} 
    			window.activeDcLink = element;
    			setTimeout(callbackOnDownload, mydcconf[size].seconds); 
    		} else {
    			var downloadButton = document.getElementById(mydcconf[size].id);
		        if (downloadButton.onclick) {
		      	  downloadButton.click = downloadButton.onclick;
		      	  // downloadButton.click();
		      	  //downloadButton.onclick = onClickCustomDownload;
		      	   	on(downloadButton, "click", onClickCustomDownload);
		        } else {
		      	 // downloadButton.onclick = onClickCustomDownload;
		        	on(downloadButton, "click", onClickCustomDownload);
		        }
		        if (!followUpRedirect) {
				 downloadButton = setFileNameAndType(downloadButton,mydcconf[size]);
				} 

    		}
        }
    }
    
    function onClickCustomDownload(e) {
		var event =  e||window.event;
		var trgSrc = event.currentTarget||event.srcElement;
		var fileName = null;
		//window.activeDcLink = trgSrc
               if(trgSrc.hasAttribute("href")){
					if(!pubMethodExists) {
						trgSrc.title = "";
			  		}
                	window.activeDcLink = trgSrc;
                    //fileName = getLinkFileName(trgSrc);
                }else if(trgSrc.parentNode && trgSrc.parentNode.href){
					if(!pubMethodExists) {
						trgSrc.parentNode.title = "";
	  				}
                    window.activeDcLink = trgSrc.parentNode;
                    // fileName = getLinkFileName(trgSrc.parentNode);
                }
		if (null != callbackOnDownload) {
		  setTimeout(callbackOnDownload, 1000);
		}
		return true;
    }
    
    function setFileNameAndType(downloadButton,properties) {
/*    	if (!downloadButton.getAttribute("download")!=null) {
        	  downloadButton.setAttribute("download", "");
          }
          
          if (!downloadButton.getAttribute("href")!=null) {
        	  downloadButton.setAttribute("href", properties.link);
          }
*/
          
          var fileName = getDomainFromLink(properties.link);
  		
      		fileName = fileName.substring(fileName.lastIndexOf("/")+1);
      		fileNameParts = fileName.split(".");
      		
      		// detect if this is a file
      		if (!allExtensions.test(fileName)) {
				var dlLink = properties.link;
				fileName = dlLink.substring(dlLink.lastIndexOf("/"));
		  			fileNameParts = fileName.split(".");
				if (!allExtensions.test(fileName)) {
					return null;		
				}			
      		}
      		// extract file extension
      		if(fileNameParts.length > 1)
      		var fileExtension = fileNameParts[fileNameParts.length-1];
      		
      		if (downloadButton.href) {
      			if (isExtExists(downloadButton.href)) {
      				if (downloadButton.getAttribute("download") == null) {
                  	  downloadButton.setAttribute("download", "");
                    }
      			}
      		}
      		/*if (!downloadButton.getAttribute("download")!=null) {
          	  downloadButton.setAttribute("download", "");
            }*/
            
            if (downloadButton.getAttribute("link") == null) {
          	  downloadButton.setAttribute("link", properties.link);
            }
	    /*if (downloadButton.getAttribute("href") == null) {
          	  downloadButton.setAttribute("href", properties.link);
            }	
	    if (!downloadButton.getAttribute("link")!=null) {
      		if (isExtExists(downloadButton.getAttribute("link"))) {
      		 if (!downloadButton.getAttribute("download")!=null) {
                     downloadButton.setAttribute("download", "");
                    }
      		}
      	   }*/
      		downloadButton.setAttribute("dc-fileName",fileName);
      		downloadButton.setAttribute("dc-ext",fileExtension);
      		return downloadButton;
    }
    
    function isExtExists(href) {
    	var fileName = getDomainFromLink(href);
  		
  		fileName = fileName.substring(fileName.lastIndexOf("/")+1);
  		fileNameParts = fileName.split(".");
  		
  		// detect if this is a file
  		if (!allExtensions.test(fileName))
  		  return false;
    }

})();
