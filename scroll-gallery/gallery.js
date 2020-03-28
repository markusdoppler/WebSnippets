/*
	FIXME

	Sematics
	* gallery should automatically know its number of views


	Mobile
	[*]	Scroll left and right
	[ ]	scroll manually, when stopping --> scroll to nearest galleryView
	[ ] animate scroll
	[ ]	

*/

let galleryContainer = document.getElementById('gallery-container');

// Vue.directive('scroll', {
//   inserted: function (el, binding) {
//     let f = function (evt) {
//       if (binding.value(evt, el)) {
//         galleryContainer.removeEventListener('scroll', f)
//       }
//     }
//     galleryContainer.addEventListener('scroll', f)
//   }
// })
//
// new Vue({
//   el: '#gallery-container',
//   methods: {
//     handleScroll: function (evt, el) {
//       if (window.scrollY > 50) {
//         el.setAttribute(
//           'style',
//           'opacity: 1; transform: translate3d(0, -10px, 0)'
//         )
//       }
//       return window.scrollY > 100
//     }
//   }
// })



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
		galleryViewCount: 2,
		documentClientSize: {width: 0, height: 0}
	},
	components: {
		galleryView
	},
	mounted() {
		document.getElementById('gallery').focus();
		this.documentClientSize.width = document.body.clientWidth;
		this.documentClientSize.height = document.body.clientHeight;
	},
	methods: {
		nextGalleryItem() {
			if (this.activeGalleryView < this.galleryViewCount) {
				this.activeGalleryView += 1
				galleryContainer.scrollLeft = (this.activeGalleryView-1)*this.documentClientSize.width
			}
		},
		previousGalleryItem() {
			if (this.activeGalleryView > 1) {
				this.activeGalleryView -= 1
				galleryContainer.scrollLeft = (this.activeGalleryView-1)*this.documentClientSize.width
			}
		}
	},
	computed: {
		leftNavDisabled() {
			return (this.activeGalleryView == 1)
		},
		rightNavDisabled() {
			return (this.activeGalleryView == this.galleryViewCount)
		},
		galleryStyle() {
			return {
				width: this.documentClientSize.width*this.galleryViewCount
			}
		}
	}
});



$('#gallery-container').scroll(function(event){
	var scrollX = galleryContainer.scrollLeft;
	var scrollY = galleryContainer.scrollTop;

	$('#scrollXY').text("↔︎ " + scrollX + " / ↕︎ " + + scrollY);
});
