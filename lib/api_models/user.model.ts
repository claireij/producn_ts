import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../pages/api/sequelize"

interface UserAttributes {
  id?: number
  firstname: string
  lastname: string
  email: string
  password: string
  gender?: string | null
  retargeting?: boolean
  newsletter?: boolean
  email_confirmation_string?: string | null
  email_confirmed?: boolean
  current_profil_picture?: string | null
  deleted?: boolean
  problems_solved?: number
  articles_read?: number
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number
  public firstname!: string
  public lastname!: string
  public email!: string
  public password!: string
  public gender!: string | null
  public retargeting!: boolean
  public newsletter!: boolean
  public email_confirmation_string!: string | null
  public email_confirmed!: boolean
  public current_profil_picture!: string | null
  public deleted!: boolean
  public problems_solved!: number
  public articles_read!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
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
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    retargeting: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    newsletter: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    email_confirmation_string: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    email_confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    current_profil_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    problems_solved: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    articles_read: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "sequelize_users",
    timestamps: true,
  },
)
;(async () => {
  await User.sync({ force: false })
})()
