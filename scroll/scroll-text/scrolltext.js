/*
	Visible vertical viewport:
		minVisibleY = 0 + scrollY
		maxVisibleY = window.height + scrollY

	Item visible:
		let top = document.getElementById(this.id).getBoundingClientRect().top
		let right = document.getElementById(this.id).getBoundingClientRect().right
		let bottom = document.getElementById(this.id).getBoundingClientRect().bottom
		let left = document.getElementById(this.id).getBoundingClientRect().left

		partiallyVisible = (bottom > minVisibleY) && (top < maxVisibleY)
		fullyVisible     = (top > minVisibleY) && (bottom < maxVisibleY)
*/

let slidingText = {
	template: '#sliding-text-template',
	data() {
		return {
			// textPosition: 0,
			textLength: -1
		}
	},
	props: ['scrollChange', 'textContent'],
	created: function () {
		this.textLength = this.textContent.length;
		// this.positionX = document.getElementById(this.id).getBoundingClientRect().left;
		// this.positionY = document.getElementById(this.id).getBoundingClientRect().top;
	},
	methods: {

	},
	computed: {
		textHighlighted() {
			return this.textContent.substring(0,this.textPosition);
		},
		textNotHighlighted() {
			return this.textContent.substring(this.textPosition, this.textLength);
		},
		textPosition() {
			return this.scrollChange
		}
	}
};





let letterBox = {
	template: '#letter-box-template',
	props: ['letter', 'highlighted']
}

let slidingTextFixed = {
	template: '#sliding-text-fixed-template',
	components: {
		letterBox
	},
	data() {
		return {
			// textPosition: 0,
			textLength: -1
		}
	},
	props: ['scrollChange', 'textContent'],
	created: function () {
		this.textLength = this.textContent.length;
		// this.positionX = document.getElementById(this.id).getBoundingClientRect().left;
		// this.positionY = document.getElementById(this.id).getBoundingClientRect().top;
	},
	computed: {
		textHighlighted() {
			return this.textContent.substring(0,this.textPosition).split('');
		},
		textNotHighlighted() {
			return this.textContent.substring(this.textPosition, this.textLength).split('');
		},
		textPosition() {
			return this.scrollChange
		}
	}
};


var slideRoom = new Vue({
	el: "#slideRoom",
	data: {
		lastScrollYPosition: 0,
		scrollChange: 0,
		slowFactor: 1
	},
	components: {
		slidingText,
		slidingTextFixed
	},
	created () {
		window.addEventListener('scroll', this.updatePosition);
	},
	destroyed () {
		window.removeEventListener('scroll', this.updatePosition);
	},
	methods: {
		updatePosition() {
			var scrollY = window.scrollY;
			var scrollDelta = scrollY - this.lastScrollYPosition;
			this.scrollChange += scrollDelta/this.slowFactor;
			this.lastScrollYPosition = scrollY;
		}
	}
});




$(window).scroll(function(event){
	var scrollX = window.scrollX;
	var scrollY = window.scrollY;

	$('#scrollXY').text("↔︎ " + scrollX + " / ↕︎ " + + scrollY);
});
