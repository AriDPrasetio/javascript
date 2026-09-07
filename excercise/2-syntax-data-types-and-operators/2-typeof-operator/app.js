const ageInput = document.querySelector("#user-age");
const inspectBtn = document.querySelector("#btn-inspect");
const reslutBox = document.querySelector("#result-box");

inspectBtn.addEventListener("click", () => {
  const rawValue = ageInput.value;
  const rawType = typeof rawValue;
  let convertedNumber = Number(rawValue);
  let convertedType = typeof convertedNumber;

  console.log(rawValue);
  console.log(convertedType);

  reslutBox.innerHTML = `Nilai Asli: <strong>"${rawValue}"</strong> (${rawType})<br>
  Setelah Number (): <strong>${convertedNumber}</strong> (${convertedType})`;
});
