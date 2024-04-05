import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Length } from "class-validator";
import { Thread } from "./Thread";
import { ThreadPoint } from "./ThreadPoint";
import { ThreadItemPoint } from "./ThreadItemPoint";
import { Auditable } from "./Auditable";
import { ThreadItem } from "./ThreadItem";

@Entity({ name: "Users" })
export class User extends Auditable {
	@PrimaryGeneratedColumn({ name: "Id", type: "bigint" })
	id!: string;
	// There is a property called id with a type of string | undefined. It starts with a value of undefined. But every time I get or set that property, I want to treat it as type string."
	// https://stackoverflow.com/questions/67351411/what-s-the-difference-between-definite-assignment-assertion-and-ambient-declarat

	@Column("varchar", {
		name: "Email",
		length: 120,
		unique: true,
		nullable: false,
	})
	email!: string;

	@Column("varchar", {
		name: "UserName",
		length: 60,
		unique: true,
		nullable: false,
	})
	userName!: string;

	@Column("varchar", { name: "Password", length: 100, nullable: false })
	@Length(8, 100)
	password!: string;

	@Column("boolean", { name: "Confirmed", default: false, nullable: false })
	confirmed!: boolean;

	@Column("boolean", { name: "IsDisabled", default: false, nullable: false })
	isDisabled!: boolean;

	@OneToMany(() => Thread, (thread) => thread.user)
    threads!: Thread[];

	@OneToMany(() => ThreadItem, (threadItem) => threadItem.user)
	threadItems!: ThreadItem[];

	@OneToMany(() => ThreadPoint, (threadPoint) => threadPoint.user)
	threadPoints!: ThreadPoint[];

	@OneToMany(() => ThreadItemPoint, (threadItemPoint) => threadItemPoint.user)
	threadItemPoints!: ThreadItemPoint[];
}
