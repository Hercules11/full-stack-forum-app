import { combineReducers } from "redux";
import { UserProfileReducer } from "./user/Reducer";
import { ThreadCategoriesReducer } from "./categories/Reducer";

export const rootReducer = combineReducers({
    user: UserProfileReducer,
    categories: ThreadCategoriesReducer,
})

// typeof 在 TypeScript 中用于获取类型信息，而 ReturnType 用于从这个类型信息中提取返回值类型。这种组合允许你创建更灵活、更强大的类型定义，特别是在处理函数和钩子时。
// 不同于 JavaScript 里面的 typeof
export type AppState = ReturnType<typeof rootReducer>;