let gender = "";
let ageGroup = "";

function clearActive(btns) {
  btns.forEach(b => b.classList.remove("active"));
}

function selectGender(btn, value) {
  clearActive(document.querySelectorAll(".pill-row .pill"));
  btn.classList.add("active");
  gender = value;
  document.getElementById("genderText").innerText = value + " selected";
}

function selectAge(btn, value) {
  clearActive(document.querySelectorAll(".pill-grid .pill"));
  btn.classList.add("active");
  ageGroup = value;
  document.getElementById("ageText").innerText = value + " selected";
}

function analyze() {
  fetch("http://127.0.0.1:8000/analyze", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      symptoms: document.getElementById("symptoms").value,
      age_group: ageGroup,
      gender: gender
    })
  })
  .then(res => res.json())
  .then(data => {
    let html = "";
    data.results.forEach(r => {
      html += `
        <h3>${r.disease}</h3>
        💊 ${r.medicine}<br>
        📏 ${r.dosage}<br>
        📝 ${r.instructions}<br>
        🔢 Confidence: ${Math.round(r.confidence*100)}%
        <hr>`;
    });
    document.getElementById("result").innerHTML = html || "<p>No match found.</p>";
  });
}

/* cursor glow follow */
const cursor = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX - 80 + "px";
  cursor.style.top = e.clientY - 80 + "px";
});
