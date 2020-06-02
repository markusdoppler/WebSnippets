let shortCodes = [
	"sIB4cOzGJ-w",
	"UfsYdT0wSRI",
	"KRbn7_B4C7E",
	"ivEuu8IEHV0",
	"dIStrxExz_E"
]


function shuffle(array) {
var currentIndex = array.length, temporaryValue, randomIndex;

// While there remain elements to shuffle...
while (0 !== currentIndex) {

	// Pick a remaining element...
	randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex -= 1;

	// And swap it with the current element.
	temporaryValue = array[currentIndex];
	array[currentIndex] = array[randomIndex];
	array[randomIndex] = temporaryValue;
}

return array;
}

let shuffledShortCodes = shuffle(shortCodes)






// var tag = document.createElement('script');
// tag.id = 'iframe-demo';
// tag.src = 'https://www.youtube.com/iframe_api';
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//
// var player;
// function onYouTubeIframeAPIReady() {
// 	player = new YT.Player('kvb-youtube-video', {
// 			playerVars: { 'autoplay': 1, 'controls': 0 },
// 			events: {
// 				'onReady': onPlayerReady,
// 				'onStateChange': onPlayerStateChange
// 			}
// 	});
// }
// function onPlayerReady(event) {
// 	document.getElementById('kvb-youtube-video').style.borderColor = '#FF6D00';
// }
// function changeBorderColor(playerStatus) {
// 	var color;
// 	if (playerStatus == -1) {
// 		color = "#37474F"; // unstarted = gray
// 	} else if (playerStatus == 0) {
// 		color = "#FFFF00"; // ended = yellow
// 	} else if (playerStatus == 1) {
// 		color = "#33691E"; // playing = green
// 	} else if (playerStatus == 2) {
// 		color = "#DD2C00"; // paused = red
// 	} else if (playerStatus == 3) {
// 		color = "#AA00FF"; // buffering = purple
// 	} else if (playerStatus == 5) {
// 		color = "#FF6DOO"; // video cued = orange
// 	}
// 	if (color) {
// 		document.getElementById('kvb-youtube-video').style.borderColor = color;
// 	}
// }
// function onPlayerStateChange(event) {
// 	changeBorderColor(event.data);
// }
