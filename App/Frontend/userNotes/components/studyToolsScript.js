
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
