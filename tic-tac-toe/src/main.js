import DisplayController from "./DisplayController.js";

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  DisplayController.init();
  DisplayController.render();

  const startDialog = document.getElementById("start-dialog");
  if (startDialog) {
    startDialog.showModal();
  }
});
