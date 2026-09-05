// 1. Verifikasi ID pengguna daari URL / Param API
const userIdFromUrl = "101";
const currentUserId = 101;

// Berbahaya (loose): rentan anomali jika nilainya berupa 0, "", atau null
if (userIdFromUrl == currentUserId) {
  console.log("Cocok dengan loose equality");
}

// Praktik terbaik (Strict): laukkan konversi eksplisit dahulu
if (Number(userIdFromUrl) === currentUserId) {
  console.log("Pengguna terverifikasi secara aman dan deterministik");
}
