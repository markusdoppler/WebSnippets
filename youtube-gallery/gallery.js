let youtubeVideo = {
	template: '#youtube-video-template',
	data() {
		return {
			width: 535,
			height: 350
		}
	},
	props: {'videoShortcode': String},
	mounted() {
		let w = window.innerWidth
		let h = window.innerHeight

		this.width = 0.9*w
		this.height = 7/12*0.9*w
		if (w > 1000) {
			this.width = 0.7*w
			this.height = 7/12*0.7*w
		}
	}
}

let youtubePreview = {
	template: '#youtube-preview-template',
	props: {'videoShortcode': String, 'highlighted': Boolean},
	methods: {
		selectVideo() {
			this.$emit('selecting', this.videoShortcode)
		}
	}
}

var scrollRoom = new Vue({
	el: "#scroll-room",
	data: {
		shortCodes: [],
		allShortCodes: [],
		indices: {start: 0, end: 2},
		playingVideo: false
	},
	components: {
		youtubeVideo,
		youtubePreview
	},
	mounted() {
		this.shortCodes = shuffledShortCodes.slice(this.indices.start, this.indices.end+1)
		this.allShortCodes = shuffledShortCodes
		this.loadedVideos = true
	},
	methods: {
		selectPreviewVideo(videoCode) {
			// index for videoShortCode
			let index = shortCodes.indexOf(videoCode)

			if (index == 0) this.slideLeft()
			if (index == 2) this.slideRight()
		},
		slideLeft() {
			// remove last item and add it at the beginning
			let lastCode = this.allShortCodes.pop();
			this.allShortCodes.unshift(lastCode)

			this.shortCodes = this.allShortCodes.slice(this.indices.start, this.indices.end+1)
		},
		slideRight() {
			// remove first item and add it at the end
			let firstCode = this.allShortCodes.shift();
			this.allShortCodes.push(firstCode)

			this.shortCodes = this.allShortCodes.slice(this.indices.start, this.indices.end+1)
		}
	}
});
