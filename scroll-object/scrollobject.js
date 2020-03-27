/*
	Visible vertical viewport:
		minVisibleY = 0 + scrollY
		maxVisibleY = window.height + scrollY

	Item visible:
		let top = document.getElementById(this.id).getBoundingClientRect().top
		let right = document.getElementById(this.id).getBoundingClientRect().right
		let bottom = document.getElementById(this.id).getBoundingClientRect().bottom
		let left = document.getElementById(this.id).getBoundingClientRect().left

		partiallyVisible = (bottom > minVisibleY) && (top < maxVisibleY)
		fullyVisible     = (top > minVisibleY) && (bottom < maxVisibleY)
*/
let scrollingObject = {
// Vue.component({
	template: '#scrolling-object-template',
	data() {
		return {
			documentClientSize: {width: 0, height: 0},
			boundingClientRect: {top: 0, right: 0, bottom: 0, left: 0},
			size: {width: 0, height: 0}
		}
	},
	props: ['scrollPosition', 'id'],
	mounted: function () {
		this.documentClientSize.width = document.body.clientWidth;
		this.documentClientSize.height = document.body.clientHeight;

		this.boundingClientRect = document.getElementById(this.id).getBoundingClientRect();

		this.size.height = this.boundingClientRect.bottom-this.boundingClientRect.top;
		this.size.width = this.boundingClientRect.right-this.boundingClientRect.left;
	},
	methods: {

	},
	computed: {
		topToTopPercent() {
			return (this.documentClientSize.height > 0) ? (this.boundingClientRect.top - this.scrollPosition.y)/this.documentClientSize.height : -1
		},
		bottomToTopPercent() {
			return (this.documentClientSize.height > 0) ? (this.boundingClientRect.bottom - this.scrollPosition.y)/this.documentClientSize.height : -1
		},
		leftToLeftPercent() {
			return (this.documentClientSize.width > 0) ? (this.boundingClientRect.left - this.scrollPosition.x)/this.documentClientSize.width : -1
		},
		rightToLeftPercent() {
			return (this.documentClientSize.width > 0) ? (this.boundingClientRect.right - this.scrollPosition.x)/this.documentClientSize.width: -1
		},
		heightPercent() {
			if (this.documentClientSize.height > 0) {
				return (this.size.height)/this.documentClientSize.height
			}
		},
		widthPercent() {
			if (this.documentClientSize.width > 0) {
				return (this.size.width)/this.documentClientSize.width
			}
		},
		styleOfInterest() {
			var initialAlpha = 1.0;
			var finalAlpha = 1.0;
			var alpha = initialAlpha;
			if (this.topToTopPercent > 0.2 && this.topToTopPercent < 0.4) {// && this.bottomToTopPercent > 0.6 && this.bottomToTopPercent < 0.8) {
				alpha = finalAlpha - 0.8*(0.4-this.topToTopPercent)/(0.4-0.2)
			} else if (this.topToTopPercent < 0.3) {
				alpha = 0.2
			}

			return {'opacity': `${Math.sin(Math.PI/2*alpha)}`}
		}
	}
};



var scrollRoom = new Vue({
	el: "#scroll-room",
	data: {
		lastScrollYPosition: {x:0, y:0},
		scrollChange: 0,
		slowFactor: 1
	},
	components: {
		scrollingObject
	},
	created () {
		window.addEventListener('scroll', this.updatePosition);
	},
	destroyed () {
		window.removeEventListener('scroll', this.updatePosition);
	},
	methods: {
		updatePosition() {
			var scrollX = window.scrollX;
			var scrollY = window.scrollY;
			var scrollDelta = scrollY - this.lastScrollYPosition.y;
			this.scrollChange += scrollDelta/this.slowFactor;
			this.lastScrollYPosition.x = scrollX;
			this.lastScrollYPosition.y = scrollY;
		}
	}
});







$(window).scroll(function(event){
	var scrollX = window.scrollX;
	var scrollY = window.scrollY;

	$('#scrollXY').text("↔︎ " + scrollX + " / ↕︎ " + + scrollY);
});

$(document).ready(function(event){
	var width = document.body.clientWidth;
	var height = document.body.clientHeight;

	$('#screenHW').text(`(width: ${width}, height: ${height})`);
});

$(window).mousemove(function(event){
	var clientX = event.clientX;
	var clientY = event.clientY;
	var pageX = event.pageX;
	var pageY = event.pageY;

	$('#mouseXY').html(`in window: (${clientX}, ${clientY})<br>in document: (${pageX}, ${pageY})`);
});
// $(window).touchmove(function(event){
// 	var clientX = event.targetTouches[0].clientX;
// 	var clientY = event.targetTouches[0].clientY;
// 	var pageX = event.targetTouches[0].pageX;
// 	var pageY = event.targetTouches[0].pageY;
//
// 	$('#mouseXY').html(`in window: (${clientX}, ${clientY})<br>in document: (${pageX}, ${pageY})`);
// });
