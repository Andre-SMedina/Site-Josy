const select = document.querySelector("#select");
const textArea = document.querySelectorAll(".textArea");
const submit = document.querySelector('#submitRes')
let active = undefined;

for(i of textArea) {
    i.style.display = 'none'
}

select.addEventListener("change", () => {
    active = select.selectedIndex - 1;

    for(i of textArea) {
        i.style.display = 'none'
    }

    textArea[active].style.display = 'block';
});

submit.addEventListener("click", () => {
    for(i = 0;i<textArea.length;i++) {
        if (i != active) {
            textArea[i].remove();
        }
    }
});
