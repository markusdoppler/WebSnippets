Vue.directive('mousemove', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('mousemove', f)
      }
    }
    window.addEventListener('mousemove', f)
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
	props: ['mousePosition', 'id'],
	mounted: function () {
		this.documentClientSize.width = document.body.clientWidth;
		this.documentClientSize.height = document.body.clientHeight;

		this.boundingClientRect = document.getElementById(this.id).getBoundingClientRect();
	},
  watch: {
    mousePosition: function (val) {
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
				x: this.mousePosition.x - this.center.x,
				y: this.mousePosition.y - this.center.y,
				abs: Math.sqrt((this.mousePosition.x - this.center.x)**2 + (this.mousePosition.y - this.center.y)**2)
			}
		},
		repelledStyle() {
			if (this.distance.abs > 0) {
				let unitDistanceVector = {
					x: this.distance.x/this.distance.abs,
					y: this.distance.y/this.distance.abs
				}
        this.displacement.x -= unitDistanceVector.x * 1000**2/this.distance.abs**2 + 0.01 * this.displacement.x
				this.displacement.y -= unitDistanceVector.y * 1000**2/this.distance.abs**2 + 0.01 * this.displacement.y
				this.displacement.abs = Math.sqrt(this.displacement.x**2 + this.displacement.y**2)
				return {
					'left': `${this.displacement.x}`,
					'top': `${this.displacement.y}`
				}
			}
		}
	}
};



var scrollRoom = new Vue({
	el: "#mouse-room",
	data: {
    mousePosition: {x: 0, y: 0}
	},
	components: {
		repelledObject
	},
	methods: {
    updateMousePosition: function (evt, el) {
			// if (window.scrollY > 50) {
			// 	el.setAttribute(
			// 		'style',
			// 		'opacity: 1; transform: translate3d(0, -10px, 0)'
			// 	)
			// }
			// return window.scrollY > 100
			this.mousePosition = {x: evt.pageX, y: evt.pageY}
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
	$('#mouse-pointer').css({left: `${clientX-10}px`, top: `${clientY-10}px`});
});
