// 1. Primitive: pass-by-value (tidak mengubah variable asal)
let roleA = "Frontend Dev";
// simpan teks "Frontend Dev" ke dalam variable roleA.
let roleB = roleA;
// salin isi roleA ke dalam variable roleB.
roleB = "Tech Lead"; // roleB tetap "Frontend Dev"
// roleB mencoba untk mengubah isi roleA yang value-nya adalah "Frontend Dev" menjadi "Tech Lead", tapi value roleA tidak ikut berubah dikarenakan tipe data primitive (immutable/tidak dapat diubah).

// 2. Object: pass-by-reference (berbagi alamat memori yang sama)
const userProfile = { name: "Ari", role: roleA };
// buat objek userProfile dengan nama "Ari" dan ambil peran dari roleA yang nilainya adalah "Frontend Dev".
const nameEl = document.querySelector("#user-name");
// ambil elemen HTML dengan ID "user-name", simpan ke wadah nameEl.
const roleEl = document.querySelector("#user-role");
// ambil elemen HTML dengan ID "user-role", simpan ke wadah roleEl.
const updateBtn = document.querySelector("#btn-update");
// ambil elemen HTML dengan ID "btn-update", simpan ke wadah updateBtn.

// Render awal
nameEl.textContent = userProfile.name;
// tampilkan nama dari objek userProfile ke dalam nameEl.
roleEl.textContent = userProfile.role;
// tampilkan peran dari objek userProfile ke dalam roleEl.

updateBtn.addEventListener("click", () => {
  // saat tombol updatBtn diklik, jalankan fungsi berikut:
  const profileAlias = userProfile;
  // buat variable baru yang menunjuk ke objek userProfile yang sama di memori.
  profileAlias.role = roleB;
  // ubah peran pada rofileAlias menjadi roleB, yang otomatis mengubah userProfile.role juga.

  roleEl.textContent = `${userProfile.role} (Dimutasi lewat profileAlias!)`;
  roleEl.style.color = "green";
});
