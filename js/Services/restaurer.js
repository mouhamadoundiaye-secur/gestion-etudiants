// ===== Services/restaurer.js — Fonction Restaurer =====

import { etudiants, corbeille, sauvegarder } from "../Stores/taskStores.js";

// Restaurer un étudiant depuis la corbeille vers la liste active
export function restaurerEtudiant(id) {
  for (let i = 0; i < corbeille.length; i++) {
    if (corbeille[i].id === id) {
      corbeille[i].actif = true;
      etudiants.push(corbeille[i]);
      corbeille.splice(i, 1);
      break;
    }
  }
  sauvegarder();
}
