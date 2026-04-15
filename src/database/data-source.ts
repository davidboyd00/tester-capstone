import { DataSource } from "typeorm"
import { config } from "dotenv"

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.host,
    port: parseInt(process.env.port),
    username: process.env.database_user,
    password: process.env.database_password,
    database: process.env.database_name,
    migrations: ['database' + '/migrations/**/*{.js,.ts}']
}) 

try {
    AppDataSource.initialize()
    console.log("Data Source has been initialized!")
} catch (error) {
    console.error("Error during Data Source initialization", error)
}

export default AppDataSource