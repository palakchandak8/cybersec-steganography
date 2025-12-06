from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from steganography import encode_image, decode_image
import os

app = Flask(__name__)

# Update CORS for your Vercel frontend
CORS(app, resources={
    r"/*": {
        "origins": [
            "https://cybersec-steganography.vercel.app",
            "http://localhost:3000",
            "http://localhost:5173"
        ]
    }
})

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
        print(f"Encoding error: {str(e)}")
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
        print(f"Decoding error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # For production deployment
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
