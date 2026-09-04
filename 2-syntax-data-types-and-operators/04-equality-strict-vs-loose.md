---
title: Equality — Strict (===) vs Loose (==) dalam JavaScript
tags:
  - javascript
  - frontend
  - roadmap-js/02-syntax-datatypes
level: beginner
official_docs_url:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness
---

## Equality — Strict (===) vs Loose (==) dalam JavaScript

## 1. Ringkasan Konsep

JavaScript menyediakan dua operator kesetaraan: **Strict Equality (`===`)** yang membandingkan nilai dan tipe data tanpa melakukan konversi otomatis, serta **Loose Equality (`==`)** yang menjalankan algoritma _Abstract Equality Comparison_ dengan mengonversi tipe data operand secara paksa (_type coercion_) sebelum membandingkannya.

## 2. Kenapa Ini Penting

Dalam penulisan kode frontend modern dan komponen UI, menggunakan `==` adalah sumber utama timbulnya _subtle bugs_ karena perilaku konversinya yang tidak terduga. Standar industri dan konfigurasi linter modern (seperti ESLint aturan `eqeqeq`) mewajibkan penggunaan `===` hampir di seluruh situasi untuk memastikan determinisme logika percabangan kondisi.

## 3. Detail & Syntax

### A. Strict Equality (`===`)

- Tidak melakukan _type coercion_.
- Jika tipe data operand berbeda, perbandingan langsung menghasilkan `false`.
- Objek hanya bernilai sama jika merujuk ke referensi memori yang persis sama.

### B. Loose Equality (`==`)

- Jika operand memiliki tipe berbeda, mesin JavaScript mengubah salah satu atau kedua operand ke tipe primitif (biasanya numerik) sebelum membandingkan.
- Pengecualian unik: `null == undefined` bernilai `true` (keduanya dianggap setara secara _loose_, tetapi tidak setara dengan nilai _falsy_ lain seperti `0` atau `""`).

### Tabel Komparasi Praktis

| Ekspresi             | Hasil `===` (Strict) | Hasil `==` (Loose) | Alasan Perbedaan                                    |
| :------------------- | :------------------: | :----------------: | :-------------------------------------------------- |
| `5 === "5"`          |       `false`        |       `true`       | Loose mengubah string `"5"` menjadi angka `5`       |
| `0 === false`        |       `false`        |       `true`       | Loose mengubah boolean `false` menjadi angka `0`    |
| `"" === 0`           |       `false`        |       `true`       | Loose mengubah string kosong `""` menjadi angka `0` |
| `null === undefined` |       `false`        |       `true`       | Aturan khusus spesifikasi loose equality            |
| `[1] === "1"`        |       `false`        |       `true`       | Loose mengubah array `[1]` menjadi primitif `"1"`   |

### Contoh Kode (Bisa Diketik Ulang Tangan)

```javascript
// 1. Verifikasi ID pengguna dari URL / Param API
const userIdFromUrl = "101"; // String dari router
const currentUserId = 101; // Number dari database

// Berbahaya (Loose): rentan anomali jika nilainya berupa 0, "", atau null
if (userIdFromUrl == currentUserId) {
  console.log("Cocok dengan loose equality");
}

// Praktik Terbaik (Strict): lakukan konversi eksplisit dahulu
if (Number(userIdFromUrl) === currentUserId) {
  console.log("Pengguna terverifikasi secara aman dan deterministik");
}
```

## 4. Common Pitfalls / Edge Case

- **Anomali `NaN`:** Nilai `NaN` tidak pernah sama dengan nilai apapun, bahkan dirinya sendiri (`NaN === NaN` menghasilkan `false`). Gunakan `Number.isNaN(val)` atau `Object.is(val, NaN)` untuk mendeteksi `NaN`.
- **Perbandingan Referensi Objek:** Dua objek atau array yang memiliki properti/elemen identik tetap menghasilkan `false` saat dibandingkan (`{} === {}` bernilai `false` dan `[] === []` bernilai `false`), karena keduanya menempati slot memori yang berbeda.
- **Satu-Satunya Use Case `==` yang Ditoleransi:** Sebagian developer memanfaatkan `val == null` sebagai _shorthand_ untuk memeriksa apakah `val` bernilai `null` ATAU `undefined` sekaligus. Namun di luar kasus ini, selalu gunakan `===`.

## 5. Related Topics

- [[Type Casting (Coercion vs Conversion)]]
- [[Primitive Types dan Object]]
- [[Conditional Statements (if-else)]]

## 6. Self-Check Questions

1. Mengapa ekspresi `"" == 0` menghasilkan `true`, tetapi `"" === 0` menghasilkan `false`?
2. Mengapa perbandingan dua objek kosong `{}` dengan objek kosong lainnya `{}` selalu mengembalikan `false` baik menggunakan `==` maupun `===`?
3. Bagaimana cara memverifikasi apakah suatu variabel bernilai `NaN` jika perbandingan `x === NaN` tidak pernah menghasilkan nilai `true`?

## 7. Sumber

- **MDN Web Docs — Strict equality (===)**: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)
- **MDN Web Docs — Equality comparisons and sameness**: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
- **ECMA-262 Specification — IsStrictlyEqual**: [https://tc39.es/ecma262/#sec-isstrictlyequal](https://tc39.es/ecma262/#sec-isstrictlyequal)
