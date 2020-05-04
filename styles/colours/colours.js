let colourItem = {
	template: "#colour-item-template",
	props: ['colour-code', 'mode'],
	data() {
		return {
			hex: "000000",
			rgb: {r:0, g:0, b:0},
			opacity: 1.0
		}
	},
	created() {
		if (this.colourCode.startsWith("#")) {
			this.hex = this.colourCode.split("#")[1].toUpperCase();
			this.rgb = this.rgbCodeFromHex(this.hex);
		} else if (this.colourCode.startsWith("rgb")) {
				let rgba =  this.colourCode.split("(")[1].replace(")", "").split(",");
				this.rgb = {r: parseInt(rgba[0]), g: parseInt(rgba[1]), b: parseInt(rgba[2])};
				this.opacity = rgba.length ==4 ? parseFloat(rgba[3]) : 1.0;
				this.hex = this.hexCodeFromRGB(this.rgb);
		}
	},
	computed: {
		colourStyle() {
			return {
				backgroundColor: this.rgbaCode
			}
		},
		hexCode() {
			return "#"+this.hex
		},
		rgbaCode() {
			return `rgba(${this.rgb.r},${this.rgb.g},${this.rgb.b},${this.opacity})`
		}
	},
	methods: {
		hexCodeFromRGB(rgb) {
			var hexCode = "";
			for (c in rgb) {
				var hex = rgb[c].toString(16);
				hexCode += hex.length == 1 ? "0" + hex : hex;
			}
			return hexCode.toUpperCase()
		},
		rgbCodeFromHex(hex) {
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		  return result ? {
		    r: parseInt(result[1], 16),
		    g: parseInt(result[2], 16),
		    b: parseInt(result[3], 16)
		  } : null;
		},
		select() {
			let c = this.mode == "hex" ? this.hexCode : this.rgbaCode
			this.$emit('copy', c)
		}
	}
};

let colourModeSelector = {
	template: "#colour-mode-selector-template",
	data() {
		return {
			modes: ["hex", "rgba"],
			currentMode: "hex"
		}
	},
	methods: {
		selectMode(mode) {
			this.currentMode = mode
			this.$emit('selected', this.currentMode)
		}
	}
}

var colourPicker = new Vue({
	el: "#colour-board",
	data: {
		selectedColour: null,
		mode: "hex"
	},
	components: {
		colourModeSelector,
		colourItem
	},
	methods: {
		changeMode(mode) {
			this.mode = mode
		},
		copyColourCode(code) {
			this.selectedColour = code;
			copyTextToClipboard(code);
		}
	}
});




/* Copy to clipboard */

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}
