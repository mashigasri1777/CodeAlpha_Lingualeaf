from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/translate", methods=["POST"])
def translate_text():
    data = request.get_json()

    text = data.get("text", "").strip()
    source_lang = data.get("source_lang", "auto")
    target_lang = data.get("target_lang", "")

    if not text:
        return jsonify({"error": "Please enter text to translate."}), 400

    if not target_lang:
        return jsonify({"error": "Please select a target language."}), 400

    url = "https://libretranslate.com/translate"

    payload = {
        "q": text,
        "source": source_lang,
        "target": target_lang,
        "format": "text"
    }

    try:
        response = requests.post(url, json=payload, timeout=20)
        response.raise_for_status()
        result = response.json()

        return jsonify({
            "translated_text": result["translatedText"],
            "detected_language": source_lang
        })

    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Translation failed: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
