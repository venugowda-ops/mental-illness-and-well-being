// Load face-api models
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js/models')
]).then(() => console.log("Models loaded"));


// Start camera
function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      const video = document.getElementById("video");
      video.srcObject = stream;
    })
    .catch(err => {
      alert("Camera access denied or not supported");
    });
}


// Detect mood
async function detectMood() {
  const video = document.getElementById("video");

  const detection = await faceapi
    .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceExpressions();

  if (!detection) {
    document.getElementById("result").innerText = "No face found. Try again.";
    return;
  }

  // Get emotions
  const expressions = detection.expressions;
  const mood = Object.keys(expressions).reduce((a, b) => expressions[a] > expressions[b] ? a : b);

  let tip = "";

  if (mood === "happy") tip = "You seem happy! Keep doing what makes you smile 😊💛";
  else if (mood === "sad") tip = "It's okay to feel sad. Try deep breathing and talk to someone you trust 💙";
  else if (mood === "angry") tip = "Try a short walk or drink water to calm the mind ❤";
  else if (mood === "neutral") tip = "You're neutral. Maybe listen to music or take a small break 🎧";
  else if (mood === "fearful") tip = "Take slow breaths. You are safe. You got this 🤍";
  else tip = "Your mood is unique — be kind to yourself 🌿";

  document.getElementById("result").innerHTML = 
    <strong>Mood detected:</strong> ${mood}<br><br><strong>Tip:</strong> ${tip};
}
