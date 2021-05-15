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

function Star(x,y,r,m) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.m = m;
  this.dx = 10*(Math.random()-0.5)/m;
  this.dy = 10*(Math.random()-0.5)/m;

  this.draw = function(c) {
    c.beginPath();
    c.arc(this.x, this.y, this.r, Math.PI*2, false);
    c.fill();
  };
  this.updatePosition = function(c) {
    if (this.x < -0.1*window.innerWidth || this.x > 1.1*window.innerWidth) {
      this.dx = -this.dx/Math.abs(this.dx) * 10*(Math.random()-0.5)/m;
    }
    if (this.y < -0.1*window.innerHeight || this.y > 1.1*window.innerHeight) {
      this.dy = -this.dy/Math.abs(this.dy) * 10*(Math.random()-0.5)/m;
    }


    this.x += this.dx;
    this.y += this.dy;

    this.draw(c);
  };
  this.applyForce = function(mx,my) {
    let vx = mx-this.x;
    let vy = my-this.y;
    let distanceSquared = (vx)**2 + (vy)**2;
    if (distanceSquared < 10) {
      distanceSquared = 10;
    }
    // F = m.a = m.M/r^2
    let fx = vx/Math.abs(vx) * this.m * 10 / distanceSquared;
    let fy = vy/Math.abs(vy) * this.m * 10 / distanceSquared;

    this.dx += fx/10;
    this.dy += fy/10;
  };
}

function throttle(fn, wait) {
  var time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}

let animatedCanvas = {
	template: '#animated-canvas-template',
	data() {
		return {
      documentClientSize: {width: 0, height: 0},
			boundingClientRect: {top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0},
      canvasSize: {width: 0, height: 0},
      canvas: null,
      stars: [],
      localMousePosition: {x: 0, y: 0}
		}
	},
	props: ['mousePosition', 'id'],
	mounted: function () {
		this.documentClientSize.width = document.body.clientWidth;
		this.documentClientSize.height = document.body.clientHeight;
		this.boundingClientRect = document.getElementById(this.id).getBoundingClientRect();

    // canvas
    this.canvasSize = {width: window.innerWidth, height: 0.5*window.innerHeight}

    this.canvas = document.querySelector('canvas');
    this.canvas.width = this.canvasSize.width;
    this.canvas.height = this.canvasSize.height;
    // console.log(this.canvas.width, this.canvas.height);

    // initial mouse position
    this.localMousePosition = {
      x: this.canvasSize.width*2/5,
      y: this.canvasSize.height/2
    }

    // drawing context
    let c = this.canvas.getContext('2d');

    for (let i=0; i<100; i++) {
      let x = window.innerWidth*Math.random();//-this.boundingClientRect.left;
      let y = window.innerHeight*Math.random()-this.boundingClientRect.top;
      let r = 1 + 2*Math.random();
      let m = 5 + 5*Math.random();
      let star = new Star(x,y,r,m);
      this.stars.push(star);
    }

    this.animateCanvas();
	},
  watch: {
    mousePosition: function(pos) {
      this.localMousePosition = {
        x: pos.x,//-this.boundingClientRect.left,
        y: pos.y-this.boundingClientRect.top
      }
    }
  },
  methods: {
    animateCanvas() {
      window.requestAnimationFrame(this.animateCanvas);

      let c = this.canvas.getContext('2d');
      c.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
      for (let star of this.stars) {
        // c.beginPath();
        // c.arc(this.localMousePosition.x, this.localMousePosition.y, 10, Math.PI*2, false);
        // c.shadowBlur = 0;
        // c.fillStyle = '#000000';
        // c.shadowColor = "#000000";
        // c.fill();

        star.applyForce(this.localMousePosition.x, this.localMousePosition.y);
        c.shadowBlur = 3;
        c.fillStyle = '#ffffbb';
        c.shadowColor = "#ffffbb";
        star.updatePosition(c);

        //setTimeout(function() {}, 1000);
        // console.log("animationStep");
      }
    }
	}
};


var mouseRoom = new Vue({
	el: "#mouse-room",
	data: {
    mousePosition: {x: 0, y: 0}
	},
	components: {
		animatedCanvas
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
