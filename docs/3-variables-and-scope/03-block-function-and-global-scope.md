---
title: Scope dalam JavaScript — Block, Function, dan Global Scope
tags:
  - javascript
  - frontend
  - roadmap-js/03-variables-scope
level: beginner
official_docs_url:
  - https://developer.mozilla.org/en-US/docs/Glossary/Scope
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#function_scope
---

## Scope dalam JavaScript — Block, Function, dan Global Scope

## 1. Ringkasan Konsep

Scope (cakupan) adalah batasan konteks eksekusi yang menentukan aksesibilitas dan masa hidup (_lifetime_) variabel atau fungsi dalam program. JavaScript menerapkan tiga tingkat scope utama: **Global Scope** (dapat diakses dari seluruh bagian kode), **Function Scope** (hanya dapat diakses di dalam tubuh fungsi tempat variabel dideklarasikan), dan **Block Scope** (dibatasi oleh sepasang kurung kurawal `{}` untuk variabel `let` dan `const`).

## 2. Kenapa Ini Penting

Dalam penulisan kode frontend, pemahaman scope mencegah pencemaran namespace global (_global namespace pollution_) dan tabrakan nama variabel antar modul atau komponen. Ketika membangun state di dalam komponen frontend, memahami hierarki scope memastikan data yang dibutuhkan oleh sub-fungsi dapat diakses dengan tepat tanpa membocorkannya ke komponen luar.

## 3. Detail & Syntax

### A. Tiga Tingkatan Scope

1. **Global Scope:** Variabel yang dideklarasikan di luar fungsi atau blok manapun. Pada browser (tanpa modul), variabel `var` global otomatis menjadi properti `window`.
2. **Function Scope:** Variabel yang dideklarasikan di dalam fungsi (baik menggunakan `var`, `let`, maupun `const`) hanya hidup dan dapat diakses selama fungsi tersebut berjalan.
3. **Block Scope:** Dibuat oleh blok kurung kurawal apa pun (`if`, `for`, `switch`, atau blok mandiri `{}`). Hanya berlaku untuk `let` dan `const`.

### B. Scope Chain & Variable Shadowing

Ketika mencari sebuah variabel, JavaScript akan memeriksa scope lokal terlebih dahulu. Jika tidak ditemukan, mesin akan mencari ke scope luar setingkat demi setingkat hingga ke global scope (_Scope Chain_). Jika variabel lokal memiliki nama yang sama dengan variabel di scope luar, variabel lokal akan menutupi variabel luar (_Variable Shadowing_).

### Contoh Kode (Bisa Diketik Ulang Tangan)

```html
<!-- index.html -->
<div
  id="dashboard"
  style="font-family: sans-serif; padding: 12px; border: 2px solid #333; border-radius: 8px;"
>
  <p>Tema Global: <strong id="global-text">dark</strong></p>
  <div id="inner-banner" style="padding: 8px; border-radius: 4px;">
    Banner Blok Scope: <span id="banner-text">-</span>
  </div>
</div>
```

```javascript
// app.js
const appTheme = "dark"; // 1. Global Scope (tersedia untuk seluruh file)

function renderDashboard() {
  const pageTitle = "Dashboard Analytics"; // 2. Function Scope (hanya hidup di dalam fungsi ini)
  const bannerEl = document.querySelector("#inner-banner");

  if (true) {
    // 3. Block Scope & Shadowing: Variabel 'appTheme' lokal menutupi variabel global di blok ini saja
    const appTheme = "emerald";
    const badgeBg = "#10b981"; // Block Scope

    bannerEl.style.backgroundColor = badgeBg;
    bannerEl.style.color = "#ffffff";
    bannerEl.textContent = `${pageTitle} — Mode: ${appTheme} (Shadowed)`;
  }

  // console.log(badgeBg); // Error: ReferenceError (badgeBg terkunci di blok if)
}

renderDashboard();
document.querySelector("#global-text").textContent =
  `${appTheme} (Variabel global tidak terpengaruh)`;
```

## 4. Common Pitfalls / Edge Case

- **Variabel Global Tanpa Sengaja (_Accidental Global_):** Memberi nilai pada variabel yang belum pernah dideklarasikan (misal `mistake = 5` tanpa `const/let/var`) dalam mode non-strict akan otomatis membuat variabel baru di `window` global. Selalu gunakan `"use strict";` atau ES Modules untuk mencegah hal ini.
- **`var` Menembus Block Scope:** Ingat bahwa `var` tidak mematuhi batasan kurung kurawal `{}` pada `if` atau loop `for`. `var` hanya terisolasi oleh batas fungsi (`function`).
- **Kebingungan Shadowing:** Melakukan _variable shadowing_ secara berlebihan membuat kode sulit di-debug karena nama variabel yang sama memiliki arti berbeda pada tingkat indentasi yang berbeda.

## 5. Related Topics

- [[Deklarasi Variabel (var, let, const)]]
- [[Hoisting]]
- [[Closures dan Lexical Scoping]]

## 6. Self-Check Questions

1. Apa perbedaan antara cakupan variabel `var` dan variabel `let` saat keduanya dideklarasikan di dalam sebuah blok percabangan `if`?
2. Bagaimana mekanisme _Scope Chain_ bekerja saat JavaScript mencari nilai dari sebuah variabel yang dipanggil di dalam fungsi bertingkat (_nested function_)?
3. Apa yang dimaksud dengan _variable shadowing_ dan bagaimana dampaknya terhadap variabel di scope luar?

## 7. Sumber

- **MDN Web Docs — Scope Glossary**: [https://developer.mozilla.org/en-US/docs/Glossary/Scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope)
- **MDN Web Docs — Functions and function scope**: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#function_scope](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#function_scope)
