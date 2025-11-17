function saveMood() {
  const mood = document.getElementById("mood").value;

  // Get previous mood history or create empty list
  let history = JSON.parse(localStorage.getItem("moodHistory") || "[]");

  // Add today's mood entry
  history.push({
    mood: mood,
    time: new Date().toLocaleString()
  });

  // Save back to local storage
  localStorage.setItem("moodHistory", JSON.stringify(history));

  // Show confirmation message
  document.getElementById("msg").innerText = "Mood saved: " + mood + " 😊";
}
