const select = document.querySelector("#select");
const selectVer = document.querySelector("#selectVer");
const optResVer = document.querySelectorAll(".optResVer");
const textArea = document.querySelectorAll(".textArea");
const submit = document.querySelector("#submitRes");
const fechar = document.querySelector("#close");
const fmessage = document.querySelector(".fmessage");
const livros = document.querySelectorAll(".livros");
const stars = document.querySelectorAll(".star");
let active = undefined;

for (i of textArea) {
  i.style.display = "none";
}
for (i of optResVer) {
  i.id = i.textContent;
}

console.log(livros[0].children);

if (fechar) {
  fechar.addEventListener("click", () => {
    fmessage.style.display = "none";
  });
}

if (select) {
  select.addEventListener("change", () => {
    active = select.selectedIndex - 1;

    for (i of textArea) {
      i.style.display = "none";
    }

    textArea[active].style.display = "block";
  });
}

if (submit) {
  submit.addEventListener("click", () => {
    for (i = 0; i < textArea.length; i++) {
      if (i != active) {
        textArea[i].remove();
      }
    }
  });
}

if (selectVer) {
  selectVer.addEventListener("change", () => {
    const opcao = selectVer.options[selectVer.selectedIndex].text;

    window.location.href = `#${opcao}`;
  });
}
