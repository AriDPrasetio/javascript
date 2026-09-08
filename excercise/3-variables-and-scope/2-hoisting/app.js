const greetingText = buildGreeting("Ari");

document.querySelector("#hoist-result").textContent = greetingText;
try {
  console.log(appTheme);
} catch (err) {
  document.querySelector("#tdz-result").textContent =
    `TDZ Error: ${err.message}`;
  document.querySelector("#tdz-result").style.color = "#b91c1c";
}

let appTheme = "dark";
function buildGreeting(name) {
  return `Halo, ${name}! (Dari hoisted function declaration)`;
}
