// ===== UI/tasksRenderer.js — Rendu du tableau principal =====

import { tableBody } from "../DOM/element.js";
// ✅ supprimerEtudiant vient de son propre fichier (feature/supprimer)
import { supprimerEtudiant } from "../Services/supprimer.js";
import { etudiants } from "../Stores/taskStores.js";
import { afficherToast } from "./messageRenderer.js";
import { ouvrirFormulaireModif } from "./modalRenderer.js";

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
  attacherBoutonsTableau();
}

export function attacherBoutonsTableau() {
  // ✅ Bouton supprimer → utilise supprimerEtudiant de supprimer.js
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
