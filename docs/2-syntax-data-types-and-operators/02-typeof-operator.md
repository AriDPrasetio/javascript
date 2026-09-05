---
title: typeof Operator dalam JavaScript
tags:
  - javascript
  - frontend
  - roadmap-js/02-syntax-datatypes
level: beginner
official_docs_url:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
  - https://tc39.es/ecma262/#sec-typeof-operator
---

## typeof Operator dalam JavaScript

## 1. Ringkasan Konsep

Operator `typeof` adalah operator _unary_ bawaan JavaScript yang mengevaluasi tipe data dari suatu operand dan mengembalikan hasilnya dalam bentuk string. Nilai kembalian yang valid secara spesifikasi mencakup: `"string"`, `"number"`, `"bigint"`, `"boolean"`, `"undefined"`, `"symbol"`, `"object"`, dan `"function"`.

## 2. Kenapa Ini Penting

Dalam pekerjaan frontend, operator `typeof` sering digunakan untuk melakukan _runtime type guarding_, memeriksa apakah properti opsi yang dikirim oleh pengguna berjenis fungsi (_callback verification_), atau memastikan API respon memiliki tipe data yang diharapkan sebelum dirender ke dalam antarmuka UI demi mencegah error _crash_ pada aplikasi.

## 3. Detail & Syntax

### A. Pola Sintaks

Operator `typeof` dapat dituliskan dengan atau tanpa tanda kurung:

```javascript
typeof operand;
typeof operand; // Tanda kurung hanya berfungsi untuk mengelompokkan ekspresi
```

### B. Nilai Hasil Evaluasi `typeof`

| Operand / Nilai       | Hasil Kembalian | Catatan Teknis                            |
| :-------------------- | :-------------- | :---------------------------------------- |
| `"halo"`              | `"string"`      | Teks primitif                             |
| `42` / `3.14` / `NaN` | `"number"`      | Termasuk NaN dan Infinity                 |
| `100n`                | `"bigint"`      | Integer presisi arbitrer                  |
| `true` / `false`      | `"boolean"`     | Logika boolean                            |
| `undefined`           | `"undefined"`   | Variabel belum terinisialisasi            |
| `Symbol("id")`        | `"symbol"`      | Identifier unik                           |
| `function() {}`       | `"function"`    | Objek yang mengimplementasikan `[[Call]]` |
| `{}` / `[1, 2, 3]`    | `"object"`      | Objek biasa atau Array                    |
| `null`                | `"object"`      | **Bug historis bahasa** (lihat pitfall)   |

### Contoh Kode (Bisa Diketik Ulang Tangan)

```html
<!-- index.html -->
<div
  style="font-family: sans-serif; display: flex; flex-direction: column; gap: 8px; width: 280px;"
>
  <label for="user-age">Masukkan Umur:</label>
  <input id="user-age" type="number" value="25" />
  <button id="btn-inspect" style="cursor: pointer; padding: 6px;">
    Cek Tipe Data Nilai Input
  </button>
  <p
    id="result-box"
    style="margin: 0; padding: 6px; background: #f3f4f6; border-radius: 4px;"
  >
    Hasil: belum dicek
  </p>
</div>
```

```javascript
// app.js
const ageInput = document.querySelector("#user-age");
const inspectBtn = document.querySelector("#btn-inspect");
const resultBox = document.querySelector("#result-box");

inspectBtn.addEventListener("click", () => {
  // Fakta Kritis Frontend: input.value SELALU bertipe 'string' meskipun type="number"
  const rawValue = ageInput.value;
  const rawType = typeof rawValue;

  // Type guarding sebelum pemrosesan
  let convertedNumber = Number(rawValue);
  let convertedType = typeof convertedNumber;

  resultBox.innerHTML = `
    Nilai Asli: <strong>"${rawValue}"</strong> (${rawType})<br>
    Setelah Number(): <strong>${convertedNumber}</strong> (${convertedType})
  `;
});
```

## 4. Common Pitfalls / Edge Case

- **Bug Legendaris `typeof null === "object"`:** Pada implementasi awal JavaScript di Netscape tahun 1995, nilai disimpan dengan tag tipe binary di mana `000` menandakan objek, dan penanda `null` secara internal bernilai pointer nol (`0x00`). Akibatnya, `typeof null` mengembalikan `"object"`. Bug ini diabadikan secara permanen dalam spesifikasi demi menjaga kompatibilitas web lama (_backward compatibility_). Untuk mengecek null secara aman: gunakan perbandingan identitas `val === null`.
- **`typeof []` Menghasilkan `"object"`:** Array adalah turunan objek, sehingga `typeof []` mengembalikan `"object"`, bukan `"array"`. Gunakan `Array.isArray(arr)` untuk memastikan validitas array.
- **Pengecekan `NaN`:** Karena `typeof NaN === "number"`, kamu tidak bisa mendeteksi `NaN` dengan `typeof`. Gunakan `Number.isNaN(val)`.

## 5. Related Topics

- [[Primitive Types dan Object]]
- [[Equality (== vs ===)]]
- [[Type Casting (Coercion vs Conversion)]]
- [[Array dan Object Methods]]

## 6. Self-Check Questions

1. Mengapa `typeof null` mengembalikan string `"object"`, dan bagaimana cara yang benar untuk memverifikasi apakah suatu variabel bernilai `null`?
2. Jika sebuah fungsi menerima argumen yang mungkin berupa array atau plain object, mengapa menggunakan `typeof` saja tidak mencukupi untuk membedakan keduanya?
3. Mengapa operator `typeof` tidak melempar `ReferenceError` ketika digunakan untuk mengecek variabel yang belum pernah dideklarasikan sama sekali?

## 7. Sumber

- **MDN Web Docs — typeof operator**: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
- **ECMA-262 Specification — The typeof Operator**: [https://tc39.es/ecma262/#sec-typeof-operator](https://tc39.es/ecma262/#sec-typeof-operator)
