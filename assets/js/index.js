const secretCode = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

let i = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === secretCode[i]) {
    i++;
    if (i === secretCode.length) {
      alert("idk how did you manage to find this thing but its cool to know someone actually read this but if you come from the github code then its cheating but who cares, lol.");
      i = 0;
    }
  } else {
    i = 0;
  }
});

ScrollReveal().reveal('.load-hidden');