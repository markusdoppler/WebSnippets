// values for keycodes
const VK_LEFT  = 37;
const VK_UP    = 38;
const VK_RIGHT = 39;
const VK_DOWN  = 40;

class RadioGroup extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.setAttribute('role', 'radiogroup');
    this.radios = Array.from(this.querySelectorAll("radio-button"));

    // Setup initial state
    if (this.hasAttribute('selected')) {
      let selected = parseInt(this.getAttribute('selected'));
      this._selected = selected;
      this.radios[selected].setAttribute('tabindex', 0);
      this.radios[selected].setAttribute('aria-checked', true);
    } else {
      this._selected = 0;
      this.radios[0].setAttribute('tabindex', 0);
      this.radios[0].setAttribute('aria-checked', true);
    }

    this.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.addEventListener("click", this.handleClick.bind(this));
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
      case VK_UP:
      case VK_LEFT: {
        e.preventDefault(); // prevent scrolling when pressing arrow key

        if (this.selected === 0) {
          this.selected = this.radios.length - 1;
        } else {
          this.selected--;
        }
        break;
      }
      case VK_DOWN:
      case VK_RIGHT: {
        e.preventDefault(); // prevent scrolling when pressing arrow key

        if (this.selected === this.radios.length - 1) {
          this.selected = 0;
        } else {
          this.selected++;
        }
        break;
      }
    }
  }
  handleClick(e) {
    e.preventDefault();
    this.radios.forEach((radio, r) => {
      if (e.target === radio) this.selected = r;
    });
  }

  set selected(index) {
    if (isFinite(this.selected)) {
      // Set the old button to tabindex -1
      let previousSelected = this.radios[this.selected];
      previousSelected.tabIndex = -1;
      previousSelected.removeAttribute("aria-checked", false);
    }

    // Set the new button to tabindex 0 and focus it
    let newSelected = this.radios[index];
    newSelected.tabIndex = 0;
    newSelected.focus();
    newSelected.setAttribute("aria-checked", true);

    this.setAttribute("selected", index);
    this._selected = index;
  }
  get selected() {
    return this._selected;
  }
}
window.customElements.define('radio-group', RadioGroup);
