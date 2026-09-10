import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { DBModels } from "../config";

export class GeneralSetting extends Model<
  InferAttributes<GeneralSetting>,
  InferCreationAttributes<GeneralSetting>
> {
  declare public id: CreationOptional<number>;
  declare public titleStart: string;
  declare public descriptionStart: string;
  declare public socialLinks: object | null;
  declare public banners: object | null;

  // Campos de la sección Aron
  declare public titleAron: string;
  declare public subtitleAron: string;
  declare public titleEditorAron: string;
  declare public descriptionEditorAron: string;
  declare public listLabelsEditorAron: object | null;
  declare public textHtmlEditorAron: string;
  declare public galeryImagesAron: object | null;

  // Campos de la seccion Servicios
  declare public titleHeaderServices: string;
  declare public descriptionHeaderServices: string;
  declare public catalogGalleryServices: object | null;

  // Campos de la seccion Modelos
  declare public titleHeaderModels: string;
  declare public descriptionHeaderModels: string;
  declare public catalogGalleryModels: object | null;

  //Campos de la seccion Galeria Eventos
  declare public titleHeaderGalleryEvents: string;
  declare public descriptionHeaderGalleryEvents: string;
  declare public catalogGalleryEvents: object | null;

  //Campos de la seccion Galeria Videos
  declare public titleHeaderGalleryVideos: string;
  declare public descriptionHeaderGalleryVideos: string;
  declare public catalogGalleryVideos: object | null;

  //Campos de la seccion Galeria de Paquetes
  declare public titleHeaderPackages: string;
  declare public descriptionHeaderPackages: string;
  declare public catalogGalleryPackages: object | null;

  declare public titleHeaderContact: string;
  declare public descriptionHeaderContact: string;
  declare public informationContact: object | null;

  public static associate(models: DBModels) {}
}

export const initGeneralSettingModel = (sequelize: Sequelize) => {
  GeneralSetting.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      titleStart: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descriptionStart: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      socialLinks: {
        type: DataTypes.JSON,
        allowNull: false,
          get() {
          const rawValue = this.getDataValue("socialLinks");
          // Si viene como string por capricho de la BD, lo parseamos a fuerzas; si ya es objeto, lo retorna tal cual
          if (typeof rawValue === "string") {
            try {
              return JSON.parse(rawValue);
            } catch (e) {
              return rawValue;
            }
          }
          return rawValue;
        },
      },
      banners: {
        type: DataTypes.JSON,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("banners");
          // Si viene como string por capricho de la BD, lo parseamos a fuerzas; si ya es objeto, lo retorna tal cual
          if (typeof rawValue === "string") {
            try {
              return JSON.parse(rawValue);
            } catch (e) {
              return rawValue;
            }
          }
          return rawValue;
        },
      },
      titleAron: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subtitleAron: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      titleEditorAron: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descriptionEditorAron: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      listLabelsEditorAron: {
        type: DataTypes.JSON,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("listLabelsEditorAron");
          // Si viene como string por capricho de la BD, lo parseamos a fuerzas; si ya es objeto, lo retorna tal cual
          if (typeof rawValue === "string") {
            try {
              return JSON.parse(rawValue);
            } catch (e) {
              return rawValue;
            }
          }
          return rawValue;
        },
      },
      textHtmlEditorAron: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      galeryImagesAron: {
        type: DataTypes.JSON,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("galeryImagesAron");
          // Si viene como string por capricho de la BD, lo parseamos a fuerzas; si ya es objeto, lo retorna tal cual
          if (typeof rawValue === "string") {
            try {
              return JSON.parse(rawValue);
            } catch (e) {
              return rawValue;
            }
          }
          return rawValue;
        },
      },
      titleHeaderServices: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descriptionHeaderServices: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      catalogGalleryServices: {
        type: DataTypes.JSON,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("catalogGalleryServices");
          // Si viene como string por capricho de la BD, lo parseamos a fuerzas; si ya es objeto, lo retorna tal cual
          if (typeof rawValue === "string") {
            try {
              return JSON.parse(rawValue);
            } catch (e) {
              return rawValue;
            }
          }
          return rawValue;
        },
      },
      titleHeaderModels: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descriptionHeaderModels: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      catalogGalleryModels: {
        type: DataTypes.JSON,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("catalogGalleryModels");
          // Si viene como string por capricho de la BD, lo parseamos a fuerzas; si ya es objeto, lo retorna tal cual
          if (typeof rawValue === "string") {
            try {
              return JSON.parse(rawValue);
            } catch (e) {
              return rawValue;
            }
          }
          return rawValue;
        },
      },
      titleHeaderGalleryEvents: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descriptionHeaderGalleryEvents: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      catalogGalleryEvents: {
        type: DataTypes.JSON,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("catalogGalleryEvents");
          // Si viene como string por capricho de la BD, lo parseamos a fuerzas; si ya es objeto, lo retorna tal cual
          if (typeof rawValue === "string") {
            try {
              return JSON.parse(rawValue);
            } catch (e) {
              return rawValue;
            }
          }
          return rawValue;
        },
      },
      titleHeaderGalleryVideos: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descriptionHeaderGalleryVideos: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      catalogGalleryVideos: {
        type: DataTypes.JSON,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("catalogGalleryVideos");
          // Si viene como string por capricho de la BD, lo parseamos a fuerzas; si ya es objeto, lo retorna tal cual
          if (typeof rawValue === "string") {
            try {
              return JSON.parse(rawValue);
            } catch (e) {
              return rawValue;
            }
          }
          return rawValue;
        },
      },
      titleHeaderPackages: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descriptionHeaderPackages: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      catalogGalleryPackages: {
        type: DataTypes.JSON,
        allowNull: false,
          get() {
          const rawValue = this.getDataValue("catalogGalleryPackages");
          // Si viene como string por capricho de la BD, lo parseamos a fuerzas; si ya es objeto, lo retorna tal cual
          if (typeof rawValue === "string") {
            try {
              return JSON.parse(rawValue);
            } catch (e) {
              return rawValue;
            }
          }
          return rawValue;
        },
      },
      titleHeaderContact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descriptionHeaderContact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      informationContact: {
        type: DataTypes.JSON,
        allowNull: false,
         get() {
          const rawValue = this.getDataValue("informationContact");
          // Si viene como string por capricho de la BD, lo parseamos a fuerzas; si ya es objeto, lo retorna tal cual
          if (typeof rawValue === "string") {
            try {
              return JSON.parse(rawValue);
            } catch (e) {
              return rawValue;
            }
          }
          return rawValue;
        },
      },
    },
    {
      sequelize,
      tableName: "general_settings",
      timestamps: true,
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    },
  );
};
