# Primitive Types & Object

**Konteks:** Fase 2 — Syntax, Data Types & Operators  
**Scope:** Frontend Developer

---

## 1. Ringkasan Konsep

JavaScript memiliki **7 primitive types**: `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol`, dan `null`. Primitive bersifat **immutable**, sedangkan `Object` bersifat mutable; `Array`, `Function`, `Date`, `Map`, dan lainnya termasuk object.

Perbedaan **primitive vs object** penting karena memengaruhi assignment, comparison, mutation, dan cara data digunakan dalam aplikasi frontend.

---

## 2. Kenapa Ini Penting

Dalam pekerjaan frontend, data hampir selalu berpindah melalui alur:

```text
API → JavaScript → State → DOM/UI
```

Contoh:

```js
const username = "Tuan";
const age = 25;
const isLoggedIn = true;

const user = {
  name: username,
  age: age,
  isLoggedIn: isLoggedIn,
};
```

Pemahaman tipe membantu ketika:

- membaca data dari API;
- melakukan conditional rendering;
- melakukan validasi form;
- membandingkan nilai;
- memanipulasi state;
- menangani `undefined` atau `null`;
- memahami mutation pada object.

---

# 3. Detail & Syntax

## A. Primitive Types

| Type | Contoh | `typeof` |
|---|---|---|
| `string` | `"Hello"` | `"string"` |
| `number` | `42`, `3.14` | `"number"` |
| `boolean` | `true` | `"boolean"` |
| `undefined` | `undefined` | `"undefined"` |
| `null` | `null` | `"object"`* |
| `symbol` | `Symbol("id")` | `"symbol"` |
| `bigint` | `123n` | `"bigint"` |

### `string`

Untuk data tekstual.

```js
const name = "Tuan";
const message = `Hello, ${name}`;
```

String bersifat immutable. Operasi terhadap string menghasilkan nilai baru.

---

### `number`

Digunakan untuk integer maupun floating-point.

```js
const age = 25;
const price = 19.99;
```

JavaScript menggunakan `Number` untuk nilai numerik umum. Untuk integer yang membutuhkan precision lebih besar, tersedia `BigInt`.

---

### `bigint`

`BigInt` adalah primitive type untuk merepresentasikan **integer dengan ukuran arbitrer**, sehingga dapat digunakan ketika nilai integer melebihi batas aman `Number`.

Literal `BigInt` menggunakan akhiran `n`:

```js
const bigNumber = 9007199254740993n;

console.log(typeof bigNumber);
// "bigint"
```

`BigInt` terutama berguna untuk perhitungan integer yang membutuhkan precision lebih besar daripada yang dapat diberikan `Number`.

#### BigInt vs Number

```js
const number = 9007199254740993;
const bigint = 9007199254740993n;

console.log(number);
console.log(bigint);
```

Perhatikan bahwa `Number` tidak dapat merepresentasikan semua integer besar secara tepat. `BigInt` dapat mempertahankan nilai integer tersebut.

#### Jangan mencampur `Number` dan `BigInt` secara langsung

```js
const a = 10n;
const b = 5;

// TypeError
a + b;
```

Jika memang perlu menggabungkannya, lakukan konversi secara eksplisit dan pahami konsekuensi precision:

```js
const result = 10n + BigInt(5);
// 15n
```

**Catatan:** `BigInt` hanya merepresentasikan integer, bukan floating-point.

---

### `boolean`

Hanya memiliki dua nilai:

```js
const isLoggedIn = true;
const isAdmin = false;
```

Umumnya digunakan dalam conditional logic:

```js
if (isLoggedIn) {
  console.log("Dashboard");
}
```

---

### `undefined`

Menunjukkan bahwa suatu nilai belum tersedia/diberikan.

```js
let username;

console.log(username);
// undefined
```

Property object yang tidak ada juga menghasilkan `undefined`:

```js
const user = {};

console.log(user.name);
// undefined
```

---

### `null`

`null` digunakan untuk menyatakan **ketiadaan nilai secara sengaja**.

```js
let selectedUser = null;
```

Edge case:

```js
typeof null;
// "object"
```

Ini merupakan perilaku historis JavaScript yang dipertahankan untuk backward compatibility.

Untuk mengecek `null`:

```js
selectedUser === null;
```

Bukan:

```js
typeof selectedUser === "null";
```

### `undefined` vs `null`

| | `undefined` | `null` |
|---|---|---|
| Makna umum | Belum memiliki nilai | Sengaja tidak memiliki nilai |
| Contoh | `let user;` | `let user = null;` |
| `typeof` | `"undefined"` | `"object"` |
| `undefined === null` | `false` | `false` |

---

### `symbol`

`Symbol` adalah primitive yang menghasilkan **identifier unik**.

```js
const id1 = Symbol("id");
const id2 = Symbol("id");

console.log(id1 === id2);
// false
```

Symbol dapat digunakan sebagai property key:

```js
const id = Symbol("id");

const user = {
  name: "Tuan",
  [id]: 123,
};
```

---

# B. Object

Object adalah kumpulan property dalam bentuk key-value.

```js
const user = {
  name: "Tuan",
  age: 25,
};
```

Akses property:

```js
console.log(user.name);
// "Tuan"

console.log(user.age);
// 25
```

Property key dapat berupa string atau Symbol. Nilainya dapat berupa tipe apa pun, termasuk object lain.

Object bersifat mutable:

```js
const user = {
  name: "Tuan",
};

user.name = "Ari";

console.log(user.name);
// "Ari"
```

### `const` tidak membuat object immutable

```js
const user = {
  name: "Tuan",
};

user.name = "Ari"; // valid
```

`const` melindungi **binding variable**, bukan isi object.

---

# C. Primitive vs Object

Mental model:

```text
Primitive
   ↓
nilai immutable

Object
   ↓
nilai mutable
   ↓
property dapat diubah
```

Contoh primitive:

```js
let a = 10;
let b = a;

b = 20;

console.log(a); // 10
console.log(b); // 20
```

Object:

```js
const user1 = { name: "Tuan" };
const user2 = user1;

user2.name = "Ari";

console.log(user1.name); // "Ari"
console.log(user2.name); // "Ari"
```

Mental model yang lebih presisi: JavaScript menggunakan **pass-by-value**. Ketika value tersebut berupa object, value yang disimpan/dikirim adalah reference ke object.

---

# D. Mengecek Type

Gunakan `typeof`:

```js
typeof "hello";      // "string"
typeof 42;           // "number"
typeof true;         // "boolean"
typeof undefined;    // "undefined"
typeof Symbol();     // "symbol"
typeof 123n;         // "bigint"
typeof {};           // "object"
```

Edge case:

```js
typeof null;
// "object"
```

Untuk `null` gunakan:

```js
value === null;
```

---

# 4. Common Pitfalls / Edge Cases

### 1. Menganggap `typeof null` adalah `"null"`

Salah:

```js
typeof null === "null"; // false
```

Benar:

```js
value === null;
```

---

### 2. Menganggap `const` membuat object immutable

```js
const user = {
  name: "Tuan",
};

user.name = "Ari"; // valid
```

`const` hanya mencegah variable diarahkan ke object lain.

---

### 3. Menganggap Array bukan Object

```js
typeof [];
// "object"
```

Array adalah object dengan karakteristik khusus.

Untuk mengecek array:

```js
Array.isArray([]);
// true
```

---

### 4. Mengira primitive tidak memiliki method

Primitive dapat digunakan dengan method:

```js
"hello".toUpperCase();
// "HELLO"
```

JavaScript melakukan proses boxing/autoboxing ketika property atau method primitive diakses. Primitive aslinya tetap immutable.

---

### 5. Mencampur `BigInt` dan `Number`

Operasi aritmatika langsung antara `BigInt` dan `Number` tidak diperbolehkan:

```js
10n + 5; // TypeError
```

Gunakan tipe yang konsisten atau lakukan konversi eksplisit.

### 6. Menganggap `BigInt` dapat digunakan untuk floating-point

`BigInt` hanya untuk integer:

```js
10n;     // valid
10.5n;   // SyntaxError
```

### 7. Mengabaikan `BigInt`

`BigInt` adalah primitive type yang penting ketika aplikasi perlu melakukan operasi integer dengan nilai yang lebih besar dari batas aman `Number`.

---

# 5. Related Topics

- [[Variables]]
- [[Syntax, Data Types & Operators]]
- [[typeof]]
- [[Type Coercion]]
- [[Equality]]
- [[Strict Equality]]
- [[Truthiness & Falsiness]]
- [[Arrays]]
- [[Object Methods]]
- [[References & Mutation]]
- [[Destructuring]]
- [[Spread]]
- [[JSON]]
- [[BigInt]]
- [[Number Precision]]

---

# 6. Self-Check Questions

1. Apa perbedaan fundamental antara **primitive value** dan **object** di JavaScript?
2. Mengapa `typeof null` menghasilkan `"object"`?
3. Apa perbedaan konseptual antara `undefined` dan `null`?
4. Mengapa `const user = {}; user.name = "Ari"` tetap diperbolehkan?
5. Apa output kode berikut dan mengapa?

```js
const a = { count: 1 };
const b = a;

b.count = 2;

console.log(a.count);
```

---

# 7. Sumber

- [MDN — JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)
- [MDN — Grammar and types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types)
- [MDN — typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
- [MDN — null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null)
- [MDN — Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [MDN — Primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
