const API_URL = 'https://cybersec-steganography-backend.vercel.app/api';
let encodedImageBlob = null;

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Tool tab switching
document.querySelectorAll('.tool-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const tabName = this.dataset.tab;
        
        // Update tabs
        document.querySelectorAll('.tool-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Update content
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        document.getElementById(`${tabName}-content`).classList.add('active');
        
        // Clear results
        document.getElementById('encode-result').classList.add('hidden');
        document.getElementById('decode-result').classList.add('hidden');
    });
});

// File upload handling with drag and drop
function setupFileUpload(inputId, areaId, previewId) {
    const input = document.getElementById(inputId);
    const area = document.getElementById(areaId);
    const preview = document.getElementById(previewId);
    
    // Click to upload
    area.addEventListener('click', () => input.click());
    
    // Drag and drop
    area.addEventListener('dragover', (e) => {
        e.preventDefault();
        area.style.borderColor = 'var(--primary)';
        area.style.background = 'rgba(59, 130, 246, 0.1)';
    });
    
    area.addEventListener('dragleave', () => {
        area.style.borderColor = '';
        area.style.background = '';
    });
    
    area.addEventListener('drop', (e) => {
        e.preventDefault();
        area.style.borderColor = '';
        area.style.background = '';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            input.files = files;
            previewImage(input, preview);
        }
    });
    
    // File selection
    input.addEventListener('change', () => previewImage(input, preview));
}

function previewImage(input, previewElement) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewElement.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            previewElement.classList.add('active');
            previewElement.parentElement.querySelector('.upload-placeholder').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}

// Setup file uploads
setupFileUpload('encode-image', 'encode-upload-area', 'encode-preview');
setupFileUpload('decode-image', 'decode-upload-area', 'decode-preview');

// Encode form submission
document.getElementById('encode-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const imageFile = document.getElementById('encode-image').files[0];
    const data = document.getElementById('encode-data').value;
    
    if (!imageFile || !data) {
        alert('Please provide both image and message');
        return;
    }
    
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('data', data);
    
    showLoading(true);
    
    try {
        const response = await fetch(`${API_URL}/encode`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Encoding failed');
        }
        
        encodedImageBlob = await response.blob();
        document.getElementById('encode-result').classList.remove('hidden');
        
    } catch (error) {
        alert('Error: ' + error.message);
    } finally {
        showLoading(false);
    }
});

// Download encoded image
document.getElementById('download-btn').addEventListener('click', function() {
    if (encodedImageBlob) {
        const url = URL.createObjectURL(encodedImageBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'encoded_image.png';
        a.click();
        URL.revokeObjectURL(url);
    }
});

// Decode form submission
document.getElementById('decode-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const imageFile = document.getElementById('decode-image').files[0];
    
    if (!imageFile) {
        alert('Please provide an image');
        return;
    }
    
    const formData = new FormData();
    formData.append('image', imageFile);
    
    showLoading(true);
    
    try {
        const response = await fetch(`${API_URL}/decode`, {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Decoding failed');
        }
        
        document.getElementById('decoded-message').textContent = result.data;
        document.getElementById('decode-result').classList.remove('hidden');
        
    } catch (error) {
        alert('Error: ' + error.message);
    } finally {
        showLoading(false);
    }
});

// Loading spinner
function showLoading(show) {
    const loading = document.getElementById('loading');
    if (show) {
        loading.classList.remove('hidden');
    } else {
        loading.classList.add('hidden');
    }
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.8)';
    }
});
