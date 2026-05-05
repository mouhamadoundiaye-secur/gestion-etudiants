// ===== UI/messageRenderer.js — Affichage des messages toast =====

import { toast } from "../DOM/element.js";

// Afficher un message toast temporaire (3 secondes)
export function afficherToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  setTimeout(function () {
    toast.classList.remove("visible");
  }, 3000);
}
