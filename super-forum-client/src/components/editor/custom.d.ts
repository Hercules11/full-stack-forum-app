import { BaseElement } from "slate";

declare module "slate" {
	export interface BaseElement {
		type?: string;
		align?: string;
	}
}
