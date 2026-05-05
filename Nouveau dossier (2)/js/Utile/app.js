// ===== Utile/app.js — Orchestrateur principal =====
// C'est ici que tous les modules sont importés et que les événements sont branchés.

import {
  btnNouvelEtudiant, btnFermerForm, btnAnnulerForm, btnSauvegarder,
  btnOuvrirRestore, btnFermerRestore,
  btnDesarchiver, confirmBox, btnConfirmRestaurer, btnConfirmAnnuler,
  checkAll, searchInput, overlayForm, overlayRestore,
  formId, formNom, formPrenom, formEmail, formIndicatif, formTelephone, formRole,
  errNom, errPrenom, errEmail, errTel, errRole
} from "../DOM/element.js";

import { etudiants, corbeille } from "../Stores/taskStores.js";

import {
  ajouterEtudiant, modifierEtudiant,
  restaurerEtudiant, supprimerDefinitivement,
  emailExiste, filtrerEtudiants
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
window.addEventListener("load", function () {

  // Affichage initial du tableau
  afficherTableau(etudiants);

  // Nouveau étudiant → ouvrir popup vide
  btnNouvelEtudiant.addEventListener("click", function () {
    ouvrirFormulaireAjout();
  });

  // Fermer / annuler le popup formulaire
  btnFermerForm.addEventListener("click", function () {
    fermerOverlay("overlayForm");
  });
  btnAnnulerForm.addEventListener("click", function () {
    fermerOverlay("overlayForm");
  });

  // Enregistrer (ajout ou modif)
  btnSauvegarder.addEventListener("click", function () {
    soumettreFormulaire();
  });

  // Ouvrir le drawer corbeille
  btnOuvrirRestore.addEventListener("click", function () {
    afficherCorbeille();
    checkAll.checked = false;
    ouvrirOverlay("overlayRestore");
  });

  // Fermer le drawer
  btnFermerRestore.addEventListener("click", function () {
    fermerOverlay("overlayRestore");
  });

  // Cocher / décocher tout
  checkAll.addEventListener("change", function () {
    toggleTousCheckboxes();
  });

  // Clic sur "Désarchiver" → afficher la boîte de confirmation
  btnDesarchiver.addEventListener("click", function () {
    confirmBox.style.display = "block";
  });

  // Confirmation : "Restaurer"
  btnConfirmRestaurer.addEventListener("click", function () {
    restaurerSelectionnes();
  });

  // Confirmation : "Annuler" → juste cacher la boîte
  btnConfirmAnnuler.addEventListener("click", function () {
    confirmBox.style.display = "none";
  });

  // Recherche en temps réel
  searchInput.addEventListener("input", function () {
    let resultats = filtrerEtudiants(this.value);
    afficherTableau(resultats);
  });

  // Fermer les overlays en cliquant en dehors
  overlayForm.addEventListener("click", function (e) {
    if (e.target === this) fermerOverlay("overlayForm");
  });

  overlayRestore.addEventListener("click", function (e) {
    if (e.target === this) fermerOverlay("overlayRestore");
  });

});
