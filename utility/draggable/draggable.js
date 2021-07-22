/**
 * Bug:
 *  [ ] element dropped on the last dropbox it hovered...
 * 
 * Performance
 *  [ ] document.onmousemove per draggable -> one for all draggables
 *  [ ] document.onmousemove per droppable -> one for all droppables
 * 
 * Draggable
 *  [x] use draggable HTML attribute
 *  [ ] implement events: dragstart, dragmove, dragend
 * 
 * UX
 *  [ ] revert animation
 *  [ ] drop animation (zoom-out zoom-in)
 * 
 * Accessibility
 *  [ ] accessible dragging
 */




// constants

const
  CURSOR_DRAG     = "grab",
  CURSOR_DRAGGING = "grabbing";



// states

let dragging = false;
let draggingElement = null;
let dragStartOffset = DragOffset.null();

let draggingOver = false;
let draggingOverDropbox = null;

let grabbing = false;
let currentDragIndex = 0;
let currentDropIndex = -1;


// a11y – live helper text region
const liveRegion = document.createElement("span");
liveRegion.setAttribute("aria-live", "assertive");
liveRegion.classList.add("live-region");
liveRegion.id = "drag-operations";
document.body.appendChild(liveRegion);
liveRegion.innerText = "Press spacebar to start dragging. Press Left and Right arrow keys to move. Control + M to drop";
setLiveRegionText();


// make all elements with `draggable` attributes draggable
const draggableItems = document.querySelectorAll("[draggable]");
const dropBoxes      = document.querySelectorAll("[droppable]");

draggableItems.forEach((draggable, d) => {
  setupDraggable(draggable, {
    isFirstDraggable: d == 0
  });

  // usage of custom drag events
  // draggable.addEventListener("dragstart", (e) => {});
  // draggable.addEventListener("dragmove", (e) => {});
  // draggable.addEventListener("dragend", (e) => {});
  // draggable.addEventListener("drop", (e) => {});
})

dropBoxes.forEach(dropbox => {
  dropbox.setAttribute("aria-dropeffect", "none");
});








function setupDraggable(draggable, { isFirstDraggable } = {}) {
  draggable.style.willChange = "transform";
  draggable.style.position   = "relative";
  draggable.tabIndex         = isFirstDraggable ? 0 : -1;
  draggable.setAttribute("aria-describedby", "drag-operations");
  draggable.setAttribute("aria-label", "Draggable item");

  setDragOffset(draggable);

  // events
  setupEventListeners(draggable);

  // a11y
  setGrabbing({ draggable: draggable, isGrabbing: false });
}

function setDragOffset(draggable, { pointerOffset = DragOffset.null() } = {}) {
  dragging = pointerOffset.isDefined();

  draggable.style.cursor = dragging ? CURSOR_DRAGGING : CURSOR_DRAG;

  if (!dragging) {
    draggable.blur();
    return;
  }
  draggable.focus();
  draggingElement = draggable;

  draggable.style.zIndex = 1000;

  dragStartOffset = pointerOffset;
}



if ('PointerEvent' in window) {
  document.addEventListener("pointermove", dragMove);
} else {
  document.addEventListener("mousemove", dragMove);
  document.addEventListener("touchmove", dragMove);
}

function setupEventListeners(draggable) {
  if ('PointerEvent' in window) {
    // pointer
    draggable.addEventListener("pointerdown", dragStart);
    draggable.addEventListener("pointerup", dragEnd);
  } else {
    // mouse
    draggable.addEventListener("mousedown", dragStart);
    draggable.addEventListener("mouseup", dragEnd);

    // touch
    draggable.addEventListener("touchstart", dragStart);
    draggable.addEventListener("touchend", dragEnd);
  }

  // keyboard events
  draggable.addEventListener("keydown", keyDown);

  // focus
  // draggable.addEventListener("focus", () => { console.log("focus"); });
  // draggable.addEventListener("blur", () => { console.log("blur"); });
}

function dragStart(e) {
  e.preventDefault();
  this.style.setProperty("transition", "none");
  this.style.setProperty("transform", `translate(${0}px, ${0}px)`);

  setDragOffset(this, { pointerOffset: DragOffset.offsetFromEvent(e) });
}

function dragEnd(e) {
  e.preventDefault();
  setDragOffset(this);


  const acceptsElement = draggingOver && draggingOverDropbox.getAttribute("data-match") == draggingElement.getAttribute("data-match");

  if (acceptsElement) {
    const draggableTransformBeforeDrop = this.getBoundingClientRect();
    draggingOverDropbox.appendChild(this);
    this.style.setProperty("transform", `translate(${0}px, ${0}px)`);
    const draggableTransformAfterDrop = this.getBoundingClientRect();

    const adaptedTranslation = {
      x: draggableTransformBeforeDrop.x - draggableTransformAfterDrop.x, 
      y: draggableTransformBeforeDrop.y - draggableTransformAfterDrop.y
    };
    console.log(draggableTransformBeforeDrop, draggableTransformAfterDrop, adaptedTranslation);

    this.style.setProperty("transform", `translate(${adaptedTranslation.x}px, ${adaptedTranslation.y}px)`);

    setTimeout(() => {
      this.style.setProperty("transition", "transform 0.2s linear");
      this.style.setProperty("transform", `translate(${0}px, ${0}px)`);

    }, 0);

    this.addEventListener("transitionend", () => {
      this.style.zIndex = 0;
      this.style.setProperty("transition", "none");
      this.style.setProperty("animation", `drop 0.4s`);

      this.addEventListener("animationend", () => {
        this.style.setProperty("animation", `none`);
      }, { once: true });  
    }, { once: true });

  // revert back
  } else {
    this.style.setProperty("transition", "transform 0.4s cubic-bezier(0.5,0.5,0.66,1.33)");
    setTimeout(() => {
      this.style.setProperty("transform", `translate(${0}px, ${0}px)`);
    }, 0);

    this.addEventListener("transitionend", () => {
      this.style.zIndex = 0;
      this.style.setProperty("transition", "none");
    }, { once: true });
  }

}

function dragMove(e) {
  e.preventDefault();
  if (!dragging) return;

  const dragMoveOffset = DragOffset.offsetFromEvent(e);
  const translation = dragMoveOffset.subtract(dragStartOffset);

  draggingElement.style.setProperty("transform", `translate(${translation.x}px, ${translation.y}px)`);

  // highlight potential droppables
  draggingOver = false;
  for (let dropbox of dropBoxes) {
    const draddingOverThisDropbox = checkDraggingOverDropbox(e, dropbox);
    if (draddingOverThisDropbox) draggingOver = true;
  }
  if (!draggingOver) draggingOverDropbox = null;
}



function checkDraggingOverDropbox(e, dropbox) {
  if (!dragging) return;

  const point = DragOffset.offsetFromEvent(e);
  const rect = dropbox.getBoundingClientRect();
  const onDragOver = isPointInsideRect(point, rect);
  
  if (onDragOver) {
    dropbox.setAttribute("dragover", true);
    draggingOverDropbox = dropbox;
  } else {
    dropbox.removeAttribute("dragover");
  }

  return onDragOver;
}

function isPointInsideRect(point, rect) {
  return ((point.x > rect.x)
       && (point.x < rect.x + rect.width)
       && (point.y > rect.y)
       && (point.y < rect.y + rect.height))
}






// Accessible Dragging


function setLiveRegionText(text) {
  if (text) {
    liveRegion.innerText = text;
  } else {
    liveRegion.innerText = "Press spacebar to start dragging. Press Left and Right arrow keys to move. Control + M to drop";
  }
}

function keyDown(e) {
  console.log(e.code);
  switch (e.code) {
    case "Space":
      console.log("Space")
      e.preventDefault();
      const currentlyGrabbing = getGrabbing({ draggable: this });
      if (!currentlyGrabbing) {
        setGrabbing({ draggable: this, isGrabbing: true });
      } else {
        dropDraggable();
      }
      break;
    case "ArrowLeft":
      e.preventDefault();
      if (grabbing) changeDropbox(-1);
      else roveTabIndex(-1);
      break;
    case "ArrowRight":
      e.preventDefault();
      if (grabbing) changeDropbox(+1);
      else roveTabIndex(+1);
      break;
    case "Enter":
      e.preventDefault();
      break;
    case "Escape":
      e.preventDefault();
      setGrabbing({ draggable: this, isGrabbing: false });
      break;  
    case "Tab":
      console.log("tabbing");
      break;
    default:
      break;
  }
}

function setGrabbing({ draggable, isGrabbing } = {}) {
  grabbing = isGrabbing;
  draggingElement = draggable;

  draggable.setAttribute("aria-grabbed", isGrabbing);
  if (isGrabbing) {
    setLiveRegionText("Dragging item. Press arrows to move. Spacebar to stop dragging.");
    draggable.classList.add("dragging");
    dragStartOffset = DragOffset.offsetFromRect(draggable.getBoundingClientRect());
    setAcceptingDropboxes();
  } else {
    setLiveRegionText();
    currentDropIndex = -1;
    draggable.classList.remove("dragging");
    draggable.style.setProperty("transform", `translate(${0}px, ${0}px)`);
    dragStartOffset = DragOffset.null();
    unstyleDropboxes();
    resetAcceptingDropboxes();
    draggingOverDropbox = null;
  }
}
function getGrabbing({ draggable } = {}) {
  return draggable.getAttribute("aria-grabbed") == "true";
}


function roveTabIndex(direction) {
  currentDragIndex += direction;
  if (currentDragIndex < 0) currentDragIndex = draggableItems.length - 1;
  if (currentDragIndex == draggableItems.length) currentDragIndex = 0;

  draggableItems.forEach((draggable, d) => {
    draggable.tabIndex = currentDragIndex == d ? 0 : -1;
    if (draggable.tabIndex == 0) draggable.focus();
  });
}


function changeDropbox(direction) {
  if (currentDropIndex == -1) {
    currentDropIndex = 0;
  } else {
    currentDropIndex += direction;
    if (currentDropIndex < 0) currentDropIndex = dropBoxes.length - 1;
    if (currentDropIndex == dropBoxes.length) currentDropIndex = 0;
  }

  unstyleDropboxes();
  helpDraggingOverDropbox(draggingElement, dropBoxes[currentDropIndex]);
  draggingOverDropbox = dropBoxes[currentDropIndex];
}

function dropDraggable() {
  setLiveRegionText("Dropped draggable.");
  draggingOverDropbox.appendChild(draggingElement);
  setGrabbing({ draggable: draggingElement, isGrabbing: false });
}

function unstyleDropboxes() {
  for (let dropbox of dropBoxes) { dropbox.style.background = "var(--color-drop-background)"; }
}

function setAcceptingDropboxes() {
  for (let dropbox of dropBoxes) { dropbox.setAttribute("aria-dropeffect", "move"); }
}
function resetAcceptingDropboxes() {
  for (let dropbox of dropBoxes) { dropbox.setAttribute("aria-dropeffect", "none"); }
}

function helpDraggingOverDropbox(draggable, dropbox) {
  dropbox.style.background = "var(--color-drop-background-hover)";

  const dropboxRect        = DragOffset.offsetFromRect(dropbox.getBoundingClientRect())
  const adaptedTranslation = dropboxRect.subtract(dragStartOffset);

  // move draggable to dropbox
  draggable.style.setProperty("transform", `translate(${adaptedTranslation.x + 20}px, ${adaptedTranslation.y - 20}px)`);
}





