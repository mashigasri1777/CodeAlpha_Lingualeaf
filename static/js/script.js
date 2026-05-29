const translateBtn = document.getElementById("translateBtn");

translateBtn.addEventListener("click", async () => {

    const text =
    document.getElementById("inputText").value;

    const source =
    document.getElementById("sourceLang").value;

    const target =
    document.getElementById("targetLang").value;

    const output =
    document.getElementById("outputText");

    output.value = "Translating...";

    try {

        const response = await fetch("/translate", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                text,
                source,
                target
            })

        });

        const data = await response.json();

        output.value = data.translatedText;

    }

    catch(error){

        output.value = "Translation failed";

    }

});

document.getElementById("swapBtn")
.addEventListener("click", () => {

    let source =
    document.getElementById("sourceLang");

    let target =
    document.getElementById("targetLang");

    let temp = source.value;

    source.value = target.value;

    target.value = temp;
});

document.getElementById("copyBtn")
.addEventListener("click", () => {

    const text =
    document.getElementById("outputText").value;

    navigator.clipboard.writeText(text);

    alert("Copied!");
});

document.getElementById("speakBtn")
.addEventListener("click", () => {

    const text =
    document.getElementById("outputText").value;

    const speech =
    new SpeechSynthesisUtterance(text);

    window.speechSynthesis.speak(speech);

});
