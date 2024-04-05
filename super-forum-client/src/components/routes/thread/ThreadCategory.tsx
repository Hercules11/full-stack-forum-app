import React, { FC } from "react";
import DropDown, { Option } from "react-dropdown";
// import "react-dropdown/style.css";
import Category from "../../../models/Category";
import CategoryDropDown from "../../CategoryDropdown";

interface ThreadCategoryProps {
    category?: Category;
    sendOutSelectedCategory: (cat: Category) => void;
}

const ThreadCategory: FC<ThreadCategoryProps> = ({ category, sendOutSelectedCategory }) => {
    // const catOptions: Array<string | Option> = [
    //     {
    //         value: "1",
    //         label: "Programming",
    //     },
    //     {
    //         value: "2",
    //         label: "Cooking",
    //     },
    // ];
    // const defaultOption = catOptions[0];
    // const onChangeDropDown = (arg: Option) => {
    //     console.log(arg);
    // };

    return (
        <div className="thread-category-container">
            <strong>{category?.name}</strong>
            <div style={{ marginTop: "1em" }}>
                <CategoryDropDown
                    preselectedCategory={category}
                    sendOutSelectedCategory={sendOutSelectedCategory}
                />
            </div>

        </div>
    );
};

export default ThreadCategory;