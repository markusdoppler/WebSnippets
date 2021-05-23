class ClampCalculator extends HTMLElement {
  constructor() {
    super();

    let clampTemplate = document.getElementById("clamp-template")
    const shadowRoot = this.attachShadow({ mode: "open" })
    shadowRoot.appendChild(clampTemplate.content.cloneNode(true))
    
    this.unit = this.getAttribute("unit")
  }
  connectedCallback() {
    // unit inputs
    this.shadowRoot.querySelectorAll("[name=css-unit]").forEach(radioInput => {
      radioInput.addEventListener("input", () => {
        this.unit = this.shadowRoot.querySelector(`[for=${radioInput.id}]`).innerHTML
        this.calculateClampValue()
      })
    })

    // range inputs
    this.shadowRoot.querySelectorAll(".input-range").forEach(range => {
      this.calculateClampValue()

      range.addEventListener("input", () => {
        this.calculateClampValue()
      })
    })
  }
  calculateClampValue() {
    const unitFactor = {
      "px": 1,
      "rem": 1/16,
    }

    const x1      = parseFloat(this.shadowRoot.querySelector("#x1").value);
    const x2      = parseFloat(this.shadowRoot.querySelector("#x2").value);
    const device1 = parseFloat(this.shadowRoot.querySelector("#D1").value);
    const device2 = parseFloat(this.shadowRoot.querySelector("#D2").value);
    this.shadowRoot.querySelector(`span.x1`).innerHTML = `${x1*unitFactor[this.unit]}${this.unit}`
    this.shadowRoot.querySelector(`span.x2`).innerHTML = `${x2*unitFactor[this.unit]}${this.unit}`
    this.shadowRoot.querySelector(`span.D1`).innerHTML = `${device1*unitFactor[this.unit]}${this.unit}`
    this.shadowRoot.querySelector(`span.D2`).innerHTML = `${device2*unitFactor[this.unit]}${this.unit}`

    const k = (x2 - x1) / (device2 - device1)
    const d = x1 - k * device1

    let dynamicSize = `${(k * 100).toFixed(2)}vw + ${(d*unitFactor[this.unit]).toFixed(2)}${this.unit}`;
    
    this.shadowRoot.querySelector(".result").innerHTML = `clamp(${(x1*unitFactor[this.unit]).toFixed(2)}${this.unit}, ${dynamicSize}, ${(x2*unitFactor[this.unit]).toFixed(2)}${this.unit})`
  }
}
document.addEventListener("DOMContentLoaded", () => {
  customElements.define("clamp-calculator", ClampCalculator)
})
