const appTheme = "dark";

function renderDashboard() {
  const pageTitle = "Dashboard Analytics";

  const bannerEl = document.querySelector("#inner-banner");
  if (true) {
    const appTheme = "emerald";
    const badgeBg = "#10b981";

    bannerEl.style.backgroundColor = badgeBg;
    bannerEl.style.color = "#ffffff";
    bannerEl.textContent = `${pageTitle} - Mode: ${appTheme} (Shadowed)`;
  }
}

renderDashboard();
document.querySelector("#global-text").textContent =
  `${appTheme} (Variable global tidak terpengaruh)`;
