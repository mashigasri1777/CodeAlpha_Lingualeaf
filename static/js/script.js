const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const sourceLang = document.getElementById("source_lang");
const targetLang = document.getElementById("target_lang");
const translateBtn = document.getElementById("translateBtn");
const copyBtn = document.getElementById("copyBtn");
const speakBtn = document.getElementById("speakBtn");
const clearBtn = document.getElementById("clearBtn");
const swapBtn = document.getElementById("swapBtn");
const charCount = document.getElementById("charCount");
const detectedLang = document.getElementById("detectedLang");
const statusMessage = document.getElementById("statusMessage");

inputText.addEventListener("input", () => {
  charCount.textContent = `${inputText.value.length} characters`;
});

swapBtn.addEventListener("click", () => {
  if (sourceLang.value === "auto") return;

  const tempLang = sourceLang.value;
  sourceLang.value = targetLang.value;
  targetLang.value = tempLang;

  const tempText = inputText.value;
  inputText.value = outputText.value;
  outputText.value = tempText;
});

translateBtn.addEventListener("click", async () => {
  const text = inputText.value.trim();

  if (!text) {
    statusMessage.textContent = "Please enter text to translate.";
    return;
  }

  statusMessage.textContent = "Translating...";

  try {
    const response = await fetch("/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: text,
        source_lang: sourceLang.value,
        target_lang: targetLang.value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      statusMessage.textContent = data.error || "Something went wrong.";
      return;
    }

    outputText.value = data.translated_text;
    detectedLang.textContent = `Detected: ${data.detected_language}`;
    statusMessage.textContent = "Translation completed successfully.";
  } catch (error) {
    statusMessage.textContent = "Error connecting to server.";
  }
});

copyBtn.addEventListener("click", async () => {
  if (!outputText.value.trim()) {
    statusMessage.textContent = "No translated text to copy.";
    return;
  }

  await navigator.clipboard.writeText(outputText.value);
  statusMessage.textContent = "Translated text copied.";
});

clearBtn.addEventListener("click", () => {
  inputText.value = "";
  outputText.value = "";
  charCount.textContent = "0 characters";
  detectedLang.textContent = "Detected: -";
  statusMessage.textContent = "Cleared.";
});

speakBtn.addEventListener("click", () => {
  if (!outputText.value.trim()) {
    statusMessage.textContent = "No translated text to speak.";
    return;
  }

  const utterance = new SpeechSynthesisUtterance(outputText.value);
  utterance.lang = targetLang.value;
  speechSynthesis.speak(utterance);
  statusMessage.textContent = "Speaking translated text.";
});
