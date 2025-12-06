const toggleStudyToolBar = document.getElementById("toggleStudyTools")
const StudyToolBar = document.querySelector(".StudyTools")
const controlsContainer = document.querySelector(".controls")
toggleStudyToolBar.addEventListener("click", () => {
    if(StudyToolBar.style.display === "flex"){
         StudyToolBar.style.display = "none";
         controlsContainer.style.height = "3.5vh"
         toggleStudyToolBar.style.marginTop = "3.5vh"
         toggleStudyToolBar.style.height = "3.25vh"
    }else{
        StudyToolBar.style.display = "flex";
        controlsContainer.style.height = "25vh"
        toggleStudyToolBar.style.marginTop = "0vh"
        toggleStudyToolBar.style.height = "13%"
    }
});


const thumb = document.querySelector('.thumb');
const opts = document.querySelectorAll('.option');

opts.forEach(option => {
    option.addEventListener('click', () => {

        const a = option.dataset.align;

        if (a === "left") thumb.style.left = "0%";
        if (a === "center") thumb.style.left = "33%";
        if (a === "right") thumb.style.left = "66%";

        console.log("Selected:", a);
    });
});
