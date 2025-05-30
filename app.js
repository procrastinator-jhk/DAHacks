document.getElementById("summarizeBtn").addEventListener("click", async () => {
  const input = document.getElementById("statementInput").value;
  if (!input.trim()) return alert("Please paste a FOMC statement first.");

  const summary = await fetchSummary(input);
  document.getElementById("summaryResult").textContent = summary;
});

document.getElementById("analyzeBtn").addEventListener("click", async () => {
  const input = document.getElementById("statementInput").value;
  if (!input.trim()) return alert("Please paste a FOMC statement first.");

  const tone = await fetchTone(input);
  document.getElementById("toneResult").textContent = tone;
});

async function fetchSummary(text) {
  try {
    const res = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    const data = await res.json();
    return data.summary || "(No summary returned)";
  } catch (err) {
    return "Error fetching summary.";
  }
}

async function fetchTone(text) {
  try {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    const data = await res.json();
    return data.tone || "(No tone result returned)";
  } catch (err) {
    return "Error analyzing tone.";
  }
}
