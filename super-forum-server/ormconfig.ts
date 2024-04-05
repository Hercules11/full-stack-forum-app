import { DataSource } from "typeorm";

const source = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	database: "SuperForum",
	entities: ["src/repo/**/*.*"],
	migrationsTableName: "custom_migration_table", // 迁移记录所存储的表，不是要迁移的表
	migrations: ["src/migrations/*.ts"],
	username: "superforumsvc",
	password: "123456",
});

export default source;
