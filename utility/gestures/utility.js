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
