# Type Casting — Explicit vs Implicit (Coercion vs Conversion)

**Konteks:** Fase 2 — Syntax, Data Types & Operators  
**Scope:** Frontend Developer

---

## 1. Ringkasan Konsep

Dalam JavaScript, nilai dapat berpindah dari satu tipe ke tipe lain. **Type conversion** adalah istilah umum untuk proses tersebut, sedangkan **type coercion** biasanya merujuk pada conversion yang terjadi secara otomatis/implicit karena konteks operasi; conversion juga dapat dilakukan secara explicit oleh developer.

Mental model sederhana:

```text
Conversion
├── Explicit → developer meminta konversi
└── Implicit → JavaScript melakukan coercion karena konteks operasi
```

MDN membedakan coercion sebagai conversion yang implicit, sementara conversion dapat bersifat implicit maupun explicit.

---

## 2. Kenapa Ini Penting

Frontend sering menerima data dalam tipe yang berbeda dari yang dibutuhkan logic aplikasi.

Contoh umum:

```text
<input> value → string
API / JSON     → tipe sesuai payload
DOM attributes → string
UI condition   → boolean context
Arithmetic     → number context
```

Contoh masalah nyata:

```js
const quantity = "2";
const price = 100;

quantity + price;
// "2100"
```

Jika yang dimaksud adalah operasi numerik, lakukan conversion secara eksplisit:

```js
const total = Number(quantity) * price;
// 200
```

Memahami coercion mencegah bug pada form, filtering, comparison, kalkulasi, dan conditional rendering.

---

## 3. Detail & Syntax

### A. Explicit Conversion

Developer secara langsung meminta JavaScript mengubah tipe.

#### String → Number

```js
const value = "42";

const number = Number(value);

console.log(number);
// 42
```

Alternatif unary plus:

```js
const number = +"42";
// 42
```

`Number()` dan unary `+` mengikuti proses number coercion yang sama untuk sebagian besar nilai. `Number()` lebih eksplisit secara visual dan umumnya lebih mudah dibaca ketika intent adalah conversion.

**Catatan:** `Number("hello")` menghasilkan `NaN`, bukan error.

```js
Number("hello");
// NaN
```

---

### B. Number → String

```js
const age = 25;

const text = String(age);

console.log(text);
// "25"
```

`String()` adalah cara eksplisit untuk melakukan string conversion.

---

### C. Value → Boolean

```js
const value = "hello";

const result = Boolean(value);

console.log(result);
// true
```

Boolean conversion menggunakan konsep **truthy/falsy**.

Nilai falsy utama:

```text
false
0
-0
0n
NaN
""
null
undefined
```

Selain `document.all` yang merupakan legacy web behavior, object dianggap truthy.

---

### D. Implicit Conversion / Coercion

JavaScript melakukan conversion otomatis ketika sebuah operasi membutuhkan tipe tertentu.

Contoh paling terkenal adalah `+`:

```js
const result = "5" + 2;

console.log(result);
// "52"
```

Karena salah satu operand adalah string, nilai lainnya dikonversi menjadi string lalu dilakukan concatenation.

Sebaliknya:

```js
const result = "5" - 2;

console.log(result);
// 3
```

Operator `-` membutuhkan numeric operation, sehingga string `"5"` dicoerce menjadi number.

---

### E. `==` dan Coercion

Loose equality (`==`) dapat melakukan type coercion ketika membandingkan nilai dengan tipe berbeda.

```js
5 == "5";
// true
```

Strict equality (`===`) tidak melakukan coercion seperti itu:

```js
5 === "5";
// false
```

Untuk kode frontend modern, gunakan `===` dan `!==` sebagai default agar conversion tidak terjadi secara tersembunyi dalam comparison.

---

### F. Number Conversion yang Perlu Dihafalkan

| Input | `Number(input)` |
|---|---:|
| `"42"` | `42` |
| `"3.14"` | `3.14` |
| `""` | `0` |
| `"   "` | `0` |
| `"hello"` | `NaN` |
| `true` | `1` |
| `false` | `0` |
| `null` | `0` |
| `undefined` | `NaN` |

Contoh:

```js
Number("");
// 0

Number("hello");
// NaN
```

`NaN` berarti hasilnya bukan representasi angka yang valid; ia tetap memiliki tipe `number`.

---

### G. `parseInt()` dan `parseFloat()`

Untuk string numerik, JavaScript juga menyediakan:

```js
parseInt("42", 10);
// 42

parseFloat("3.14");
// 3.14
```

`parseInt()` menghasilkan integer dan sebaiknya diberikan radix secara eksplisit.

Untuk conversion umum seluruh nilai menjadi number, `Number()` sering lebih tepat:

```js
Number("42px");
// NaN

parseInt("42px", 10);
// 42
```

Perbedaan ini penting: `parseInt()` memiliki aturan parsing string yang berbeda dari `Number()`.

---

### H. BigInt dan Conversion

`BigInt` tidak dapat dicampur langsung dengan `Number` dalam operasi aritmatika:

```js
10n + 5;
// TypeError
```

Lakukan conversion secara eksplisit jika memang diperlukan:

```js
10n + BigInt(5);
// 15n
```

Sebaliknya:

```js
Number(10n);
// 10
```

Conversion `BigInt → Number` berpotensi kehilangan precision jika nilainya berada di luar rentang aman `Number`.

---

### I. String Concatenation vs Numeric Addition

Ini adalah pitfall penting:

```js
"3" + 4;
// "34"

3 + 4 + "5";
// "75"
```

Evaluasi berlangsung dari kiri ke kanan. Setelah ekspresi menghasilkan string pada tahap `3 + 4 + "5"`, hasil `7` kemudian digabungkan dengan `"5"`.

Jika tujuan operasi numerik, conversion sebaiknya dilakukan sebelum operasi:

```js
Number("3") + 4;
// 7
```

---

## 4. Common Pitfalls / Edge Cases

### 1. Menganggap `"10"` adalah number

```js
typeof "10";
// "string"
```

Nilai yang terlihat seperti angka tetap string sampai dikonversi.

---

### 2. Menggunakan `+` tanpa menyadari dua perannya

```js
"10" + 5;
// "105"
```

`+` dapat berarti numeric addition atau string concatenation.

Untuk conversion eksplisit:

```js
Number("10") + 5;
// 15
```

---

### 3. Menganggap semua conversion gagal dengan error

Tidak selalu.

```js
Number("hello");
// NaN
```

`NaN` adalah hasil numeric conversion yang gagal, bukan exception.

---

### 4. Menggunakan `parseInt()` sebagai pengganti `Number()` tanpa memahami perbedaannya

```js
Number("42px");
// NaN

parseInt("42px", 10);
// 42
```

Keduanya memiliki tujuan parsing/conversion yang berbeda.

---

### 5. Mengandalkan `==` untuk conversion

```js
5 == "5";
// true
```

Hasil tersebut bergantung pada aturan loose equality dan coercion.

Gunakan:

```js
5 === "5";
// false
```

Kemudian lakukan conversion secara eksplisit jika memang dibutuhkan.

---

### 6. Lupa bahwa Boolean conversion terhadap object berbeda

```js
Boolean([]);
// true

Boolean({});
// true
```

Object tetap truthy meskipun kosong.

---

### 7. BigInt → Number dapat kehilangan precision

```js
const value = 9007199254740993n;

Number(value);
```

Jangan melakukan conversion tersebut tanpa mempertimbangkan batas precision `Number`.

---

## 5. Related Topics

- [[Primitive Types & Object]]
- [[Data Types]]
- [[typeof]]
- [[Truthiness & Falsiness]]
- [[Equality]]
- [[Strict Equality]]
- [[Operators]]
- [[Number]]
- [[String]]
- [[Boolean]]
- [[BigInt]]
- [[NaN]]
- [[Input Validation]]
- [[DOM Form]]
- [[JSON]]
- [[TypeScript Type System]]

---

## 6. Self-Check Questions

1. Apa perbedaan **type conversion** dan **type coercion**?
2. Apa perbedaan explicit conversion dengan implicit coercion dalam JavaScript?
3. Mengapa `"5" + 2` menghasilkan `"52"`, sedangkan `"5" - 2` menghasilkan `3`?
4. Apa perbedaan `Number("42px")` dan `parseInt("42px", 10)`?
5. Mengapa `5 == "5"` bernilai `true`, sedangkan `5 === "5"` bernilai `false`?

---

## 7. Sumber

- MDN — Type coercion: https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion
- MDN — Number: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
- MDN — Boolean: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
- MDN — String: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
- MDN — Unary plus (+): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus
- MDN — Addition (+): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition
- MDN — Grammar and types: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types
- MDN — JavaScript data types and data structures: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures

> **Source note:** Materi inti disusun dengan memprioritaskan MDN sesuai aturan roadmap. File Library sebelumnya juga menekankan perbedaan tipe data, `typeof`, `BigInt`, dan perilaku `==` vs `===`; bagian tersebut digunakan sebagai konteks roadmap, sementara detail coercion/conversion diverifikasi terhadap dokumentasi MDN.
