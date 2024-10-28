const imageInput = document.getElementById('imageInput');
const fileName = document.getElementById('fileName');
const qualitySlider = document.getElementById('quality');
const qualityValue = document.getElementById('qualityValue');
const originalSize = document.getElementById('originalSize');
const newSize = document.getElementById('newSize');
const preview = document.getElementById('preview');
const downloadLink = document.getElementById('downloadLink');

let originalImage = null;

imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        fileName.textContent = file.name;
        originalSize.textContent = formatBytes(file.size);
        
        const reader = new FileReader();
        reader.onload = (event) => {
            originalImage = new Image();
            originalImage.src = event.target.result;
            originalImage.onload = () => {
                preview.src = event.target.result;
                document.getElementById('previewSection').hidden = false; // Show preview section
                downloadLink.hidden = false;  // Show download button immediately
                compressImage(); // Compress immediately with default quality
            };
        };
        reader.readAsDataURL(file);
    }
});

qualitySlider.addEventListener('input', (e) => {
    qualityValue.textContent = `${e.target.value}%`;
    compressImage(); // Compress in real-time while sliding
});

function compressImage() {
    if (!originalImage) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Calculate new dimensions while maintaining aspect ratio
    let width = originalImage.width;
    let height = originalImage.height;
    const maxWidth = 1920; // Maximum width for the compressed image
    
    if (width > maxWidth) {
        height = (maxWidth * height) / width;
        width = maxWidth;
    }

    canvas.width = width;
    canvas.height = height;

    // Draw image on canvas
    ctx.drawImage(originalImage, 0, 0, width, height);

    // Convert to compressed jpeg
    const quality = qualitySlider.value / 100;
    const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);

    // Update preview and size info
    preview.src = compressedDataUrl;
    
    // Calculate new size
    const base64str = compressedDataUrl.split(',')[1];
    const decoded = atob(base64str);
    const compressedSize = decoded.length;
    newSize.textContent = formatBytes(compressedSize);

    // Enable download
    downloadLink.href = compressedDataUrl;
    downloadLink.hidden = false;
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
