// 1. Pemeriksaan callback opsional pada komponen UI
function renderButton(label, onClick) {
  if (typeof onClick === "function") {
    onClick();
  } else {
    console.warn("onClick callback tidak disediakan atau bukan fungsi.");
  }
}

// 2. Pemeriksaan aman variable yang belum dideklarasikan
if (typeof undeclaredConfigVariable === "undefined") {
  console.log(
    "Variable konfigurasi global belum dimuat atau tidak dideklarasikan di browser.",
  );
}
