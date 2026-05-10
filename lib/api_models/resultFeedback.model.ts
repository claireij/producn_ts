import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../../pages/api/sequelize"

export interface ResultFeedbackAttributes {
  id: number;
  result_id: string;
  user_id: string;
  explanation: string;
  rating: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ResultFeedbackCreationAttributes extends Optional<ResultFeedbackAttributes, 'id'> {}

interface ResultFeedbackInstance
  extends Model<ResultFeedbackAttributes, ResultFeedbackCreationAttributes>,
    ResultFeedbackAttributes {}

export const ResultFeedback = sequelize.define<ResultFeedbackInstance>(
  "ResultFeedback",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    result_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: "0",
    },
    explanation: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "0",
    },
  },
  {
    tableName: "feedback",
    timestamps: true,
  },
)
;(async () => {
  await ResultFeedback.sync({ force: false })
})()
