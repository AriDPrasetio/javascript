---
title: Apa itu JavaScript & Cara Menjalankannya
tags:
  - javascript
  - frontend
  - roadmap-js/01-introduction
level: beginner
official_docs_url:
  - https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript
  - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
  - https://web.dev/articles/efficiently-load-third-party-javascript
---

## Apa itu JavaScript & Cara Menjalankan JavaScript

## 1. Ringkasan Konsep

JavaScript adalah bahasa pemrograman scripting tingkat tinggi, berbasis prototipe, dan multi-paradigma yang membutuhkan **lingkungan eksekusi (_runtime environment_)** untuk dapat berjalan. Secara garis besar, JavaScript memiliki dua runtime utama: **Client-Side (di dalam web browser)** untuk manipulasi DOM dan interaktivitas antarmuka, serta **Server-Side / Standalone (seperti Node.js, Bun, atau Deno)** untuk menjalankan script di luar browser—yang menjadi fondasi utama _build tools_ dan server web modern. Bersama HTML dan CSS, JavaScript adalah fondasi web modern yang menghubungkan struktur, gaya, dan logika program.

## 2. Kenapa Ini Penting

Di ranah kerja frontend modern, HTML dan CSS hanya mampu menghasilkan antarmuka statis. Seluruh interaktivitas nyata—mulai dari validasi input form secara live, rendering komponen di React, pengambilan data produk via REST API, hingga animasi berbasis interaksi pengguna—bergantung sepenuhnya pada JavaScript. Selain itu, memahami cara kerja pemuatan script (seperti atribut `defer` vs `async`) sangat krusial untuk mencegah fenomena _parser-blocking_ yang dapat merusak metrik performa web (_Core Web Vitals_) dan membuat halaman terasa lambat.

## 3. Detail & Syntax

### A. Cara Menjalankan JavaScript

1. **Browser DevTools Console (REPL)**
   - Buka browser, tekan `F12` atau klik kanan -> _Inspect_ -> tab **Console**.
   - Digunakan untuk pengujian kilat dan evaluasi ekspresi langsung tanpa menyiapkan berkas dokumen.
2. **Dalam Dokumen HTML (Inline & External Script)**
   - Menuliskan kode langsung (`<script>...</script>`) atau memuat berkas eksternal (`<script src="app.js"></script>`).
3. **Melalui Terminal / Runtime Mandiri (Node.js / Bun)**
   - Menjalankan script langsung dari terminal menggunakan runtime engine: `node app.js`.

### B. Mekanisme Pemuatan Script Eksternal

- **Default (`<script src="...">`)**: Browser menghentikan parsing HTML (_parser-blocking_), mengunduh script, mengeksekusinya, lalu melanjutkan parsing sisa dokumen.
- **`defer` (`<script defer src="...">`)**: Script diunduh di latar belakang secara non-blocking bersamaan dengan parsing HTML, lalu dieksekusi secara berurutan persis setelah parsing dokumen HTML selesai (sebelum event `DOMContentLoaded`). **(Rekomendasi utama untuk script manipulasi DOM)**.
- **`async` (`<script async src="...">`)**: Script diunduh di latar belakang dan langsung dieksekusi detik itu juga setelah selesai diunduh tanpa memedulikan urutan atau status parsing HTML. Cocok untuk analitik mandiri.
- **`type="module"` (`<script type="module" src="...">`)**: Modul ES6 modern yang secara _default_ sudah berperilaku `defer` dan berjalan dalam _strict mode_.

### C. Dua Runtime Lingkungan JavaScript: Browser vs Node.js

JavaScript membutuhkan _host environment_ (mesin runtime) untuk dieksekusi. Sebagai frontend developer, kamu akan berinteraksi dengan keduanya:

| Aspek Komparasi        | Client-Side (Browser Runtime)                                | Server-Side / Standalone (Node.js / Bun)                         |
| :--------------------- | :----------------------------------------------------------- | :--------------------------------------------------------------- |
| **Tempat Berjalan**    | Peramban web pengguna (Chrome, Firefox, Safari)              | Komputer lokal / server pengembang di atas OS                    |
| **Global Object**      | `window` (atau `globalThis`)                                 | `global` (atau `globalThis`)                                     |
| **Fitur & API Kunci**  | DOM (`document`), Web API (`localStorage`, Web Audio)        | File System (`fs`), Process (`process.env`), HTTP Server         |
| **Keamanan**           | _Sandboxed_ (dilarang membaca sembarang file lokal pengguna) | Akses sistem penuh (dapat membaca/menulis disk & jaringan)       |
| **Relevansi Frontend** | Merender tampilan interaktif & menangani klik pengguna       | Menjalankan compiler/bundler (Vite), linter, npm, & SSR di React |

### Contoh Kode (Bisa Diketik Ulang Tangan)

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Belajar JavaScript Dasar</title>
    <!-- Best Practice: defer menjaga urutan & tidak memblokir parsing HTML -->
    <script defer src="app.js"></script>
  </head>
  <body>
    <h1 id="heading">Hello Web!</h1>
  </body>
</html>
```

```javascript
// app.js
console.log("JavaScript berhasil dimuat!");

const heading = document.getElementById("heading");
heading.textContent = "JavaScript Aktif dan Berjalan!";
```

## 4. Common Pitfalls / Edge Case

- **Memanipulasi Elemen DOM yang Belum Selesai Di-parse:** Menempatkan `<script src="app.js">` biasa di dalam `<head>` tanpa `defer` akan mengeksekusi kode sebelum `<body>` selesai dibaca. Akibatnya, `document.getElementById(...)` menghasilkan `null` dan memicu runtime error: `Cannot read properties of null`.
- **Atribut `defer` dan `async` Hanya Berlaku untuk External Script:** Menuliskan `<script defer>...</script>` pada inline script akan diabaikan oleh browser (_silent ignore_); script tersebut akan tetap dieksekusi secara sinkron dan memblokir parsing.
- **Salah Memilih `async` untuk Script yang Berurutan:** Menggunakan `async` pada script yang saling bergantung (misal: Library A dan Script B yang memanggil Library A) sering menimbulkan _race condition_, karena berkas yang lebih kecil bisa selesai diunduh dan dieksekusi lebih dulu daripada berkas utama.
- **Asumsi Bahwa JavaScript Hanya Hidup di Browser:** Walau dirancang untuk browser, JavaScript kini dapat dieksekusi di runtime mandiri seperti Node.js atau Deno (`node app.js`), yang merupakan fondasi perkakas build modern frontend (seperti Vite, Webpack, dan NPM scripts).

## 5. Related Topics

- [[JavaScript Runtime Environment (Browser vs Node.js)]]
- [[Primitive Types dan Object]]
- [[DOM Manipulation dan Event Listener]]
- [[Event Loop dan Asynchronous JavaScript]]
- [[ES Modules import dan export]]
- [[Browser DevTools dan Debugging Console]]

## 6. Self-Check Questions

1. Mengapa menempatkan tag `<script>` reguler (tanpa atribut) di dalam tag `<head>` menyebabkan error saat berinteraksi dengan elemen DOM HTML?
2. Apa perbedaan mendasar antara siklus unduh dan eksekusi pada atribut `defer` dibandingkan dengan atribut `async`?
3. Dalam skenario frontend nyata seperti apa atribut `async` lebih tepat dipilih dibandingkan `defer`?
4. Apa peran JavaScript runtime non-browser (seperti Node.js) dalam alur kerja seorang _Frontend Developer_ saat ini?

## 7. Sumber

- **MDN Web Docs — What is JavaScript?**: [https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript)
- **MDN Web Docs — `<script>`: The Script element**: [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)
- **web.dev — Efficiently load third-party JavaScript**: [https://web.dev/articles/efficiently-load-third-party-javascript](https://web.dev/articles/efficiently-load-third-party-javascript)

> **Catatan Komparasi Sumber Resmi:**  
> MDN menekankan spesifikasi semantik elemen HTML, siklus parsing DOM, dan relasi API inti JavaScript dengan peramban. Sedangkan web.dev berfokus pada dampak performa nyata (_loading performance_ dan _Core Web Vitals_), menekankan penghapusan _parser-blocking resources_ agar _First Contentful Paint (FCP)_ optimal.
