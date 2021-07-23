/* Utility functions */

class DragOffset {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return `(${this.x}, ${this.y})`;
  }
  equalTo(v2) {
    return (v2 instanceof DragOffset) ? (this.x == v2.x && this.y == v2.y) : false;
  }
  add(v2) {
    return new DragOffset(this.x + v2.x, this.y + v2.y);
  }
  subtract(v2) {
    return new DragOffset(this.x - v2.x, this.y - v2.y);
  }

  isDefined() {
    return (this.x !== undefined && this.y !== undefined);
  }

  static init() {
    return new DragOffset(0, 0);
  }

  static null() {
    return new DragOffset(undefined, undefined);
  }

  static offsetFromEvent(e) {
    // use `e.targetTouches[0]` for touch events, `e` for mouse and pointer events
    return new DragOffset(
      (e.targetTouches ? e.targetTouches[0] : e).clientX,
      (e.targetTouches ? e.targetTouches[0] : e).clientY
    )
  }
  static offsetFromRect(rect) {
    return new DragOffset(rect.x, rect.y)
  }
  
}





function ElementGeometry(element) {
  
  element.offsetLeft
  element.offsetTop
  element.offsetWidth
  element.offsetHeight

  element.getBoundingClientRect()

  element.pageXOffset
  element.pageYOffset

  // set positioning


  // scrolling 
  element.scrollTo(xOffset, value);

}

function EventGeometry(e) {
  
  e.pageX
  e.pageY

  e.clientX
  e.clientY

  (e.targetTouches ? e.targetTouches[0] : e).clientX
  (e.targetTouches ? e.targetTouches[0] : e).clientY

}
