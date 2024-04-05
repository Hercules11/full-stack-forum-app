import { isThreadBodyValid } from "../common/validators/ThreadValidators";
import { QueryArrayResult } from "./QueryArrayResult";
import { ThreadItem } from "./ThreadItem";
import { User } from "./User";
import { Thread } from "./Thread";

export const createThreadItem = async (
	userId: string | undefined | null,
	threadId: string,
	body: string
): Promise<QueryArrayResult<ThreadItem>> => {
	const bodyMsg = isThreadBodyValid(body);
	if (bodyMsg) {
		return {
			messages: [bodyMsg],
		};
	}

	// users must be logged in to post
	if (!userId) {
		return {
			messages: ["User not logged in."],
		};
	}
	const user = await User.findOneBy({
		id: userId,
	}) as User;
	console.log(user);

	const thread = await Thread.findOneBy({
		id: threadId,
	});
	if (!thread) {
		return {
			messages: ["Thread not found."],
		};
	}

	// 弄清楚要解决的问题，涉及的要素，利用工具提供的 api 进行编排
	const threadItem = await ThreadItem.create({
		body,
		user,
		thread,
	}).save();
	if (!threadItem) {
		return {
			messages: ["Failed to create ThreadItem."],
		};
	}

	return {
		messages: ["ThreadItem created successfully."],
	};
};

export const getThreadItemsByThreadId = async (
	threadId: string
): Promise<QueryArrayResult<ThreadItem>> => {
	const threadItems = await ThreadItem.createQueryBuilder("ti")
		.where(`ti."threadId" = :threadId`, { threadId })
		.leftJoinAndSelect("ti.thread", "thread")
		.orderBy("ti.createdOn", "DESC")
		.getMany();

	if (!threadItems) {
		return {
			messages: ["ThreadItems of thread not found."],
		};
	}
	console.log(threadItems);
	return {
		entities: threadItems,
	};
};
