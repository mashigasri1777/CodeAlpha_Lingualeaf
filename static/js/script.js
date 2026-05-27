const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");

sendBtn.addEventListener("click", async () => {

    const input =
    document.getElementById("userInput");

    const text = input.value;

    if(text.trim() === "") return;

    addMessage(text, "user");

    input.value = "";

    const source =
    document.getElementById("sourceLang").value;

    const target =
    document.getElementById("targetLang").value;

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

    addMessage(data.translated, "bot");

});

function addMessage(text, sender){

    const msg = document.createElement("div");

    msg.classList.add("message");
    msg.classList.add(sender);

    msg.innerText = text;

    chatBox.appendChild(msg);

    chatBox.scrollTop = chatBox.scrollHeight;
}

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
