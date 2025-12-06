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

