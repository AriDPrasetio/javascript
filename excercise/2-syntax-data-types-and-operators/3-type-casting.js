// 1. Jebakan input form DOM
const inputQty = "3";
const addedQty = 2;

// Salah: Implicit coercian memicu konkatenasi string
console.log(inputQty + addedQty);

// Benar: Explicit coercian sebelum kalkulasi
console.log(Number(inputQty) + addedQty);

// 2. Coercian pada operator aritmatika pengurangan
console.log("10" - 4);
console.log("sepuluh" - 4);
