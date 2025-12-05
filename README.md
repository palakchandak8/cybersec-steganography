# 🔒 CyberSec Steganography

A web-based steganography tool that allows you to hide secret messages within images using LSB (Least Significant Bit) technique.

## Features

- 🖼️ Encode secret messages into images
- 🔓 Decode hidden messages from images
- 🎨 Clean and intuitive user interface
- 🔐 Secure LSB steganography algorithm
- 📱 Responsive design

## Technology Stack

**Backend:**
- Python 3.x
- Flask
- Pillow (PIL)

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript

## Installation

### Prerequisites
- Python 3.8 or higher
- pip package manager

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/palakchandak8/cybersec-steganography.git
cd cybersec-steganography
```

2. Navigate to backend directory:
```bash
cd backend
```

3. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run the Flask server:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. Open `frontend/script.js` and ensure API_URL points to your backend
2. Open `frontend/index.html` in a web browser or use a local server:
```bash
cd frontend
python -m http.server 8000
```

Visit `http://localhost:8000` in your browser

## Usage

### Encoding a Message

1. Click on the "Encode" tab
2. Select an image file (PNG, JPG, etc.)
3. Enter your secret message
4. Click "Encode Message"
5. Download the encoded image

### Decoding a Message

1. Click on the "Decode" tab
2. Select an encoded image
3. Click "Decode Message"
4. View the hidden message

## API Endpoints

### POST /encode
Encodes a message into an image.

**Request:**
- `image`: Image file (multipart/form-data)
- `data`: Secret message (string)

**Response:**
- Encoded image file (PNG)

### POST /decode
Decodes a hidden message from an image.

**Request:**
- `image`: Encoded image file (multipart/form-data)

**Response:**
```json
{
  "data": "decoded message"
}
```

## How It Works

This application uses the LSB (Least Significant Bit) steganography technique:

1. **Encoding:** Converts text to binary and modifies the least significant bit of pixel RGB values
2. **Decoding:** Reads the LSB of pixels to reconstruct the hidden message
3. A termination flag indicates the end of the hidden message

## Project Structure
```
cybersec-steganography/
├── backend/
│   ├── app.py              # Flask API
│   ├── steganography.py    # Core steganography logic
│   ├── requirements.txt    # Python dependencies
│   └── uploads/            # Temporary upload folder
├── frontend/
│   ├── index.html          # Main HTML page
│   ├── style.css           # Styling
│   └── script.js           # Frontend logic
├── README.md
├── .gitignore

```

## Security Note

⚠️ This is an educational project. LSB steganography can be detected by steganalysis tools. For production use, consider more sophisticated steganographic techniques.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Author

Your Name - [palakchandak8](https://github.com/palakchandak8)

## Acknowledgments

- Built for CyberSecurity education
- Uses PIL (Pillow) for image manipulation
- Flask for REST API