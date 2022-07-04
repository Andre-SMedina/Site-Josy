const select = document.querySelector("#select");
const selectVer = document.querySelector("#selectVer");
const optResVer = document.querySelectorAll(".optResVer");
const textArea = document.querySelectorAll(".textArea");
const submit = document.querySelector("#submitRes");
const auth = document.querySelectorAll(".auth");
let active = undefined;

for (i of textArea) {
  i.style.display = "none";
}
for (i of optResVer) {
  i.id = i.textContent;
}

if (auth.length != 0) {
  document.querySelector("#login_cad").innerHTML = `Olá ${auth[0].textContent} |`;
  document.querySelector("#login_log").innerHTML = '<a href="/">Sair</a>';
  document.querySelector("#linkMain").href = `/painel/${auth[1].textContent}`;
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
