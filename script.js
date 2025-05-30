// script.js

// Load stored submissions from localStorage
const storedColleges = JSON.parse(localStorage.getItem('colleges') || '[]');

// Default college data
const defaultColleges = [
  { name: "De Anza College", system: "quarter", tuition: 3000, livingCost: 900, accommodationType: "off", transportationCost: 100, foodCost: 300, insuranceCost: 800, country: "Korea", major: "Computer Science", tips: "Share housing with roommates to save. Cupertino is costly.", email: "deanza@example.com" },
  { name: "UCLA", system: "semester", tuition: 15000, livingCost: 1200, accommodationType: "on", transportationCost: 80, foodCost: 350, insuranceCost: 900, country: "Taiwan", major: "Psychology", tips: "Meal plans helped reduce food costs significantly. Dorms are pricey!", email: "ucla@example.com" }
];

// Combine defaults + stored
function getColleges() {
  return [...defaultColleges, ...storedColleges];
}

// Render homepage cards (minimal info)
function renderColleges(list) {
  const container = document.getElementById('collegeList');
  container.innerHTML = '';
  list.forEach(c => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <h2>${c.name}</h2>
      <p><strong>Tuition:</strong> $${c.tuition}/term</p>
      <p><strong>Living:</strong> $${c.livingCost}/mo</p>
      <a class="btn" href="college.html?name=${encodeURIComponent(c.name)}">View Details</a>
    `;
    container.appendChild(card);
  });
}

// Initialize homepage
function initIndexPage() {
  const all = getColleges();
  renderColleges(all);
  const filterBtn = document.getElementById('filterBtn');
  if (filterBtn) {
    filterBtn.addEventListener('click', () => {
      const min = parseInt(document.getElementById('minBudget').value) || 0;
      const max = parseInt(document.getElementById('maxBudget').value) || Infinity;
      const filtered = getColleges().filter(c => c.tuition >= min && c.tuition <= max);
      renderColleges(filtered);
    });
  }
}

// Initialize profile page
function initCollegePage() {
  const nameEl = document.getElementById('collegeName');
  if (!nameEl) return;
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name');
  const college = getColleges().find(c => c.name === name);
  if (!college) return;
  document.getElementById('collegeName').textContent = college.name;
  document.getElementById('system').textContent = college.system;
  document.getElementById('tuition').textContent = `$${college.tuition}/term`;
  document.getElementById('living').textContent = `$${college.livingCost}/month`;
  document.getElementById('accomType').textContent = college.accommodationType;
  document.getElementById('transport').textContent = `$${college.transportationCost}/month`;
  document.getElementById('food').textContent = `$${college.foodCost}/month`;
  document.getElementById('insurance').textContent = `$${college.insuranceCost}/year`;
  document.getElementById('student').textContent = `${college.country}, ${college.major}`;
  document.getElementById('tips').textContent = college.tips;
  const link = document.getElementById('contactLink');
  link.href = `mailto:${college.email}`;
  link.textContent = college.email;
}

// Initialize submit page
function initSubmitPage() {
  const form = document.getElementById('costForm');
  const reviewsContainer = document.getElementById('userReviews');
  if (!form) return;
  // Display existing submissions reviews
  storedColleges.forEach(r => {
    const card = document.createElement('article');
    card.className = 'card review-card';
    card.innerHTML = `
      <h3>${r.name}</h3>
      <p>“${r.tips}”</p>
      <p class="review-meta">— ${r.country}, ${r.major}</p>
    `;
    reviewsContainer.appendChild(card);
  });
  // Handle form submit
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = {
      system: form.system.value,
      name: form.collegeName.value,
      tuition: parseInt(form.tuition.value),
      livingCost: parseInt(form.livingCost.value),
      accommodationType: form.accommodationType.value,
      transportationCost: parseInt(form.transportationCost.value) || 0,
      foodCost: parseInt(form.foodCost.value) || 0,
      insuranceCost: parseInt(form.insuranceCost.value) || 0,
      country: form.country.value,
      major: form.major.value,
      tips: form.tips.value,
      email: form.email.value
    };
    // Save
    storedColleges.push(data);
    localStorage.setItem('colleges', JSON.stringify(storedColleges));
    // Add review card
    const card = document.createElement('article');
    card.className = 'card review-card';
    card.innerHTML = `
      <h3>${data.name}</h3>
      <p>“${data.tips}”</p>
      <p class="review-meta">— ${data.country}, ${data.major}</p>
    `;
    reviewsContainer.appendChild(card);
    form.reset();
    // Refresh homepage data
    initIndexPage();
    window.location.href = 'index.html';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initIndexPage();
  initCollegePage();
  initSubmitPage();
});
