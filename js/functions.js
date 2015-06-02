// Counters ++
var countActivity = 0;

// ***** Arrays *****
var questionsCompleted = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];

// ADD CHAPTERS NAV EVENTS	
function startQuiz(){
	//alert("startQuiz")
	// Show - LOADING FRAME
	$(".intro").css('display','none');	
	$("iframe").css('display','block');	
	
	loadNextQuestion();	
}

function loadNextQuestion(){
	
	countActivity++;
	
	// LOAD EXERCISE
	$("#contentFrame").attr("src", "questions/"+countActivity+"/exercise.html");
	
	//alert("questionsCompleted: "+alertArray(questionsCompleted))
}

function resetState(){
	
	countActivity = 0;
	$("#contentFrame").attr("src", "questions/"+1+"/exercise.html");
	$(".intro").css('display','block');
	$("iframe").css('display','none');
}

function keepResult(value){
	
	if(value){
		cookieMainJSON.selections[countActivity-1][0]++;
		questionsCompleted[countActivity-1][0]++;
		cookieMainJSON.selections[countActivity-1][1]= "Σωστή";
		questionsCompleted[countActivity-1][1]= "Σωστή";
		
		// SAVE CHANGES IN COOKIE
		var myBrowser = get_browser();
		if ((myBrowser=='Chrome')||(isiPad==true)) {
			localStorage.setObject(myCookieMainName,null);
			localStorage.setObject(myCookieMainName,cookieMainJSON)
		}
		else{
			$.removeCookie(myCookieMainName)
			$.cookie(myCookieMainName, cookieMainJSON, cookieMainLifetime);
		}	
	} else {
		cookieMainJSON.selections[countActivity-1][1]= "Λάθος";
		questionsCompleted[countActivity-1][1]= "Λάθος";
	}
	
	loadNextQuestion();
}

function resetIndividual(){
	
	for(i=0; i<questionsCompleted.length;i++){
		questionsCompleted[i][1]= 0;
		cookieMainJSON.selections[i][1]= 0;
	}	
	
	// SAVE CHANGES IN COOKIE
	var myBrowser = get_browser();
	if ((myBrowser=='Chrome')||(isiPad==true)) {
		localStorage.setObject(myCookieMainName,null);
		localStorage.setObject(myCookieMainName,cookieMainJSON)
	}
	else{
		$.removeCookie(myCookieMainName)
		$.cookie(myCookieMainName, cookieMainJSON, cookieMainLifetime);
	}	
	
	resetState();
}


$(document).ready(function(){
	// Hide - LOADING FRAME
	$("iframe").css('display','none');	
	
	resetIndividual();
	  
	$(".imageIntro").click(startQuiz);
	
	
}); // End of $(document).ready