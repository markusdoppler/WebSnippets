/*

* Events
scroll / onscroll
wheel / onwheel    -- triggered whenever a user scrolls the page with a mouse wheel or a touchpad



* Properties
const scrollTop  = window.scrollY;
const scrollLeft = window.scrollX;



* Functions
element.scrollIntoView();
element.scroll(x-coord, y-coord)
element.scrollBy(x-coord, y-coord);
element.scrollTo(x-coord, y-coord)


* Check if element is in viewport
window.addEventListener('scroll', () => {
  const rect = elem.getBoundingClientRect();
  const inViewport = rect.bottom > 0 && rect.right > 0 &&
                     rect.left < window.innerWidth &&
                     rect.top < window.innerHeight;
});
*/

let slidingObject = {
	data() {
		return {
			positionX: 0,
	    positionY: 0,
			deltaX: 0,
			deltaY: 0,
			slowFactorX: 1,
			slowFactorY: 1,
			scrollY: 0
		}
	},
	created: function () {
		this.positionX = document.getElementById("leaf1").getBoundingClientRect().left;
		this.positionY = document.getElementById("leaf1").getBoundingClientRect().top;
	},
	methods: {
		updatePosition: function (scrollY) {
			var scrollDelta = scrollY - this.scrollY;
			this.positionX += -scrollDelta/this.slowFactorX;
			this.positionY += -scrollDelta/this.slowFactorY;
			this.scrollY = scrollY;
		}
	},
	computed: {
		shiftTop() {
			return this.positionY + this.deltaY;
		},
		shiftLeft() {
			return this.positionX + this.deltaX;
		}
	}
};


var slideRoom = new Vue({
	el: "#slideRoom",
	components: {
		slidingObject: slidingObject
	}
});







$(window).scroll(function(event){
  // scrollHorizontally(event);
	// var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	// var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

	var scrollX = window.scrollX;
	var scrollY = window.scrollY;

	$('#scrollXY').text("↔︎ " + scrollX + " / ↕︎ " + + scrollY);

	slideRoom.updatePosition(scrollY);

});



/*
	* Window size
	* use for setting up the elements
 */

// $('body').click(function(event){
// 	var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
// 	var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
//
// 	alert(h+" x "+w);
// 	// alert(window.scrollY);
//
// /*
// 	$('.welcome-banner').hide();
// 	welcomeBannerUp = false;
// */
// });











/* scroll page programmatically */

// function pageScroll() {
// 		window.scrollBy(50,0); // horizontal and vertical scroll increments
// 		scrollDelay = setTimeout('pageScroll()',100); // scrolls every 100 milliseconds
// }
// function stopScroll() {
// 		clearTimeout(scrollDelay);
// }
// function jumpScroll() {
// 	 	window.scroll(0,150); // horizontal and vertical scroll targets
// }







/*
	* scroll sideways
	*   either by scrolling/panning sideways
	*   or by turning the mousewheel
*/


// $(document).ready(function(){
// 	// var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
// 	// var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
// //
// 	// alert(h+" x "+w);
// 	if (window.addEventListener) {
// 		// IE9, Chrome, Safari, Opera
// 		window.addEventListener("mousewheel", scrollHorizontally, false);
// 		// Firefox
// 		window.addEventListener("DOMMouseScroll", scrollHorizontally, false);
//   } else {
//   		// IE 6/7/8
//   		window.attachEvent("onmousewheel", scrollHorizontally);
//   }
// });


/* translate vertical scroll into horizontal scroll */

// function scrollHorizontally(e) {
// 	e = window.event || e;
// 	$('#wheelXY').text("e.wheelDelta: "+ e.wheelDelta + " | e.detail: " + e.detail + " | ("+e.deltaX+", "+e.deltaY+")");
// 	$('#logData').append(e.deltaY+"<br>");
// 	if (e.deltaY != 0) {
// 		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
// 		var scrollSpeed = 5;
// 		if (Math.abs(e.deltaY) > 80) {
// 			scrollSpeed = 10 + (Math.abs(e.deltaY)-80);
// 			//$('#logData').append(scrollSpeed.toFixed(2)+"<br>");
// 		}
// 		document.body.scrollLeft -= (delta * scrollSpeed); // scroll speed
//
// 		// browser-compatible preventDefault (for IE and others)
// 		e.preventDefault ? e.preventDefault() : (e.returnValue = false);
// 	}
// }
