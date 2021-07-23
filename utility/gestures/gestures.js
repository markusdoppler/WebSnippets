
const element = document.querySelector(".circle");
const area = document.querySelector(".gesture-area");

// Geometry Adjustments
// let dragTranslation = { x: 0, y: 0 };
let gestureRotation = 0;
let gestureScale = 1;
let wheelScale = 1;


// setup
updateElement();




area.addEventListener("gesturestart", gestureHandler)
area.addEventListener("gesturechange", gestureHandler)
area.addEventListener("gestureend", gestureHandler)
function gestureHandler(e) {
  e.preventDefault();
  
  gestureRotation = e.rotation;
  gestureScale = e.scale;

  setStatus(".gesture-rotation", e.rotation);
  setStatus(".gesture-scale", e.scale);
  
  updateElement();
}

area.addEventListener("wheel", mousewheelHandler)
function mousewheelHandler(e) {
  e.preventDefault();
  
  console.log(e.type, e);

  // wheelScaleFactor = 1 + (e.deltaY / 10);
  wheelScale += (Math.sign(e.deltaY) / 100);
  
  setStatus(".wheel-delta-x", e.deltaX);
  setStatus(".wheel-delta-y", e.deltaY);
  setStatus(".wheel-delta-z", e.deltaZ);

  updateElement();
}




function updateElement() {
  let translation = { x: 0, y: 0 };
  let rotation = 0;
  let scale = 1;  

  rotation += gestureRotation;
  scale *= wheelScale;
  scale *= gestureScale;

  // element.style.setProperty("transition", "transform 0.05s linear");
  element.style.setProperty("transform-origin", "center");
  element.style.setProperty("transform", `translate(${translation.x}px, ${translation.y}px) rotate(${rotation}deg) scale(${scale})`)
}

function setStatus(selector, number) {
  document.querySelector(selector).innerHTML = number.toFixed(2);
}