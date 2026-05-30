from flask import Flask, render_template, request, jsonify
from deep_translator import GoogleTranslator

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

        translated_text = GoogleTranslator(
            source=source,
            target=target
        ).translate(text)

        return jsonify({
            "translatedText": translated_text
        })

    except Exception as e:
        print("ERROR:", e)

        return jsonify({
            "translatedText": "Translation failed"
        })

if __name__ == "__main__":
    app.run()
