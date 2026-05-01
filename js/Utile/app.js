// ===== Utile/app.js — Orchestrateur principal =====

import {
  btnNouvelEtudiant, btnFermerForm, btnAnnulerForm, btnSauvegarder,
  btnOuvrirRestore, btnFermerRestore,
  btnDesarchiver, confirmBox, btnConfirmRestaurer, btnConfirmAnnuler,
  checkAll, searchInput, overlayForm, overlayRestore,
  formId, formNom, formPrenom, formEmail, formIndicatif, formTelephone, formRole,
  errNom, errPrenom, errEmail, errTel, errRole
} from "../DOM/element.js";

import { etudiants, corbeille } from "../Stores/taskStores.js";

// ✅ Chaque fonctionnalité vient de son propre fichier
import { ajouterEtudiant } from "../Services/ajouter.js";
import { supprimerEtudiant, supprimerDefinitivement } from "../Services/supprimer.js";
import { modifierEtudiant, emailExiste, filtrerEtudiants } from "../Services/taskService.js";
import { restaurerEtudiant } from "../Services/taskService.js";

import { afficherTableau } from "../UI/tasksRenderer.js";
import { afficherCorbeille, getIdsCoches, mettreAJourActionsDrawer } from "../UI/statsRenderer.js";
import { afficherToast } from "../UI/messageRenderer.js";
import {
  ouvrirOverlay, fermerOverlay, viderErreurs,
  ouvrirFormulaireAjout, ouvrirFormulaireModif
} from "../UI/modalRenderer.js";

// ===== VALIDATION ET SOUMISSION DU FORMULAIRE =====
function soumettreFormulaire() {
  viderErreurs();

  let nom       = formNom.value.trim();
  let prenom    = formPrenom.value.trim();
  let email     = formEmail.value.trim();
  let indicatif = formIndicatif.value;
  let telephone = formTelephone.value.trim();
  let role      = formRole.value;
  let idStr     = formId.value;
  let id        = idStr !== "" ? parseInt(idStr) : null;

  let valide = true;

  if (nom === "") { errNom.textContent = "Le nom est obligatoire."; valide = false; }
  if (prenom === "") { errPrenom.textContent = "Le prénom est obligatoire."; valide = false; }

  let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    errEmail.textContent = "L'email est obligatoire."; valide = false;
  } else if (!regexEmail.test(email)) {
    errEmail.textContent = "Format d'email invalide."; valide = false;
  } else if (emailExiste(email, id)) {
    errEmail.textContent = "Cet email est déjà utilisé."; valide = false;
  }

  if (telephone === "") { errTel.textContent = "Le téléphone est obligatoire."; valide = false; }
  if (role === "") { errRole.textContent = "Veuillez choisir une formation."; valide = false; }

  if (!valide) return;

  let donnees = { nom, prenom, email, indicatif, telephone, role };

  if (id === null) {
    ajouterEtudiant(donnees);
    fermerOverlay("overlayForm");
    afficherTableau(etudiants);
    afficherToast("✅ Étudiant ajouté avec succès !");
  } else {
    modifierEtudiant(id, donnees);
    fermerOverlay("overlayForm");
    afficherTableau(etudiants);
    afficherToast("✅ Étudiant modifié avec succès !");
  }
}

// ===== DRAWER : RESTAURER LES COCHÉS =====
function restaurerSelectionnes() {
  let ids = getIdsCoches();
  if (ids.length === 0) return;
  for (let i = 0; i < ids.length; i++) { restaurerEtudiant(ids[i]); }
  confirmBox.style.display = "none";
  afficherTableau(etudiants);
  afficherCorbeille();
  afficherToast("↩ Étudiant(s) restauré(s) avec succès !");
}

// ===== COCHER / DÉCOCHER TOUT =====
function toggleTousCheckboxes() {
  let etatGlobal = checkAll.checked;
  let checks = document.querySelectorAll(".check-restore");
  for (let i = 0; i < checks.length; i++) { checks[i].checked = etatGlobal; }
  mettreAJourActionsDrawer();
}

// ===== INITIALISATION =====
document.addEventListener("DOMContentLoaded", function () {
  afficherTableau(etudiants);
  btnNouvelEtudiant.addEventListener("click", () => ouvrirFormulaireAjout());
  btnFermerForm.addEventListener("click", () => fermerOverlay("overlayForm"));
  btnAnnulerForm.addEventListener("click", () => fermerOverlay("overlayForm"));
  btnSauvegarder.addEventListener("click", () => soumettreFormulaire());
  btnOuvrirRestore.addEventListener("click", () => { afficherCorbeille(); checkAll.checked = false; ouvrirOverlay("overlayRestore"); });
  btnFermerRestore.addEventListener("click", () => fermerOverlay("overlayRestore"));
  checkAll.addEventListener("change", () => toggleTousCheckboxes());
  btnDesarchiver.addEventListener("click", () => { confirmBox.style.display = "block"; });
  btnConfirmRestaurer.addEventListener("click", () => restaurerSelectionnes());
  btnConfirmAnnuler.addEventListener("click", () => { confirmBox.style.display = "none"; });
  searchInput.addEventListener("input", function () { afficherTableau(filtrerEtudiants(this.value)); });
  overlayForm.addEventListener("click", (e) => { if (e.target === overlayForm) fermerOverlay("overlayForm"); });
  overlayRestore.addEventListener("click", (e) => { if (e.target === overlayRestore) fermerOverlay("overlayRestore"); });
});
