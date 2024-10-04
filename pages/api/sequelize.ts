import { Sequelize } from "sequelize"

export const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE!,
  process.env.MYSQL_USER!,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    dialect: "mysql",
    logging: console.log, // Disable logging or set to true for debugging
  },
)
;(async () => {
  try {
    await sequelize.authenticate()
    console.log(
      "Sequelize: Connection to the database has been established successfully.",
    )
  } catch (error) {
    console.error("Sequelize: Unable to connect to the database:", error)
  }
})()
