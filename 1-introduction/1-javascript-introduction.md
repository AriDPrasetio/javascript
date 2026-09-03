# JavaScript — Introduction

**Konteks Roadmap:** Fase 1 — Introduction  
**Scope:** Frontend Developer

## 1. Ringkasan Konsep

JavaScript (JS) adalah bahasa pemrograman yang digunakan terutama untuk membuat halaman web menjadi dinamis dan interaktif. HTML menentukan struktur, CSS menentukan presentasi, sedangkan JavaScript mengatur perilaku seperti merespons klik, memvalidasi form, mengubah konten, mengambil data, dan memperbarui UI.

JavaScript sendiri adalah **bahasa**, sedangkan browser seperti Chrome atau Firefox menyediakan **runtime/host environment** yang memberi JavaScript akses ke Web APIs seperti DOM. Karena itu, JavaScript di browser dan JavaScript di Node.js menggunakan bahasa inti yang sama, tetapi memiliki kemampuan lingkungan yang berbeda.

> **Inti mental model:**  
> `JavaScript (language) + Runtime/Host (browser/Node.js) → program yang dapat berinteraksi dengan lingkungan`

---

## 2. Kenapa Ini Penting

Dalam pekerjaan frontend, JavaScript digunakan untuk:

- Merespons interaksi pengguna:
  - klik tombol
  - input form
  - keyboard
  - scroll
- Memanipulasi **DOM**.
- Mengubah UI tanpa reload halaman.
- Melakukan validasi form.
- Mengambil data dari server menggunakan `fetch()`.
- Membuat komponen UI interaktif seperti:
  - modal
  - tabs
  - dropdown
  - accordion
  - carousel
- Mengimplementasikan state dan business logic pada aplikasi frontend.

---

# 3. Detail & Syntax

## A. JavaScript sebagai Bahasa

JavaScript memiliki fitur bahasa seperti:

- Variables
- Data types
- Operators
- Conditions
- Loops
- Functions
- Objects
- Arrays
- Classes
- Promises
- Modules

Bahasa intinya disebut **ECMAScript** dan distandardisasi melalui spesifikasi ECMAScript (ECMA-262). DOM bukan bagian dari bahasa ECMAScript; DOM merupakan API yang disediakan oleh lingkungan web.

### Contoh JavaScript murni

```js
const name = "Tuan";

console.log(`Hello, ${name}!`);
```

`console.log()` sendiri bukan fitur inti ECMAScript. Ia disediakan oleh runtime/host seperti browser atau Node.js.

---

# B. Cara Menjalankan JavaScript

Ada beberapa cara yang relevan untuk frontend.

## 1. Browser Console

Cara paling cepat untuk mencoba JavaScript tanpa membuat file.

Buka:

**Browser → DevTools → Console**

Kemudian:

```js
2 + 3
```

Browser akan menjalankan ekspresi tersebut dan menghasilkan:

```text
5
```

**Gunanya saat belajar:**

- mencoba syntax
- mengecek nilai
- eksperimen cepat
- debugging

---

## 2. Inline `<script>`

JavaScript dapat ditulis langsung di HTML menggunakan `<script>`.

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>Hello</h1>

    <script>
      console.log("Hello, JavaScript!");
    </script>
  </body>
</html>
```

Browser akan mengeksekusi JavaScript ketika menemukan elemen `<script>` tersebut.

**Cocok untuk:** eksperimen kecil.

**Tidak ideal untuk:** aplikasi frontend yang mulai besar.

---

## 3. External JavaScript

Untuk project nyata, JavaScript biasanya dipisahkan ke file `.js`.

**index.html**

```html
<script src="script.js"></script>
```

**script.js**

```js
console.log("Hello from JavaScript!");
```

Keuntungan utamanya adalah HTML dan JavaScript memiliki tanggung jawab yang lebih terpisah dan file JavaScript dapat digunakan kembali.

Untuk workflow frontend, **external JavaScript adalah pola yang lebih relevan untuk dibiasakan**.

---

## 4. `defer`

External script dapat menggunakan `defer`:

```html
<script src="script.js" defer></script>
```

Secara konsep:

```text
HTML parsing ──────────────────────► selesai
       │
       └── download script ──►
                              │
                              ▼
                         execute JS
```

Script dapat di-download ketika HTML masih diproses, tetapi eksekusinya ditunda sampai parsing HTML selesai.

Ini penting ketika JavaScript perlu berinteraksi dengan elemen HTML yang berada di dalam dokumen.

---

## 5. ES Module

JavaScript modern mendukung module:

```html
<script type="module" src="app.js"></script>
```

Kemudian `app.js` dapat menggunakan:

```js
import { greet } from "./greet.js";

greet();
```

Module menjadi dasar untuk mengorganisasi aplikasi JavaScript menjadi file-file yang lebih kecil dan terpisah.

`type="module"` juga memiliki perilaku deferred secara default.

> Detail `import` / `export` akan dipelajari lebih lanjut pada topik **ES Modules**, bukan bagian utama Introduction.

---

# C. Browser vs Node.js

JavaScript membutuhkan **runtime/host environment** untuk berinteraksi dengan dunia luar.

| | Browser | Node.js |
|---|---|---|
| Tujuan utama | Web/UI | Server & system-side |
| DOM | Ada | Tidak tersedia secara native |
| `document` | Ada | Tidak ada |
| Web APIs | Ada | Berbeda |
| File system | Terbatas melalui Web APIs | API filesystem tersedia |
| Contoh | `document.querySelector()` | `fs.readFile()` |

Contoh:

```js
document.querySelector("h1");
```

Kode tersebut membutuhkan **DOM**, sehingga cocok dijalankan dalam browser.

Sebaliknya, Node.js menyediakan API untuk pekerjaan seperti filesystem yang tidak diberikan oleh JavaScript browser secara langsung.

### Untuk roadmap frontend

Prioritaskan:

```text
Browser
   ↓
HTML
   ↓
CSS
   ↓
JavaScript
   ↓
DOM + Web APIs
```

Node.js tetap perlu dikenali, tetapi **bukan fokus utama pada Introduction frontend**.

---

# D. JavaScript Engine vs Runtime

Ini merupakan pembedaan penting sejak awal.

### JavaScript Engine

Engine bertugas mengimplementasikan bahasa JavaScript dan menjalankan kode.

Contoh:

- V8 → Chrome
- SpiderMonkey → Firefox
- JavaScriptCore → Safari

### Runtime / Host

Runtime menyediakan fasilitas tambahan agar JavaScript dapat berinteraksi dengan lingkungan.

Contoh browser:

```js
document
window
fetch()
console
```

Jadi jangan menggunakan mental model:

> "JavaScript = browser."

Yang lebih tepat:

```text
                JavaScript
                    │
              language core
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
     Browser                 Node.js
        │                       │
     DOM/Web APIs          File System/etc.
```

---

# 4. Common Pitfalls / Edge Cases

### 1. Menganggap JavaScript dan Java adalah bahasa yang sama

**Salah.**

JavaScript dan Java adalah dua bahasa pemrograman yang berbeda. Nama yang mirip tidak berarti implementasi atau model bahasanya sama.

---

### 2. Menganggap DOM adalah bagian dari JavaScript

**Salah.**

DOM adalah API/environment capability yang diberikan platform web kepada JavaScript.

```js
document.querySelector("button");
```

`document` berasal dari environment browser, bukan dari core ECMAScript.

---

### 3. Menganggap JavaScript hanya bisa berjalan di browser

**Salah.**

JavaScript juga dapat dijalankan pada runtime lain seperti Node.js.

---

### 4. External script tanpa memahami timing

Misalnya:

```html
<head>
  <script src="script.js"></script>
</head>
```

Script klasik tanpa `async` atau `defer` dapat dieksekusi ketika parser HTML menemukannya. Akibatnya, script dapat mencoba mengakses elemen HTML yang belum selesai diparse.

Untuk frontend modern, pahami minimal:

```text
<script>
<script defer>
<script async>
<script type="module">
```

Tidak perlu mendalami seluruh detail loading strategy pada tahap Introduction.

---

### 5. Menganggap `console.log()` adalah JavaScript murni

`console.log()` tersedia melalui environment/runtime. Konsep ini penting karena nantinya akan ditemukan API yang hanya tersedia pada browser atau hanya tersedia pada Node.js.

---

# 5. Related Topics

- [[JavaScript Syntax]]
- [[Data Types]]
- [[Variables]]
- [[Scope]]
- [[Functions]]
- [[DOM]]
- [[Web APIs]]
- [[Events]]
- [[Async JavaScript]]
- [[Promises]]
- [[Fetch API]]
- [[ES Modules]]
- [[JavaScript Runtime]]
- [[JavaScript Engine]]
- [[Browser DevTools]]

---

# 6. Self-Check Questions

1. Apa perbedaan antara **JavaScript sebagai bahasa** dan **browser sebagai runtime/host environment**?
2. Mengapa `document.querySelector()` tidak dapat dianggap sebagai bagian dari core JavaScript?
3. Apa perbedaan penggunaan JavaScript melalui Browser Console dan melalui file `.js`?
4. Apa fungsi `<script src="script.js">` dan kapan `defer` berguna?
5. Apa perbedaan fundamental antara menjalankan JavaScript di browser dan Node.js?

---

# 7. Sumber

### MDN — Sumber Utama

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction
- https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript
- https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/Add_JavaScript_to_your_web_page
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Language_overview
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/JavaScript_technologies_overview
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model

### Catatan terhadap roadmap

Roadmap menempatkan **JavaScript Introduction** sebagai fondasi sebelum masuk ke *Syntax, Data Types & Operators*, Variables/Scope, Functions, DOM, Async JS, dan Fetch API.

**Target penguasaan topik:**

```text
JavaScript = language
Browser    = runtime/host
DOM        = browser API
<script>   = cara menghubungkan JS ke HTML
Console    = tempat eksperimen/debugging
.js file   = cara utama mengorganisasi kode
defer      = kontrol timing script klasik
module     = sistem organisasi kode modern
```

**[Tingkat Kepercayaan: Tinggi]** — definisi dan batasan konsep di atas selaras dengan dokumentasi MDN yang digunakan sebagai sumber utama.
