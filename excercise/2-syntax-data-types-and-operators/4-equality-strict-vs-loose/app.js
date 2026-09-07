const selectEl = document.querySelector("#role-select");
const compareBtn = document.querySelector("#btn-compare");
const logEl = document.querySelector("#compare-log");

compareBtn.addEventListener("click", () => {
  //saat tombol comapreBtn diklik, jalankan fungsi di bawah ini:
  const selectedStr = selectEl.value;
  const targetNum = 0;
  // 1. Loose Equality (==): Terjadi coercian otomatis
  const isLooseEqual = selectedStr == targetNum;
  // cek kesamaan menggunakan dua sama dengan (==), simpan hasil true/false ke isLooseEqual.

  // 2. Strict Equality (===): Memeriksa tipa DAN nilai secara ketat
  const isStrictEqual = selectedStr === targetNum;
  // cek kesamaan ketat (===) agar tipe datanya juga dicocokan, simpan ke isStrictEqual.

  logEl.innerHTML = `
  Nilai Select: <code>"${selectedStr}"</code> (${typeof selectedStr})<br>
  Target: <code>${targetNum}</code> (${typeof targetNum})<br>
  Hasil <code>==</code> (Loose): <strong>${isLooseEqual}</strong> (terkonversi otomatis)<br>
  Hasil <code>===</code> (Strict): <strong>${isStrictEqual}</strong> (tipe berbeda!)`;
});
