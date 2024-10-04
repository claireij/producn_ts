import { DataTypes } from "sequelize"
import { sequelize } from "../../pages/api/sequelize"

export const Subscription = sequelize.define(
  "Subscription",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    tableName: "subscriptions",
    timestamps: true,
  },
)
;(async () => {
  await Subscription.sync({ force: false })
})()
