import {
  deleteFromCloudinary,
  getPublicIdFromUrl,
  uploadToCloudinary,
} from "../helpers/cloudinary.helper";
import { GeneralSetting } from "../models";
import { CustomError } from "../types";
import {
  GeneralSettingResponse,
  GeneralSettingUpdateBody,
} from "../types/general-setting";

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

  //   static update = async (
  //     id: GeneralSetting["id"],
  //     data: any,
  //   ): Promise<string> => {
  //     // 1. Obtenemos el registro actual de la base de datos
  //     const generalSetting = await this.getById(id);

  //     // 2. Verificamos si vienen banners en el payload para procesarlos
  //     if (data.banners && Array.isArray(data.banners)) {
  //       // Parseo ultra-seguro para evitar errores si Sequelize devuelve el JSON como string o array
  //       const rawBanners = generalSetting.banners;
  //       const bannersArray = Array.isArray(rawBanners)
  //         ? rawBanners
  //         : typeof rawBanners === "string"
  //           ? JSON.parse(rawBanners)
  //           : [];

  //       const existingBannersMap = new Map(
  //         bannersArray.map((b: any) => [b.id, b.image]),
  //       );

  //       // Mapeamos los banners para subir los nuevos y borrar los viejos
  //       const processedBanners = await Promise.all(
  //         data.banners.map(async (bannerItem: any) => {
  //           // Si el usuario envió un Base64 nuevo desde el frontend
  //           if (bannerItem.image && bannerItem.image.startsWith("data:image")) {
  //             // A. Buscamos si este banner ya tenía una imagen previa en la BD
  //             const oldImageUrl = existingBannersMap.get(bannerItem.id) as string;
  //             if (oldImageUrl) {
  //               console.log("🔄 Imagen anterior detectada:", oldImageUrl);

  //               const publicId = getPublicIdFromUrl(oldImageUrl);
  //               if (publicId) {
  //                 console.log(
  //                   "🗑️ Eliminando de Cloudinary el public_id:",
  //                   publicId,
  //                 );
  //                 await deleteFromCloudinary(publicId);
  //                 console.log(
  //                   "✅ ¡Imagen anterior eliminada con éxito de Cloudinary!",
  //                 );
  //               }
  //             }

  //             // B. Subimos la nueva imagen a Cloudinary
  //             const secureUrl = await uploadToCloudinary(
  //               bannerItem.image,
  //               "landing_banners",
  //             );
  //             return {
  //               ...bannerItem,
  //               image: secureUrl, // Reemplazamos el Base64 por la URL segura y limpia
  //             };
  //           }

  //           // Si no cambió la imagen, dejamos la URL web que ya tenía
  //           return bannerItem;
  //         }),
  //       );

  //       // Sobrescribimos el array de banners con las URLs ya listas
  //       data.banners = processedBanners;
  //     }

  //     // 3. Actualizamos la base de datos con el JSON procesado
  //     await generalSetting.update(data);

  //     return "Los datos se actualizaron satisfactoriamente.";
  //     };

  static update = async (
    id: GeneralSetting["id"],
    data: GeneralSettingUpdateBody,
  ): Promise<string> => {
    // 1. Obtenemos el registro actual de la base de datos
    const generalSetting = await this.getById(id);

    // 2. Procesar Banners si vienen en el payload
    if (data.banners && Array.isArray(data.banners)) {
      const rawBanners = generalSetting.banners;
      const bannersArray = Array.isArray(rawBanners)
        ? rawBanners
        : typeof rawBanners === "string"
          ? JSON.parse(rawBanners)
          : [];

      const existingBannersMap = new Map(
        bannersArray.map((b: any) => [b.id, b.image]),
      );

      const processedBanners = await Promise.all(
        data.banners.map(async (bannerItem: any) => {
          if (bannerItem.image && bannerItem.image.startsWith("data:image")) {
            const oldImageUrl = existingBannersMap.get(bannerItem.id) as string;
            if (oldImageUrl) {
              const publicId = getPublicIdFromUrl(oldImageUrl);
              if (publicId) {
                await deleteFromCloudinary(publicId);
              }
            }
            const secureUrl = await uploadToCloudinary(
              bannerItem.image,
              "landing_banners",
            );
            return {
              ...bannerItem,
              image: secureUrl,
            };
          }
          return bannerItem;
        }),
      );
      data.banners = processedBanners;
    }

    // 3. Procesar GaleryImagesAron (Galería Ampliada de 6 Fijas)
    if (data.galeryImagesAron && Array.isArray(data.galeryImagesAron)) {
      const rawGalery = generalSetting.galeryImagesAron;
      const galeryArray = Array.isArray(rawGalery)
        ? rawGalery
        : typeof rawGalery === "string"
          ? JSON.parse(rawGalery)
          : [];

      const existingGaleryMap = new Map(
        galeryArray.map((g: any) => [g.id, g.url]),
      );

      const processedGalery = await Promise.all(
        data.galeryImagesAron.map(async (galeryItem: any) => {
          // Ojo: en la estructura de Aron el campo de la imagen se llama .url
          if (galeryItem.url && galeryItem.url.startsWith("data:image")) {
            const oldImageUrl = existingGaleryMap.get(galeryItem.id) as string;
            if (oldImageUrl) {
              const publicId = getPublicIdFromUrl(oldImageUrl);
              if (publicId) {
                await deleteFromCloudinary(publicId);
              }
            }
            const secureUrl = await uploadToCloudinary(
              galeryItem.url,
              "landing_gallery_aron", // Carpeta en Cloudinary para la galería de Aron
            );
            return {
              ...galeryItem,
              url: secureUrl, // Reemplazamos el Base64 en la propiedad url
            };
          }
          return galeryItem;
        }),
      );
      data.galeryImagesAron = processedGalery;
    }

    // 4. Procesar CatalogGalleryServices (Catálogo de Servicios)
    if (
      data.catalogGalleryServices &&
      Array.isArray(data.catalogGalleryServices)
    ) {
      const rawServices = generalSetting.catalogGalleryServices;
      const servicesArray = Array.isArray(rawServices)
        ? rawServices
        : typeof rawServices === "string"
          ? JSON.parse(rawServices)
          : [];

      const existingServicesMap = new Map(
        servicesArray.map((s: any) => [s.id, s.image]),
      );

      const processedServices = await Promise.all(
        data.catalogGalleryServices.map(async (serviceItem: any) => {
          if (serviceItem.image && serviceItem.image.startsWith("data:image")) {
            const oldImageUrl = existingServicesMap.get(
              serviceItem.id,
            ) as string;
            if (oldImageUrl) {
              const publicId = getPublicIdFromUrl(oldImageUrl);
              if (publicId) {
                await deleteFromCloudinary(publicId);
                console.log("catalogGalleryServices eliminado");
              }
            }
            const secureUrl = await uploadToCloudinary(
              serviceItem.image,
              "landing_services",
            );
            return {
              ...serviceItem,
              image: secureUrl,
            };
          }
          return serviceItem;
        }),
      );
      data.catalogGalleryServices = processedServices;
    }

    // 5. Procesar CatalogGalleryModels (Catálogo de Modelos)
    if (data.catalogGalleryModels && Array.isArray(data.catalogGalleryModels)) {
      const rawModels = generalSetting.catalogGalleryModels;
      const modelsArray = Array.isArray(rawModels)
        ? rawModels
        : typeof rawModels === "string"
          ? JSON.parse(rawModels)
          : [];

      const existingModelsMap = new Map(
        modelsArray.map((s: any) => [s.id, s.image]),
      );

      const processedModels = await Promise.all(
        data.catalogGalleryModels.map(async (modelItem: any) => {
          if (modelItem.image && modelItem.image.startsWith("data:image")) {
            const oldImageUrl = existingModelsMap.get(modelItem.id) as string;
            if (oldImageUrl) {
              const publicId = getPublicIdFromUrl(oldImageUrl);
              if (publicId) {
                await deleteFromCloudinary(publicId);
                console.log("catalogGalleryServices eliminado");
              }
            }
            const secureUrl = await uploadToCloudinary(
              modelItem.image,
              "landing_models",
            );
            return {
              ...modelItem,
              image: secureUrl,
            };
          }
          return modelItem;
        }),
      );
      data.catalogGalleryModels = processedModels;
    }

    // 6. Procesar CatalogGalleryEvents (Catálogo de Eventos)
    if (data.catalogGalleryEvents && Array.isArray(data.catalogGalleryEvents)) {
      const rawEvents = generalSetting.catalogGalleryEvents;
      const eventsArray = Array.isArray(rawEvents)
        ? rawEvents
        : typeof rawEvents === "string"
          ? JSON.parse(rawEvents)
          : [];

      const existingEventsMap = new Map(
        eventsArray.map((s: any) => [s.id, s.image]),
      );

      const processedEvents = await Promise.all(
        data.catalogGalleryEvents.map(async (eventItem: any) => {
          if (eventItem.image && eventItem.image.startsWith("data:image")) {
            const oldImageUrl = existingEventsMap.get(eventItem.id) as string;
            if (oldImageUrl) {
              const publicId = getPublicIdFromUrl(oldImageUrl);
              if (publicId) {
                await deleteFromCloudinary(publicId);
                console.log("catalogGalleryEvents eliminado");
              }
            }
            const secureUrl = await uploadToCloudinary(
              eventItem.image,
              "landing_events",
            );
            return {
              ...eventItem,
              image: secureUrl,
            };
          }
          return eventItem;
        }),
      );
      data.catalogGalleryEvents = processedEvents;
    }

  // 7. Procesar CatalogGalleryVideos (Catálogo de Videos)
    if (data.catalogGalleryVideos && Array.isArray(data.catalogGalleryVideos)) {
      const rawVideos = generalSetting.catalogGalleryVideos;
      const videosArray = Array.isArray(rawVideos)
        ? rawVideos
        : typeof rawVideos === "string"
          ? JSON.parse(rawVideos)
          : [];

      const existingVideosMap = new Map(
        videosArray.map((s: any) => [s.id, s.videoUrl]), // Mapeamos por ID y URL de video
      );

      const processedVideos = await Promise.all(
        data.catalogGalleryVideos.map(async (videoItem: any) => {
          // CORREGIDO: Evaluamos videoItem.videoUrl en lugar de .image
          if (videoItem.videoUrl && videoItem.videoUrl.startsWith("data:video")) { 
            // Nota: Si tus videos vienen como archivos locales en base64 para subirlos a la nube:
            const oldVideoUrl = existingVideosMap.get(videoItem.id) as string;
            if (oldVideoUrl) {
              const publicId = getPublicIdFromUrl(oldVideoUrl);
              if (publicId) {
                await deleteFromCloudinary(publicId);
                console.log("Video anterior eliminado de Cloudinary");
              }
            }
            const secureUrl = await uploadToCloudinary(
              videoItem.videoUrl,
              "landing_videos",
            );
            return {
              ...videoItem,
              videoUrl: secureUrl,
            };
          }
          return videoItem;
        }),
      );

      // Asignamos el array limpio y plano (nunca con JSON.stringify)
      data.catalogGalleryVideos = processedVideos;
    }

    // 5. Actualizamos la base de datos con todos los JSONs ya procesados y limpios de Base64
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
    if (
      data.catalogGalleryServices &&
      typeof data.catalogGalleryServices === "string"
    ) {
      try {
        data.catalogGalleryServices = JSON.parse(data.catalogGalleryServices);
      } catch (error) {
        console.error("Error parseando galery_images_aron:", error);
      }
    }
    if (
      data.catalogGalleryModels &&
      typeof data.catalogGalleryModels === "string"
    ) {
      try {
        data.catalogGalleryModels = JSON.parse(data.catalogGalleryModels);
      } catch (error) {
        console.error("Error parseando catalogGalleryModels:", error);
      }
    }
    if (
      data.catalogGalleryEvents &&
      typeof data.catalogGalleryEvents === "string"
    ) {
      try {
        data.catalogGalleryEvents = JSON.parse(data.catalogGalleryEvents);
      } catch (error) {
        console.error("Error parseando catalogGalleryEvents:", error);
      }
    }

    if (
      data.catalogGalleryVideos &&
      typeof data.catalogGalleryVideos === "string"
    ) {
      try {
        data.catalogGalleryVideos = JSON.parse(data.catalogGalleryVideos);
      } catch (error) {
        console.error("Error parseando catalogGalleryVideos:", error);
      }
    }

    return data;
  };
}
