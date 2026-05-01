// ===== UI/tasksRenderer.js — Rendu du tableau principal des étudiants =====

import { tableBody } from "../DOM/element.js";
import { supprimerEtudiant } from "../Services/taskService.js";
import { etudiants } from "../Stores/taskStores.js";
import { afficherToast } from "./messageRenderer.js";
import { ouvrirFormulaireModif } from "./modalRenderer.js";

// Afficher le tableau des étudiants actifs
export function afficherTableau(liste) {
  tableBody.innerHTML = "";

  if (liste.length === 0) {
    let tr = document.createElement("tr");
    tr.className = "empty-row";
    tr.innerHTML = "<td colspan='8'>Aucun étudiant trouvé.</td>";
    tableBody.appendChild(tr);
    return;
  }

  for (let i = 0; i < liste.length; i++) {
    let e = liste[i];
    let tr = document.createElement("tr");
    tr.setAttribute("data-id", e.id);

    tr.innerHTML =
      "<td>" + e.id + "</td>" +
      "<td>" + e.nom + "</td>" +
      "<td>" + e.prenom + "</td>" +
      "<td>" + e.email + "</td>" +
      "<td>" + e.indicatif + " " + e.telephone + "</td>" +
      "<td>" + e.role + "</td>" +
      "<td><span class='badge badge-true'>true</span></td>" +
      "<td>" +
        "<button class='btn-del' data-id='" + e.id + "' title='Supprimer'>🗑</button>" +
        "<button class='btn-edit' data-id='" + e.id + "' title='Modifier'>✏</button>" +
      "</td>";

    tableBody.appendChild(tr);
  }

  // Attacher les listeners après rendu
  attacherBoutonsTableau();
}

// Attacher les boutons supprimer et modifier du tableau
export function attacherBoutonsTableau() {
  let btnsSup = tableBody.querySelectorAll(".btn-del");
  for (let i = 0; i < btnsSup.length; i++) {
    btnsSup[i].addEventListener("click", function () {
      let id = parseInt(this.getAttribute("data-id"));
      supprimerEtudiant(id);
      afficherTableau(etudiants);
      afficherToast("🗑 Étudiant déplacé dans la corbeille.");
    });
  }

  let btnsEdit = tableBody.querySelectorAll(".btn-edit");
  for (let j = 0; j < btnsEdit.length; j++) {
    btnsEdit[j].addEventListener("click", function () {
      let id = parseInt(this.getAttribute("data-id"));
      ouvrirFormulaireModif(id);
    });
  }
}
