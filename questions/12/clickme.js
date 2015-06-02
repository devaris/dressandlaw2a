// GLOBALS
var totalScore;

// FUNCTIONS
function returnTotal(){
	if(window.top){
		totalScore = window.top.questionsCompleted;
	} else {
		totalScore = window.parent.questionsCompleted;
	}
	
	showResults();
}

function showResults(){
	
	$( ".total li" ).each(function( index ) {
		$(this).text(totalScore[index][0]);	
	});
	
	$( ".individual li" ).each(function( index ) {
		$(this).text(totalScore[index][1]);
	});

}

function restart(){
	if(window.top){
		window.top.resetIndividual();
	} else {
		window.parent.resetIndividual();
	}
}  
	
$(document).ready(function(){

	// Add animation
	$('.questions').addClass('animated slideInDown');
	$('.total').addClass('animated slideInDown');
	$('.individual').addClass('animated slideInDown');

	returnTotal();
	
	$("#restart").click(restart);
	
	
}); // End of $(document).ready