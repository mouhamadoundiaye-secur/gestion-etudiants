// ===== Services/filtre.js — Fonction Filtre =====

import { etudiants } from "../Stores/taskStores.js";

// Filtrer les étudiants par nom, prénom ou rôle
export function filtrerEtudiants(terme) {
  terme = terme.toLowerCase().trim();

  // Si la recherche est vide → retourner toute la liste
  if (terme === "") return etudiants;

  let resultat = [];
  for (let i = 0; i < etudiants.length; i++) {
    let e = etudiants[i];
    if (
      e.nom.toLowerCase().includes(terme)    ||
      e.prenom.toLowerCase().includes(terme) ||
      e.role.toLowerCase().includes(terme)
    ) {
      resultat.push(e);
    }
  }
  return resultat;
}
