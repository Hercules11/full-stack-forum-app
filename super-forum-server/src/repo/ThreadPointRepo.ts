import { getManager } from "typeorm";
import { ThreadItem } from "./ThreadItem";
import { ThreadItemPoint } from "./ThreadItemPoint";
import { User } from "./User";

export const updateThreadPoint = async (
	userId: string,
	threadItemId: string,
	increment: boolean
): Promise<string> => {
	if (!userId || userId === "0") {
		return "User is not authenticated";
	}

	let message = "Failed to increment thread item point";
	const threadItem = (await ThreadItem.findOne({
		where: { id: threadItemId },
		relations: ["user"],
	})) as ThreadItem; ;
	console.log(
		"threadItemId, userId, threadItem!.user!.id",
		threadItemId,
		userId,
		threadItem!.user!.id
    );
    // ！ 非空断言操作符，即使编译器认为可能为null or undefined
	if (threadItem!.user!.id === userId) {
		message = "Error: users cannot increment their own thread item";
		console.log("incThreadItemPoints", message);
		return message;
	}
	const user = await User.findOne({ where: { id: userId } }) as User;

	const existingPoint = await ThreadItemPoint.findOne({
		where: {
			threadItem: { id: threadItemId },
			user: { id: userId },
		},
		// Indicates what relations of entity should be loaded (simplified left join form).
		relations: ["threadItem"],
	});

    // Wraps given function execution (and all operations made there) in a transaction. All database operations must be executed using provided entity manager.
	await getManager().transaction(async (transactionEntityManager) => {
		if (existingPoint) {
			console.log("existingPoint");
			if (increment) {
				console.log("increment");
				if (existingPoint.isDecrement) {
					console.log("remove dec");
					await ThreadItemPoint.remove(existingPoint);
					threadItem!.points = Number(threadItem!.points) + 1;
					threadItem!.lastModifiedOn = new Date();
					await threadItem!.save();
				}
			} else {
				if (!existingPoint.isDecrement) {
					console.log("remove inc");
					await ThreadItemPoint.remove(existingPoint);
					threadItem!.points = Number(threadItem!.points) - 1;
					threadItem!.lastModifiedOn = new Date();

					// 对查找出来的数据，进行操作后，save 一下就完成数据的保存了, 太方便了
					await threadItem!.save();
				}
			}
		} else {
			console.log("new threadItem point");
			await ThreadItemPoint.create({
				threadItem,
				isDecrement: !increment,
				user,
			}).save();
			if (increment) {
				threadItem!.points = Number(threadItem!.points) + 1;
			} else {
				threadItem!.points = Number(threadItem!.points) - 1;
			}
			threadItem!.lastModifiedOn = new Date();
			await threadItem!.save();
		}

		message = `Successfully ${
			increment ? "incremented" : "decremented"
		} point.`;
	});

	return message;
};
