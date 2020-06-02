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


let rotatingCube = {
	template: '#rotating-cube-template',
	data() {
		return {
      initialRotation: {x: -22, y: -38, z: 0},
      rotation: {x: -22, y: -38, z: 0}
		}
	},
	props: ['windowScroll'],
  computed: {
	},
  watch: {
    windowScroll: function (scroll) {
      this.rotation.y = -Math.sqrt((this.initialRotation.y - scroll.y)**2 + (this.initialRotation.x - scroll.x)**2)
    }
  },
  mounted: function () {

	},
  methods: {
    // turnRight() {
    //   this.rotation.y += 90
    //   console.log("turning right", this.rotation.y);
    // },
    // turnLeft() {
    //   this.rotation.y -= 90
    // },
    // flip() {
    //   this.rotation.z -= 180
    // }
  }
};



var scrollRoom = new Vue({
	el: "#scroll-room",
	data: {
    windowScroll: {x: 0, y: 0}
	},
	components: {
		rotatingCube
	},
	methods: {
    updateWindowScroll: function (evt, el) {
			this.windowScroll = {x: window.scrollX, y: window.scrollY}
      console.log(this.windowScroll.y);
		}
	}
});





/*  FOOTER Bar  */

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
