// import { v2 as cloudinary } from 'cloudinary';

// Opcional: si ya tienes configurado cloudinary.config.ts, puedes importarlo de ahí.
// Si no, asegúrate de configurarlo con tus credenciales de dotenv.
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

/**
 * Sube una imagen a Cloudinary si es un string Base64, 
 * o retorna la misma URL si ya está alojada en la web.
 */
import { cloudinary } from '../config/cloudinary.config'

export const uploadToCloudinary = async (fileStr: string | null | undefined, folderName: string = 'banners'): Promise<string | null> => {
  try {
    if (!fileStr) return null;

    // Si la imagen ya es una URL web (Cloudinary, S3, etc.), no hay que volver a subirla
    if (fileStr.startsWith('http')) {
      return fileStr;
    }

    // Si viene en formato Base64 (data:image/...)
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: folderName,
    });

    return uploadResponse.secure_url; // Retorna la URL segura https://...
  } catch (error) {
    console.error('Error al subir a Cloudinary:', error);
    throw new Error('Fallo la subida de la imagen a Cloudinary');
  }
};

// Extrae el public_id de una URL de Cloudinary para poder borrarla
export const getPublicIdFromUrl = (url: string): string | null => {
  if (!url || !url.includes('cloudinary.com')) return null;
  try {
    const parts = url.split('/');
    const uploadIndex = parts.indexOf('upload');
    if (uploadIndex === -1) return null;

    // Todo lo que está después de la versión (ej. v123456/) y antes de la extensión es el public_id
    const publicIdWithExtension = parts.slice(uploadIndex + 2).join('/');
    const publicId = publicIdWithExtension.substring(0, publicIdWithExtension.lastIndexOf('.'));
    return publicId;
  } catch (error) {
    return null;
  }
};

// Función para eliminar de Cloudinary
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error al eliminar la imagen de Cloudinary:', error);
  }
};