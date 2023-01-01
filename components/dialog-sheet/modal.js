// try modal
const dialog = document.querySelector("dialog")
dialogPolyfill.registerDialog(dialog);

document.body.addEventListener("click", (e) => {
   if (e.target != document.body) return
   dialog.showModal()
})
document.querySelector("dialog button").addEventListener("click", () => {
   dialog.close()
})


// dismiss









const modal = document.querySelector("#modal");
const openModal = document.querySelector(".open-button");
const closeModal = document.querySelector(".close-button");

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("click", () => {
  modal.setAttribute("closing", "");

  modal.addEventListener(
    "animationend",
    () => {
      modal.removeAttribute("closing");
      modal.close();
    },
    { once: true }
  );
});
