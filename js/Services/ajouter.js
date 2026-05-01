// ===== Services/ajouter.js — Fonction Ajouter =====

import { etudiants, nextId, incrementerId } from "../Stores/taskStores.js";

// Ajouter un nouvel étudiant à la liste
export function ajouterEtudiant(donnees) {
  donnees.id   = nextId;
  donnees.actif = true;
  etudiants.push(donnees);
  incrementerId(); // incrémente le compteur et sauvegarde
}
