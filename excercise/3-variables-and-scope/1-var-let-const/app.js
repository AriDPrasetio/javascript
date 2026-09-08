const displayEl = document.querySelector("#status-display");
const displayMs = document.querySelector("#timeout-display");
const toggleBtn = document.querySelector("#btn-toggle");
const configBtn = document.querySelector("#btn-config");

const serverConfig = { timeoutMs: 3000 };

let isMaintenance = false;

toggleBtn.addEventListener("click", () => {
  isMaintenance = !isMaintenance;
  displayEl.textContent = `Status Server: ${isMaintenance ? "Maintenance" : "Normal"}`;
});

configBtn.addEventListener("click", () => {
  serverConfig.timeoutMs += 1000;
  displayMs.textContent = `Timeout: ${serverConfig.timeoutMs}ms (const termutasi)`;
});
