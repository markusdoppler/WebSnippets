let slidingObject = {
	template: '#sliding-object-template',
	data() {
		return {
			positionX: 0,
			positionY: 0,
			deltaX: 1,
			deltaY: 1
		}
	},
	props: ['id', 'scrollChange', 'direction', 'smoothTransitioning'],
	created: function () {
		this.positionX = document.getElementById(this.id).getBoundingClientRect().left;
		this.positionY = document.getElementById(this.id).getBoundingClientRect().top;
	},
	computed: {
		shiftLeft: function() {
			return this.positionX + this.direction.x*this.scrollChange;
		},
		shiftTop: function() {
			return this.positionY + this.direction.y*this.scrollChange;
		},
		slidingStyle: function() {
			return {
				position: 'fixed',
				top: this.shiftTop+'px',
				left: this.shiftLeft+'px',
				transition: this.smoothTransitioning ? 'all 0.3s linear' : 'none'
			};
		}
	}
};


var slideRoom = new Vue({
	el: "#slideRoom",
	data: {
		lastScrollYPosition: 0,
		scrollChange: 0,
		slowFactor: 1,
		smoothTransitioning: false
	},
	components: {
		slidingObject: slidingObject
	},
	created () {
		window.addEventListener('scroll', this.updatePosition);
	},
	destroyed () {
		window.removeEventListener('scroll', this.updatePosition);
	},
	methods: {
		updatePosition() {
			var scrollY = window.scrollY;
			var scrollDelta = scrollY - this.lastScrollYPosition;
			this.scrollChange += -scrollDelta/this.slowFactor;
			this.lastScrollYPosition = scrollY;
		},
		shoveAside() {
			this.scrollChange += -100;
		},
		shoveBack() {
			this.scrollChange += +100;
		}
	}
});







$(window).scroll(function(event){
  // scrollHorizontally(event);
	// var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	// var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

	var scrollX = window.scrollX;
	var scrollY = window.scrollY;

	$('#scrollXY').text("↔︎ " + scrollX + " / ↕︎ " + + scrollY);

	//slideRoom.updatePosition(scrollY);

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
