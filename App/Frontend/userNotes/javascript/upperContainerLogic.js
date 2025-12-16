import {sendNote} from "/App/Frontend/userNotes/javascript/api/dbMethods.js"

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

function createNote() {
    const createNoteButton = document.getElementById("createButton");
    console.log("check 1");
    if (!createNoteButton) return;
    console.log("check 2");

    createNoteButton.addEventListener("click", async () => {

        const Title = document.getElementById("titleInput").value;
        if (!Title.trim()) {
            alert("Title cannot be empty");
            return;
        }

        const Description = document.getElementById("DescriptionInput").value;
        const difficulty = Number(document.getElementById("numInput").value);
        const NoteTagsSeparate = document.querySelectorAll(".tagInput");
        const NoteTagsJoined = [...NoteTagsSeparate]
            .map(tag => tag.value.trim())
            .filter(Boolean)
            .join(",");


        const NoteContent = "Ready When You Are...";

        await sendNote(Title, Description, difficulty, NoteTagsJoined, NoteContent);

        document.getElementById("titleInput").value = "";
        document.getElementById("DescriptionInput").value = "";
        document.getElementById("numInput").value = 0;
        NoteTagsSeparate.forEach(tag => tag.value = "");


        //get all components inputs and outputs
    })
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

        if (currentComponent !== componentPath) {
            currentComponent = componentPath;
            popup.innerHTML = `<div style="padding:12px">Loading…</div>`;

            await loadComponent("pop", componentPath);

            if (!hoverActive) {
                closePopup();
                return;
            }

            // ✅ THIS IS THE KEY
            if (afterLoad) afterLoad();
        }
    }

    /* ================= ADD ================= */

    addButton.addEventListener("mouseenter", () => {
        openPopup(
            "/App/Frontend/userNotes/components/addNote.html",
            createNote // ✅ runs AFTER HTML exists
        );
    });

    addButton.addEventListener("mouseleave", () => {
        hoverActive = false;
        scheduleHide();
    });

    /* ================= SORT ================= */

    sortButton.addEventListener("mouseenter", () => {
        openPopup("/App/Frontend/userNotes/components/Organise.html", sortLogic);
    });

    sortButton.addEventListener("mouseleave", () => {
        hoverActive = false;
        scheduleHide();
    });

    popup.addEventListener("mouseenter", () => {
        hoverActive = true;
        clearTimeout(hideTimeout);
    });

    popup.addEventListener("mouseleave", () => {
        hoverActive = false;
        scheduleHide();
    });
}
