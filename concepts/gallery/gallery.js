/*
	FIXME

	Mobile
	* Scroll left and right


	Sematics
	* gallery should automatically know its number of views


*/

let galleryView = {
	template: '#gallery-view-template',
	props: ['number', 'activeGalleryNumber'],
	computed: {
		isActive() {
			return this.number === this.activeGalleryNumber
		}
	}
};



new Vue({
	el: "#gallery",
	data: {
		activeGalleryView: 1,
		galleryViewCount: 2
	},
	components: {
		galleryView
	},
	mounted() {
		document.getElementById('gallery').focus();
	},
	methods: {
		nextGalleryItem() {
			if (this.activeGalleryView < this.galleryViewCount) {
				this.activeGalleryView += 1
			}
		},
		previousGalleryItem() {
			if (this.activeGalleryView > 1) {
				this.activeGalleryView -= 1
			}
		}
	},
	computed: {
		leftNavDisabled() {
			return (this.activeGalleryView == 1)
		},
		rightNavDisabled() {
			return (this.activeGalleryView == this.galleryViewCount)
		}
	}
});
