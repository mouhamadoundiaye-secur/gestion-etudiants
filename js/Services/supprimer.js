// ===== Services/supprimer.js — Fonction Supprimer =====

import { etudiants, corbeille, sauvegarder } from "../Stores/taskStores.js";

// Supprimer un étudiant (le déplacer en corbeille)
export function supprimerEtudiant(id) {
  for (let i = 0; i < etudiants.length; i++) {
    if (etudiants[i].id === id) {
      etudiants[i].actif = false;
      corbeille.push(etudiants[i]);
      etudiants.splice(i, 1);
      break;
    }
  }
  sauvegarder();
}

// Supprimer définitivement un étudiant depuis la corbeille
export function supprimerDefinitivement(id) {
  for (let i = 0; i < corbeille.length; i++) {
    if (corbeille[i].id === id) {
      corbeille.splice(i, 1);
      break;
    }
  }
  sauvegarder();
}
