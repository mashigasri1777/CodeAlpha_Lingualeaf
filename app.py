from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/translate", methods=["POST"])
def translate():

    try:

        data = request.get_json()

        text = data["text"]
        source = data["source"]
        target = data["target"]

        url = "https://translate.argosopentech.com/translate"

        payload = {
            "q": text,
            "source": source,
            "target": target,
            "format": "text"
        }

        response = requests.post(url, json=payload)

        result = response.json()

        translated_text =
        result["translatedText"]

        return jsonify({
            "translatedText":
            translated_text
        })

    except Exception as e:

        print("ERROR:", e)

        return jsonify({
            "translatedText":
            "Translation error"
        })

if __name__ == "__main__":
    app.run()
