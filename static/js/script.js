document.addEventListener("DOMContentLoaded", () => {

    const translateBtn =
    document.getElementById("translateBtn");

    translateBtn.addEventListener("click", translateText);

});

async function translateText() {

    const inputText =
    document.getElementById("inputText").value;

    const sourceLang =
    document.getElementById("sourceLang").value;

    const targetLang =
    document.getElementById("targetLang").value;

    const outputText =
    document.getElementById("outputText");

    if(inputText.trim() === ""){

        outputText.value =
        "Please enter text";

        return;
    }

    outputText.value = "Translating...";

    try {

        const response = await fetch("/translate", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                text: inputText,
                source: sourceLang,
                target: targetLang

            })

        });

        const data = await response.json();

        console.log(data);

        outputText.value =
        data.translatedText;

    }

    catch(error){

        console.log(error);

        outputText.value =
        "Translation failed";

    }
}
