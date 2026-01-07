function getPeriode(etab) {
    if (!etab) return null;

    const annees = Object.keys(etab)
        .filter(k => /^\d{4}$/.test(k))
        .sort();

    if (annees.length < 2) return null;

    return {
        annees,
        debut: annees[0],
        fin: annees[annees.length - 1],
        precedentes: annees.slice(0, -1).reverse() // N-1, N-2, N-3...
    };
}

function anneeScolaire(a) {
    const y = Number(a);
    return Number.isFinite(y) ? `${y}/${y + 1}` : a;
}


function afficherTableauEtab(etab) {
    const container = document.getElementById("tableEtablissement");
    if (!container) return;

    const periode = getPeriode(etab);
    if (!periode) {
        container.innerHTML = "";
        return;
    }

    const { annees, fin } = periode;
    const anNSup = String(Number(fin) + 1);

    let html = `<table class="table-etab">`;

    /* =======================
       EN-TÊTE (étape 2)
       ======================= */
    html += `
        <thead>
            <tr>
                <th>Indicateur</th>
                ${annees.map(a =>
                    `<th>${anneeScolaire(a)}</th>`
                ).join("")}
            </tr>
        </thead>
        <tbody>
    `;

    /* =======================
       ÉTAPE 3 – IPS
       ======================= */
    const valIPS = a => etab[a]?.DHG?.IPS ?? 0;

    html += `<tr><th>IPS</th>`;
    annees.forEach(a => {
        html += `<td>${valIPS(a).toFixed(1)}</td>`;
    });
    html += `</tr>`;

    html += `<tr class="delta"><th>Écart vs rentrée ${anneeScolaire(fin)}</th>`;
    annees.forEach(a => {
        const diff = valIPS(fin) - valIPS(a);
        const cls = diff > 0 ? "pos" : diff < 0 ? "neg" : "";
        html += `<td class="${cls}">
            ${a === fin ? "—" : (diff > 0 ? "+" : "") + diff.toFixed(1)}
        </td>`;
    });
    html += `</tr>`;

    /* =======================
       ÉTAPE 4 – EFFECTIFS 6èmes
       ======================= */
    const valEff6 = a => etab[a]?.EFF_6EME ?? 0;

    html += `<tr><th>Effectifs 6èmes</th>`;
    annees.forEach(a => {
        html += `<td>${valEff6(a)}</td>`;
    });
    html += `</tr>`;

    // Ligne variations vs année courante
    html += `<tr class="delta"><th>Écart vs rentrée ${anneeScolaire(fin)}</th>`;
    annees.forEach(a => {
        const diff = valEff6(fin) - valEff6(a);
        const cls = diff > 0 ? "pos" : diff < 0 ? "neg" : "";
        html += `<td class="${cls}">
            ${a === fin ? "—" : (diff > 0 ? "+" : "") + diff}
        </td>`;
    });
    html += `</tr>`;

    /* =======================
       ÉTAPE 4 – EFFECTIFS 5èmes
       ======================= */
    const valEff5 = a => etab[a]?.EFF_5EME ?? 0;

    html += `<tr><th>Effectifs 5èmes</th>`;
    annees.forEach(a => {
        html += `<td>${valEff5(a)}</td>`;
    });
    html += `</tr>`;

    // Ligne variations vs année courante
    html += `<tr class="delta"><th>Écart vs rentrée ${anneeScolaire(fin)}</th>`;
    annees.forEach(a => {
        const diff = valEff5(fin) - valEff5(a);
        const cls = diff > 0 ? "pos" : diff < 0 ? "neg" : "";
        html += `<td class="${cls}">
            ${a === fin ? "—" : (diff > 0 ? "+" : "") + diff}
        </td>`;
    });
    html += `</tr>`;

    /* =======================
       ÉTAPE 4 – EFFECTIFS 4èmes
       ======================= */
    const valEff4 = a => etab[a]?.EFF_4EME ?? 0;

    html += `<tr><th>Effectifs 4èmes</th>`;
    annees.forEach(a => {
        html += `<td>${valEff4(a)}</td>`;
    });
    html += `</tr>`;

    // Ligne variations vs année courante
    html += `<tr class="delta"><th>Écart vs rentrée ${anneeScolaire(fin)}</th>`;
    annees.forEach(a => {
        const diff = valEff4(fin) - valEff4(a);
        const cls = diff > 0 ? "pos" : diff < 0 ? "neg" : "";
        html += `<td class="${cls}">
            ${a === fin ? "—" : (diff > 0 ? "+" : "") + diff}
        </td>`;
    });
    html += `</tr>`;

    /* =======================
       ÉTAPE 4 – EFFECTIFS 3èmes
       ======================= */
    const valEff3 = a => etab[a]?.EFF_3EME ?? 0;

    html += `<tr><th>Effectifs 3èmes</th>`;
    annees.forEach(a => {
        html += `<td>${valEff3(a)}</td>`;
    });
    html += `</tr>`;

    // Ligne variations vs année courante
    html += `<tr class="delta"><th>Écart vs rentrée ${anneeScolaire(fin)}</th>`;
    annees.forEach(a => {
        const diff = valEff3(fin) - valEff3(a);
        const cls = diff > 0 ? "pos" : diff < 0 ? "neg" : "";
        html += `<td class="${cls}">
            ${a === fin ? "—" : (diff > 0 ? "+" : "") + diff}
        </td>`;
    });
    html += `</tr>`;

    /* =======================
       ÉTAPE 4 – EFFECTIFS ULIS
       ======================= */
    const valEffULIS = a => etab[a]?.EFF_ULIS ?? 0;

    html += `<tr><th>Effectifs 3èmes</th>`;
    annees.forEach(a => {
        html += `<td>${valEffULIS(a)}</td>`;
    });
    html += `</tr>`;

    // Ligne variations vs année courante
    html += `<tr class="delta"><th>Écart vs rentrée ${anneeScolaire(fin)}</th>`;
    annees.forEach(a => {
        const diff = valEffULIS(fin) - valEffULIS(a);
        const cls = diff > 0 ? "pos" : diff < 0 ? "neg" : "";
        html += `<td class="${cls}">
            ${a === fin ? "—" : (diff > 0 ? "+" : "") + diff}
        </td>`;
    });
    html += `</tr>`;

    /* =======================
       ÉTAPE 4 – EFFECTIF TOTAL
       ======================= */
    const valEff = a => etab[a]?.TOTAL_ELEVES ?? 0;

    html += `<tr><th>Effectif Total</th>`;
    annees.forEach(a => {
        html += `<td>${valEff(a)}</td>`;
    });
    html += `</tr>`;

    // Ligne variations vs année courante
    html += `<tr class="delta"><th>Écart vs rentrée ${anneeScolaire(fin)}</th>`;
    annees.forEach(a => {
        const diff = valEff(fin) - valEff(a);
        const cls = diff > 0 ? "pos" : diff < 0 ? "neg" : "";
        html += `<td class="${cls}">
            ${a === fin ? "—" : (diff > 0 ? "+" : "") + diff}
        </td>`;
    });
    html += `</tr>`;

    /* =======================
       ÉTAPE 4 – Nombre de divisions
       ======================= */
    const valDiv = a => etab[a]?.TOTAL_DIVISIONS ?? 0;

    html += `<tr><th>Nombre de divisions</th>`;
    annees.forEach(a => {
        html += `<td>${valDiv(a)}</td>`;
    });
    html += `</tr>`;

    // Ligne variations vs année courante
    html += `<tr class="delta"><th>Écart vs rentrée ${anneeScolaire(fin)}</th>`;
    annees.forEach(a => {
        const diff = valDiv(fin) - valDiv(a);
        const cls = diff > 0 ? "pos" : diff < 0 ? "neg" : "";
        html += `<td class="${cls}">
            ${a === fin ? "—" : (diff > 0 ? "+" : "") + diff}
        </td>`;
    });
    html += `</tr>`;

    /* =======================
       ÉTAPE 5 – DHG PART A
       ======================= */
    const valPartA = a => etab[a]?.DHG?.PART_A ?? 0;

    html += `<tr><th>DHG – Part A</th>`;
    annees.forEach(a => {
        html += `<td>${valPartA(a).toFixed(1)}</td>`;
    });
    html += `</tr>`;

    html += `<tr class="delta"><th>Écart vs rentrée ${anneeScolaire(fin)}</th>`;
    annees.forEach(a => {
        const diff = valPartA(fin) - valPartA(a);
        const cls = diff > 0 ? "pos" : diff < 0 ? "neg" : "";
        html += `<td class="${cls}">
            ${a === fin ? "—" : (diff > 0 ? "+" : "") + diff.toFixed(1)}
        </td>`;
    });
    html += `</tr>`;

    /* =======================
       ÉTAPE 5 – DHG PART A 6ème
       ======================= */
    const valPartA6 = a => etab[a]?.DHG?.PART_A_6 ?? 0;

    html += `<tr><th>DHG – Part A 6èmes</th>`;
    annees.forEach(a => {
        html += `<td>${valPartA6(a).toFixed(1)}</td>`;
    });
    html += `</tr>`;

    html += `<tr class="delta"><th>Écart vs rentrée ${anneeScolaire(fin)}</th>`;
    annees.forEach(a => {
        const diff = valPartA6(fin) - valPartA6(a);
        const cls = diff > 0 ? "pos" : diff < 0 ? "neg" : "";
        html += `<td class="${cls}">
            ${a === fin ? "—" : (diff > 0 ? "+" : "") + diff.toFixed(1)}
        </td>`;
    });
    html += `</tr>`;

    /* =======================
       ÉTAPE 5 – DHG PART B
       ======================= */
    const valPartB = a => etab[a]?.DHG?.PART_B ?? 0;

    html += `<tr><th>DHG – Part B</th>`;
    annees.forEach(a => {
        html += `<td>${valPartB(a).toFixed(1)}</td>`;
    });
    html += `</tr>`;

    html += `<tr class="delta"><th>Écart vs rentrée ${anneeScolaire(fin)}</th>`;
    annees.forEach(a => {
        const diff = valPartB(fin) - valPartB(a);
        const cls = diff > 0 ? "pos" : diff < 0 ? "neg" : "";
        html += `<td class="${cls}">
            ${a === fin ? "—" : (diff > 0 ? "+" : "") + diff.toFixed(1)}
        </td>`;
    });
    html += `</tr>`;

    /* =======================
       ÉTAPE 5 – DHG PART C
       ======================= */
    const valPartC = a => etab[a]?.DHG?.PART_C ?? 0;

    html += `<tr><th>DHG – Part C</th>`;
    annees.forEach(a => {
        html += `<td>${valPartC(a).toFixed(1)}</td>`;
    });
    html += `</tr>`;

    html += `<tr class="delta"><th>Écart vs rentrée ${anneeScolaire(fin)}</th>`;
    annees.forEach(a => {
        const diff = valPartC(fin) - valPartC(a);
        const cls = diff > 0 ? "pos" : diff < 0 ? "neg" : "";
        html += `<td class="${cls}">
            ${a === fin ? "—" : (diff > 0 ? "+" : "") + diff.toFixed(1)}
        </td>`;
    });
    html += `</tr>`;

    /* =======================
       ÉTAPE 5 – DHG HORS PART D
       ======================= */
    const valHorsPartD = a => etab[a]?.DHG?.TOTAL_HORS_PART_D ?? 0;

    html += `<tr><th>DHG – Hors Part D</th>`;
    annees.forEach(a => {
        html += `<td>${valHorsPartD(a).toFixed(1)}</td>`;
    });
    html += `</tr>`;

    html += `<tr class="delta"><th>Écart vs rentrée ${anneeScolaire(fin)}</th>`;
    annees.forEach(a => {
        const diff = valHorsPartD(fin) - valHorsPartD(a);
        const cls = diff > 0 ? "pos" : diff < 0 ? "neg" : "";
        html += `<td class="${cls}">
            ${a === fin ? "—" : (diff > 0 ? "+" : "") + diff.toFixed(1)}
        </td>`;
    });
    html += `</tr>`;

    /* =======================
       ÉTAPE 5 – DHG PART D
       ======================= */
    const valPartD = a => etab[a]?.DHG?.PART_D ?? 0;

    html += `<tr><th>DHG – Part D</th>`;
    annees.forEach(a => {
        html += `<td>${valPartD(a).toFixed(1)}</td>`;
    });
    html += `</tr>`;

    html += `<tr class="delta"><th>Écart vs rentrée ${anneeScolaire(fin)}</th>`;
    annees.forEach(a => {
        const diff = valPartD(fin) - valPartD(a);
        const cls = diff > 0 ? "pos" : diff < 0 ? "neg" : "";
        html += `<td class="${cls}">
            ${a === fin ? "—" : (diff > 0 ? "+" : "") + diff.toFixed(1)}
        </td>`;
    });
    html += `</tr>`;

    /* =======================
       ÉTAPE 5 – DHG PART D
       ======================= */
    const valDHGTotal = a => etab[a]?.DHG?.DGH_TOTALE ?? 0;

    html += `<tr><th>DHG Totale</th>`;
    annees.forEach(a => {
        html += `<td>${valDHGTotal(a).toFixed(1)}</td>`;
    });
    html += `</tr>`;

    html += `<tr class="delta"><th>Écart vs rentrée ${anneeScolaire(fin)}</th>`;
    annees.forEach(a => {
        const diff = valDHGTotal(fin) - valDHGTotal(a);
        const cls = diff > 0 ? "pos" : diff < 0 ? "neg" : "";
        html += `<td class="${cls}">
            ${a === fin ? "—" : (diff > 0 ? "+" : "") + diff.toFixed(1)}
        </td>`;
    });
    html += `</tr>`;

    /* =======================
       ÉTAPE 5 – Taux d'encadrement
       ======================= */
    const valH_E = a => etab[a]?.DHG?.H_PAR_ELEVE ?? 0;

    html += `<tr><th>Taux d'encadrement</th>`;
    annees.forEach(a => {
        html += `<td>${valH_E(a).toFixed(1)}</td>`;
    });
    html += `</tr>`;

    html += `<tr class="delta"><th>Écart vs rentrée ${anneeScolaire(fin)}</th>`;
    annees.forEach(a => {
        const diff = valH_E(fin) - valH_E(a);
        const cls = diff > 0 ? "pos" : diff < 0 ? "neg" : "";
        html += `<td class="${cls}">
            ${a === fin ? "—" : (diff > 0 ? "+" : "") + diff.toFixed(1)}
        </td>`;
    });
    html += `</tr>`;

    /* =======================
       ÉTAPE 5 – Heures Postes
       ======================= */
    const valHP = a => etab[a]?.DHG?.HP_POSTES ?? 0;

    html += `<tr><th>Heures Postes</th>`;
    annees.forEach(a => {
        html += `<td>${valHP(a).toFixed(1)}</td>`;
    });
    html += `</tr>`;

    html += `<tr class="delta"><th>Écart vs rentrée ${anneeScolaire(fin)}</th>`;
    annees.forEach(a => {
        const diff = valHP(fin) - valHP(a);
        const cls = diff > 0 ? "pos" : diff < 0 ? "neg" : "";
        html += `<td class="${cls}">
            ${a === fin ? "—" : (diff > 0 ? "+" : "") + diff.toFixed(1)}
        </td>`;
    });
    html += `</tr>`;

    /* =======================
       ÉTAPE 5 – Heures Supplémentaires
       ======================= */
    const valHSA = a => etab[a]?.DHG?.HSA ?? 0;

    html += `<tr><th>Heures Supplémentaires</th>`;
    annees.forEach(a => {
        html += `<td>${valHSA(a).toFixed(1)}</td>`;
    });
    html += `</tr>`;

    html += `<tr class="delta"><th>Écart vs rentrée ${anneeScolaire(fin)}</th>`;
    annees.forEach(a => {
        const diff = valHSA(fin) - valHSA(a);
        const cls = diff > 0 ? "pos" : diff < 0 ? "neg" : "";
        html += `<td class="${cls}">
            ${a === fin ? "—" : (diff > 0 ? "+" : "") + diff.toFixed(1)}
        </td>`;
    });
    html += `</tr>`;

    /* =======================
       ÉTAPE 5 – Heures Postes SEGPA
       ======================= */
    const valHP_SEGPA = a => etab[a]?.DHG?.HP_POSTES_SEGPA ?? 0;

    html += `<tr><th>Heures Postes SEGPA</th>`;
    annees.forEach(a => {
        html += `<td>${valHP_SEGPA(a).toFixed(1)}</td>`;
    });
    html += `</tr>`;

    html += `<tr class="delta"><th>Écart vs rentrée ${anneeScolaire(fin)}</th>`;
    annees.forEach(a => {
        const diff = valHP_SEGPA(fin) - valHP_SEGPA(a);
        const cls = diff > 0 ? "pos" : diff < 0 ? "neg" : "";
        html += `<td class="${cls}">
            ${a === fin ? "—" : (diff > 0 ? "+" : "") + diff.toFixed(1)}
        </td>`;
    });
    html += `</tr>`;

    /* =======================
       ÉTAPE 5 – Heures Supplémentaires SEGPA
       ======================= */
    const valHSA_SEGPA = a => etab[a]?.DHG?.HSA_SEGPA ?? 0;

    html += `<tr><th>Heures Supplémentaires SEGPA</th>`;
    annees.forEach(a => {
        html += `<td>${valHSA_SEGPA(a).toFixed(1)}</td>`;
    });
    html += `</tr>`;

    html += `<tr class="delta"><th>Écart vs rentrée ${anneeScolaire(fin)}</th>`;
    annees.forEach(a => {
        const diff = valHSA_SEGPA(fin) - valHSA_SEGPA(a);
        const cls = diff > 0 ? "pos" : diff < 0 ? "neg" : "";
        html += `<td class="${cls}">
            ${a === fin ? "—" : (diff > 0 ? "+" : "") + diff.toFixed(1)}
        </td>`;
    });
    html += `</tr>`;

    /* =======================
       ÉTAPE 5 – IMP
       ======================= */
    const valIMP = a => etab[a]?.DHG?.IMP ?? 0;

    html += `<tr><th>IMP</th>`;
    annees.forEach(a => {
        html += `<td>${valIMP(a).toFixed(1)}</td>`;
    });
    html += `</tr>`;

    html += `<tr class="delta"><th>Écart vs rentrée ${anneeScolaire(fin)}</th>`;
    annees.forEach(a => {
        const diff = valIMP(fin) - valIMP(a);
        const cls = diff > 0 ? "pos" : diff < 0 ? "neg" : "";
        html += `<td class="${cls}">
            ${a === fin ? "—" : (diff > 0 ? "+" : "") + diff.toFixed(1)}
        </td>`;
    });
    html += `</tr>`;

    /* =======================
       FERMETURE (étape 6)
       ======================= */
    html += `</tbody></table>`;
    container.innerHTML = html;
}

// Fonction pour les classes de seuil
function classeSeuil(effectif, div) {
    const seuil = div * 28;
    if (seuil === effectif) return "seuil";
    if (seuil === effectif + 1) return "seuil1";
    if (seuil === effectif + 2) return "seuil2";
    return "";
}

function afficherInfos(data, rne) {
    const infosBloc = document.getElementById("infosEtablissement");
    const statsBloc = document.getElementById("statsGlobales");

    // Cas : rien sélectionné
    if (!rne) {
        infosBloc.style.display = "none";
        statsBloc.innerHTML = "";
        return;
    }

    // Cas : statistiques globales
    if (rne === "ALL") {
        infosBloc.style.display = "none";
        statsBloc.innerHTML = "";

        const res = analyserPartCGlobal(data);
        const synthese = analyserEnveloppeGlobale(data);
        statsBloc.innerHTML = `
            <strong>Nombre d'établissements :</strong> ${data.length}<br><br>
            <h3>Évolution enveloppe globale HP / HSA (2021–2025)</h3>
            ${tableauSyntheseHTML(synthese)}            

            <br><strong>Part C en baisse à divisions constantes</strong><br>
            Global : ${res.global.baissePartC}
            ${listeHTML(res.global.etablissements)}<br>

            <strong>Par catégorie :</strong><br>
            REP+ : ${res.categories["REP+"].baissePartC}
            ${listeHTML(res.categories["REP+"].etablissements)}<br>
            REP : ${res.categories["REP"].baissePartC}
            ${listeHTML(res.categories["REP"].etablissements)}<br>
            HEP : ${res.categories["HEP"].baissePartC}
            ${listeHTML(res.categories["HEP"].etablissements)}<br>

            <strong>Baisse ≥ 10h à divisions constantes</strong><br>
            Global : ${res.global.baissePartC10}
            ${listeHTML(res.global.etablissements10)}<br>
            REP+ : ${res.categories["REP+"].baissePartC10}
            ${listeHTML(res.categories["REP+"].etablissements10)}<br>
            REP : ${res.categories["REP"].baissePartC10}
            ${listeHTML(res.categories["REP"].etablissements10)}<br>
            HEP : ${res.categories["HEP"].baissePartC10}
            ${listeHTML(res.categories["HEP"].etablissements10)}
        `;
        return;
    }

    // Cas : établissement unique
    statsBloc.innerHTML = "";
    infosBloc.style.display = "block";
    console.log("Recherche RNE =", rne)
    console.log("RNE disponibles =", data.map(e => e.RNE));

    const etab = data.find(e => e.RNE === rne);

    if (!etab) {
        infosBloc.innerHTML = "<em>Établissement introuvable</em>";
        return;
    }
    afficherTableauEtab(etab);

    document.getElementById("cat").textContent = etab["Catégorie"] || "—";

    const annees = Object.keys(etab).filter(k => /^\d{4}$/.test(k)).sort();
    const lastAnnee = annees[annees.length - 1];

    // --- Affichage avec getPeriode ---
    afficherBlocSimple(etab, "TOTAL_ELEVES", "TOTAL_ELEVES");
    afficherBlocSimple(etab, "TOTAL_DIVISIONS", "TOTAL_DIVISIONS");
    afficherBlocSimple(etab, "EFF_6EME", "EFF_6EME");
    afficherBlocSimple(etab, "EFF_5EME", "EFF_5EME");
    afficherBlocSimple(etab, "EFF_4EME", "EFF_4EME");
    afficherBlocSimple(etab, "EFF_3EME", "EFF_3EME");
    afficherBlocSimple(etab, "EFF_ULIS", "EFF_ULIS");

    afficherBlocDHG(etab, "PART_A", "Part_A");
    afficherBlocDHG(etab, "PART_B", "Part_B");
    afficherBlocDHG(etab, "PART_C", "Part_C");
    afficherBlocDHG(etab, "PART_D", "Part_D");
    afficherBlocDHG(etab, "TOTAL_ETAB", "TOTAL_ETAB");
    afficherBlocDHG(etab, "DGH_TOTALE", "DGH_TOTALE");
    afficherBlocDHG(etab, "HP_POSTES", "HP_POSTES");
    afficherBlocDHG(etab, "HSA", "HSA");
    afficherBlocDHG(etab, "HP_POSTES_SEGPA", "HP_POSTES_SEGPA");
    afficherBlocDHG(etab, "HSA_SEGPA", "HSA_SEGPA");
    afficherBlocDHG(etab, "IPS", "IPS", 1);
    afficherBlocDHG(etab, "IMP", "IMP", 1);
    afficherBlocDHG(etab, "H_PAR_ELEVE", "H_PAR_ELEVE", 2);
}

function totalDivisions(etab, annee) {
    if (!etab[annee]) return 0;
    return ["EFF_6EME", "EFF_5EME", "EFF_4EME", "EFF_3EME"]
        .reduce((sum, ch) => {
            const eff = etab[annee][ch] ?? 0;
            return sum + Math.ceil(eff / 28);
        }, 0);
}

// Fonction pour afficher un champ simple ou effectifs/ULIS
function afficherBlocSimple(etab, champ, elementId, digits = 0) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const periode = getPeriode(etab);
    if (!periode) {
        el.textContent = "—";
        return;
    }

    const { debut, fin, precedentes } = periode;

    const val = a => Number(etab[a]?.[champ] ?? 0);
    const cls = v => v > 0 ? "pos" : v < 0 ? "neg" : "";
    const anNSup = String(Number(fin) + 1);

    let html = `
        ${val(fin).toFixed(digits)} en ${fin}/${anNSup}
    `;

    // Comparaisons : toujours par rapport à l'année courante
    precedentes.forEach(a => {
        const diff = val(fin) - val(a);

        html += `
            [<span class="${cls(diff)}">
                ${diff > 0 ? "+" : ""}${diff.toFixed(digits)}
            </span>
            vs ${a} (${val(a).toFixed(digits)})]
        `;
    });

    // Évolution totale depuis le début
    const diffTot = val(fin) - val(debut);

    html += `
        | [<span class="${cls(diffTot)}">
            ${diffTot > 0 ? "+" : ""}${diffTot.toFixed(digits)}
        </span>
        depuis ${debut} (${val(debut).toFixed(digits)})]
    `;

    el.innerHTML = html;
}

function afficherBlocDHG(etab, champ, elementId, digits = 1) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const periode = getPeriode(etab);
    if (!periode) {
        el.textContent = "—";
        return;
    }

    const { debut, fin, precedentes } = periode;

    const val = a => Number(etab[a]?.DHG?.[champ] ?? 0);
    const cls = v => v > 0 ? "pos" : v < 0 ? "neg" : "";
    const anNSup = String(Number(fin) + 1);

    let html = `
        ${val(fin).toFixed(digits)} en ${fin}/${anNSup}
    `;

    // Comparaisons : toujours par rapport à l'année courante
    precedentes.forEach(a => {
        const diff = val(fin) - val(a);

        html += `
            [<span class="${cls(diff)}">
                ${diff > 0 ? "+" : ""}${diff.toFixed(digits)}
            </span>
            vs ${a} (${val(a).toFixed(digits)})]
        `;
    });

    // Évolution totale depuis l'année de début
    const diffTot = val(fin) - val(debut);

    html += `
        | [<span class="${cls(diffTot)}">
            ${diffTot > 0 ? "+" : ""}${diffTot.toFixed(digits)}
        </span>
        depuis ${debut} (${val(debut).toFixed(digits)})]
    `;

    el.innerHTML = html;
}

// Fonction pour afficher les divisions
function afficherDivisions(etab, champ, elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const periode = getPeriode(etab);
    if (!periode) {
        el.textContent = "—";
        return;
    }

    const { debut, fin, precedentes } = periode;

    const eff = a => etab[a]?.[champ] ?? 0;
    const div = a => Math.ceil(eff(a) / 28);
    const cls = v => v > 0 ? "pos" : v < 0 ? "neg" : "";

    const anNSup = String(Number(fin) + 1);

    let html = `
        <span class="${classeSeuil(eff(fin), div(fin))}">${eff(fin)}</span> élèves →
        ${div(fin)} divisions en ${fin}/${anNSup}
    `;

    // Comparaisons N-1, N-2, ...
    precedentes.forEach((a, i) => {
        const aPrec = i === 0 ? fin : precedentes[i - 1];

        const valRef = div(a);
        const diff = div(aPrec) - valRef;

        html += `
            | [<span class="${cls(diff)}">${diff > 0 ? "+" : ""}${diff}</span>
            vs ${a} (${val(a).toFixed(digits)}) /${Number(a) + 1} (${valRef})]
        `;
    });


    // Évolution totale depuis le début
    const diffTot = div(fin) - div(debut);

    html += `
        <br>[<span class="${cls(diffTot)}">${diffTot > 0 ? "+" : ""}${diffTot}</span>
        depuis ${debut}
        (<span class="${classeSeuil(eff(debut), div(debut))}">${eff(debut)}</span>
        élèves / ${div(debut)} divisions)]
    `;

    el.innerHTML = html;
}

function analyserEnveloppeGlobale(data) {
    const periode = getPeriode(data);
    if (!periode) return null;

    const { annees, debut, fin, avantFin } = periode;

    const res = {
        HP: {}, HSA: {}, TOTAL: {}, EFFECTIFS: {},
        meta: { anneeDebut: debut, anneeFin: fin, anneeAvantFin: avantFin }
    };

    annees.forEach(a => {
        res.HP[a] = 0;
        res.HSA[a] = 0;
        res.EFFECTIFS[a] = 0;
    });

    data.forEach(etab => {
        annees.forEach(a => {
            res.HP[a] += Number(etab[a]?.DHG?.HP_POSTES ?? 0);
            res.HSA[a] += Number(etab[a]?.DHG?.HSA ?? 0);
            res.EFFECTIFS[a] += Number(etab[a]?.TOTAL ?? 0);
        });
    });

    annees.forEach(a => {
        res.TOTAL[a] = res.HP[a] + res.HSA[a];
    });

    const evol = obj => ({
        diffFin_Debut: obj[fin] - obj[debut],
        diffFin_N1: obj[fin] - obj[avantFin],
        pctFin_Debut: obj[debut]
            ? ((obj[fin] - obj[debut]) / obj[debut]) * 100
            : 0
    });

    return {
        annees,
        meta: res.meta,
        HP: { ...res.HP, evol: evol(res.HP) },
        HSA: { ...res.HSA, evol: evol(res.HSA) },
        TOTAL: { ...res.TOTAL, evol: evol(res.TOTAL) },
        EFFECTIFS: { ...res.EFFECTIFS, evol: evol(res.EFFECTIFS) }
    };
}


function afficherEtablissement(etab) {
    setText("cat", etab["Catégorie"]);

    const annees = getAnneesDisponibles(etab);
    if (annees.length) {
        const a = last(annees);
        setText("Eff_Total", totalDivisions(etab, a));
    }
}

function getAnneesDisponibles(etab) {
    return Object.keys(etab)
        .filter(k => /^\d{4}$/.test(k))
        .sort();
}


/* ===============================
   6. INIT (POINT D’ENTRÉE UNIQUE)
================================ */
document.addEventListener("DOMContentLoaded", init);

function init() {

    if (!window.dataEtab || !Array.isArray(dataEtab.ETABLISSEMENTS)) {
        alert("dataEtab non chargé ou invalide");
        console.error("dataEtab =", window.dataEtab);
        return;
    }

    const etablissements = dataEtab.ETABLISSEMENTS;
    console.log(dataEtab.ETABLISSEMENTS.length);

    const select = document.getElementById("selectEtab");
    if (!select) return;

    select.innerHTML = "";

    select.appendChild(new Option("-- Choisir --", ""));
    select.appendChild(new Option("Tous les établissements", "ALL"));

    etablissements.forEach(etab => {
        select.appendChild(
            new Option(`${etab["Nom d'établissement"]} (${etab.Ville || "?"})`, etab.RNE)
        );
    });


    // ⚡ Masquer infos au démarrage si "Choisir" sélectionné
    const infosBloc = document.getElementById("infosEtablissement");
    const statsBloc = document.getElementById("statsGlobales");
    if (!select.value) {
        infosBloc.style.display = "none";
        statsBloc.innerHTML = "";
    }

    // Listener pour changement de sélection
    select.addEventListener("change", () => {
        const val = select.value;
        console.log("Valeur select =", val);

        if (!val) {
            infosBloc.style.display = "none";
            statsBloc.innerHTML = "";
            return;
        }

        if (!etablissements.length) {
            alert("Aucun établissement chargé – JSON invalide");
            console.log(etablissements);
            return;
        }

        afficherInfos(etablissements, val);
    });

console.log("INIT OK – établissements :", etablissements.length);
}

