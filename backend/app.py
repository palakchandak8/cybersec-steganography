from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from steganography import encode_image, decode_image
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/')
def home():
    return jsonify({"message": "Steganography API is running"})

@app.route('/encode', methods=['POST'])
def encode():
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400
        
        image = request.files['image']
        data = request.form.get('data', '')
        
        if not data:
            return jsonify({"error": "No data to encode"}), 400
        
        # Encode the image
        encoded_image = encode_image(image, data)
        
        return send_file(
            encoded_image,
            mimetype='image/png',
            as_attachment=True,
            download_name='encoded_image.png'
        )
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/decode', methods=['POST'])
def decode():
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400
        
        image = request.files['image']
        
        # Decode the image
        decoded_data = decode_image(image)
        
        return jsonify({"data": decoded_data})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
