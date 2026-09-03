# `typeof` Operator

**Konteks:** Fase 2 — Syntax, Data Types & Operators  
**Scope:** Frontend Developer

## 1. Ringkasan Konsep

`typeof` adalah **unary operator** untuk mengetahui tipe data dari sebuah operand. Hasilnya selalu berupa **string**, misalnya `"string"`, `"number"`, `"boolean"`, atau `"object"`. Operator ini digunakan untuk pemeriksaan tipe dasar dan berkaitan langsung dengan pemahaman primitive types dan object.

## 2. Kenapa Ini Penting

Dalam frontend, `typeof` berguna ketika perlu mengetahui bentuk data sebelum melakukan operasi tertentu, misalnya:

- Memeriksa data yang berasal dari API.
- Validasi input atau parameter function.
- Membedakan nilai berdasarkan tipe sebelum diproses.
- Debugging ketika nilai tidak sesuai ekspektasi.
- Menangani `undefined` pada data yang belum tersedia.

Contoh:

```js
const age = 25;

if (typeof age === "number") {
  console.log("Age is valid");
}
```

Mental model:

```text
value
  ↓
typeof
  ↓
string yang menunjukkan tipe
```

## 3. Detail & Syntax

### Syntax

```js
typeof operand
```

Bentuk dengan tanda kurung juga valid:

```js
typeof(operand)
```

Namun, `typeof` adalah operator, bukan function. Bentuk `typeof operand` lebih umum digunakan.

### Nilai yang umum

| Value | Hasil `typeof` |
|---|---|
| `"hello"` | `"string"` |
| `42` | `"number"` |
| `true` | `"boolean"` |
| `undefined` | `"undefined"` |
| `Symbol()` | `"symbol"` |
| `123n` | `"bigint"` |
| `{}` | `"object"` |
| `[]` | `"object"` |
| `null` | `"object"` |

Contoh:

```js
console.log(typeof "hello"); // "string"
console.log(typeof 42);      // "number"
console.log(typeof true);    // "boolean"
console.log(typeof 123n);    // "bigint"
```

### `typeof` menghasilkan string

Karena hasilnya adalah string:

```js
typeof 42 === "number";
// true
```

Bukan membandingkan dengan tipe `number` secara langsung.

```js
typeof 42;
// "number"
```

## 4. Common Pitfalls / Edge Case

### 1. `typeof null` menghasilkan `"object"`

```js
typeof null;
// "object"
```

Untuk mengecek `null`, gunakan:

```js
value === null;
```

Jangan:

```js
typeof value === "null";
```

Perilaku `typeof null` merupakan perilaku historis JavaScript yang dipertahankan untuk backward compatibility.

### 2. Array menghasilkan `"object"`

```js
typeof [];
// "object"
```

Array merupakan object dengan karakteristik khusus. Untuk mengecek apakah value adalah array:

```js
Array.isArray([]);
// true
```

Jadi, `typeof` tidak cukup untuk membedakan semua jenis object.

### 3. `typeof` bukan function

`typeof` adalah **unary operator**:

```js
typeof value
```

Meskipun `typeof(value)` valid secara sintaksis, tanda kurung hanya mengelompokkan operand.

### 4. Identifier yang belum dideklarasikan

`typeof` memiliki perilaku khusus terhadap identifier yang belum dideklarasikan:

```js
console.log(typeof something);
// "undefined"
```

Namun, jangan menganggap identifier tersebut aman digunakan secara normal. Mengaksesnya secara langsung tetap dapat menghasilkan `ReferenceError`.

### 5. Jangan gunakan `typeof` untuk semua pengecekan

Gunakan pemeriksaan yang lebih spesifik jika diperlukan:

```js
Array.isArray(value);
```

untuk array, dan:

```js
value === null;
```

untuk `null`.

**Inti:** `typeof` adalah pemeriksaan tipe tingkat dasar, bukan pemeriksa struktur data yang lengkap.

## 5. Related Topics

- [[Primitive Types]]
- [[Object]]
- [[Data Types]]
- [[Variables]]
- [[Type Coercion]]
- [[Equality]]
- [[Strict Equality]]
- [[Array]]
- [[null]]
- [[undefined]]
- [[BigInt]]
- [[Symbol]]
- [[Conditional Statements]]

## 6. Self-Check Questions

1. Apa yang dikembalikan oleh operator `typeof`?
2. Mengapa `typeof 42 === "number"` bernilai `true`?
3. Apa hasil dari `typeof null`, dan bagaimana cara mengecek `null` dengan benar?
4. Mengapa `typeof []` menghasilkan `"object"`?
5. Kapan `typeof` tidak cukup untuk menentukan jenis data dan membutuhkan pengecekan lain seperti `Array.isArray()`?

## 7. Sumber

- [MDN — typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
- [MDN — JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)
- [MDN — null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null)
