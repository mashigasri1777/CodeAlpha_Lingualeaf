from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/translate", methods=["POST"])
def translate():

    data = request.get_json()

    text = data.get("text")
    source = data.get("source")
    target = data.get("target")

    url = "https://translate.argosopentech.com/translate"

    payload = {
        "q": text,
        "source": source,
        "target": target,
        "format": "text"
    }

    try:

        response = requests.post(url, json=payload)

        result = response.json()

        translated_text = result["translatedText"]

        return jsonify({
            "translatedText": translated_text
        })

    except Exception as e:

        return jsonify({
            "translatedText": "Translation Error"
        })

if __name__ == "__main__":
    app.run()
