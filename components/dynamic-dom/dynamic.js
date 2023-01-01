let refs = {}

function updateRefs() {
   const documentRefs = document.querySelectorAll("[data-ref]")
   documentRefs.forEach(refElement => {
      const ref = refElement.getAttribute("data-ref")
      console.log(refElement, ref)
      if (!refs.hasOwnProperty(ref)) {
         // Object.defineProperty(ref, ref, {
         //    value: refElement,
         //    get() { return },
         //    set(newValue) { return },
         // })
      }
   })

}
updateRefs()
// USAGE???



// create word
const word = document.querySelector("word-element")
Object.defineProperty(word, "language", {
   set(newLanguage) {
      this.innerText = newLanguage
      this.setAttribute("data-language", newLanguage)
   },
   get() { return this.innerText }
})

function changeLanguage(language) {
   word.language = language
}


