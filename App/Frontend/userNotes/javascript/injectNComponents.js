async function loadComponent(targetId, file) {
    const html = await fetch(file).then(res => res.text());
    document.getElementById(targetId).innerHTML = html;
}

async function loadComponentForAll(className, file) {
    const html = await fetch(file).then(res => res.text());

    document.querySelectorAll(`.${className}`).forEach(el => {
        el.innerHTML = html;
    });
}


loadComponent("upperControls", "/App/Frontend/userNotes/components/upperContainer.html");
loadComponentForAll("StudyNote", "/App/Frontend/userNotes/components/NoteCard.html");
loadComponent("studyTools", "/App/Frontend/userNotes/components/studyTools.html");

//****************************************************************************************************/
document.addEventListener("DOMContentLoaded", () => {

    const studyNotes = document.getElementById("studyNoteSection");
    const studyTools = document.getElementById("studyToolsSection");
    const aiTools = document.getElementById("AIToolsSection");
    const extraTools = document.getElementById("ExtraToolsSection");

    const btnNotes = document.getElementById("toggleMenu");
    const btnTools = document.getElementById("toggleTools");
    const btnAI = document.getElementById("toggleAI");
    const btnExtra = document.getElementById("toggleExtra");

    // Hide all sections
    function hideAll() {
        studyNotes.style.display = "none";
        studyTools.style.display = "none";
        if (aiTools) aiTools.style.display = "none";
        if (extraTools) extraTools.style.display = "none";
    }

    // LOAD-IN DEFAULT TAB → Study Notes
    hideAll();
    studyNotes.style.display = "flex";     // or block depending on your layout
    console.log("Loaded into Study Notes tab");

    // CLICK HANDLERS
    btnNotes.addEventListener("click", () => {
        hideAll();
        studyNotes.style.display = "flex";
    });

    btnTools.addEventListener("click", () => {
        hideAll();
        studyTools.style.display = "flex";
    });

    btnAI?.addEventListener("click", () => {
        hideAll();
        aiTools.style.display = "flex";
    });

    btnExtra?.addEventListener("click", () => {
        hideAll();
        extraTools.style.display = "flex";
    });

});
