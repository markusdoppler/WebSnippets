Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})


let repelledObject = {
	template: '#repelled-object-template',
	data() {
		return {
      documentClientSize: {width: 0, height: 0},
			boundingClientRect: {top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0},
			displacement: {x: 0, y: 0}
		}
	},
	props: ['windowScroll', 'id'],
	mounted: function () {
		this.documentClientSize.width = document.body.clientWidth;
		this.documentClientSize.height = document.body.clientHeight;

		this.boundingClientRect = document.getElementById(this.id).getBoundingClientRect();
	},
  watch: {
    windowScroll: function (val) {
      this.boundingClientRect = document.getElementById(this.id).getBoundingClientRect();
    }
  },
	computed: {
		center() {
			return {
				x: this.boundingClientRect.left + this.boundingClientRect.width/2,
				y: this.boundingClientRect.top + this.boundingClientRect.height/2
			}
		},
		distance() {
			return {
				x: this.documentClientSize.width/2 + this.windowScroll.x - this.center.x,
				y: this.documentClientSize.height/6 + this.windowScroll.y - this.center.y,
				abs: Math.sqrt((this.documentClientSize.width/2 + this.windowScroll.x - this.center.x)**2 + (this.documentClientSize.height/6 + this.windowScroll.y - this.center.y)**2)
			}
		},
		repelledStyle() {
			if (this.distance.abs > 0) {
				let unitDistanceVector = {
					x: this.distance.x/this.distance.abs,
					y: this.distance.y/this.distance.abs
				}
        this.displacement.x -= unitDistanceVector.x * 3000**2/this.distance.abs**2 + 0.1 * this.displacement.x
				this.displacement.y -= unitDistanceVector.y * 3000**2/this.distance.abs**2 + 0.1 * this.displacement.y
				this.displacement.abs = Math.sqrt(this.displacement.x**2 + this.displacement.y**2)
				return {
					'left': `${this.displacement.x}`,
					'top': `${this.displacement.y}`,
          transform: `rotate(${this.windowScroll.y/3}deg)`
				}
			}
		}
	}
};



var scrollRoom = new Vue({
	el: "#scroll-room",
	data: {
    mousePosition: {x: 0, y: 0},
    windowScroll: {x: 0, y: 0}
	},
	components: {
		repelledObject
	},
	methods: {
    updateWindowScroll: function (evt, el) {
			// if (window.scrollY > 50) {
			// 	el.setAttribute(
			// 		'style',
			// 		'opacity: 1; transform: translate3d(0, -10px, 0)'
			// 	)
			// }
			// return window.scrollY > 100
			this.windowScroll = {x: window.scrollX, y: window.scrollY}
		}
	}
});







$(window).scroll(function(event){
	var scrollX = window.scrollX;
	var scrollY = window.scrollY;

	$('#scrollXY').text("↔︎ " + scrollX + " / ↕︎ " + + scrollY);
  $('#scroll-pointer').css({left: `${document.body.clientWidth/2-20}px`, top: `${document.body.clientHeight*1/6-20}px`});
});

$(document).ready(function(event){
	var width = document.body.clientWidth;
	var height = document.body.clientHeight;

  $('#scroll-pointer').css({left: `${width/2-20}px`, top: `${height/6-20}px`});

	$('#screenHW').text(`(width: ${width}, height: ${height})`);
});

$(window).mousemove(function(event){
	var clientX = event.clientX;
	var clientY = event.clientY;
	var pageX = event.pageX;
	var pageY = event.pageY;

	$('#mouseXY').html(`in window: (${clientX}, ${clientY})<br>in document: (${pageX}, ${pageY})`);
	// $('#mouse-pointer').css({left: `${clientX-10}px`, top: `${clientY-10}px`});
});
