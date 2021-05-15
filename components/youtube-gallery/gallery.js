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

		this.width = w
		this.height = 7/12*w
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
	el: "#voices",
	data: {
		voccData: [
			{"youtube": "8wIrnAbsZAg", "name": "Franz Seidl", "unterseite": "https://klimavolksbegehren.at/vocc-franz-seidl/"},
			{"youtube": "K1uydZ2WyrQ", "name": "Rudi Hoheneder", "unterseite": "https://klimavolksbegehren.at/vocc-rudi-hoheneder/"}
		],
		allVoccData: [],
		indices: {start: 0, end: 2},
		playingVideo: false
	},
	components: {
		youtubeVideo,
		youtubePreview
	},
	mounted() {
		this.voccData = shuffledVoicesOfClimateChangeData.slice(this.indices.start, this.indices.end+1)
		this.allVoccData = shuffledVoicesOfClimateChangeData
		this.loadedVideos = true
	},
	methods: {
		selectPreviewVideo(videoData) {
			// index for videoShortCode
			let index = 1
			this.voccData.forEach((item, i) => {
				if (item.youtube == videoData) index = i
			});

			if (index == 0) this.slideLeft()
			if (index == 2) this.slideRight()
		},
		slideLeft() {
			// remove last item and add it at the beginning
			let lastData = this.allVoccData.pop();
			this.allVoccData.unshift(lastData)

			this.voccData = this.allVoccData.slice(this.indices.start, this.indices.end+1)
		},
		slideRight() {
			// remove first item and add it at the end
			let firstData = this.allVoccData.shift();
			this.allVoccData.push(firstData)

			this.voccData = this.allVoccData.slice(this.indices.start, this.indices.end+1)
		}
	}
});
