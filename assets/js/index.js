const secretCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

let i = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === secretCode[i]) {
    i++;
    if (i === secretCode.length) {
      alert(
        "oh hi there! congrats for finding this! don't forgot to star Gymscribe in github!",
      );
      i = 0;
    }
  } else {
    i = 0;
  }
});

ScrollReveal().reveal(".load-hidden");
