
/*******************************************/
/* Javascript - load(); similar to ready() */
/*******************************************/
window.addEventListener('load', function(){
	// Keyboard events
	// document.addEventListener("keydown", function(event) {
	// 	console.log("key press fired");
	// });
}); /* Window.load() end */

/*****************************/
/* JQuery - Helper functions */
/*****************************/
// A much needed function that doesnt 'exist' ;)
$.fn.exists = function () {
	return this.length !== 0;
}

// Turns a rbg value to hex
// eg rgb(r,g,b) => #RRGGBB
function hexc(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    return '#' + parts.join('');
}

// Displays extra information on an onmouseover event
function projmore(target) {
	// .project-item-text is children[1]
	target.children[1].style.top = '0px';
}

function projless(target) {
	target.children[1].style.top = '40px';	
}

/*****************************/
/* JQuery - ready() function */
/*****************************/
$(document).ready(function() {
	
	/* Initalize */
	// Initalize some variables
	var $windowHeight = $(window).height();
	var $windowWidth = $(window).width();

	// Always start website at the top and activate about
	$('body').scrollTop(1);
	$('body').stop().animate({scrollTop:0},1000);

	// Initalize Mobile
	if ($windowWidth <= 480) {
		// Sidebar smoothing work around
		$('.container-fluid').css('right','0px');

	// Initalize Tablet
	} else if ($windowWidth > 480 && $windowWidth <=768) {

	// Initalize Desktop
	} else {
	}

	// Initalize skill bar colors
	$(".progress .bar").each(function() {
		var value = parseInt($(this).data("strength"))/100;
		var r = Math.floor(200*(1-(value*value*value)));
		var g = 100;
		var b = Math.floor(200*(value*value*value));
		var color = hexc('rgb('+r+','+g+','+b+')');
		var color2 = hexc('rgb('+(r+55)+','+g+','+(b+55)+')');
		$(this).css('background-image','linear-gradient(to top,'+color+','+color2+')');
		$(this).css('background-color',color);
	}); 
	/* Initalize end */





	// Window resize handler
	$(window).resize(function() {
		$windowHeight = $(window).height();
		$windowWidth = $(window).width();

		// Mobile
		if ($windowWidth <= 480) {
			$('.container-fluid').css('right','0px');

		// Tablet
		} else if ($windowWidth > 480 && $windowWidth <=768) {
			$('.container-fluid').removeAttr('style');

		// Desktop
		} else {
			$('body').css('background-color','#fff');
		}
	});

	// Window scroll handler
	$(window).scroll(function() {
		var scrollMiddle = $(window).scrollTop() + ($windowHeight/3);
		$('div[class^="hero-unit"]').each(function() {
			elTop = $(this).offset().top;
			elBtm = elTop + $(this).height();
			if (elTop < scrollMiddle && elBtm > scrollMiddle) {
				// Enable background
				var color;
				if ($(this).attr('id') == 'about')
					color = '#CFF09E';
				else if ($(this).attr('id') == 'education')
					color = '#A8DBA8';
				else if ($(this).attr('id') == 'resume')
					color = '#79BD9A';
				else if ($(this).attr('id') == 'projects')
					color = '#3B8686';
				else if ($(this).attr('id') == 'experiments')
					color = '#0B486B';
				$(this).css('background-color', color);
				if ( $windowWidth <= 768 ) {
					$('body').css('background-color', color);
				}
			} else {
				// Disable both
				if ( $windowWidth <= 768 ) {
					$(this).css('background-color','#4a4a4a');
				} else {
					$(this).css('background-color',"#eeeeee");
				}
			}
		});
	});

	// // Carousel touch handler
	// var touchStart;
	// var carousel = document.getElementById("myCarousel-mobile");

	// // Touch start
	// carousel.addEventListener("touchstart", function(event) {
	// 	if (event.touches.length > 1) return;
	// 	touchStart = event.touches[0].clientX;
	// });

	// // Touch end
	// carousel.addEventListener("touchend", function(event) {				
	// 	if (event.touches.length > 0) return;
	// 	var dx = event.changedTouches[0].clientX - touchStart;
	// 	if (Math.abs(dx) > 10) {
	// 		// Use jQuery, not sure how to do in JS
	// 		var $jQCarousel = $('#myCarousel-mobile');
	// 		(dx > 0) ? $jQCarousel.carousel('prev') : $jQCarousel.carousel('next');
	// 	}
	// });

	// Click event bindings
	$(function() {
		// Sidebar button toggle
		$('.sidebar.button').click(function(event){
			var sidebar = $('#sidebar');
			if (sidebar.css('right') != '0px') {
				$(this).css('right','210px');
				sidebar.css('right','0px');
				$('.container-fluid').css('right','200px');
			} else {
				$(this).css('right','10px');
				sidebar.css('right','-200px');
				$('.container-fluid').css('right','0px');
			}
		});

		// Sidebar close
		$('#sidebar').click(function(event){
			$('.sidebar.button').css('right','10px');
			$(this).css('right','-200px');
			$('.container-fluid').css('right','0px');
		});

		// Auto scroll to link
		$('a').click(function(event){
			if ( $($(this).attr('href')).exists() ) {
				event.preventDefault();
				var value = $($(this).attr('href')).offset().top;
				if ( $windowWidth > 480 ) {
					value = value - 80;
				}
				$('body').stop().animate({
					scrollTop:value
				});
			} else { 
				console.log('doesnt exist');
			}
		});

		// Skill list toggle
		$(".skill-list").click(function(event) {
			event.preventDefault();
			// Toggle height to 0
			if ($(this).next(".skill-expand").css("height") != "0px") {
				$(this).next(".skill-expand").css("height","0px").animate();
				// Retract all .bar's
				$(this).next(".skill-expand").children(".progress").each(function(){
					$(this).children(":first").css("width","0px").animate();
				});
			// Toggle height to 100
			} else {
				$(this).next(".skill-expand").css("height","100px").animate()
				// Toggle siblings and retract sibling's .bar's
				.siblings(".skill-expand").css("height","0px").animate().children(".progress").each(function(){
					$(this).children(":first").css("width","0px").animate();
				});
				// extract .bar's
				$(this).next(".skill-expand").children(".progress").each(function(){
					var value = parseInt($(this).css("width"));
					var percentage = parseInt($(this).children(":first").data("strength"))/100;
					$(this).children(":first").css("width",(percentage*value)+"px").animate();
				});
			}
		});

		// Skill list collapse
		$(".skill-expand").click(function(event) {
			event.preventDefault();
			$(this).css("height","0px").children(".progress").each(function(){
				$(this).children(":first").css("width","0px");
			});;
		});
	}); 
}); /* Document.ready() end */
