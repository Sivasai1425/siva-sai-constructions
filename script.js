const packages = {
  value: {
    name: "Value",
    rate: 2199,
    color: "Value Construction Package",
    tagline: "Smart Choice",
    intro: "A practical construction package focused on quality, functionality and controlled cost.",
    inclusions: ["Structural design & construction", "Standard electrical and plumbing works", "Quality flooring and wall finishes", "Standard doors and windows", "Painting and basic external works"],
    suitable: "First-time home builders, rental homes and budget-conscious projects."
  },
  premium: {
    name: "Premium",
    rate: 2499,
    color: "Premium Construction Package",
    tagline: "Most Popular",
    intro: "A balanced package combining modern architecture, upgraded finishes and long-term durability.",
    inclusions: ["Everything in Value package", "Superior flooring and sanitaryware", "Upgraded doors, windows and fittings", "Modern elevation design", "Enhanced electrical and lighting provisions"],
    suitable: "Families looking for a modern home with a strong balance of quality and cost."
  },
  luxury: {
    name: "Luxury",
    rate: 2799,
    color: "Luxury Construction Package",
    tagline: "Live Luxury",
    intro: "A premium specification package for clients who want distinctive design and high-end finishes.",
    inclusions: ["Everything in Premium package", "High-end flooring and sanitaryware", "Premium façade and elevation treatment", "Smart-home ready provisions", "Luxury fittings and enhanced finish options"],
    suitable: "Custom homes where design, finish quality and technology are priorities."
  }
};

let currentPackage = "premium";

function openPackage(key) {
  currentPackage = key;
  const p = packages[key];
  document.getElementById("packageContent").innerHTML = `
    <span class="eyebrow">${p.tagline.toUpperCase()}</span>
    <h2>${p.name} Package</h2>
    <p>${p.intro}</p>
    <div class="detail-price">₹${p.rate.toLocaleString("en-IN")} <small>/ sq.ft</small></div>
    <div class="detail-grid">
      <div class="detail-item"><b>Package</b><span>${p.color}</span></div>
      <div class="detail-item"><b>Rate</b><span>₹${p.rate.toLocaleString("en-IN")} per sq.ft</span></div>
      <div class="detail-item"><b>Suitable for</b><span>${p.suitable}</span></div>
      <div class="detail-item"><b>Estimate</b><span>Use the calculator for your area</span></div>
    </div>
    <h3>Indicative inclusions</h3>
    <ul class="detail-list">${p.inclusions.map(x => `<li>${x}</li>`).join("")}</ul>
    <p class="muted"><b>Important:</b> Final specifications, brands, structural requirements and exclusions should be confirmed in the project agreement and BOQ.</p>
  `;
  document.getElementById("packageModal").classList.add("show");
}

function openCalculator(packageKey = currentPackage) {
  if (packageKey && packages[packageKey]) {
    document.getElementById("packageSelect").value = packageKey;
  }
  document.getElementById("calculatorModal").classList.add("show");
  calculateCost();
}

function calculateCost() {
  const area = Math.max(0, Number(document.getElementById("areaInput").value || 0));
  const key = document.getElementById("packageSelect").value;
  const rate = packages[key].rate;
  const total = area * rate;
  document.getElementById("estimateValue").textContent = "₹" + Math.round(total).toLocaleString("en-IN");
  document.getElementById("rateText").textContent = `${area.toLocaleString("en-IN")} sq.ft × ₹${rate.toLocaleString("en-IN")}`;
}

function closeModal(id) {
  document.getElementById(id).classList.remove("show");
}

function closeOnBackdrop(event, id) {
  if (event.target.id === id) closeModal(id);
}

function scrollToPackages() {
  document.getElementById("packages").scrollIntoView({behavior:"smooth"});
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeModal("packageModal");
    closeModal("calculatorModal");
  }
});
