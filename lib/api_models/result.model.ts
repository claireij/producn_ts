import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../../pages/api/sequelize"

export interface ResultAttributes {
  id: number;
  text: string;
  number: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ResultCreationAttributes extends Optional<ResultAttributes, 'id'> {}

interface ResultInstance
  extends Model<ResultAttributes, ResultCreationAttributes>,
    ResultAttributes {}

export const Result = sequelize.define<ResultInstance>(
  "Result",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "0",
    },
  },
  {
    tableName: "questiontree_result",
    timestamps: true,
  },
)
;(async () => {
  await Result.sync({ force: false })
})()
