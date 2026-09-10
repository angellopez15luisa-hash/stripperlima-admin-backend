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
    return result.get({ plain: true }) as GeneralSettingResponse;
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

  static extractPublicIdFromUrl = (url:string) => {
    const parsedUrl = new URL(url);
    const pathParts = parsedUrl.pathname.split("/");
    const filtered = pathParts.filter(Boolean); // filtra 'upload', 'v12345', etc.

    // Remueve la extensión y une las carpetas + nombre de archivo
    const fileWithExtension = filtered.slice(2).join("/"); // salta 'res.cloudinary.com' y el cloud_name
    const lastDotIndex = fileWithExtension.lastIndexOf(".");
    return lastDotIndex !== -1
      ? fileWithExtension.substring(0, lastDotIndex)
      : fileWithExtension;
  };

  static update = async (
    id: GeneralSetting["id"],
    data: GeneralSettingUpdateBody,
  ): Promise<string> => {
    // 1. Asegúrate de que esto termine de traer el objeto antes de hacer nada
    const generalSetting = await this.getById(id);

    console.log("1. OBJETO OBTENIDO DE LA BD:", generalSetting);

    const extractImageUrls = (items: any[]) => {
      if (!Array.isArray(items)) return [];
      return items
        .map((item: any) => {
          const url = item?.image || item?.url;
          if (!url || typeof url !== "string" || url.startsWith("data:image")) {
            return null;
          }
          return url;
        })
        .filter(Boolean);
    };

    // 2. Recorremos el body del cliente
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        
        // --- 🚀 NUEVO: PROCESAR BASE64 ANTES DE COMPARAR ---
        data[key] = await Promise.all(
          value.map(async (item: any) => {
            if (item && typeof item === "object") {
              const imgField = item.image ? "image" : item.url ? "url" : null;
              
              if (imgField && typeof item[imgField] === "string" && item[imgField].startsWith("data:image")) {
                console.log(`[Backend] Detectado Base64 en ${key}, subiendo a Cloudinary...`);
                
                // 1. Subes el Base64 a Cloudinary con tu helper existente
                const cloudinaryUrl = await uploadToCloudinary(item[imgField]); // O como se llame tu función de subida
                
                // 2. Reemplazas el Base64 por la URL segura que te devuelve Cloudinary
                item[imgField] = cloudinaryUrl
              }
            }
            return item;
          })
        );
        // --------------------------------------------------

        // Extraemos de dataValues de forma segura
        console.log(`Buscando la llave '${key}' en el objeto:`, generalSetting);

        let rawOldValue = generalSetting?.dataValues?.[key] ?? generalSetting?.[key];

        // Si viene como texto plano (string), lo parseamos a JSON de forma segura
        if (typeof rawOldValue === "string") {
          try {
            rawOldValue = JSON.parse(rawOldValue);
          } catch (e) {
            rawOldValue = [];
          }
        }

        const oldItems = Array.isArray(rawOldValue) ? rawOldValue : [];

        console.log(`VERIFICACIÓN ARREGLADA [${key}] -> Largo real:`, oldItems.length);
        console.log(`VERIFICACIÓN FINAL [${key}] -> ¿Es array?:`, Array.isArray(rawOldValue), "Largo:", oldItems.length);

        console.log(`--- PROCESANDO CAMPO: ${key} ---`);
        console.log("Items viejos encontrados:", oldItems);

        const oldImages = extractImageUrls(oldItems);
        const newImages = extractImageUrls(data[key]); // Usamos el valor ya procesado con URLs de Cloudinary

        console.log("oldImages procesadas:", oldImages);
        console.log("newImages procesadas:", newImages);

        const imagesToDelete = oldImages.filter(
          (img) => !newImages.includes(img),
        );

        console.log("Imágenes a eliminar:", imagesToDelete);

        if (imagesToDelete.length > 0) {
          console.log("¡Entrando al bucle de borrado!");
          for (const imageUrl of imagesToDelete) {
            const publicId = getPublicIdFromUrl(imageUrl);
            console.log("Public ID a borrar:", publicId);
            if (publicId) {
              await deleteFromCloudinary(publicId);
              console.log("¡Borrada de Cloudinary con éxito!");
            }
          }
        }
      }
    }

    // 3. Como 'data' ya tiene las URLs limpias, Sequelize guardará solo enlaces en vez de Base64
    await generalSetting.update(data);
    return "Los datos se actualizaron satisfactoriamente.";
  };

  // static update2 = async (
  //   id: GeneralSetting["id"],
  //   data: GeneralSettingUpdateBody,
  // ): Promise<string> => {
  //   // 1. Obtenemos el registro actual de la base de datos
  //   const generalSetting = await this.getById(id);

  //   // 2. Procesar Banners si vienen en el payload
  //   if (data.banners && Array.isArray(data.banners)) {
  //     const rawBanners = generalSetting.banners;
  //     const bannersArray = Array.isArray(rawBanners)
  //       ? rawBanners
  //       : typeof rawBanners === "string"
  //         ? JSON.parse(rawBanners)
  //         : [];

  //     const existingBannersMap = new Map(
  //       bannersArray.map((b: any) => [b.id, b.image]),
  //     );

  //     const processedBanners = await Promise.all(
  //       data.banners.map(async (bannerItem: any) => {
  //         if (bannerItem.image && bannerItem.image.startsWith("data:image")) {
  //           const oldImageUrl = existingBannersMap.get(bannerItem.id) as string;
  //           if (oldImageUrl) {
  //             const publicId = getPublicIdFromUrl(oldImageUrl);
  //             if (publicId) {
  //               await deleteFromCloudinary(publicId);
  //             }
  //           }
  //           const secureUrl = await uploadToCloudinary(
  //             bannerItem.image,
  //             "landing_banners",
  //           );
  //           return {
  //             ...bannerItem,
  //             image: secureUrl,
  //           };
  //         }
  //         return bannerItem;
  //       }),
  //     );
  //     data.banners = processedBanners;
  //   }

  //   // 3. Procesar GaleryImagesAron (Galería Ampliada de 6 Fijas)
  //   if (data.galeryImagesAron && Array.isArray(data.galeryImagesAron)) {
  //     const rawGalery = generalSetting.galeryImagesAron;
  //     const galeryArray = Array.isArray(rawGalery)
  //       ? rawGalery
  //       : typeof rawGalery === "string"
  //         ? JSON.parse(rawGalery)
  //         : [];

  //     const existingGaleryMap = new Map(
  //       galeryArray.map((g: any) => [g.id, g.url]),
  //     );

  //     const processedGalery = await Promise.all(
  //       data.galeryImagesAron.map(async (galeryItem: any) => {
  //         // Ojo: en la estructura de Aron el campo de la imagen se llama .url
  //         if (galeryItem.url && galeryItem.url.startsWith("data:image")) {
  //           const oldImageUrl = existingGaleryMap.get(galeryItem.id) as string;
  //           if (oldImageUrl) {
  //             const publicId = getPublicIdFromUrl(oldImageUrl);
  //             if (publicId) {
  //               await deleteFromCloudinary(publicId);
  //             }
  //           }
  //           const secureUrl = await uploadToCloudinary(
  //             galeryItem.url,
  //             "landing_gallery_aron", // Carpeta en Cloudinary para la galería de Aron
  //           );
  //           return {
  //             ...galeryItem,
  //             url: secureUrl, // Reemplazamos el Base64 en la propiedad url
  //           };
  //         }
  //         return galeryItem;
  //       }),
  //     );
  //     data.galeryImagesAron = processedGalery;
  //   }

  //   // 4. Procesar CatalogGalleryServices (Catálogo de Servicios)
  //   if (
  //     data.catalogGalleryServices &&
  //     Array.isArray(data.catalogGalleryServices)
  //   ) {
  //     const rawServices = generalSetting.catalogGalleryServices;
  //     const servicesArray = Array.isArray(rawServices)
  //       ? rawServices
  //       : typeof rawServices === "string"
  //         ? JSON.parse(rawServices)
  //         : [];

  //     const existingServicesMap = new Map(
  //       servicesArray.map((s: any) => [s.id, s.image]),
  //     );

  //     const processedServices = await Promise.all(
  //       data.catalogGalleryServices.map(async (serviceItem: any) => {
  //         if (serviceItem.image && serviceItem.image.startsWith("data:image")) {
  //           const oldImageUrl = existingServicesMap.get(
  //             serviceItem.id,
  //           ) as string;
  //           if (oldImageUrl) {
  //             const publicId = getPublicIdFromUrl(oldImageUrl);
  //             if (publicId) {
  //               await deleteFromCloudinary(publicId);
  //               console.log("catalogGalleryServices eliminado");
  //             }
  //           }
  //           const secureUrl = await uploadToCloudinary(
  //             serviceItem.image,
  //             "landing_services",
  //           );
  //           return {
  //             ...serviceItem,
  //             image: secureUrl,
  //           };
  //         }
  //         return serviceItem;
  //       }),
  //     );
  //     data.catalogGalleryServices = processedServices;
  //   }

  //   // 5. Procesar CatalogGalleryModels (Catálogo de Modelos)
  //   if (data.catalogGalleryModels && Array.isArray(data.catalogGalleryModels)) {
  //     const rawModels = generalSetting.catalogGalleryModels;
  //     const modelsArray = Array.isArray(rawModels)
  //       ? rawModels
  //       : typeof rawModels === "string"
  //         ? JSON.parse(rawModels)
  //         : [];

  //     const existingModelsMap = new Map(
  //       modelsArray.map((s: any) => [s.id, s.image]),
  //     );

  //     const processedModels = await Promise.all(
  //       data.catalogGalleryModels.map(async (modelItem: any) => {
  //         if (modelItem.image && modelItem.image.startsWith("data:image")) {
  //           const oldImageUrl = existingModelsMap.get(modelItem.id) as string;
  //           if (oldImageUrl) {
  //             const publicId = getPublicIdFromUrl(oldImageUrl);
  //             if (publicId) {
  //               await deleteFromCloudinary(publicId);
  //               console.log("catalogGalleryServices eliminado");
  //             }
  //           }
  //           const secureUrl = await uploadToCloudinary(
  //             modelItem.image,
  //             "landing_models",
  //           );
  //           return {
  //             ...modelItem,
  //             image: secureUrl,
  //           };
  //         }
  //         return modelItem;
  //       }),
  //     );
  //     data.catalogGalleryModels = processedModels;
  //   }

  //   // 6. Procesar CatalogGalleryEvents (Catálogo de Eventos)
  //   if (data.catalogGalleryEvents && Array.isArray(data.catalogGalleryEvents)) {
  //     const rawEvents = generalSetting.catalogGalleryEvents;
  //     const eventsArray = Array.isArray(rawEvents)
  //       ? rawEvents
  //       : typeof rawEvents === "string"
  //         ? JSON.parse(rawEvents)
  //         : [];

  //     const existingEventsMap = new Map(
  //       eventsArray.map((s: any) => [s.id, s.image]),
  //     );

  //     const processedEvents = await Promise.all(
  //       data.catalogGalleryEvents.map(async (eventItem: any) => {
  //         if (eventItem.image && eventItem.image.startsWith("data:image")) {
  //           const oldImageUrl = existingEventsMap.get(eventItem.id) as string;
  //           if (oldImageUrl) {
  //             const publicId = getPublicIdFromUrl(oldImageUrl);
  //             if (publicId) {
  //               await deleteFromCloudinary(publicId);
  //               console.log("catalogGalleryEvents eliminado");
  //             }
  //           }
  //           const secureUrl = await uploadToCloudinary(
  //             eventItem.image,
  //             "landing_events",
  //           );
  //           return {
  //             ...eventItem,
  //             image: secureUrl,
  //           };
  //         }
  //         return eventItem;
  //       }),
  //     );
  //     data.catalogGalleryEvents = processedEvents;
  //   }

  //   // 7. Procesar CatalogGalleryVideos (Catálogo de Videos)
  //   if (data.catalogGalleryVideos && Array.isArray(data.catalogGalleryVideos)) {
  //     const rawVideos = generalSetting.catalogGalleryVideos;
  //     const videosArray = Array.isArray(rawVideos)
  //       ? rawVideos
  //       : typeof rawVideos === "string"
  //         ? JSON.parse(rawVideos)
  //         : [];

  //     const existingVideosMap = new Map(
  //       videosArray.map((s: any) => [s.id, s.videoUrl]), // Mapeamos por ID y URL de video
  //     );

  //     const processedVideos = await Promise.all(
  //       data.catalogGalleryVideos.map(async (videoItem: any) => {
  //         // CORREGIDO: Evaluamos videoItem.videoUrl en lugar de .image
  //         if (
  //           videoItem.videoUrl &&
  //           videoItem.videoUrl.startsWith("data:video")
  //         ) {
  //           // Nota: Si tus videos vienen como archivos locales en base64 para subirlos a la nube:
  //           const oldVideoUrl = existingVideosMap.get(videoItem.id) as string;
  //           if (oldVideoUrl) {
  //             const publicId = getPublicIdFromUrl(oldVideoUrl);
  //             if (publicId) {
  //               await deleteFromCloudinary(publicId);
  //               console.log("Video anterior eliminado de Cloudinary");
  //             }
  //           }
  //           const secureUrl = await uploadToCloudinary(
  //             videoItem.videoUrl,
  //             "landing_videos",
  //           );
  //           return {
  //             ...videoItem,
  //             videoUrl: secureUrl,
  //           };
  //         }
  //         return videoItem;
  //       }),
  //     );
  //     // Asignamos el array limpio y plano (nunca con JSON.stringify)
  //     data.catalogGalleryVideos = processedVideos;
  //   }

  //   // 8. Procesar CatalogGalleryPackages (Catálogo de Paquetes / Servicios)
  //   if (
  //     data.catalogGalleryPackages &&
  //     Array.isArray(data.catalogGalleryPackages)
  //   ) {
  //     const rawPackages = generalSetting.catalogGalleryPackages;
  //     const packagesArray = Array.isArray(rawPackages)
  //       ? rawPackages
  //       : typeof rawPackages === "string"
  //         ? JSON.parse(rawPackages)
  //         : [];

  //     // No requiere subida a la nube de imágenes/videos por cada item porque maneja iconos (strings),
  //     // pero mantenemos la estructura por si actualizas o mapeas los IDs correctamente.
  //     const existingPackagesMap = new Map(
  //       packagesArray.map((s: any) => [s.id, s]),
  //     );

  //     const processedPackages = await Promise.all(
  //       data.catalogGalleryPackages.map(async (packageItem: any) => {
  //         // Si el paquete viene con algún archivo multimedia o necesita validación extra,
  //         // puedes evaluarlo aquí. Como maneja icon, title, description, features y active,
  //         // simplemente retornamos el objeto conservando su estructura intacta y validada.

  //         return {
  //           id: packageItem.id || Date.now(),
  //           icon: packageItem.icon,
  //           title: packageItem.title,
  //           description: packageItem.description,
  //           features: packageItem.features,
  //           active: packageItem.active ?? true,
  //         };
  //       }),
  //     );

  //     // Asignamos el array procesado listo para guardarse
  //     data.catalogGalleryPackages = processedPackages;
  //   }

  //   // 8. Procesar information_contact  (Informacion / Contacto)
  //   if (data.informationContact) {
  //     // Obtenemos el valor actual que está en la base de datos (por si viene como string JSON o ya como objeto)
  //     const rawInfo = generalSetting.informationContact;
  //     const currentInfo =
  //       typeof rawInfo === "string" ? JSON.parse(rawInfo) : rawInfo || {};

  //     // Extraemos la información que viene del cliente (data.information_contact)
  //     const incomingInfo = data.informationContact;

  //     // Construimos o fusionamos el objeto procesado manteniendo la estructura limpia
  //     const processedInfo = {
  //       address:
  //         incomingInfo.address !== undefined
  //           ? incomingInfo.address
  //           : currentInfo.address,
  //       phone:
  //         incomingInfo.phone !== undefined
  //           ? incomingInfo.phone
  //           : currentInfo.phone,
  //       email:
  //         incomingInfo.email !== undefined
  //           ? incomingInfo.email
  //           : currentInfo.email,
  //       businessHours:
  //         incomingInfo.businessHours !== undefined
  //           ? incomingInfo.businessHours
  //           : currentInfo.businessHours || "",
  //     };

  //     // Asignamos el objeto listo (si tu backend espera stringify o el objeto directo según tu tipo de Sequelize,
  //     // por lo general si es tipo JSON en Sequelize puedes pasar el objeto directo o un string parseado)
  //     data.informationContact = processedInfo;
  //   }

  //   await generalSetting.update(data);

  //   return "Los datos se actualizaron satisfactoriamente.";
  // };

  // static dataFormatJSON = async (
  //   result: GeneralSetting,
  // ): Promise<GeneralSettingResponse> => {
  //   if (!result) {
  //     throw new Error("Configuración no encontrada");
  //   }
  //   const data = result.get({ plain: true }) as GeneralSettingResponse;
  //   // Si socialLinks llega como string (por cómo se guardó en MySQL), lo parseamos a JSON real
  //   if (data.socialLinks && typeof data.socialLinks === "string") {
  //     try {
  //       data.socialLinks = JSON.parse(data.socialLinks);
  //     } catch (error) {
  //       console.error("Error parseando socialLinks:", error);
  //     }
  //   }
  //   if (data.banners && typeof data.banners === "string") {
  //     try {
  //       data.banners = JSON.parse(data.banners);
  //     } catch (error) {
  //       console.error("Error parseando banners:", error);
  //     }
  //   }
  //   if (
  //     data.listLabelsEditorAron &&
  //     typeof data.listLabelsEditorAron === "string"
  //   ) {
  //     try {
  //       data.listLabelsEditorAron = JSON.parse(data.listLabelsEditorAron);
  //     } catch (error) {
  //       console.error("Error parseando list_labels_editor_aron:", error);
  //     }
  //   }
  //   if (data.galeryImagesAron && typeof data.galeryImagesAron === "string") {
  //     try {
  //       data.galeryImagesAron = JSON.parse(data.galeryImagesAron);
  //     } catch (error) {
  //       console.error("Error parseando galery_images_aron:", error);
  //     }
  //   }
  //   if (
  //     data.catalogGalleryServices &&
  //     typeof data.catalogGalleryServices === "string"
  //   ) {
  //     try {
  //       data.catalogGalleryServices = JSON.parse(data.catalogGalleryServices);
  //     } catch (error) {
  //       console.error("Error parseando galery_images_aron:", error);
  //     }
  //   }
  //   if (
  //     data.catalogGalleryModels &&
  //     typeof data.catalogGalleryModels === "string"
  //   ) {
  //     try {
  //       data.catalogGalleryModels = JSON.parse(data.catalogGalleryModels);
  //     } catch (error) {
  //       console.error("Error parseando catalogGalleryModels:", error);
  //     }
  //   }
  //   if (
  //     data.catalogGalleryEvents &&
  //     typeof data.catalogGalleryEvents === "string"
  //   ) {
  //     try {
  //       data.catalogGalleryEvents = JSON.parse(data.catalogGalleryEvents);
  //     } catch (error) {
  //       console.error("Error parseando catalogGalleryEvents:", error);
  //     }
  //   }

  //   if (
  //     data.catalogGalleryVideos &&
  //     typeof data.catalogGalleryVideos === "string"
  //   ) {
  //     try {
  //       data.catalogGalleryVideos = JSON.parse(data.catalogGalleryVideos);
  //     } catch (error) {
  //       console.error("Error parseando catalogGalleryVideos:", error);
  //     }
  //   }

  //   if (
  //     data.catalogGalleryPackages &&
  //     typeof data.catalogGalleryPackages === "string"
  //   ) {
  //     try {
  //       data.catalogGalleryPackages = JSON.parse(data.catalogGalleryPackages);
  //     } catch (error) {
  //       console.error("Error parseando catalogGalleryPackages:", error);
  //     }
  //   }

  //   if (
  //     data.informationContact &&
  //     typeof data.informationContact === "string"
  //   ) {
  //     try {
  //       data.informationContact = JSON.parse(data.informationContact);
  //     } catch (error) {
  //       console.error("Error parseando informationContact:", error);
  //     }
  //   }

  //   return data;
  // };
}
