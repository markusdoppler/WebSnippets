var supported = {};

const jsList = document.querySelector(".js-support");
const cssList = document.querySelector(".css-support");
const browserList = document.querySelector(".browser-details");



// JS
supported.js = {};
supported.js.pointerEvent = {
  supported: 'PointerEvent' in window,
  description: "PointerEvent"
};
supported.js.windowCSS = {
  supported: window.CSS,
  description: "window.CSS"
};

fillList(jsList, supported.js) 


// CSS
supported.css = {};
supported.css.hover = {
  supported: window.matchMedia("(hover: hover)").matches,
  description: "@media (hover: hover)"
};
supported.css.cssSupports = {
  supported: CSS.supports,
  description: "CSS @supports rule"
};
supported.css.displayFlex = {
  supported: CSS.supports('display', 'flex'),
  description: "display: flex;"
};
supported.css.min = {
  supported: CSS.supports('width', 'min(100%, 500px)'),
  description: "min(100%, 500px)"
};
supported.css.max = {
  supported: CSS.supports('width', 'max(100%, 500px)'),
  description: "max(100%, 500px)"
};
supported.css.clamp = {
  supported: CSS.supports('width', 'clamp(1rem, 5vw, 2rem)'),
  description: "clamp(1rem, 5vw, 2rem)"
};
supported.css.aspectRatio = {
  supported: CSS.supports('aspect-ratio', '1 / 1'),
  description: "aspectRatio: 1 / 1;"
};
supported.css.redBgWhiteText = {
  supported: CSS.supports("(background-color: red) and (color: white)"),
  description: "background-color: red; \ncolor: white;"
};
supported.css.minWidth = {
  supported: window.matchMedia("(min-width: 600px)").matches,
  description: "@media (min-width: 600px)"
};
supported.css.maxAspectRatio = {
  supported: window.matchMedia("(max-aspect-ratio: 3/4)").matches,
  description: "@media (max-aspect-ratio: 3/4)"
};
supported.css.orientationLandscape = {
  supported: window.matchMedia("(orientation: landscape)").matches,
  description: "@media (orientation: landscape)"
};
supported.css.orientationPortrait = {
  supported: window.matchMedia("(orientation: portrait)").matches,
  description: "@media (orientation: portrait)"
};

fillList(cssList, supported.css) 

// Browser
supported.browser = {};
supported.browser.userAgent = {
  supported: navigator.userAgent,
  description: "navigator.userAgent\n" + navigator.userAgent
};
supported.browser.platform = {
  supported: navigator.platform,
  description: "navigator.platform\n" + navigator.platform
};
supported.browser.systemLanguage = {
  supported: navigator.systemLanguage,
  description: "navigator.systemLanguage\n" + navigator.systemLanguage
};
supported.browser.cookieEnabled = {
  supported: navigator.cookieEnabled,
  description: "navigator.cookieEnabled"
};
fillList(browserList, supported.browser) 



function fillList(list, object) {
  Object.keys(object).forEach((key, k) => {
    const li = document.createElement("li");
    li.innerText = object[key].description;
    li.className = object[key].supported ? "supported" : "";
    list.appendChild(li);
  })  
}
