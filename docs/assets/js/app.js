async function cargarCV() {
    const respuesta = await fetch("data/cv.json");
    const cv = await respuesta.json();

    // Nombre y roles
    document.getElementById("cv-name").textContent = cv.nombre;

    const rolPrincipal = Array.isArray(cv.roles) && cv.roles.length > 0
        ? cv.roles[0]
        : "";
    const otrosRoles = Array.isArray(cv.roles) && cv.roles.length > 1
        ? cv.roles.slice(1).join(" · ")
        : "";

    const roleElem = document.getElementById("cv-role");
    roleElem.textContent = rolPrincipal + (otrosRoles ? " | " + otrosRoles : "");

    // Contacto
    const contactoDiv = document.getElementById("cv-contact");
    const c = cv.contacto;
    contactoDiv.innerHTML = `
    <p>Identificación: ${c["identificación"]}</p>
    <p>Teléfono: ${c["teléfono"]}</p>
    <p>Correo: <a href="mailto:${c["correo"]}">${c["correo"]}</a></p>
    <p>Dirección: ${c["dirección"]}</p>
  `;

    // Resumen profesional
    document.getElementById("cv-resumen").textContent = cv.resumen_profesional;

    // Certificaciones
    const certUl = document.getElementById("cv-certificaciones");
    cv.certificaciones.forEach(cert => {
        const li = document.createElement("li");
        li.className = "list-group-item border-0 px-0";
        li.textContent = cert;
        certUl.appendChild(li);
    });

    // Habilidades técnicas
    const habTecUl = document.getElementById("cv-habilidades-tecnicas");
    cv.habilidades_tecnicas.forEach(hab => {
        const li = document.createElement("li");
        li.className = "list-group-item border-0 px-0";
        li.textContent = hab;
        habTecUl.appendChild(li);
    });

    // Idiomas
    const idiomasUl = document.getElementById("cv-idiomas");
    cv.idiomas.forEach(idiomaObj => {
        const li = document.createElement("li");
        li.className = "list-group-item border-0 px-0";
        li.textContent = `${idiomaObj.idioma} – ${idiomaObj.nivel}`;
        idiomasUl.appendChild(li);
    });

    // Experiencia laboral
    const expDiv = document.getElementById("cv-experiencia");
    cv.experiencia_laboral.forEach(exp => {
        const wrapper = document.createElement("div");
        wrapper.className = "cv-experience-item";

        const fechas = `${exp["fecha inicio"]} - ${exp["fecha finalización"]}`;

        wrapper.innerHTML = `
      <div class="cv-experience-title">${exp.puesto} - ${exp.empresa}</div>
      <div class="cv-experience-meta">
        ${fechas} | ${exp.modalidad}
      </div>
      <div class="cv-experience-desc">
        ${exp["descripción"]}
      </div>
    `;

        expDiv.appendChild(wrapper);
    });

    // Educación
    const eduUl = document.getElementById("cv-educacion");
    cv.educacion.forEach(ed => {
        const li = document.createElement("li");
        li.className = "list-group-item border-0 px-0";
        li.textContent = `${ed.grado}, ${ed.institución}, ${ed.localización} (${ed.periodo})`;
        eduUl.appendChild(li);
    });

    // Links
    const linksUl = document.getElementById("cv-links");
    if (cv.links && cv.links.linkedin) {
        const li = document.createElement("li");
        li.className = "list-group-item border-0 px-0";
        li.innerHTML = `LinkedIn: <a href="https://${cv.links.linkedin}" target="_blank" rel="noopener">${cv.links.linkedin}</a>`;
        linksUl.appendChild(li);
    }
    if (cv.links && cv.links["cv portafolio"]) {
        const li = document.createElement("li");
        li.className = "list-group-item border-0 px-0";
        li.innerHTML = `CV Portafolio: <a href="${cv.links["cv portafolio"]}" target="_blank" rel="noopener">${cv.links["cv portafolio"]}</a>`;
        linksUl.appendChild(li);
    }

    // Referencias
    const refUl = document.getElementById("cv-referencias");
    cv.referencias.forEach(ref => {
        const li = document.createElement("li");
        li.className = "list-group-item border-0 px-0";
        li.textContent = ref;
        refUl.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    cargarCV();

    const btnPdf = document.getElementById("btn-pdf");
    btnPdf.addEventListener("click", () => {
        window.print();
    });
});