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
