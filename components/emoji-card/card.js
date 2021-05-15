const templateWithSingleSlot = document.createElement("template");
templateWithSingleSlot.innerHTML = `
  <div class="emoji-card">
    <h3></h3>
    <div class="info">
      <slot />
    </div>
  </div>
`;

const templateWithMultipleSlots = document.createElement("template");
templateWithMultipleSlots.innerHTML = `
  <div class="emoji-card">
    <h3></h3>
    <p></p>
    <div class="info">
      <slot name="fruit1" />
      <slot name="fruit2" />
    </div>
  </div>
`;


class EmojiCard extends HTMLElement {
  constructor() {
    super();
    // 1
    // this.innerHTML = `${this.getAttribute('name')}`;

    // 2
    // this.innerHTML = `<style>h3 { color: coral; }</style><h3>${this.getAttribute('name')}: ${this.getAttribute('emoji')}<h3>`;

    // 3
    // add to shadow DOM
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(templateWithMultipleSlots.content.cloneNode(true));
    this.shadowRoot.querySelector("h3").innerHTML = this.getAttribute('name');
    this.shadowRoot.querySelector("p").innerHTML = this.getAttribute('emoji');
  }

  connectedCallback() {

  }

  disconnectedCallback() {

  }
}

window.customElements.define('emoji-card', EmojiCard);