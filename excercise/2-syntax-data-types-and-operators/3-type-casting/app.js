const qtyInput = document.querySelector("#qty-input");
const calcBtn = document.querySelector("#btn-calc");
const bugEl = document.querySelector("#coercian-bug");
const fixedEl = document.querySelector("#conversion-fixed");

calcBtn.addEventListener("click", () => {
  const inputVal = qtyInput.value;
  const bonus = 2;

  const buggyResult = inputVal + bonus;
  bugEl.textContent = `Bug Coercian ("${inputVal}" + ${bonus}) = ${buggyResult} item`;

  const corectResult = Number(inputVal) + bonus;
  fixedEl.textContent = `Solusi Conversion (Number(${inputVal}) + bonus) = ${corectResult} item (Benar)`;
});
