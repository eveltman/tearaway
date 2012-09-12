var currState = "";
var slideTime = 1500;
var slideFastTime = 500;
var slidePauseTime = 2000;
var slideIdx = 0;
var bTouchSlide = false;
var touchStartPageX;
var timeoutID;
var SLIDE_XS = new Array(0, -780, -1560);

$(function(){	
	$('#leftSlide').on('click', slideLeft);
	$('#rightSlide').on('click', slideRight);
	$('#idx0').on('click', function(){setIdx(0)});
	$('#idx1').on('click', function(){setIdx(1)});
	$('#idx2').on('click', function(){setIdx(2)});
	
	$('#slidesDiv').on('touchstart', function(event) {
		event.preventDefault();
		bTouchSlide = true;
		touchStartPageX = event.originalEvent.touches[0].pageX;
    });
	
	$('#slidesDiv').on('touchmove', function(event) {
		event.preventDefault();
		if (!bTouchSlide) return;
		bTouchSlide = false;
		clearTimeout(timeoutID);
		if (event.originalEvent.touches[0].pageX < touchStartPageX) {
		  incrementSlideIndex(1);
		}else{
		  incrementSlideIndex(-1);	  
		}
		updateIdxDot();
		doFastSlide();
    });
	
	$('#slidesDiv').on('touchend', function(event) {
		event.preventDefault();
		bTouchSlide = false;
    });

	updateIdxDot();
	startAutoScrollTimer();
})

function startAutoScrollTimer() {
	timeoutID = setTimeout(function() {autoSlide();}, slidePauseTime);
}

function autoSlide() {
	incrementSlideIndex(1);
	updateIdxDot();
	$('#slidesDiv').animate(
		{left:SLIDE_XS[slideIdx]},
		slideTime,	
		'easeInOutQuad',	
		function(){startAutoScrollTimer()}
	);	
}

function incrementSlideIndex(num) {
	slideIdx += num;
	if (slideIdx < 0) slideIdx = SLIDE_XS.length - 1;
	if (slideIdx == SLIDE_XS.length) slideIdx = 0;
}

function setIdx(num) {
	clearTimeout(timeoutID);
	slideIdx = num;
	updateIdxDot();
	doSlide();
}

function doSlide() {
	$('#slidesDiv').animate(
		{left:SLIDE_XS[slideIdx]},
		slideTime,
		'easeInOutQuad'
	);	
}

function doFastSlide() {
	$('#slidesDiv').animate(
		{left:SLIDE_XS[slideIdx]},
		slideFastTime,
		'easeInOutQuad'
	);	
}

function slideLeft() {
	clearTimeout(timeoutID);
	incrementSlideIndex(-1);
	updateIdxDot();
	doSlide();
}

function slideRight() {	
	clearTimeout(timeoutID);
	incrementSlideIndex(1);
	updateIdxDot();
	doSlide();
}

function updateIdxDot() {
	for (i = 0; i <= SLIDE_XS.length; i++) {
		if (i == slideIdx) {
			$('#idx'+i).removeClass('index ind'+i);
			$('#idx'+i).addClass('index ind'+i+' selected');
		}else{
			$('#idx'+i).removeClass('index ind'+i+' selected');
			$('#idx'+i).addClass('index ind'+i);
		}
	}
}