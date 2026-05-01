// ===== UI/modalRenderer.js — Gestion des overlays et du popup formulaire =====

import {
  overlayForm, overlayRestore,
  popupTitre, formId, formNom, formPrenom,
  formEmail, formIndicatif, formTelephone, formRole,
  errNom, errPrenom, errEmail, errTel, errRole
} from "../DOM/element.js";

// ✅ trouverEtudiant vient de son propre fichier (feature/modifier)
import { trouverEtudiant } from "../Services/modifier.js";

export function ouvrirOverlay(id) { document.getElementById(id).classList.add("actif"); }
export function fermerOverlay(id) { document.getElementById(id).classList.remove("actif"); }

export function viderErreurs() {
  errNom.textContent = "";
  errPrenom.textContent = "";
  errEmail.textContent = "";
  errTel.textContent = "";
  errRole.textContent = "";
}

export function ouvrirFormulaireAjout() {
  popupTitre.textContent = "Nouvel étudiant";
  formId.value = ""; formNom.value = ""; formPrenom.value = "";
  formEmail.value = ""; formIndicatif.value = "+221";
  formTelephone.value = ""; formRole.value = "";
  viderErreurs();
  ouvrirOverlay("overlayForm");
}

export function ouvrirFormulaireModif(id) {
  // ✅ Utilise trouverEtudiant depuis modifier.js pour pré-remplir le formulaire
  let e = trouverEtudiant(id);
  if (!e) return;
  popupTitre.textContent = "Modifier l'étudiant";
  formId.value = e.id; formNom.value = e.nom; formPrenom.value = e.prenom;
  formEmail.value = e.email; formIndicatif.value = e.indicatif;
  formTelephone.value = e.telephone; formRole.value = e.role;
  viderErreurs();
  ouvrirOverlay("overlayForm");
}
