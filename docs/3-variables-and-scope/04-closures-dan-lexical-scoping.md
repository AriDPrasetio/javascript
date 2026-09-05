---
title: Closures dan Lexical Scoping dalam JavaScript
tags:
  - javascript
  - frontend
  - roadmap-js/03-variables-scope
level: intermediate
official_docs_url:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
  - https://tc39.es/ecma262/#sec-lexical-environments
---

## Closures dan Lexical Scoping dalam JavaScript

## 1. Ringkasan Konsep

**Lexical Scoping** berarti penentuan scope suatu variabel didasarkan pada posisi fisik di mana fungsi dan variabel tersebut dituliskan di dalam kode sumber (_author-time_). **Closure** adalah kombinasi antara sebuah fungsi dan referensi ke lingkungan leksikal di sekelilingnya, yang memungkinkan fungsi dalam (_inner function_) tetap mengingat dan mengakses variabel dari fungsi luar (_outer function_) meskipun fungsi luar tersebut telah selesai dieksekusi dan keluar dari call stack.

## 2. Kenapa Ini Penting

Closure adalah jantung dari JavaScript modern dan fondasi utama arsitektur frontend. Tanpa closure, fitur seperti enkapsulasi data privat (_private state_), fungsi _debounce / throttle_ pada input pencarian, event handler yang mengingat data baris tabel, serta cara kerja _Hooks_ pada React (seperti `useState` dan `useEffect`) tidak akan mungkin bekerja.

## 3. Detail & Syntax

### A. Mekanisme Kerja Closure

Saat fungsi luar dieksekusi, ia menciptakan sebuah _lexical environment_. Ketika fungsi tersebut mengembalikan fungsi dalam, fungsi dalam tersebut membawa referensi (_backpack/closure_) ke variabel-variabel yang dibutuhkan dari lingkungan luar tersebut. Variabel tersebut tidak akan dihapus oleh _Garbage Collector_ selama fungsi dalam masih memiliki referensi aktif.

### Contoh Kode (Bisa Diketik Ulang Tangan)

```html
<!-- index.html -->
<div
  style="font-family: sans-serif; width: 260px; padding: 12px; border: 1px solid #ccc; border-radius: 6px;"
>
  <p>Skor Sesi: <strong id="score-display">0</strong></p>
  <button id="btn-add" style="padding: 6px 12px; cursor: pointer;">
    + Tambah Poin
  </button>
  <button id="btn-reset" style="padding: 6px 12px; cursor: pointer;">
    Reset
  </button>
</div>
```

```javascript
// app.js
// Factory function: Mengenkapsulasi state variabel 'score' privat di dalam closure
function createScoreManager(displayElement, initialScore = 0) {
  let score = initialScore; // Variabel privat: tidak bisa diakses langsung dari window!

  function updateDOM() {
    displayElement.textContent = score;
  }

  // Mengembalikan objek berisi method yang memegang closure ke variabel 'score'
  return {
    addPoint(points = 1) {
      score += points;
      updateDOM();
    },
    resetScore() {
      score = initialScore;
      updateDOM();
    },
  };
}

const scoreDisplay = document.querySelector("#score-display");
const scoreTracker = createScoreManager(scoreDisplay, 0);

document
  .querySelector("#btn-add")
  .addEventListener("click", () => scoreTracker.addPoint(5));
document
  .querySelector("#btn-reset")
  .addEventListener("click", () => scoreTracker.resetScore());

// console.log(score); // ReferenceError: score is not defined (Aman & terisolasi!)
```

## 4. Common Pitfalls / Edge Case

- **Masalah Klasik Loop Closure (Sebelum ES6):** Menggunakan `var` pada loop yang mendaftarkan event listener atau `setTimeout` membuat seluruh callback berbagi satu variabel yang sama. Di ES6, masalah ini tuntas otomatis dengan menggunakan `let` karena `let` menciptakan binding leksikal baru untuk setiap putaran iterasi.
- **Potensi Kebocoran Memori (_Memory Leaks_):** Jika closure menahan referensi ke objek yang sangat besar (seperti elemen DOM berukuran masif) dan fungsi closure tersebut disimpan dalam variabel global atau event listener yang tidak pernah dilepas, memori tersebut tidak bisa dibersihkan oleh peramban.
- **Stale Closures di Framework Modern:** Pada React, jika dependensi `useEffect` atau callback tidak diperbarui dengan benar, fungsi closure akan terus membaca nilai variabel state dari siklus render lama (_stale state_).

## 5. Related Topics

- [[Block, Function, dan Global Scope]]
- [[Higher-Order Function]]
- [[IIFE (Immediately Invoked Function Expression)]]
- [[DOM Manipulation dan Event Listener]]

## 6. Self-Check Questions

1. Mengapa fungsi di dalam closure tetap dapat mengakses variabel milik fungsi luar padahal fungsi luar tersebut sudah selesai dieksekusi (_returned_)?
2. Bagaimana closure dapat dimanfaatkan untuk membuat variabel privat (_private variables_) dalam pemrograman JavaScript murni tanpa class?
3. Apa yang menyebabkan fenomena _memory leak_ saat menggunakan closure secara tidak hati-hati pada event listener DOM?

## 7. Sumber

- **MDN Web Docs — Closures**: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- **ECMA-262 Specification — Lexical Environments**: [https://tc39.es/ecma262/#sec-lexical-environments](https://tc39.es/ecma262/#sec-lexical-environments)
