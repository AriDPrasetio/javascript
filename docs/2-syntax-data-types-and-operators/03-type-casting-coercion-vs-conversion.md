---
title: Type Casting — Explicit vs Implicit (Conversion vs Coercion)
tags:
  - javascript
  - frontend
  - roadmap-js/02-syntax-datatypes
level: beginner
official_docs_url:
  - https://developer.mozilla.org/en-US/docs/Glossary/Type_conversion
  - https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion
  - https://tc39.es/ecma262/#sec-type-conversion
---

## Type Casting — Explicit vs Implicit (Conversion vs Coercion)

## 1. Ringkasan Konsep

Dalam JavaScript, perubahan tipe data (_type casting_) terbagi menjadi dua mekanisme: **Explicit Conversion** (developer secara sengaja mengonversi tipe menggunakan fungsi bawaan seperti `Number()`, `String()`, atau `Boolean()`) dan **Implicit Coercion** (mesin JavaScript secara otomatis mengubah tipe data di balik layar ketika mengevaluasi operasi tertentu).

## 2. Kenapa Ini Penting

Bug nomor satu pada form input di frontend sering berakar dari _type coercion_. Sebagai contoh, nilai dari `<input type="number">` yang dibaca lewat `inputElement.value` selalu bertipe `string` di DOM; jika dijumlahkan langsung dengan `+`, JavaScript akan melakukan konkatenasi string (misal `"10" + 5 = "105"`) alih-alih operasi matematika, yang dapat merusak kalkulasi harga atau keranjang belanja e-commerce.

## 3. Detail & Syntax

### A. Explicit Conversion (Konversi Sadar)

Developer mengendalikan tipe secara eksplisit tanpa mengandalkan tebakan mesin:

```javascript
const strNum = "42";
const num = Number(strNum); // Menjadi angka 42
const str = String(100); // Menjadi teks "100"
const bool = Boolean(0); // Menjadi false (atau via operator double NOT: !!0)
```

### B. Implicit Coercion (Konversi Otomatis Mesin)

1. **Operator `+` (String Concatenation Bias):** Jika salah satu operand adalah string, JavaScript mengubah operand lainnya menjadi string.
2. **Operator Aritmatika Lain (`-`, `*`, `/`, `%`):** Selalu memaksa operand menjadi tipe `number`.
3. **Pemeriksaan Kondisi Boolean (Truthy / Falsy):** Struktur kendali seperti `if (expression)` otomatis memaksa ekspresi menjadi boolean.

### 8 Falsy Values di JavaScript

Hanya 8 nilai berikut yang dievaluasi menjadi `false` saat di-coerce ke boolean; **semua nilai lain bernilai `truthy`**:
`false`, `0`, `-0`, `0n` (BigInt nol), `""` (string kosong), `null`, `undefined`, dan `NaN`.

### Contoh Kode (Bisa Diketik Ulang Tangan)

```javascript
// 1. Jebakan input form DOM
const inputQty = "3"; // Nilai string dari DOM input
const addedQty = 2;

// Salah: Implicit coercion memicu konkatenasi string
console.log(inputQty + addedQty); // "32"

// Benar: Explicit conversion sebelum kalkulasi
console.log(Number(inputQty) + addedQty); // 5

// 2. Coercion pada operator aritmatika pengurangan
console.log("10" - 4); // 6 (berubah menjadi number)
console.log("sepuluh" - 4); // NaN (gagal dikonversi ke angka valid)
```

## 4. Common Pitfalls / Edge Case

- **Objek dan Array Kosong Selalu Truthy:** Objek `{}` dan array `[]` adalah objek referensi, dan seluruh objek di JavaScript dievaluasi sebagai `truthy`. Oleh sebab itu, kondisi `if ([])` akan dieksekusi sebagai `true`, meskipun panjang array-nya nol. Gunakan `arr.length > 0` untuk validasi array kosong.
- **`parseInt()` vs `Number()`:** `parseInt("100px")` akan membaca angka hingga menemukan karakter non-angka (menghasilkan `100`), sedangkan `Number("100px")` bersifat strik dan akan menghasilkan `NaN`.
- **Anomali Operasi Array & Objek:** `[] + []` menghasilkan string kosong `""`, dan `[] + {}` menghasilkan `"[object Object]"` karena keduanya diubah ke representasi string primitif melalui pemanggilan internal `valueOf()` dan `toString()`.

## 5. Related Topics

- [[Primitive Types dan Object]]
- [[Equality (== vs ===)]]
- [[typeof Operator]]
- [[Conditional Statements (if-else)]]

## 6. Self-Check Questions

1. Mengapa ekspresi `"15" + 5` menghasilkan `"155"`, sedangkan ekspresi `"15" - 5` menghasilkan angka `10`?
2. Sebutkan seluruh 8 nilai _falsy_ di JavaScript, dan apa hasil evaluasi boolean dari ekspresi `Boolean([])` dan `Boolean({})`?
3. Apa perbedaan hasil antara `parseInt("20rem")` dan `Number("20rem")`, dan kapan masing-masing sebaiknya digunakan pada pengolahan CSS value di frontend?

## 7. Sumber

- **MDN Web Docs — Type conversion Glossary**: [https://developer.mozilla.org/en-US/docs/Glossary/Type_conversion](https://developer.mozilla.org/en-US/docs/Glossary/Type_conversion)
- **MDN Web Docs — Type coercion Glossary**: [https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion)
- **ECMA-262 Specification — Type Conversion**: [https://tc39.es/ecma262/#sec-type-conversion](https://tc39.es/ecma262/#sec-type-conversion)
