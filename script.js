const colorPicker = document.getElementById("color-picker").value;
const colorScheme = document.getElementById("color-scheme");
const colorBtn = document.getElementById("color-scheme-btn");

function generateColor() {
  const boxes = document.querySelectorAll(".box");
  const colorSchemeValue = colorScheme.value;
  const color = colorPicker.replace("#", "");
  const colorCode = document.querySelectorAll(".code");
  const count = 5;

  let i = 0;

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${color}&mode=${colorSchemeValue}&count=${count}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.colors[0].hex.value);
      for (box of boxes) {
        box.style.background = data.colors[i].hex.value;
        colorCode[i].textContent = data.colors[i].hex.value;
        i++;
      }
    });
}
