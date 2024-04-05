import express from "express";
import session from "express-session";
import RedisStore from "connect-redis";
import Redis from "ioredis";
import { createConnection } from "typeorm";
// import { register, login, logout, me } from './repo/UserRepo';
import bodyParser from "body-parser";
import typeDefs from "./gql/typeDefs";
import resolvers from "./gql/resolvers";
import cors from "cors";

// import {
// 	createThread,
// 	getThreadById,
// 	getThreadsByCategoryId,
// } from "./repo/ThreadRepo";
// import {
// 	createThreadItem,
// 	getThreadItemsByThreadId,
// } from "./repo/ThreadItemRepo";
// import { createServer } from "http"
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";

dotenv.config();
console.log(process.env.NODE_ENV);

// console.log(process.env.NODE_DEV);

const main = async () => {
	const app = express();
	console.log("client url", process.env.CLIENT_URL);
	app.use(
		cors({
			credentials: true,
			origin: process.env.CLIENT_URL,
		})
	);


	// app.use(function (req, res, next) {
	// 中间件忘记注释了，卡了好一会儿，真服了我自己
	// 中间件函数不调用 next:
	// 1. 请求未完成
	// 2. 后续中间件未执行
	// 3. 响应未发送
		// res.setHeader("Access-Control-Allow-Credentials", "true");
		// res.setHeader(
		// 	"Access-Control-Allow-Origin",
		// 	"https://studio.apollographql.com"
		// );
		// res.setHeader("Content-Length", "0");
		// res.setHeader(
		// 	"Access-Control-Allow-Methods",
		// 	"GET,HEAD,PUT,PATCH,POST,DELETE"
		// );
		// res.setHeader("Access-Control-Allow-Headers", "content-type");
		// res.header(
		// 	"Access-Control-Allow-Headers",
		// 	"X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, Authorization, X-HTTP-Method-Override, Set-Cookie, Cookie"
		// );
		// res.header(
		// 	"Access-Control-Allow-Methods",
		// 	"GET, POST, PUT, DELETE, OPTIONS"
		// );
		// if (req.method === "OPTIONS") {
		// 	res.send();
		// } else {
		// 	next();
		// }
		// next();
	// });

	const router = express.Router();

	await createConnection();

	const redis = new Redis({
		port: Number(process.env.REDIS_PORT),
		host: process.env.REDIS_HOST,
		password: process.env.REDIS_PASSWORD,
	});
	// const RedisStore = connectRedis(session)
	const redisStore = new RedisStore({
		client: redis,
	});

	app.use(bodyParser.json());
	app.use(
		session({
			store: redisStore,
			name: process.env.COOKIE_NAME,
			sameSite: "Strict", // 设置Cookie的SameSite属性，以防止跨站请求伪造（CSRF）
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
			cookie: {
				path: "/",
				httpOnly: true, // This makes the cookie much more secure and can prevent XSS attacks
				secure: false,
				maxAge: 1000 * 60 * 60 * 24,
			},
		} as any)
	);

	app.use(router);

	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({ req, res }) => ({ req, res }),
	});
	apolloServer.start().then(() => {
		apolloServer.applyMiddleware({ app, cors: false });
	});

	// Type '((name: string) => any) & IRouterMatcher<Express, any>' is not assignable to type '((name: string) => any) & IRouterMatcher<Application<Record<string, any>>, any>'.
	//

	app.listen({ port: process.env.SERVER_PORT }, () => {
		console.log(`Server ready on port ${process.env.SERVER_PORT}`);
	});

	// router.get("/", (req, res, next) => {
	// 	req.session.test = "hello";
	// 	res.send("hello");
	// });

	// router.post("/register", async (req, res, next) => {
	// 	try {
	// 		console.log("params", req.body);
	// 		const userResult = await register(
	// 			req.body.email,
	// 			req.body.userName,
	// 			req.body.password
	// 		);
	// 		if (userResult && userResult.user) {
	// 			res.send(`new user created, userId: ${userResult.user.id}`);
	// 		} else if (userResult && userResult.messages) {
	// 			res.send(userResult.messages[0]);
	// 		} else {
	// 			next();
	// 		}

	// 		// as 在 ts 类型系统中的作用，用于类型断言，告诉编译器，开发者已经确定变量的类型，可以用于手动指定类型；联合类型中确定类型；绕过编译器的检查；
	// 	} catch (ex: any) {
	// 		res.send(ex.message);
	// 	}
	// });
	// router.post("/login", async (req, res, next) => {
	// 	try {
	// 		console.log("params", req.body);
	// 		const userResult = await login(req.body.userName, req.body.password);
	// 		if (userResult && userResult.user) {
	// 			req.session.userId = userResult.user?.id;
	// 			res.send(`user logged in, userId: ${req.session.userId}`);
	// 		} else if (userResult && userResult.messages) {
	// 			res.send(userResult.messages[0]);
	// 		} else {
	// 			next();
	// 		}
	// 	} catch (ex: any) {
	// 		res.send(ex.message);
	// 	}
	// });
	// router.post("/logout", async (req, res, next) => {
	// 	try {
	// 		console.log("params", req.body);
	// 		const msg = await logout(req.body.userName);
	// 		if (msg) {
	// 			req.session.userId = null;
	// 			res.send(msg);
	// 		} else {
	// 			next();
	// 		}
	// 	} catch (ex: any) {
	// 		console.log(ex);
	// 		res.send(ex.message);
	// 	}
	// });

	// router.post("/createthread", async (req, res, next) => {
	// 	try {
	// 		console.log("userId", req.session);
	// 		console.log("body", req.body);
	// 		const msg = await createThread(
	// 			req.session.userId, // notice this is from session!
	// 			req.body.categoryId,
	// 			req.body.title,
	// 			req.body.body
	// 		);

	// 		res.send(msg);
	// 	} catch (ex: any) {
	// 		console.log(ex);
	// 		res.send(ex.message);
	// 	}
	// });
	// router.post("/thread", async (req, res, next) => {
	// 	try {
	// 		const threadResult = await getThreadById(req.body.id);

	// 		if (threadResult && threadResult.entity) {
	// 			res.send(threadResult.entity.title);
	// 		} else if (threadResult && threadResult.messages) {
	// 			res.send(threadResult.messages[0]);
	// 		}
	// 	} catch (ex: any) {
	// 		console.log(ex);
	// 		res.send(ex.message);
	// 	}
	// });
	// router.post("/threadsbycategory", async (req, res, next) => {
	// 	try {
	// 		const threadResult = await getThreadsByCategoryId(req.body.categoryId);

	// 		if (threadResult && threadResult.entities) {
	// 			let items = "";
	// 			threadResult.entities.forEach((th) => {
	// 				items += th.title + ", ";
	// 			});
	// 			res.send(items);
	// 		} else if (threadResult && threadResult.messages) {
	// 			res.send(threadResult.messages[0]);
	// 		}
	// 	} catch (ex: any) {
	// 		console.log(ex);
	// 		res.send(ex.message);
	// 	}
	// });

	// router.post("/createthreaditem", async (req, res, next) => {
	// 	try {
	// 		const msg = await createThreadItem(
	// 			req.session.userId, // notice this is from session!
	// 			req.body.threadId,
	// 			req.body.body
	// 		);

	// 		res.send(msg);
	// 	} catch (ex: any) {
	// 		console.log(ex);
	// 		res.send(ex.message);
	// 	}
	// });
	// router.post("/threadsitemsbythread", async (req, res, next) => {
	// 	try {
	// 		const threadItemResult = await getThreadItemsByThreadId(
	// 			req.body.threadId
	// 		);

	// 		if (threadItemResult && threadItemResult.entities) {
	// 			let items = "";
	// 			threadItemResult.entities.forEach((ti) => {
	// 				items += ti.body + ", ";
	// 			});
	// 			res.send(items);
	// 		} else if (threadItemResult && threadItemResult.messages) {
	// 			res.send(threadItemResult.messages[0]);
	// 		}
	// 	} catch (ex: any) {
	// 		console.log(ex);
	// 		res.send(ex.message);
	// 	}
	// });
};

main();
