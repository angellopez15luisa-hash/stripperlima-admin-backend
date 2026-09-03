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
      },
      banners: {
        type: DataTypes.JSON,
        allowNull: false,
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
      },
      textHtmlEditorAron: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      galeryImagesAron: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      titleHeaderServices: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descriptionHeaderServices: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      catalogGalleryServices: {
        type: DataTypes.JSON,
        allowNull: false,
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
