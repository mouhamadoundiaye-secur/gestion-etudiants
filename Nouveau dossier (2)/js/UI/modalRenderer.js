// ===== UI/modalRenderer.js — Gestion des overlays et du popup formulaire =====

import {
  overlayForm, overlayRestore,
  popupTitre, formId, formNom, formPrenom,
  formEmail, formIndicatif, formTelephone, formRole,
  errNom, errPrenom, errEmail, errTel, errRole
} from "../DOM/element.js";

import { trouverEtudiant } from "../Services/taskService.js";

// Ouvrir un overlay
export function ouvrirOverlay(id) {
  document.getElementById(id).classList.add("actif");
}

// Fermer un overlay
export function fermerOverlay(id) {
  document.getElementById(id).classList.remove("actif");
}

// Vider tous les messages d'erreur du formulaire
export function viderErreurs() {
  errNom.textContent    = "";
  errPrenom.textContent = "";
  errEmail.textContent  = "";
  errTel.textContent    = "";
  errRole.textContent   = "";
}

// Ouvrir le popup en mode ajout (champs vides)
export function ouvrirFormulaireAjout() {
  popupTitre.textContent   = "Nouvel étudiant";
  formId.value             = "";
  formNom.value            = "";
  formPrenom.value         = "";
  formEmail.value          = "";
  formIndicatif.value      = "+221";
  formTelephone.value      = "";
  formRole.value           = "";
  viderErreurs();
  ouvrirOverlay("overlayForm");
}

// Ouvrir le popup en mode modification avec les données chargées
export function ouvrirFormulaireModif(id) {
  let e = trouverEtudiant(id);
  if (!e) return;

  popupTitre.textContent   = "Modifier l'étudiant";
  formId.value             = e.id;
  formNom.value            = e.nom;
  formPrenom.value         = e.prenom;
  formEmail.value          = e.email;
  formIndicatif.value      = e.indicatif;
  formTelephone.value      = e.telephone;
  formRole.value           = e.role;
  viderErreurs();
  ouvrirOverlay("overlayForm");
}
