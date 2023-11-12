const buttons = document.querySelectorAll(".tables button");
const lightModeButton = document.querySelector(".lightButton > img");
const darkModeButton = document.querySelector(".darkButton > img");
const input = document.querySelector(".line input");
const lightSvg = document.querySelector("#lightSvg");
const darkSvg = document.querySelector("#darkSvg");

let darkMode = false;
let equation = "";
let result = "";

function toggleDarkMode() {
  darkMode = !darkMode;
  document.body.classList.toggle("dark-mode");
  updateButtonStyles();
  updateBoxShadow();

  if (darkMode) {
    darkModeButton.innerHTML = darkSvg;
    lightModeButton.style.display = "none";
    darkModeButton.style.display = "inline";
  } else {
    darkModeButton.innerHTML = lightSvg;
    lightModeButton.style.display = "inline";
    darkModeButton.style.display = "none";
  }
}

lightModeButton.addEventListener("click", toggleDarkMode);
darkModeButton.addEventListener("click", toggleDarkMode);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent == "=") {
      try {
        result = calculateEquation(equation);
        equation = result;
        input.value = equation;
      } catch (error) {
        input.value = "Error";
      }
    } else if (button.textContent == "AC") {
      input.value = "0";
      equation = "";
    } else if (button.textContent == "C") {
      equation = equation.slice(0, -1);
      input.value = equation;
    } else {
      if (equation == "0") {
        equation = button.textContent;
        input.value = equation;
      } else {
        equation += button.textContent;
        input.value = equation;
      }
    }

    console.log(equation);
  });
});

function calculateEquation(equation) {
  return new Function("return " + equation)();
}

function updateButtonStyles() {
  buttons.forEach((button) => {
    button.classList.toggle("dark-mode", darkMode);
  });
  darkModeButton.style.backgroundColor = darkMode ? "#1a1b1f" : "#f1f3f6";
  darkModeButton.style.color = darkMode ? "#1a1b1f" : "#f1f3f6";
}

function updateBoxShadow() {
  if (darkMode) {
    darkModeButton.style.boxShadow =
      "5px 5px 10px 0px rgba(0, 0, 0, 0.1), -5px -5px 10px 0px #1a1b1f";
  } else {
    darkModeButton.style.boxShadow = "none";
  }
}