async function loadComponent(targetId, file) {
    const html = await fetch(file).then(res => res.text());
    document.getElementById(targetId).innerHTML = html;
}

export function upperContainerLogic(){
    const addBtn = document.getElementById("Add");
    const popup = document.getElementById("pop");

    if (!addBtn || !popup) {
        console.error("upperContainerLogic: Required elements not found");
        return;
    }

    addBtn.addEventListener("click", async () => {
        await loadComponent("pop", "/App/Frontend/userNotes/components/addNote.html");

        popup.style.display = 
            popup.style.display === "none" || popup.style.display === "" 
            ? "block" 
            : "none";
    });
}
