// ===== UI/statsRenderer.js — Rendu du drawer corbeille =====

import { restoreBody, drawerActions, confirmBox } from "../DOM/element.js";
import { corbeille } from "../Stores/taskStores.js";

// Afficher le tableau de la corbeille dans le drawer
export function afficherCorbeille() {
  restoreBody.innerHTML = "";

  if (corbeille.length === 0) {
    let tr = document.createElement("tr");
    tr.className = "empty-row";
    tr.innerHTML = "<td colspan='6'>Aucun étudiant supprimé.</td>";
    restoreBody.appendChild(tr);
    drawerActions.style.display = "none";
    return;
  }

  for (let i = 0; i < corbeille.length; i++) {
    let e = corbeille[i];
    let tr = document.createElement("tr");
    tr.innerHTML =
      "<td><input type='checkbox' class='check-restore' data-id='" + e.id + "' /></td>" +
      "<td>" + e.id + "</td>" +
      "<td>" + e.nom + "</td>" +
      "<td>" + e.prenom + "</td>" +
      "<td>" + e.email + "</td>" +
      "<td><span class='badge badge-false'>false</span></td>";
    restoreBody.appendChild(tr);
  }

  // Écouter les checkboxes pour afficher/masquer les boutons d'action
  let checks = restoreBody.querySelectorAll(".check-restore");
  for (let j = 0; j < checks.length; j++) {
    checks[j].addEventListener("change", mettreAJourActionsDrawer);
  }
}

// Afficher ou masquer le bouton désarchiver + cacher la confirmBox si tout décoché
export function mettreAJourActionsDrawer() {
  let checks = restoreBody.querySelectorAll(".check-restore:checked");
  if (checks.length > 0) {
    drawerActions.style.display = "flex";
  } else {
    drawerActions.style.display = "none";
    confirmBox.style.display = "none";  // on cache aussi la confirmation
  }
}

// Récupérer les IDs cochés dans le drawer
export function getIdsCoches() {
  let checks = restoreBody.querySelectorAll(".check-restore:checked");
  let ids = [];
  for (let i = 0; i < checks.length; i++) {
    ids.push(parseInt(checks[i].getAttribute("data-id")));
  }
  return ids;
}
