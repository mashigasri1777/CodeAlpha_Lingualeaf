document.addEventListener("DOMContentLoaded", () => {

    const translateBtn = document.getElementById("translateBtn");
    const copyBtn = document.getElementById("copyBtn");
    const speakBtn = document.getElementById("speakBtn");
    const swapBtn = document.getElementById("swapBtn");

    const inputText = document.getElementById("inputText");
    const outputText = document.getElementById("outputText");

    translateBtn.addEventListener("click", translateText);

    async function translateText() {

        const text = inputText.value.trim();

        if (!text) {
            outputText.value = "Please enter text.";
            return;
        }

        const source =
            document.getElementById("sourceLang").value;

        const target =
            document.getElementById("targetLang").value;

        outputText.value = "Translating...";

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

            outputText.value =
                data.translatedText;

        }

        catch (error) {

            console.error(error);

            outputText.value =
                "Translation failed";

        }
    }

    swapBtn.addEventListener("click", () => {

        const source =
            document.getElementById("sourceLang");

        const target =
            document.getElementById("targetLang");

        let temp = source.value;

        source.value = target.value;
        target.value = temp;

    });

    copyBtn.addEventListener("click", () => {

        navigator.clipboard.writeText(
            outputText.value
        );

    });

    speakBtn.addEventListener("click", () => {

        const speech =
            new SpeechSynthesisUtterance(
                outputText.value
            );

        window.speechSynthesis.speak(speech);

    });

});
