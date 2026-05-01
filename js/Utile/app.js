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

// ✅ ajouterEtudiant vient maintenant de son propre fichier (feature/ajouter)
import { ajouterEtudiant } from "../Services/ajouter.js";

import {
  modifierEtudiant,
  restaurerEtudiant,
  supprimerDefinitivement,
  emailExiste,
  filtrerEtudiants
} from "../Services/taskService.js";

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

  if (nom === "") {
    errNom.textContent = "Le nom est obligatoire.";
    valide = false;
  }

  if (prenom === "") {
    errPrenom.textContent = "Le prénom est obligatoire.";
    valide = false;
  }

  let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    errEmail.textContent = "L'email est obligatoire.";
    valide = false;
  } else if (!regexEmail.test(email)) {
    errEmail.textContent = "Format d'email invalide.";
    valide = false;
  } else if (emailExiste(email, id)) {
    errEmail.textContent = "Cet email est déjà utilisé.";
    valide = false;
  }

  if (telephone === "") {
    errTel.textContent = "Le téléphone est obligatoire.";
    valide = false;
  }

  if (role === "") {
    errRole.textContent = "Veuillez choisir une formation.";
    valide = false;
  }

  if (!valide) return;

  let donnees = { nom, prenom, email, indicatif, telephone, role };

  if (id === null) {
    // ✅ Utilise ajouterEtudiant depuis ajouter.js
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

// ===== DRAWER : RESTAURER LES COCHÉS (après confirmation) =====
function restaurerSelectionnes() {
  let ids = getIdsCoches();
  if (ids.length === 0) return;
  for (let i = 0; i < ids.length; i++) {
    restaurerEtudiant(ids[i]);
  }
  confirmBox.style.display = "none";
  afficherTableau(etudiants);
  afficherCorbeille();
  afficherToast("↩ Étudiant(s) restauré(s) avec succès !");
}

// ===== DRAWER : COCHER / DÉCOCHER TOUT =====
function toggleTousCheckboxes() {
  let etatGlobal = checkAll.checked;
  let checks = document.querySelectorAll(".check-restore");
  for (let i = 0; i < checks.length; i++) {
    checks[i].checked = etatGlobal;
  }
  mettreAJourActionsDrawer();
}

// ===== INITIALISATION AU CHARGEMENT DE LA PAGE =====
document.addEventListener("DOMContentLoaded", function () {

  afficherTableau(etudiants);

  btnNouvelEtudiant.addEventListener("click", function () {
    ouvrirFormulaireAjout();
  });

  btnFermerForm.addEventListener("click", function () {
    fermerOverlay("overlayForm");
  });

  btnAnnulerForm.addEventListener("click", function () {
    fermerOverlay("overlayForm");
  });

  btnSauvegarder.addEventListener("click", function () {
    soumettreFormulaire();
  });

  btnOuvrirRestore.addEventListener("click", function () {
    afficherCorbeille();
    checkAll.checked = false;
    ouvrirOverlay("overlayRestore");
  });

  btnFermerRestore.addEventListener("click", function () {
    fermerOverlay("overlayRestore");
  });

  checkAll.addEventListener("change", function () {
    toggleTousCheckboxes();
  });

  btnDesarchiver.addEventListener("click", function () {
    confirmBox.style.display = "block";
  });

  btnConfirmRestaurer.addEventListener("click", function () {
    restaurerSelectionnes();
  });

  btnConfirmAnnuler.addEventListener("click", function () {
    confirmBox.style.display = "none";
  });

  searchInput.addEventListener("input", function () {
    let resultats = filtrerEtudiants(this.value);
    afficherTableau(resultats);
  });

  overlayForm.addEventListener("click", function (e) {
    if (e.target === this) fermerOverlay("overlayForm");
  });

  overlayRestore.addEventListener("click", function (e) {
    if (e.target === this) fermerOverlay("overlayRestore");
  });

});
