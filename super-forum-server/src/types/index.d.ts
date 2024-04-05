import { Session } from "express-session";

declare module "express-session" {
	interface Session {
		userId: string | undefined | null;
		loadedCount: number;
		test: string;
	}
}
