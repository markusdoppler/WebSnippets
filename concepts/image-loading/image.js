function ImageData(path, alternativeText, loaded) {
	this.src = path
	this.alt = alternativeText
	this.loaded = loaded
}


let loadingImage = {
	template: '#loading-image-template',
	data() {
		return {
			image: new ImageData("", "", false),
			currentImageResolutionIndex: 0
		}
	},
	props: {
		imageData: {
			type: Array,
			default: [new ImageData("", "", false)]
		}
	},
	computed: {
		numberOfImages() {
			return this.imageData.length
		}
	},
	mounted() {
		this.image = this.imageData[0]

		this.loadHigherResolutionImage()
	},
	methods: {
		loadHigherResolutionImage() {
			if (this.currentImageResolutionIndex + 1 >= this.numberOfImages) return
			this.currentImageResolutionIndex += 1

			let newImage = new Image()
			setTimeout(() => {
				newImage.src = this.imageData[this.currentImageResolutionIndex].src
				newImage.onload = () => {
					this.image.src = newImage.src
					this.imageData[this.currentImageResolutionIndex].loaded = true
					this.loadHigherResolutionImage()
				}
			}, 2000)
		}
	}
}





let loadingImageStatus = {
	template: '<li class="image-status-list-item">{{imageData.alt}} <i class="status-yes" v-if="imageData.loaded">☑︎</i><i class="status-no" v-else>☒</i></li>',
	props: {
		imageData: {
			type: Object,
			default: new ImageData("", "", false)
		}
	},
	mounted() {
	}
};





new Vue({
	el: "#image-loading-container",
	data: {
		imageDataList: [],
		loaded: false
	},
	components: {
		loadingImage,
		loadingImageStatus
	},
	mounted() {
		const imageDataLow = new ImageData('../assets/peacock-favicon.png', 'Butterfly low quality', true)
		const imageDataMedium = new ImageData('../assets/peacock-100.png', 'Butterfly medium quality', false)
		const imageDataHigh = new ImageData('../assets/peacock-300.png', 'Butterfly high quality', false)
		this.imageDataList.push(imageDataLow, imageDataMedium, imageDataHigh)

		this.loaded = true
	}
});
