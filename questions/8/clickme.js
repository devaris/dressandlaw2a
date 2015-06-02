// GLOBALS
var correctAns = 4;
var clickedAnsIndex;

var totalCorr = 0;
var totalWrong = 0;

var myNum;

// FUNCTIONS
function questionNumber(){
	if(window.top){
		myNum = window.top.countActivity;
	} else {
		myNum = window.parent.countActivity;
	}
	$('#questionNum').text(myNum);	
}
function questionResult(result){
	if(window.top){
		window.top.keepResult(result);
	} else {
		window.parent.keepResult(result);
	}
}

function clickItems(){
	
	$( ".qAnswers li" ).each(function( index ) {
		$(this).css({border: '0'});	
	});

	$(this).css({border: '0 solid #5F7693', borderRadius: '5px'}).animate({
        borderWidth: 4
    }, 500);	
	
	clickedAnsIndex = $(this).index();	
	
	return false;
} // END function clickItems

function submitAnswer(){
	if (clickedAnsIndex==(correctAns-1)){
		totalCorr++;
		audioCorrect();
		
		$(".qAnswers li:eq("+clickedAnsIndex+")").css({borderColor: '#0C3'});
		$(".qAnswers li:eq("+clickedAnsIndex+")").one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
		function() {
			$(".qAnswers li:eq("+clickedAnsIndex+")").unbind("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend");
			questionResult(true);
		});
		
	} else {
		totalWrong++;
		audioWrong();
		
		$(".qAnswers li:eq("+clickedAnsIndex+")").css({borderColor: '#F03'});
		$(".qAnswers li:eq("+clickedAnsIndex+")").one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', 
		function() {
			$(".qAnswers li:eq("+clickedAnsIndex+")").unbind("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend");
			questionResult(false);
		});
		
	} // END if of Correct
	
	
	$(".qAnswers li").unbind(clickItems);
	$(".qAnswers li").css('cursor','default');
	
	$(".submitA").unbind(submitAnswer);
	$(".submitA").css('cursor','default');
	
	return false;

} // END function clickItems
	
$(document).ready(function(){

	// Add animation
	$('.qTitle').addClass('animated bounceInDown');
	$('.qAnswers li').addClass('animated zoomIn');
	$('.submitA').addClass('animated flipInX');

	// Add Interactivity
	$(".qAnswers li").click(clickItems);
	$(".submitA").click(submitAnswer);
	
	// Get Activity Number
	questionNumber();
	
}); // End of $(document).ready