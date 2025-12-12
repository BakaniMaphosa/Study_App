// ================= COMPONENT LOADER =================
async function loadComponent(targetId, file) {
    const res = await fetch(file);
    if (!res.ok) {
        console.error(`Failed to load ${file}`);
        return;
    }
    const html = await res.text();
    document.getElementById(targetId).innerHTML = html;
}

// ================= SORT LOGIC =================
function sortLogic() {
    const orderGroups = document.querySelectorAll(
        "#DateOrder, #SizeOrder, #DifficultyOrder, #StreakOrder"
    );

    orderGroups.forEach(group => {

        // prevent duplicate listeners
        if (group.dataset.initialised) return;
        group.dataset.initialised = "true";

        let state = 0; // 0 = off, 1 = asc, 2 = desc

        group.addEventListener("click", () => {
            const upIcon = group.querySelector("img:nth-child(1)");
            const downIcon = group.querySelector("img:nth-child(2)");

            state = (state + 1) % 3;

            if (state === 0) {
                upIcon.src = "/App/Frontend/userNotes/components/svgs/up_INACTIVE.svg";
                downIcon.src = "/App/Frontend/userNotes/components/svgs/down_INACTIVE.svg";
            } else if (state === 1) {
                upIcon.src = "/App/Frontend/userNotes/components/svgs/up_ACTIVE.svg";
                downIcon.src = "/App/Frontend/userNotes/components/svgs/down_INACTIVE.svg";
            } else {
                upIcon.src = "/App/Frontend/userNotes/components/svgs/up_INACTIVE.svg";
                downIcon.src = "/App/Frontend/userNotes/components/svgs/down_ACTIVE.svg";
            }

            const sortType = group.id.replace("Order", "").toLowerCase();
            const direction = ["off", "asc", "desc"][state];

            console.log(`Sorting by ${sortType} (${direction})`);
        });
    });
}

// ================= MAIN LOGIC =================
export function upperContainerLogic() {
    const addButton = document.getElementById("Add");
    const sortButton = document.getElementById("Sort");
    const popup = document.getElementById("pop");

    if (!addButton || !sortButton || !popup) {
        console.error("upperContainerLogic: missing Add, Sort, or pop");
        return;
    }

    let hoverActive = false;
    let hideTimeout = null;
    let currentComponent = null;

    function showPopup() {
        popup.style.display = "block";
        requestAnimationFrame(() => popup.classList.add("visible"));
    }

    function closePopup() {
        popup.classList.remove("visible");
        setTimeout(() => {
            if (!hoverActive) {
                popup.style.display = "none";
                currentComponent = null;
            }
        }, 200);
    }

    function scheduleHide() {
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            if (!hoverActive) closePopup();
        }, 150);
    }

    async function openPopup(componentPath, afterLoad = null) {
        clearTimeout(hideTimeout);
        hoverActive = true;

        showPopup();

        // only reload if different content
        if (currentComponent !== componentPath) {
            currentComponent = componentPath;
            popup.innerHTML = `<div style="padding:12px">Loading…</div>`;

            await loadComponent("pop", componentPath);

            // if user left while loading
            if (!hoverActive) {
                closePopup();
                return;
            }

            if (afterLoad) afterLoad();
        }
    }

    /* ================= ADD (hover) ================= */

    addButton.addEventListener("mouseenter", () => {
        openPopup("/App/Frontend/userNotes/components/addNote.html");
    });

    addButton.addEventListener("mouseleave", () => {
        hoverActive = false;
        scheduleHide();
    });

    /* ================= SORT / ORGANISE (hover) ================= */

    sortButton.addEventListener("mouseenter", () => {
        openPopup("/App/Frontend/userNotes/components/Organise.html", sortLogic);
    });

    sortButton.addEventListener("mouseleave", () => {
        hoverActive = false;
        scheduleHide();
    });

    /* ================= POPUP ITSELF ================= */

    popup.addEventListener("mouseenter", () => {
        hoverActive = true;
        clearTimeout(hideTimeout);
    });

    popup.addEventListener("mouseleave", () => {
        hoverActive = false;
        scheduleHide();
    });
}
