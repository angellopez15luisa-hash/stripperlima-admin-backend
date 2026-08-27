import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { DBModels } from "../config";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare public id: CreationOptional<number>;
  declare public name: string;
  declare public email: string;
  declare public password: string;
  declare public role: CreationOptional<"super-admin" | "admin" | "editor">;
  declare public resetPasswordToken: string | null;
  declare public resetPasswordExpires: Date | null;

  public static associate(models: DBModels) {}
}

export const initUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("super-admin", "admin", "editor"),
        allowNull: false,
        defaultValue: "admin",
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: true,
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    },
  );
};
