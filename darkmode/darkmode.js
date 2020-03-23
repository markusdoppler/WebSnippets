jQuery.propHooks.checked = {
    set: function (el, value) {
        if (el.checked !== value) {
            el.checked = value;
            $(el).trigger('change');
        }
    }
};

/* AUTO DARK MODE */
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
	$('#darkmode-input').prop('checked', true);
  inputChange();
  $("#darkmode-default").html("dark");
} else {
	$('#darkmode-input').prop('checked', false);
  inputChange();
  $("#darkmode-default").html("light");
}


/* JQuery */

$('#darkmode-input').on('change', inputChange);

function inputChange() {
  //if ($(this).is(':checked')) {
  if ($('#darkmode-input').prop('checked')) {
    $('body').addClass('dark');
    $("#darkmode-on-off").html("on");
  } else {
    $('body').removeClass('dark');
    $("#darkmode-on-off").html("off");
  }
}


/* Vanilla Javascript */

/*
function loadEventListeners() {
  var darkmodeInput = document.getElementById("darkmode-input");
  darkmodeInput.addEventListener("change", darkmodeChange, false);

  // //  darkmode toggle
	// var toggle = document.getElementsByClassName("tip")[0];
	// toggle.addEventListener("mouseover",   hoverToggle, false);
	// toggle.addEventListener("click",       toggleDarkMode, false);
	// toggle.addEventListener("mouseout",    unhoverToggle, false);
	// toggle.addEventListener("touchstart",  hoverToggle, false);
	// toggle.addEventListener("touchend",    unhoverToggle, false);
	// toggle.addEventListener("touchcancel", unhoverToggle, false);
}

function toggleDarkMode() {
	if (!darkMode) {
		document.getElementsByTagName("body")[0].className = "dark";
	} else {
		document.getElementsByTagName("body")[0].className = "";
	}
	darkMode = !darkMode;
}

function darkmodeChange(e) {

}
*/
