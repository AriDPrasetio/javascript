---
title: Primitive Types dan Object dalam JavaScript
tags:
  - javascript
  - frontend
  - roadmap-js/02-syntax-datatypes
level: beginner
official_docs_url:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures
  - https://tc39.es/ecma262/#sec-ecmascript-data-types-and-values
---

## Primitive Types dan Object dalam JavaScript

## 1. Ringkasan Konsep

Dalam JavaScript, seluruh nilai terbagi menjadi dua kategori fundamental: **Primitive Types** (tipe data dasar yang bersifat _immutable_ dan disimpan langsung berdasarkan nilainya) serta **Object** (koleksi pasangan _key-value_ yang bersifat _mutable_ dan disimpan berdasarkan referensi memorinya). Terdapat 7 tipe primitif standar dalam ECMAScript modern: `string`, `number`, `bigint`, `boolean`, `undefined`, `null`, dan `symbol`.

## 2. Kenapa Ini Penting

Di dunia pengembangan frontend (khususnya saat mengelola _state_ di React atau Vue), membedakan antara nilai primitif (_pass-by-value_) dan referensi objek (_pass-by-reference_) adalah kunci menghindari bug mutasi data liar (_unintended side-effects_). Pemahaman tentang immutability primitif juga menjadi fondasi saat melakukan perbandingan dependensi pada _hooks_ seperti `useEffect` atau optimasi re-render komponen UI.

## 3. Detail & Syntax

### A. Karakteristik 7 Primitive Types

1. **`string`**: Rangkaian karakter tekstual, misal `"Halo Dunia"`.
2. **`number`**: Nilai numerik floating-point 64-bit (IEEE 754), mencakup bilangan bulat, desimal, `Infinity`, dan `NaN`.
3. **`bigint`**: Bilangan bulat dengan presisi arbitrer melebihi batas `Number.MAX_SAFE_INTEGER`, ditandai dengan sufiks `n` (misal `9007199254740995n`).
4. **`boolean`**: Nilai logika kebenaran, hanya bernilai `true` atau `false`.
5. **`undefined`**: Nilai bawaan (_default_) variabel yang telah dideklarasikan namun belum diinisialisasi nilai apapun.
6. **`null`**: Nilai kesengajaan ketiadaan objek (_intentional absence of any object value_).
7. **`symbol`**: Pengidentifikasi unik dan _immutable_ yang digunakan untuk menghindari tabrakan nama properti objek.

### B. Tipe Kompleks: Object

Object adalah struktur data non-primitif yang menampung referensi ke lokasi memori. Array, Functions, dan Plain Objects (`{}`) seluruhnya adalah turunan dari tipe data Object.

### Contoh Kode (Bisa Diketik Ulang Tangan)

```javascript
// 1. Primitive: Pass-by-value (independen)
let titleA = "Dashboard";
let titleB = titleA;
titleB = "Settings";
console.log(titleA); // "Dashboard" (titleA tidak terpengaruh)

// 2. Object: Pass-by-reference (berbagi referensi memori)
const userProfile = { name: "Budi", role: "Developer" };
const editProfile = userProfile;
editProfile.role = "Lead";
console.log(userProfile.role); // "Lead" (userProfile ikut berubah!)
```

## 4. Common Pitfalls / Edge Case

- **Primitive Wrapper Objects Auto-Boxing:** Primitif seperti string tidak memiliki method sendiri, namun ketika kamu memanggil `"teks".toUpperCase()`, JavaScript otomatis membungkusnya ke dalam _wrapper object_ sementara (`String()`), mengeksekusi method, lalu membuang objek tersebut.
- **Kesalahpahaman `null` vs `undefined`:** `undefined` mengindikasikan bahwa variabel belum pernah diberi nilai oleh program, sedangkan `null` diatur secara sadar oleh developer untuk menyatakan "kosong".
- **`NaN` adalah Tipe `number`:** Meskipun singkatannya adalah _Not-a-Number_, secara spesifikasi tipe data dari nilai `NaN` adalah tetap `number` (`typeof NaN === "number"`).

## 5. Related Topics

- [[typeof Operator]]
- [[Type Casting (Coercion vs Conversion)]]
- [[Equality (== vs ===)]]
- [[Destructuring]]
- [[Spread dan Rest Operator]]

## 6. Self-Check Questions

1. Mengapa memodifikasi properti pada salinan variabel objek dapat mengubah isi objek aslinya, sedangkan menyalin variabel string tidak menghasilkan efek samping tersebut?
2. Apa perbedaan filosofis dan teknis antara variabel yang bernilai `undefined` dengan variabel yang bernilai `null`?
3. Mengapa nilai primitif string bisa memanggil method seperti `.toLowerCase()` padahal primitif bukan merupakan objek?
4. Kapan seorang frontend developer harus menggunakan tipe `bigint` alih-alih tipe `number` biasa?

## 7. Sumber

- **MDN Web Docs — JavaScript data types and data structures**: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
- **ECMA-262 Specification — ECMAScript Data Types and Values**: [https://tc39.es/ecma262/#sec-ecmascript-data-types-and-values](https://tc39.es/ecma262/#sec-ecmascript-data-types-and-values)
