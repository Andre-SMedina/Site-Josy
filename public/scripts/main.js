const select = document.querySelector("#select");
const selectVer = document.querySelector("#selectVer");
const optResVer = document.querySelectorAll(".optResVer");
const textArea = document.querySelectorAll(".textArea");
const submit = document.querySelector("#submitRes");
const fechar = document.querySelector("#close");
const fmessage = document.querySelector(".fmessage");
let active = undefined;

for (i of textArea) {
  i.style.display = "none";
}
for (i of optResVer) {
  i.id = i.textContent;
}

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

// Avaliação Stars
// const stars = document.querySelectorAll(".star-icon");
// document.addEventListener("click", function (e) {
//   const classStar = e.target.classList;
//   if (!classStar.contains("ativo")) {
//     stars.forEach(function (star) {
//       star.classList.remove("ativo");
//     });
//     classStar.add("ativo");
//     console.log(e.target.getAttribute("data-avaliacao"));
//   }
// });
const verif = document.querySelector("#termx");
if (verif) {
  document.addEventListener("click", (e) => {
    const stars = document.querySelectorAll(`.${e.target.classList[0]}`);
    const nota = parseInt(e.target.getAttribute("data-nota"));
    stars.forEach((star) => {
      if (parseInt(star.getAttribute("data-nota")) <= nota) {
        star.classList.remove("bi-star");
        star.classList.add("bi-star-fill");
      }
      if (parseInt(star.getAttribute("data-nota")) > nota) {
        star.classList.remove("bi-star-fill");
        star.classList.add("bi-star");
      }
    });
  });

  const notaBd = document.querySelectorAll("input");
  // const stars = document.querySelectorAll(".star");
  let cont = 0;
  for (const nota of notaBd) {
    const stars = document.querySelectorAll(
      `.${nota.getAttribute("data-tit")}`
    );
    for (const star of stars) {
      if (parseInt(star.getAttribute("data-nota")) <= nota.value) {
        star.classList.remove("bi-star");
        star.classList.add("bi-star-fill");
      }
    }
  }
  // notaBd.forEach((nota) => {
  // notaBd.forEach((nota) => {
  //   console.log(cont);
  //   cont++;
  //   if (nota.getAttribute("data-tit") === star.classList[0]) {
  //     if (parseInt(star.getAttribute("data-nota")) <= parseInt(nota.value)) {
  //       star.classList.remove("bi-star");
  //       star.classList.add("bi-star-fill");
  //     }
  //   }
  // });
  // });
}
