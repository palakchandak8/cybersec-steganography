const API_URL = 'http://localhost:5000';
let encodedImageBlob = null;

// Tab switching
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(`${tabName}-tab`).classList.add('active');
    event.target.classList.add('active');
    
    // Clear results
    document.getElementById('encode-result').classList.add('hidden');
    document.getElementById('decode-result').classList.add('hidden');
}

// Image preview
function previewImage(input, previewId) {
    const file = input.files[0];
    const preview = document.getElementById(previewId);
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }
}

document.getElementById('encode-image').addEventListener('change', function() {
    previewImage(this, 'encode-preview');
});

document.getElementById('decode-image').addEventListener('change', function() {
    previewImage(this, 'decode-preview');
});

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