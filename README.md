## 🔒 CyberSec Steganography

Hide secret messages inside images using LSB steganography. Simple, secure, serverless.

**🌐 Live Demo:** [https://cybersec-steganography.vercel.app/](https://cybersec-steganography.vercel.app/)

---

## What It Does ✨

* 🖼️ Hide secret text inside images
* 🔓 Extract hidden messages from images
* 🎨 Clean, intuitive, and lightweight UI
* 🔐 Secure LSB steganography algorithm
* 📱 Fully responsive design

---

## Technology Stack 🔧 

### **Backend**

* Python 3.x
* Flask
* Pillow (PIL)

### **Frontend**

* HTML5
* CSS3
* Vanilla JavaScript

### **Deployment**

* Vercel (Serverless Functions)

---

## Architecture 🏗️ 

The project follows a decoupled structure:

* **Backend API:** Deployed on Vercel serverless functions
* **Frontend:** Static site hosted on Vercel
* Communication happens through REST API endpoints

---

## Installation 📥 

### **Prerequisites**

* Python 3.8+
* pip
* Node.js (for Vercel CLI)

---


## Quick Start 🚀 

### Backend
```bash
git clone https://github.com/palakchandak8/cybersec-steganography-backend.git
cd cybersec-steganography-backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python app.py  # Runs on localhost:5000
```

### Frontend
```bash
git clone https://github.com/palakchandak8/cybersec-steganography.git
cd cybersec-steganography
python -m http.server 8000  # Visit localhost:8000
```

---

## How to Use 🎯 

**Encode:** Upload image → Type secret → Download encoded image  
**Decode:** Upload encoded image → View hidden message

---

## How It Works 🔬 

Uses **Least Significant Bit (LSB)** technique: replaces the last bit of pixel RGB values with message data. Invisible to the eye, reversible by the decoder.

---

## API 📡 

**POST `/encode`** — Returns image with hidden message  
**POST `/decode`** — Returns `{"data": "secret text"}`

---

## Project Structure 📁 

```
cybersec-steganography/
├── backend/
│   ├── app.py
│   ├── steganography.py
│   ├── requirements.txt
│   └── vercel.json
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── README.md
└── .gitignore
```

---

## Live Deployments 🌐 

* **Frontend:** [https://cybersec-steganography.vercel.app/](https://cybersec-steganography.vercel.app/)
* **Backend:** Vercel Serverless API

---

## ⚠️ Security Note

LSB steganography is educational only—advanced tools can detect hidden patterns. For production‑grade secrecy, stronger algorithms are recommended.

---

## Contributing 🤝 

Pull requests are welcome! Found a bug? Open an issue.

---

## Author 👩‍💻 

**Palak Chandak** — [https://github.com/palakchandak8](https://github.com/palakchandak8)

---

*Built for cybersecurity education · Powered by Flask & Vercel*
