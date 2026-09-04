---
title: Hoisting dalam JavaScript
tags:
  - javascript
  - frontend
  - roadmap-js/03-variables-scope
level: beginner
official_docs_url:
  - https://developer.mozilla.org/en-US/docs/Glossary/Hoisting
  - https://tc39.es/ecma262/#sec-execution-contexts
---

## Hoisting dalam JavaScript

## 1. Ringkasan Konsep

Hoisting adalah proses internal di mana mesin JavaScript mendaftarkan deklarasi fungsi dan variabel ke dalam memori pada fase kompilasi (_creation phase_), sebelum satu baris kode pun dieksekusi. Fenomena ini membuat deklarasi seolah-olah "diangkat" ke puncak cakupan (_scope_) tempat deklarasi tersebut berada.

## 2. Kenapa Ini Penting

Memahami hoisting adalah kunci menghindari bug `undefined` tak terduga dan error fatal `ReferenceError: Cannot access 'variable' before initialization`. Dalam arsitektur file komponen frontend (seperti React), pemahaman hoisting menjelaskan mengapa kamu bisa memanggil fungsi helper di bagian atas file sebelum fungsi tersebut didefinisikan jika menggunakan _Function Declaration_, namun akan crash jika menggunakan _Function Expression_ atau _Arrow Function_.

## 3. Detail & Syntax

### A. Tiga Pola Hoisting Berdasarkan Jenis Deklarasi

1. **Function Declaration:** Di-hoist secara utuh beserta tubuh fungsinya. Kamu bisa memanggil fungsinya di baris sebelum deklarasinya berada.
2. **Deklarasi `var`:** Hanya nama variabelnya yang di-hoist dan langsung diinisialisasi dengan nilai `undefined`. Nilai sebenarnya baru dimasukkan ketika baris penugasan (_assignment_) dieksekusi.
3. **Deklarasi `let` dan `const` (Temporal Dead Zone - TDZ):** Nama variabel tetap di-hoist ke dalam memori, namun **tidak diinisialisasi**. Wilayah antara awal blok cakupan hingga baris inisialisasi disebut _Temporal Dead Zone_. Mengakses variabel di area ini akan memicu `ReferenceError`.

### Contoh Kode (Bisa Diketik Ulang Tangan)

```javascript
// 1. Hoisting pada Function Declaration (Berhasil)
greetUser("Alice"); // Mencetak: "Halo, Alice!"

function greetUser(name) {
  console.log(`Halo, ${name}!`);
}

// 2. Hoisting pada var vs let/const
console.log(legacyVar); // Mencetak: undefined (tidak melempar error)
var legacyVar = "Nilai Legacy";

// console.log(modernLet); // ReferenceError: Cannot access 'modernLet' before initialization
let modernLet = "Nilai Modern";

// 3. Jebakan Function Expression
// renderHeader(); // TypeError: renderHeader is not a function (karena masih bernilai undefined)
var renderHeader = function () {
  console.log("Render Header UI");
};
```

## 4. Common Pitfalls / Edge Case

- **Mitos Bahwa `let` dan `const` Tidak Mengalami Hoisting:** `let` dan `const` sebenarnya **tetap di-hoist**. Buktinya: jika ada variabel `let x = 1` di luar scope, lalu di dalam blok fungsi kamu menulis `console.log(x); let x = 2;`, kamu tidak akan mendapatkan nilai `1` dari luar, melainkan langsung mendapat error TDZ `ReferenceError`. Ini membuktikan mesin JS sudah mengetahui keberadaan `x` lokal sejak awal blok.
- **Function Expression vs Function Declaration:** Banyak pemula mengira arrow function `const myFn = () => {}` bisa dipanggil sebelum dideklarasikan layaknya `function myFn() {}`. Ingat: arrow function disimpan dalam variabel, sehingga perilakunya mengikuti aturan hoisting variabelnya (`const` -> TDZ).

## 5. Related Topics

- [[Deklarasi Variabel (var, let, const)]]
- [[Block, Function, dan Global Scope]]
- [[Function Declaration vs Expression dan Arrow Function]]

## 6. Self-Check Questions

1. Mengapa sebuah fungsi yang dibuat dengan _Function Declaration_ dapat dipanggil sebelum baris deklarasinya, sedangkan arrow function dalam variabel `const` memicu `ReferenceError`?
2. Apa yang dimaksud dengan _Temporal Dead Zone_ (TDZ) pada siklus hidup variabel `let` dan `const`?
3. Apa hasil yang dicetak ke konsol jika kamu mencoba membaca nilai variabel `var` sebelum baris inisialisasinya?

## 7. Sumber

- **MDN Web Docs — Hoisting Glossary**: [https://developer.mozilla.org/en-US/docs/Glossary/Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)
- **ECMA-262 Specification — Lexical Environments & Declarations**: [https://tc39.es/ecma262/#sec-declarations-and-the-variable-statement](https://tc39.es/ecma262/#sec-declarations-and-the-variable-statement)
