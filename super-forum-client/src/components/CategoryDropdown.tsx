import { FC, useState, useEffect } from "react";
import Category from "../models/Category";
import "react-dropdown/style.css";
import DropDown, { Option } from 'react-dropdown';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../store/AppState";

class CategoryDropDownProps {
    sendOutSelectedCategory?: (cat: Category) => void;
    navigate?: boolean = false;
    preselectedCategory?: Category;
}
const defaultLabel = "Select a Category"
const defaultOption = {
    value: "0",
    label: defaultLabel,
}

// 这几个参数定义了一些功能，把选择的选项发送出去，或是不进行跳转
const CategoryDropDown: FC<CategoryDropDownProps> = ({
    sendOutSelectedCategory,
    navigate,
    preselectedCategory
}) => {
    const categories = useSelector((state: AppState) => state.categories);
    const [selectedOption, setSelectedOption] = useState<Option>(defaultOption);
    const [categoryOptions, setCategoryOptions] = useState<Array<string | Option>>([defaultOption]);

    const navigateTo = useNavigate();

    useEffect(() => {
        if (categories) {
            // 根据外部传进来的数组，进行生成选项列
            const catOptions: Array<Option> = categories.map((cat: Category) => {
                return {
                    value: cat.id,
                    label: cat.name,
                };
            });
            setCategoryOptions(catOptions);
            setSelectedOption({
                value: preselectedCategory ? preselectedCategory.id : "0",
                label: preselectedCategory ? preselectedCategory.name : defaultLabel,
            });
        }
    }, [categories, preselectedCategory]);

    const onChangeDropDown = (selected: Option) => {
        console.log(selected);
        setSelectedOption(selected)
        if (sendOutSelectedCategory) {
            sendOutSelectedCategory(
                new Category(selected.value, selected.label?.valueOf().toString() ?? "") // 空值合并运算符
            );
        }
        if (navigate) {
            navigateTo(`/categorythreads/${selected.value}`)
        }
    }

    return (
        <DropDown
            className="thread-category-dropdown"
            options={categoryOptions}
            onChange={onChangeDropDown}
            value={selectedOption}
            placeholder={defaultLabel}
        ></DropDown>
    )
}

export default CategoryDropDown;