import {
  deleteFromCloudinary,
  getPublicIdFromUrl,
  uploadToCloudinary,
} from "../helpers/cloudinary.helper";
import { GeneralSetting } from "../models";
import { CustomError } from "../types";
import { GeneralSettingResponse } from "../types/general-setting";

export class GeneralSettingService {
  static getData = async (): Promise<GeneralSettingResponse> => {
    const result = await GeneralSetting.findOne({
      order: [["id", "asc"]],
    });
    return await this.dataFormatJSON(result);
  };

  static getById = async (
    id: GeneralSetting["id"],
  ): Promise<GeneralSetting> => {
    const generalSetting = await GeneralSetting.findByPk(id);
    if (!generalSetting)
      throw new CustomError("general-setting no existe", 404);
    return generalSetting;
  };

  static update = async (
    id: GeneralSetting["id"],
    data: any,
  ): Promise<string> => {
    // 1. Obtenemos el registro actual de la base de datos
    const generalSetting = await this.getById(id);

    // 2. Verificamos si vienen banners en el payload para procesarlos
    if (data.banners && Array.isArray(data.banners)) {
      // Parseo ultra-seguro para evitar errores si Sequelize devuelve el JSON como string o array
      const rawBanners = generalSetting.banners;
      const bannersArray = Array.isArray(rawBanners)
        ? rawBanners
        : typeof rawBanners === "string"
          ? JSON.parse(rawBanners)
          : [];

      const existingBannersMap = new Map(
        bannersArray.map((b: any) => [b.id, b.image]),
      );

      // Mapeamos los banners para subir los nuevos y borrar los viejos
      const processedBanners = await Promise.all(
        data.banners.map(async (bannerItem: any) => {
          // Si el usuario envió un Base64 nuevo desde el frontend
          if (bannerItem.image && bannerItem.image.startsWith("data:image")) {
            // A. Buscamos si este banner ya tenía una imagen previa en la BD
            const oldImageUrl = existingBannersMap.get(bannerItem.id) as string;
            if (oldImageUrl) {
              console.log("🔄 Imagen anterior detectada:", oldImageUrl);

              const publicId = getPublicIdFromUrl(oldImageUrl);
              if (publicId) {
                console.log(
                  "🗑️ Eliminando de Cloudinary el public_id:",
                  publicId,
                );
                await deleteFromCloudinary(publicId);
                console.log(
                  "✅ ¡Imagen anterior eliminada con éxito de Cloudinary!",
                );
              }
            }

            // B. Subimos la nueva imagen a Cloudinary
            const secureUrl = await uploadToCloudinary(
              bannerItem.image,
              "landing_banners",
            );
            return {
              ...bannerItem,
              image: secureUrl, // Reemplazamos el Base64 por la URL segura y limpia
            };
          }

          // Si no cambió la imagen, dejamos la URL web que ya tenía
          return bannerItem;
        }),
      );

      // Sobrescribimos el array de banners con las URLs ya listas
      data.banners = processedBanners;
    }

    // 3. Actualizamos la base de datos con el JSON procesado
    await generalSetting.update(data);

    return "Los datos se actualizaron satisfactoriamente.";
  };
  static dataFormatJSON = async (
    result: GeneralSetting,
  ): Promise<GeneralSettingResponse> => {
    if (!result) {
      throw new Error("Configuración no encontrada");
    }
    const data = result.get({ plain: true }) as GeneralSettingResponse;
    // Si socialLinks llega como string (por cómo se guardó en MySQL), lo parseamos a JSON real
    if (data.socialLinks && typeof data.socialLinks === "string") {
      try {
        data.socialLinks = JSON.parse(data.socialLinks);
      } catch (error) {
        console.error("Error parseando socialLinks:", error);
      }
    }
    if (data.banners && typeof data.banners === "string") {
      try {
        data.banners = JSON.parse(data.banners);
      } catch (error) {
        console.error("Error parseando banners:", error);
      }
    }
    if (
      data.listLabelsEditorAron &&
      typeof data.listLabelsEditorAron === "string"
    ) {
      try {
        data.listLabelsEditorAron = JSON.parse(data.listLabelsEditorAron);
      } catch (error) {
        console.error("Error parseando list_labels_editor_aron:", error);
      }
    }
    if (data.galeryImagesAron && typeof data.galeryImagesAron === "string") {
      try {
        data.galeryImagesAron = JSON.parse(data.galeryImagesAron);
      } catch (error) {
        console.error("Error parseando galery_images_aron:", error);
      }
    }
    return data;
  };
}
