# JavaScript Fundamentals — Fase 1: Introduction

## Apa itu JavaScript, dan Cara Menjalankan JavaScript

---

### 1. Ringkasan Konsep

JavaScript adalah bahasa scripting yang membuat halaman web menjadi interaktif — ia adalah lapisan ketiga setelah HTML (struktur) dan CSS (tampilan), yang bertugas menangani logika, interaksi, dan pembaruan konten secara dinamis. Di browser, kode JavaScript ditulis dalam bentuk teks biasa dan dijalankan langsung oleh _JavaScript engine_ browser (interpreted / JIT-compiled), bukan dikompilasi lebih dulu seperti C/C++. Cara menjalankannya di halaman web dilakukan lewat elemen `<script>`, baik ditulis langsung di HTML (internal) maupun dirujuk dari file terpisah (eksternal).

### 2. Kenapa Ini Penting

- Ini adalah fondasi paling dasar sebelum bisa memahami apa pun yang lain di roadmap (variabel, DOM, event, dst) — tanpa paham _di mana_ dan _kapan_ kode JS dieksekusi, debugging akan terasa membingungkan.
- Di pekerjaan sehari-hari, keputusan soal **di mana** menaruh `<script>` (head vs bottom of body) dan **atribut apa** yang dipakai (`defer`, `async`, `type="module"`) langsung berdampak pada performa loading halaman dan bug semacam "elemen belum ada tapi sudah diakses JS" (`Cannot access 'x' before initialization` atau `null` saat `querySelector`).
- Memahami bahwa JavaScript itu client-side (jalan di browser pengguna) vs server-side (jalan di server) penting untuk komunikasi dengan tim backend dan memahami arsitektur aplikasi secara umum.

### 3. Detail & Syntax

#### A. Bagaimana JavaScript dieksekusi

- Setiap tab browser adalah _execution environment_ terpisah — kode di satu tab tidak bisa langsung mengakses kode di tab/situs lain (alasan keamanan).
- Secara umum JS dijalankan **berurutan dari atas ke bawah**, tapi ini tidak selalu mutlak karena ada fenomena seperti _hoisting_ (dibahas di bagian roadmap lain).
- Contoh klasik kesalahan urutan:

```js
// SALAH — button dipakai sebelum dideklarasikan
button.addEventListener("click", updateName);
const button = document.querySelector("button");
```

Kode di atas akan melempar error `Uncaught ReferenceError: Cannot access 'button' before initialization`.

#### B. Tiga cara menaruh JavaScript di halaman

**1. Internal** — di dalam `<script>` menjelang penutup `</body>`:

```html
<body>
  <button>Klik saya</button>

  <script>
    function createParagraph() {
      const para = document.createElement("p");
      para.textContent = "Tombol diklik!";
      document.body.appendChild(para);
    }
    document.querySelector("button").addEventListener("click", createParagraph);
  </script>
</body>
```

**2. Eksternal** — file `.js` terpisah, dirujuk lewat atribut `src`:

```html
<script type="module" src="script.js"></script>
```

Kelebihan cara eksternal: kode lebih rapi, bisa dipakai ulang di banyak halaman. Catatan: script bertipe `module` butuh dijalankan lewat server lokal (http://localhost), tidak bisa langsung dibuka via `file://` karena kebijakan _same-origin_.

**3. Inline handler** (`onclick="..."` di tag HTML) — **hindari** ini di kode produksi karena mencampur logika JS ke dalam markup HTML dan tidak scalable. Gunakan `addEventListener` sebagai gantinya.

#### C. Strategi loading script: default vs `defer` vs `async`

| Cara                    | Kapan di-fetch                                                              | Kapan dieksekusi                                                | Urutan eksekusi             |
| ----------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------- |
| Default (tanpa atribut) | Blocking — parsing HTML berhenti sampai script selesai diambil & dijalankan | Langsung saat ditemui                                           | Sesuai urutan di halaman    |
| `defer`                 | Paralel dengan parsing HTML                                                 | Setelah HTML selesai di-parse, sebelum event `DOMContentLoaded` | Sesuai urutan penulisan     |
| `async`                 | Paralel dengan parsing HTML                                                 | Segera setelah selesai di-fetch (bisa memotong parsing)         | **Tidak** dijamin urutannya |
| `type="module"`         | Paralel                                                                     | Otomatis "defer by default"                                     | Sesuai urutan penulisan     |

Aturan praktis: pakai `defer` (atau `type="module"`) kalau script butuh DOM sudah siap atau bergantung pada script lain; pakai `async` untuk script independen yang tidak saling bergantung (contoh: analytics).

#### D. Komentar

```js
// komentar satu baris

/*
  komentar
  multi-baris
*/
```

### 4. Common Pitfalls / Edge Case

- **Menaruh `<script>` di `<head>` tanpa `defer`/`async`/`module`** → parsing HTML terblokir total, halaman terasa lambat/"putih" sesaat, dan JS yang mencoba mengakses elemen di bawahnya akan gagal (elemen belum ada).
- **Mengira `async` menjaga urutan eksekusi** — padahal `async` tidak menjamin urutan sama sekali; kalau ada dependensi antar-script (misal library lalu kode yang memakainya), pakai `defer`, bukan `async`.
- **Membuka file `.html` langsung via `file://` saat pakai `<script type="module">`** — akan gagal dengan error CORS/`Cross-origin request blocked` karena modul JS mensyaratkan diakses dari server (http/https), bukan filesystem lokal.
- **Terlalu banyak inline `onclick`** — selain tidak rapi, ini juga sulit di-maintain dan tidak scalable dibanding `addEventListener` dengan `querySelectorAll` + loop.
- **Menganggap JavaScript selalu jalan strictly top-to-bottom** — abaikan hoisting dulu di tahap ini, tapi sadari bahwa deklarasi variabel/fungsi punya perilaku yang tidak selalu intuitif (akan dibahas di bagian _Hoisting_).

### 5. Related Topics

- [[Variabel var let const]]
- [[Hoisting]]
- [[DOM Manipulation dan Event Listener]]
- [[ES Modules - import export]]
- [[Browser DevTools]]
- [[Client-side vs Server-side JavaScript]]
- [[Event Bubbling dan Delegation]]

### 6. Self-Check Questions

1. Apa perbedaan mendasar antara JavaScript sebagai bahasa "interpreted/JIT-compiled" dengan bahasa "compiled" seperti C++?
2. Kalau sebuah script diletakkan di `<head>` tanpa atribut apa pun, apa dampaknya terhadap proses parsing HTML?
3. Dalam kondisi apa sebaiknya memakai `defer`, dan dalam kondisi apa lebih tepat memakai `async`?
4. Kenapa `<script type="module" src="script.js">` bisa gagal dijalankan kalau file HTML dibuka langsung lewat `file://`?
5. Kenapa memakai `addEventListener` lebih disarankan dibanding atribut `onclick` di HTML?

### 7. Sumber

- [What is JavaScript? — MDN Learn web development](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript)
- [`<script>` HTML script element — MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script)
- [A first splash into JavaScript — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/A_first_splash)

---

**Catatan struktur**: Topik ini sebenarnya menggabungkan dua sub-topik (konsep dasar JS + cara menjalankannya). Untuk sesi belajar berikutnya, pertimbangkan memecah **"Script loading strategies (`defer`/`async`/`module`)"** jadi catatan tersendiri karena cukup dalam untuk dikaitkan langsung ke topik **Asynchronous JavaScript** dan **ES Modules** di roadmap kamu nanti — supaya tidak perlu diulang dari nol saat sampai di sana.
