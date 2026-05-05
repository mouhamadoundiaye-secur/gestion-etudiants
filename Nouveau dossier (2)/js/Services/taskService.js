// ===== Services/taskService.js — Logique métier =====

import { etudiants, corbeille, nextId, incrementerId, sauvegarder } from "../Stores/taskStores.js";

// Ajouter un étudiant
export function ajouterEtudiant(donnees) {
  donnees.id = nextId;
  donnees.actif = true;
  etudiants.push(donnees);
  incrementerId(); // incrémente ET sauvegarde
}

// Modifier un étudiant existant
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

// Supprimer un étudiant (envoyer en corbeille)
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

// Restaurer un étudiant depuis la corbeille
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

// Supprimer définitivement depuis la corbeille
export function supprimerDefinitivement(id) {
  for (let i = 0; i < corbeille.length; i++) {
    if (corbeille[i].id === id) {
      corbeille.splice(i, 1);
      break;
    }
  }
  sauvegarder();
}

// Vérifier si un email existe déjà (sauf pour l'id en cours de modif)
export function emailExiste(email, idExclus) {
  for (let i = 0; i < etudiants.length; i++) {
    if (etudiants[i].email === email && etudiants[i].id !== idExclus) {
      return true;
    }
  }
  return false;
}

// Trouver un étudiant par son ID
export function trouverEtudiant(id) {
  for (let i = 0; i < etudiants.length; i++) {
    if (etudiants[i].id === id) {
      return etudiants[i];
    }
  }
  return null;
}

// Filtrer les étudiants par recherche (nom, prénom, rôle)
export function filtrerEtudiants(terme) {
  terme = terme.toLowerCase().trim();
  if (terme === "") return etudiants;
  var resultat = [];
  for (let i = 0; i < etudiants.length; i++) {
    let e = etudiants[i];
    if (
      e.nom.toLowerCase().includes(terme) ||
      e.prenom.toLowerCase().includes(terme) ||
      e.role.toLowerCase().includes(terme)
    ) {
      resultat.push(e);
    }
  }
  return resultat;
}
