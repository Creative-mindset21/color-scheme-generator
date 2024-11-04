//! GENERAL VARIABLES
const colorPicker = document.getElementById("color-picker");
const colorScheme = document.getElementById("color-scheme");
const colorBtn = document.getElementById("color-scheme-btn");
const themeBtn = document.querySelector(".main-header i");

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

colorBtn.addEventListener("click", () => {
  generateColor();
});

// !MAKE THE COLOR COPYABLE
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

// !THEME BUTTON
function changeTheme() {
  const bodyEl = document.querySelector("body");

  // ?CHECK IF CURRENT THEME IS DARK
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    bodyEl.classList.add("dark");
  }

  themeBtn.addEventListener("click", () => {
    bodyEl.classList.toggle("dark");

    // ?STORE THE THEME TO LOCAL STORAGE
    if (bodyEl.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}

changeTheme();
