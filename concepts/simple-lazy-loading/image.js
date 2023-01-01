var image = document.images[0];
var bigImage = document.createElement("img");

bigImage.onload = function() {
	image.src = this.src;
	image.className = "noblur";
}

setTimeout(function () {
	bigImage.src = "../assets/peacock-300.png";
}, 5000)
