// ===== Stores/taskStores.js — État global persisté dans le localStorage =====

// Données par défaut si le localStorage est vide
let etudiantsDefaut = [
  {
    id: 1,
    nom: "fatou",
    prenom: "diop",
    email: "fatou12@gamil.com",
    indicatif: "+221",
    telephone: "7734564746",
    role: "Design",
    actif: true
  },
  {
    id: 2,
    nom: "ndeye",
    prenom: "seye",
    email: "ndeye12@gamil.com",
    indicatif: "+221",
    telephone: "7634564747",
    role: "Marketing",
    actif: true
  }
];

// ----- Chargement depuis le localStorage -----
// Si une clé existe → on parse le JSON, sinon on prend les données par défaut

let etudiantsSauvegardes = localStorage.getItem("e221_etudiants");
export let etudiants = etudiantsSauvegardes
  ? JSON.parse(etudiantsSauvegardes)
  : etudiantsDefaut;

let corbeilleSauvegardee = localStorage.getItem("e221_corbeille");
export let corbeille = corbeilleSauvegardee
  ? JSON.parse(corbeilleSauvegardee)
  : [];

let nextIdSauvegarde = localStorage.getItem("e221_nextId");
export let nextId = nextIdSauvegarde
  ? parseInt(nextIdSauvegarde)
  : 3;

// ----- Sauvegarde dans le localStorage -----
// Appelée après chaque modification des données

export function sauvegarder() {
  localStorage.setItem("e221_etudiants", JSON.stringify(etudiants));
  localStorage.setItem("e221_corbeille", JSON.stringify(corbeille));
  localStorage.setItem("e221_nextId",    String(nextId));
}

// ----- Incrémenter le compteur d'ID -----
export function incrementerId() {
  nextId++;
  sauvegarder();
}
