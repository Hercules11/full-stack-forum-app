import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "./User";
import { ThreadItem } from "./ThreadItem";
import { Auditable } from "./Auditable";

@Entity({ name: "ThreadItemPoints" })
export class ThreadItemPoint extends Auditable {
	@PrimaryGeneratedColumn({ name: "Id", type: "bigint" }) // for typeorm
    id!: string;

	@Column("boolean", { name: "IsDecrement", default: false, nullable: false })
    isDecrement!: boolean;

    // 简单的多对一、一对多的判别方法，确定用户实例 id 后，能不能从表里面查出多条记录
	@ManyToOne(() => User, (user) => user.threadPoints)
    user!: User;

	@ManyToOne(() => ThreadItem, (threadItem) => threadItem.threadItemPoints)
    threadItem!: ThreadItem;
}
