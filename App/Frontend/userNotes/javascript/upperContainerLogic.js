async function loadComponent(targetId, file) {
    const html = await fetch(file).then(res => res.text());
    document.getElementById(targetId).innerHTML = html;
}

export function upperContainerLogic() {
    const addButton = document.getElementById("Add");
    const popup = document.getElementById("pop");

    let hoverActive = false;
    let hideTimeout = null;

    // Show popup
    async function showPopup() {
        clearTimeout(hideTimeout);

        if (popup.innerHTML.trim() === "") {
            await loadComponent("pop", "/App/Frontend/userNotes/components/addNote.html");
        }

        popup.style.display = "block";

        requestAnimationFrame(() => {
            popup.classList.add("visible");
        });
    }

    // Hide popup
    function hidePopup() {
        hideTimeout = setTimeout(() => {
            if (!hoverActive) {
                popup.classList.remove("visible");

                setTimeout(() => {
                    if (!hoverActive) popup.style.display = "none";
                }, 250);
            }
        }, 100);
    }

    // HOVER EVENTS (THE MISSING PART 🔥🔥🔥)
    addButton.addEventListener("mouseenter", () => {
        hoverActive = true;
        showPopup();
    });

    addButton.addEventListener("mouseleave", () => {
        hoverActive = false;
        hidePopup();
    });

    popup.addEventListener("mouseenter", () => {
        hoverActive = true;
    });

    popup.addEventListener("mouseleave", () => {
        hoverActive = false;
        hidePopup();
    });
}
