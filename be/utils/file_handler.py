import os
import uuid
from werkzeug.utils import secure_filename
from flask import current_app

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def save_image(file, folder='alternatif'):
    """Menyimpan file gambar dan mengembalikan nama file unik."""
    if not file or file.filename == '':
        return None
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        # Buat nama unik: uuid_namaasli.jpg
        unique_filename = f"{uuid.uuid4().hex}_{filename}"
        
        upload_folder = os.path.join(current_app.root_path, 'static', 'uploads', folder)
        os.makedirs(upload_folder, exist_ok=True)
        
        file.save(os.path.join(upload_folder, unique_filename))
        return unique_filename
    return None

def delete_image(filename, folder='alternatif'):
    """Menghapus file fisik dari server."""
    if not filename:
        return
        
    filepath = os.path.join(current_app.root_path, 'static', 'uploads', folder, filename)
    if os.path.exists(filepath):
        try:
            os.remove(filepath)
        except Exception as e:
            print(f"Error deleting file {filename}: {e}")