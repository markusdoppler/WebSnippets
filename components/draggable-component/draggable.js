const CURSOR_DRAG     = "grab";
const CURSOR_DRAGGING = "grabbing";

class DragItem extends HTMLElement {
  constructor() {
    super();
    
    this.style.willChange = "transform";
    this.style.position = "relative";
    this.tabIndex = 0;
    this.pointerOffset = {};

    // a11y
    this.grabbing = false;
  }
  set pointerOffset({ x, y } = {}) {
    this.isDragging = x !== undefined && y !== undefined;
    window.isDragging = x !== undefined && y !== undefined;
    window.draggingElement = this;

    this.style.cursor = this.isDragging ? CURSOR_DRAGGING : CURSOR_DRAG;

    if (!this.isDragging) {
      this.blur();
      return;
    }
    this.focus();
    this.style.zIndex = 1000;

    this.draggingOffset = new Vector(x, y);
  }
  get pointerOffset() {
    if (this.isDragging) return { x: this.draggingOffset.x, y: this.draggingOffset.y };
  }
  set grabbing(isGrabbing) {
    this.setAttribute("aria-grabbed", isGrabbing);
    if (isGrabbing) {
      this.classList.add("dragging");
    } else {
      this.classList.remove("dragging");
    }
  }
  get grabbing() {
    return this.getAttribute("aria-grabbed") == "true";
  }
  connectedCallback() {
    // if ('PointerEvent' in window) {
    //   pointer
    //   this.addEventListener("pointerdown", this.dragStartHandler);
    //   document.addEventListener("pointermove", (e) => {
    //     this.dragMoveHandler(e);
    //   });
    //   this.addEventListener("pointerup", this.dragEndHandler);
    // } else {
    // }

    // mouse
    this.addEventListener("mousedown", this.dragStartHandler);
    document.addEventListener("mousemove", (e) => {
      this.dragMoveHandler(e);
    });
    this.addEventListener("mouseup", this.dragEndHandler);

    // touch
    this.addEventListener("touchstart", this.dragStartHandler);
    document.addEventListener("touchmove", (e) => {
      this.dragMoveHandler(e);
    });
    this.addEventListener("touchend", this.dragEndHandler);

    // keyboard events
    this.addEventListener("keydown", this.keyDown);

    // focus
    this.addEventListener("focus", () => { console.log("focus"); });
    this.addEventListener("blur", () => { console.log("blur"); });

  }
  disconnectedCallback() {
    // remove all event listeners
  }
  dragStartHandler(e) { e.preventDefault(); this.dragStart(e); }
  dragMoveHandler(e) { e.preventDefault(); this.dragMove(e); }
  dragEndHandler(e) { e.preventDefault(); this.dragEnd(e); }
  dragStart(e) {
    this.style.setProperty("transition", "none");

    this.pointerOffset = {
      x: (e.targetTouches ? e.targetTouches[0] : e).clientX, 
      y: (e.targetTouches ? e.targetTouches[0] : e).clientY
    };
  }
  dragMove(e) {
    if (!this.isDragging) return;

    const pointerPosition = 
      new Vector(
        (e.targetTouches ? e.targetTouches[0] : e).clientX,
        (e.targetTouches ? e.targetTouches[0] : e).clientY
      );
    
    const translation = pointerPosition.subtract(this.draggingOffset);
    this.style.setProperty("transform", `translate(${translation.x}px, ${translation.y}px)`);


    // highlight potential droppables


  }
  dragEnd(e) {
    this.pointerOffset = {};

    if (this.dropBox) {
      this.dropBox.appendChild(this);
      this.style.setProperty("transform", `translate(${0}px, ${0}px)`);
    } else {
      // revert back
      this.style.setProperty("transition", "transform 0.3s cubic-bezier(0.5,0.5,0.66,1.33)");
      setTimeout(() => {
        this.style.setProperty("transform", `translate(${0}px, ${0}px)`);
      }, 0);

      this.addEventListener("transitionend", () => {
        this.style.zIndex = 0;
      }, { once: true });
    }

  }
  keyDown(e) {
    switch (e.code) {
      case "Space":
        e.preventDefault();
        this.grabbing = !this.grabbing;
        break;
      case "ArrowLeft":
        e.preventDefault();
        
        break;
      case "ArrowRight":
        e.preventDefault();
        
        break;
      case "Enter":
        e.preventDefault();
        break;
      case "Tab":
        console.log("tabbing");
        break;
      default:
        break;
    }
  }
}
customElements.define("drag-item", DragItem);






class DropBox extends HTMLElement {
  constructor() {
    super();
    
    this.setAttribute("aria-dropeffect", "none");
  }
  connectedCallback() {
    document.addEventListener("mousemove", (e) => {
      if (!window.isDragging) return;

      const point = {
        x: (e.targetTouches ? e.targetTouches[0] : e).clientX, 
        y: (e.targetTouches ? e.targetTouches[0] : e).clientY
      };
      const rect = this.getBoundingClientRect();

      const ondragover = isInside(point, rect);
      // console.log(this.getAttribute("match"), "dragover", ondragover);
      if (ondragover) {
        this.setAttribute("dragover", true);
        window.draggingElement.dropBox = this;
      } else {
        this.removeAttribute("dragover", true);
      }
    });
  }
  disconnectedCallback() {

  }
}
customElements.define("drop-box", DropBox);




















function isInside(point, rect) {
  return ((point.x > rect.x)
       && (point.x < rect.x + rect.width)
       && (point.y > rect.y)
       && (point.y < rect.y + rect.height))
}


function ElementGeometry(element) {
  
  element.offsetLeft
  element.offsetTop
  element.offsetWidth
  element.offsetHeight

  element.getBoundingClientRect()

  // set positioning


}

function EventGeometry(event) {
  
  e.clientX
  e.clientY

  (e.targetTouches ? e.targetTouches[0] : e).clientX
  (e.targetTouches ? e.targetTouches[0] : e).clientY

}
