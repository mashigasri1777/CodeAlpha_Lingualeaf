from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/translate', methods=['POST'])
def translate():

    data = request.json

    text = data['text']
    source = data['source']
    target = data['target']

    url = "https://libretranslate.de/translate"

    payload = {
        "q": text,
        "source": source,
        "target": target,
        "format": "text"
    }

    response = requests.post(url, json=payload)

    translated = response.json()['translatedText']

    return jsonify({
        "translated": translated
    })

if __name__ == '__main__':
    app.run(debug=True)
