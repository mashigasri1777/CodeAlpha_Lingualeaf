from flask import Flask, render_template, request, jsonify
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

SUBSCRIPTION_KEY = os.getenv("TRANSLATOR_TEXT_SUBSCRIPTION_KEY")
REGION = os.getenv("TRANSLATOR_TEXT_REGION")
ENDPOINT = os.getenv("TRANSLATOR_TEXT_ENDPOINT", "https://api.cognitive.microsofttranslator.com")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/translate", methods=["POST"])
def translate_text():
    if not SUBSCRIPTION_KEY or not REGION:
        return jsonify({"error": "Missing Translator API key or region in environment variables."}), 500

    data = request.get_json()
    text = data.get("text", "").strip()
    source_lang = data.get("source_lang", "")
    target_lang = data.get("target_lang", "")

    if not text:
        return jsonify({"error": "Please enter text to translate."}), 400

    if not target_lang:
        return jsonify({"error": "Please select a target language."}), 400

    url = f"{ENDPOINT}/translate?api-version=3.0&to={target_lang}"
    if source_lang and source_lang != "auto":
        url += f"&from={source_lang}"

    headers = {
        "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
        "Ocp-Apim-Subscription-Region": REGION,
        "Content-Type": "application/json"
    }

    body = [{"text": text}]

    try:
        response = requests.post(url, headers=headers, json=body, timeout=20)
        raw_text = response.text

        if response.status_code != 200:
            return jsonify({
                "error": f"Azure error {response.status_code}: {raw_text}"
            }), response.status_code

        result = response.json()
        translated_text = result[0]["translations"][0]["text"]
        detected_language = result[0].get("detectedLanguage", {}).get("language", "auto")

        return jsonify({
            "translated_text": translated_text,
            "detected_language": detected_language
        })

    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Request failed: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
    @app.route("/check-env")
def check_env():
    return {
        "has_key": bool(os.getenv("TRANSLATOR_TEXT_SUBSCRIPTION_KEY")),
        "has_region": bool(os.getenv("TRANSLATOR_TEXT_REGION")),
        "has_endpoint": bool(os.getenv("TRANSLATOR_TEXT_ENDPOINT"))
    }
