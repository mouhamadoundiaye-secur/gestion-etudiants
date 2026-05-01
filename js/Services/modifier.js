// ===== Services/modifier.js — Fonction Modifier =====

import { etudiants, sauvegarder } from "../Stores/taskStores.js";

// Modifier les données d'un étudiant existant
export function modifierEtudiant(id, donnees) {
  for (let i = 0; i < etudiants.length; i++) {
    if (etudiants[i].id === id) {
      etudiants[i].nom       = donnees.nom;
      etudiants[i].prenom    = donnees.prenom;
      etudiants[i].email     = donnees.email;
      etudiants[i].indicatif = donnees.indicatif;
      etudiants[i].telephone = donnees.telephone;
      etudiants[i].role      = donnees.role;
      break;
    }
  }
  sauvegarder();
}

// Trouver un étudiant par son ID (utilisé pour pré-remplir le formulaire)
export function trouverEtudiant(id) {
  for (let i = 0; i < etudiants.length; i++) {
    if (etudiants[i].id === id) {
      return etudiants[i];
    }
  }
  return null;
}

// Vérifier si un email est déjà utilisé (hors l'étudiant en cours de modif)
export function emailExiste(email, idExclus) {
  for (let i = 0; i < etudiants.length; i++) {
    if (etudiants[i].email === email && etudiants[i].id !== idExclus) {
      return true;
    }
  }
  return false;
}
