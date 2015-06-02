// **** COOKIES for Main ****

var cookieMainJSON;
var myCookieMainName ='ccTAMmain';
var cookieMainLifetime = 365;

// Alert for Arrays
function alertArray(array){
	var mycutArray = "";
	jQuery.each(array, function(index, value) {
		mycutArray += " cell"+index+" :"+value;
	});
	return mycutArray;
}

function initCookiesMain(){
	
	var myBrowser = get_browser();
	
	if ((myBrowser=='Chrome')||(isiPad==true)) {
		if (localStorage.getItem(myCookieMainName)===null){	
			localStorage.setObject(myCookieMainName,{'selections':[]});
			cookieMainJSON = localStorage.getObject(myCookieMainName);
		}
		else{
			cookieMainJSON = localStorage.getObject(myCookieMainName);
		}
	}
	else{
		$.cookie.json = true;
		if ($.cookie(myCookieMainName)===null){		
			$.cookie(myCookieMainName, {'selections':[]}, cookieMainLifetime);
			cookieMainJSON = $.cookie(myCookieMainName);
		}
		else{
			cookieMainJSON = $.cookie(myCookieMainName);
		}
	}
	// **** Fill Arrays ****
	$.each(questionsCompleted, function(index, value) {
		
		if(!cookieMainJSON.selections[index]){
			//alert("cookieMainJSON.selections NOT DEFINED")
			cookieMainJSON.selections[index] = questionsCompleted[index];
		}
		
		// FILL Chapters Completed
		$.each(questionsCompleted[index], function(index2, value2) {
			if(cookieMainJSON.selections[index][index2]!=0){
				questionsCompleted[index][index2]=cookieMainJSON.selections[index][index2];
			}
		});
    });
}


initCookiesMain();