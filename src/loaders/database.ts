import { Sequelize } from "sequelize";
import config from "../config/config";

export class DBInstance {
  private static instance: DBInstance;
  private DB_DATABASE = config.DB_DATABASE;
  private DB_USER = config.DB_USER;
  private DB_PASSWORD = config.DB_PASSWORD;
  private DB_HOST = config.DB_HOST;
  private DB_PORT = config.DB_PORT;

  private constructor() {
    console.log("🔶 New Connection to postgres sql was initialized ");
  }

  private dbClient = new Sequelize(
    this.DB_DATABASE,
    this.DB_USER,
    this.DB_PASSWORD,
    {
      host: this.DB_HOST,
      dialect: "postgres",
      port: this.DB_PORT,
    }
  );

  private async initialize() {
    try {
      await this.dbClient.authenticate();
      console.log(`✅ Connection to PostgresSQL successful`);
    } catch (err) {
      console.error(err);
    }
  }

  public static getInstance = async (): Promise<DBInstance> => {
    if (!DBInstance.instance) {
      DBInstance.instance = new DBInstance();
      await DBInstance.instance.initialize();
    }
    console.log(`🔄 Old instance Called again :)`);
    return DBInstance.instance;
  };
}
