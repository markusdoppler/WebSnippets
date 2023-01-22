// Placeholder label
document.addEventListener("DOMContentLoaded", function() {
   const placeholderLabels = document.querySelectorAll(".placeholder-label");
   for (let label of placeholderLabels) {
      label.querySelector("input").setAttribute("data-value", "");
      label.querySelector("input").addEventListener("input", function() {
         this.setAttribute("data-value", this.value)
      })
   }
})