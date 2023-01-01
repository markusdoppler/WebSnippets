new Vue({
	el: '#fullscreen-button',
	data: {
		fullscreen: false,
		htmlDocument: null
	},
	created () {
		document.addEventListener('fullscreenchange', this.fullscreenChange)
	},
	mounted() {
		this.htmlDocument = document.documentElement
	},
	destroyed () {
		document.removeEventListener('fullscreenchange', this.fullscreenChange)
	},
	methods: {
		openFullscreen() {
		  if (this.htmlDocument.requestFullscreen) {
		    this.htmlDocument.requestFullscreen();
		  } else if (this.htmlDocument.mozRequestFullScreen) { /* Firefox */
		    this.htmlDocument.mozRequestFullScreen();
		  } else if (this.htmlDocument.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
		    this.htmlDocument.webkitRequestFullscreen();
		  } else if (this.htmlDocument.msRequestFullscreen) { /* IE/Edge */
		    this.htmlDocument.msRequestFullscreen();
		  }
		},
		closeFullscreen() {
		  if (document.exitFullscreen) {
		    document.exitFullscreen();
		  } else if (document.mozCancelFullScreen) { /* Firefox */
		    document.mozCancelFullScreen();
		  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
		    document.webkitExitFullscreen();
		  } else if (document.msExitFullscreen) { /* IE/Edge */
		    document.msExitFullscreen();
		  }
		},
		fullscreenChange(event) {
			// alert("changing full screen", document.fullscreenElement)
			this.fullscreen = document.fullscreenElement
		},
		toggleFullscreen() {
			// this.fullscreen = !this.fullscreen

			if (this.fullscreen) {
				this.closeFullscreen()
			} else {
				this.openFullscreen()
			}
		}
	}
})
