//! GENERAL VARIABLES
const colorPicker = document.getElementById("color-picker");
const colorScheme = document.getElementById("color-scheme");
const colorBtn = document.getElementById("color-scheme-btn");

//! FUNCTION TO GENERATE COLOR SCHEME
function generateColor() {
  const boxes = document.querySelectorAll(".box");
  const colorSchemeValue = colorScheme.value;
  const color = colorPicker.value.replace("#", "");
  const colorCode = document.querySelectorAll(".code");
  const count = 5;

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${color}&mode=${colorSchemeValue}&count=${count}`
  )
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < count; i++) {
        //! RENDER THE COLOR IN THE DOM
        const box = boxes[i];
        box.style.background = data.colors[i].hex.value;
        colorCode[i].textContent = data.colors[i].hex.value;

        box.addEventListener("click", () => {
          copyToClipboard(data.colors[i].hex.value);
        });

        colorCode[i].addEventListener("click", () => {
          copyToClipboard(data.colors[i].hex.value);
        });
      }
    });
}

function copyToClipboard(color) {
  navigator.clipboard
    .writeText(color)
    .then(() => {
      alert(`Copied`);
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
    });
}

generateColor();
