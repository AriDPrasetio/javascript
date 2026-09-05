---
title: Deklarasi Variabel — var, let, dan const dalam JavaScript
tags:
  - javascript
  - frontend
  - roadmap-js/03-variables-scope
level: beginner
official_docs_url:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
---

## Deklarasi Variabel — var, let, dan const dalam JavaScript

## 1. Ringkasan Konsep

JavaScript menyediakan tiga kata kunci untuk mendeklarasikan variabel: `var` (standar lama berbasis _function/global scope_ yang mengizinkan redeklarasi), `let` (standar modern ES6 berbasis _block scope_ yang nilainya dapat diubah kembali), dan `const` (standar modern ES6 berbasis _block scope_ yang mengikat referensi variabel secara tetap sehingga tidak dapat di-reassign).

## 2. Kenapa Ini Penting

Menggunakan kata kunci variabel yang tepat mencegah bug kebocoran variabel (_variable leaking_) ke _window global_ dan _race condition_ pada asynchronous loop. Dalam frontend modern (seperti pengembangan komponen React), `const` adalah pilihan standar utama (_default to const_) untuk menjamin imutabilitas referensi state dan props, sementara `let` hanya digunakan ketika nilai variabel memang terbukti harus dihitung ulang.

## 3. Detail & Syntax

### A. Tabel Perbedaan Komprehensif

| Karakteristik         | `var` (Legacy)                    | `let` (Modern)                  | `const` (Modern)                |
| :-------------------- | :-------------------------------- | :------------------------------ | :------------------------------ |
| **Cakupan (Scope)**   | Function Scope / Global           | Block Scope (`{}`)              | Block Scope (`{}`)              |
| **Re-deklarasi**      | Diizinkan dalam scope sama        | Error (`SyntaxError`)           | Error (`SyntaxError`)           |
| **Re-assignment**     | Ya                                | Ya                              | **Tidak** (`TypeError`)         |
| **Hoisting Behavior** | Di-hoist dengan nilai `undefined` | Di-hoist ke dalam **TDZ**       | Di-hoist ke dalam **TDZ**       |
| **Inisialisasi Awal** | Opsional (default: `undefined`)   | Opsional (default: `undefined`) | **Wajib** langsung diberi nilai |

### B. Aturan Praktik Terbaik (_Best Practice Hierarchy_)

1. Gunakan **`const` secara default** untuk 90% deklarasi variabel.
2. Gunakan **`let`** hanya jika nilai variabel tersebut memang akan diubah kembali (misal: counter loop `for`, akumulator nilai).
3. **Hindari sama sekali penggunaan `var`** dalam basis kode modern.

### Contoh Kode (Bisa Diketik Ulang Tangan)

```html
<!-- index.html -->
<div
  style="font-family: sans-serif; width: 300px; padding: 12px; border: 1px solid #ddd; border-radius: 6px;"
>
  <p id="status-display">Status Server: Normal</p>
  <button id="btn-toggle">Ubah Status (let)</button>
  <button id="btn-config">Naikkan Timeout (const obj)</button>
</div>
```

```javascript
// app.js
// 1. const untuk binding elemen DOM & objek konfigurasi
const displayEl = document.querySelector("#status-display");
const toggleBtn = document.querySelector("#btn-toggle");
const configBtn = document.querySelector("#btn-config");

const serverConfig = { timeoutMs: 3000 }; // Objek const: binding terkunci, tapi properti mutable!

// 2. let untuk variabel status yang nilainya akan dihitung ulang
let isMaintenance = false;

toggleBtn.addEventListener("click", () => {
  isMaintenance = !isMaintenance; // Sah: let bisa di-reassign
  displayEl.textContent = `Status Server: ${isMaintenance ? "Maintenance" : "Normal"}`;
});

configBtn.addEventListener("click", () => {
  serverConfig.timeoutMs += 1000; // Sah: memodifikasi properti internal objek const
  displayEl.textContent = `Timeout Baru: ${serverConfig.timeoutMs} ms (const termutasi)`;
});
```

## 4. Common Pitfalls / Edge Case

- **Mitos `const` Membuat Objek Freeze:** `const` hanya mengunci _binding referensi_, bukan membekukan isi objek itu sendiri. Kamu masih bisa menambah, mengedit, atau menghapus properti di dalam array/objek yang dideklarasikan dengan `const`. Jika ingin objek benar-benar beku, gunakan `Object.freeze()`.
- **`var` Menempel pada Window Global:** Mendeklarasikan `var x = 10` di file script browser biasa tanpa modul akan otomatis menambahkan properti baru ke `window.x`, berpotensi menimpa variabel global penting lainnya.
- **Kebocoran Loop `var` pada Asinkronus:** Menggunakan `var` pada loop `for (var i = 0; i < 3; i++)` dengan `setTimeout` akan mencetak nilai akhir `3` sebanyak tiga kali karena `i` berbagi variabel yang sama di luar blok loop. Menggantinya dengan `let` menghasilkan binding terpisah di tiap iterasi.

## 5. Related Topics

- [[Hoisting]]
- [[Block, Function, dan Global Scope]]
- [[Closures dan Lexical Scoping]]

## 6. Self-Check Questions

1. Mengapa memodifikasi isi properti dari sebuah objek yang dideklarasikan menggunakan `const` tidak memicu error `TypeError`?
2. Bagaimana perilaku deklarasi `var` di dalam sebuah blok `if` berbeda dengan perilaku deklarasi `let` di dalam blok yang sama?
3. Mengapa penulisan kode frontend modern sangat menganjurkan pola "_default to `const`_"?

## 7. Sumber

- **MDN Web Docs — var statement**: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)
- **MDN Web Docs — let statement**: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- **MDN Web Docs — const statement**: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
