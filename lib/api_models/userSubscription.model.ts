import { DataTypes, Model } from "sequelize"
import { sequelize } from "../../pages/api/sequelize"

interface UserSubscriptionAttributes {
  id?: number
  user_id: string
  paypal_subscription_id: string
  active: boolean
  subscription_id: string
}

export class UserSubscription
  extends Model<UserSubscriptionAttributes>
  implements UserSubscriptionAttributes
{
  public id!: number
  public user_id!: string
  public paypal_subscription_id!: string
  public active!: boolean
  public subscription_id!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

UserSubscription.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paypal_subscription_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    subscription_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "user_subscriptions",
    timestamps: true,
  },
)
;(async () => {
  await UserSubscription.sync({ force: false })
})()
