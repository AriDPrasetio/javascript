# Equality: `==` vs `===` (Praktis)

**Konteks:** Fase 2 — Syntax, Data Types & Operators  
**Scope:** Frontend Developer

---

## 1. Ringkasan Konsep

JavaScript memiliki dua operator equality yang utama: `==` (**loose equality**) dan `===` (**strict equality**). Perbedaan praktisnya adalah `==` dapat melakukan **type coercion** ketika tipe operand berbeda, sedangkan `===` tidak melakukan konversi tipe dan menganggap nilai dengan tipe berbeda sebagai tidak sama. [Tingkat Kepercayaan: Tinggi]

Untuk kode frontend sehari-hari, gunakan `===` sebagai default karena hasil perbandingannya lebih mudah diprediksi. MDN juga merekomendasikan strict equality/inequality dibanding loose equality/inequality. [Tingkat Kepercayaan: Tinggi]

---

## 2. Kenapa Ini Penting

Equality dipakai terus-menerus dalam frontend, terutama untuk:

- conditional rendering;
- validasi input form;
- pengecekan state;
- membandingkan data dari API dengan value lokal;
- menentukan apakah sebuah event atau kondisi harus diproses;
- mengecek `null` atau `undefined`.

Contoh data dari form/API:

```js
const inputValue = "25";
const age = 25;

inputValue === age; // false
inputValue == age;  // true
```

Secara praktis, `===` membantu kita mengetahui bahwa `"25"` adalah **string**, sedangkan `25` adalah **number**, sehingga perbedaan tipe tidak tersembunyi oleh coercion.

---

## 3. Detail & Syntax

### A. `===` — Strict Equality

Syntax:

```js
x === y;
```

`===` menghasilkan `true` jika kedua operand memiliki tipe yang sama dan nilainya sama. Jika tipe berbeda, hasilnya `false`. [Tingkat Kepercayaan: Tinggi]

```js
5 === 5;     // true
"5" === "5"; // true

5 === "5";   // false
0 === false; // false
```

Mental model:

```text
===

tipe sama?
   ↓
  ya
   ↓
nilai sama?
   ↓
 true / false
```

Tidak ada implicit type conversion.

---

### B. `==` — Loose Equality

Syntax:

```js
x == y;
```

`==` juga menghasilkan boolean, tetapi ketika tipe operand berbeda, JavaScript dapat melakukan **type conversion** sebelum membandingkannya. [Tingkat Kepercayaan: Tinggi]

```js
5 == "5";     // true
0 == false;   // true
```

Mental model:

```text
==

tipe berbeda?
   ↓
JavaScript dapat melakukan
type conversion
   ↓
bandingkan
```

Contoh:

```js
"5" == 5;     // true
"5" === 5;    // false

0 == false;   // true
0 === false;  // false
```

Pada contoh pertama, `==` memungkinkan `"5"` dikonversi sehingga perbandingan menghasilkan `true`.

---

### C. Perbandingan Praktis

| Expression | Hasil | Alasan |
|---|---:|---|
| `5 === 5` | `true` | Tipe dan nilai sama |
| `"5" === 5` | `false` | `string` vs `number` |
| `5 == "5"` | `true` | Loose equality melakukan coercion |
| `0 === false` | `false` | `number` vs `boolean` |
| `0 == false` | `true` | Loose equality melakukan coercion |
| `null === undefined` | `false` | Dua tipe berbeda |
| `null == undefined` | `true` | Kasus khusus loose equality |

[Tingkat Kepercayaan: Tinggi]

---

### D. `!==` dan `!=`

Pasangan inequality mengikuti prinsip yang sama:

```js
5 !== "5"; // true
5 != "5";  // false
```

- `!==` = **strict inequality**
- `!=` = **loose inequality**

MDN merekomendasikan `!==` dibanding `!=` untuk alasan prediktabilitas yang sama. [Tingkat Kepercayaan: Tinggi]

---

### E. Object: `===` Tidak Membandingkan Isi Object

Equality operator tidak melakukan deep comparison terhadap struktur object.

```js
const user1 = { name: "Tuan" };
const user2 = { name: "Tuan" };

user1 === user2; // false
```

Walaupun property dan nilainya sama, keduanya adalah object yang berbeda.

Jika dua variable menunjuk object yang sama:

```js
const user1 = { name: "Tuan" };
const user2 = user1;

user1 === user2; // true
```

Mental model:

```text
object1 ──┐
          ├──> object yang sama
object2 ──┘
```

Ini berkaitan langsung dengan konsep **object reference**, bukan deep equality. [Tingkat Kepercayaan: Tinggi]

---

### F. Edge Case: `NaN`

`NaN` tidak sama dengan dirinya sendiri menggunakan `===` maupun `==`:

```js
NaN === NaN; // false
NaN == NaN;  // false
```

Jika tujuanmu adalah mengecek apakah sebuah value adalah `NaN`, gunakan:

```js
Number.isNaN(value);
```

[Tingkat Kepercayaan: Tinggi]

---

### G. Rule of Thumb untuk Frontend

Gunakan:

```js
===
```

dan:

```js
!==
```

sebagai default.

Contoh:

```js
if (status === "success") {
  renderSuccess();
}
```

Bukan:

```js
if (status == "success") {
  renderSuccess();
}
```

`==` bukan operator yang salah secara teknis. Namun, MDN menyarankan strict equality sebagai pilihan default dan menyebut `== null` sebagai kasus khusus yang dapat digunakan ketika memang ingin menangani `null` dan `undefined` sekaligus. [Tingkat Kepercayaan: Tinggi]

---

## 4. Common Pitfalls / Edge Cases

### 1. Mengira `==` hanya membandingkan value

Tidak sesederhana itu. `==` dapat melakukan serangkaian konversi tipe.

```js
"0" == 0; // true
```

Karena itu, jangan mengandalkan intuisi sederhana seperti “yang penting nilainya terlihat sama”.

---

### 2. Mengira `===` berarti deep equality

Salah untuk object:

```js
{} === {}; // false
[] === []; // false
```

`===` tidak membandingkan isi object secara rekursif. Untuk object, yang dibandingkan adalah apakah keduanya merujuk ke object yang sama. [Tingkat Kepercayaan: Tinggi]

---

### 3. `null` dan `undefined`

Ini salah satu alasan `==` kadang terlihat “berguna”:

```js
value == null;
```

Expression tersebut bernilai `true` ketika `value` adalah `null` atau `undefined` (dengan pengecualian khusus terkait `document.all`). [Tingkat Kepercayaan: Tinggi]

Jika hanya ingin mengecek `null`, gunakan:

```js
value === null;
```

Jika hanya ingin mengecek `undefined`, gunakan:

```js
value === undefined;
```

---

### 4. Jangan menggunakan `=== true` tanpa alasan

Untuk boolean test biasa, MDN menyarankan bentuk yang lebih sederhana:

```js
if (isLoggedIn) {
  // ...
}
```

daripada:

```js
if (isLoggedIn === true) {
  // ...
}
```

Ini bukan berarti `=== true` selalu salah; gunakan ketika memang perlu membedakan `true` dari value lain yang truthy. [Tingkat Kepercayaan: Tinggi]

---

### 5. Jangan menghafal semua aturan coercion `==` di awal

Untuk frontend praktis, lebih penting memahami prinsip:

```text
==  → loose equality → dapat melakukan coercion
=== → strict equality → tidak melakukan coercion
```

Kemudian gunakan `===`/`!==` sebagai default. Detail algoritma coercion dapat dipelajari ketika masuk ke [[Type Coercion]]. [Tingkat Kepercayaan: Tinggi]

---

## 5. Related Topics

- [[Primitive Types & Object]]
- [[Type Coercion]]
- [[Data Types]]
- [[typeof]]
- [[Truthiness & Falsiness]]
- [[Conditionals]]
- [[Logical Operators]]
- [[Object References]]
- [[NaN]]
- [[null]]
- [[undefined]]

---

## 6. Self-Check Questions

1. Apa perbedaan fundamental antara `==` dan `===`?
2. Mengapa `"5" == 5` menghasilkan `true`, tetapi `"5" === 5` menghasilkan `false`?
3. Mengapa `{}` === `{}` menghasilkan `false`?
4. Kapan `value == null` dapat berguna?
5. Mengapa `NaN === NaN` menghasilkan `false`?
6. Dalam kode frontend sehari-hari, operator equality mana yang sebaiknya menjadi default dan mengapa?

---

## 7. Sumber

- MDN — Equality comparisons and sameness  
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness

- MDN — Equality (`==`)  
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality

- MDN — Strict equality (`===`)  
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality

- MDN — Inequality (`!=`)  
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Inequality

- MDN — Strict inequality (`!==`)  
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_inequality

- MDN — JavaScript code style: strict equality  
  https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Code_style_guide/JavaScript

---

## Inti yang Perlu Diingat

```text
==   → Loose Equality
       dapat melakukan type coercion

===  → Strict Equality
       tidak melakukan type coercion

!=   → Loose Inequality
!==  → Strict Inequality

Default frontend:
=== dan !==
```
