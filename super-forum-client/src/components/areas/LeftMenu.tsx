import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
// import { getCategories } from "../../services/DataService";
import Category from "../../models/Category";
// import { gql, useQuery } from "@apollo/client";
import { AppState } from "../../store/AppState";
import { useSelector } from "react-redux";
import "./LeftMenu.css"


// const getAllCategories = gql`
// query getAllCategories {
//     getAllCategories {
//         id
//         name
//     }
// }
// `;


// 函数式组件内部保持clean, 与外部系统交互的，使用useEffect操作，定义数据显示默认是据，副作用操作数据，显示更新后的数据。
const LeftMenu = () => {
    const { width } = useWindowDimensions();
    const [categories, setCategories] = useState<JSX.Element>(<div>Left Menu</div>)
    const categoriesState = useSelector((state: AppState) => state.categories);

    // const { loading, error, data } = useQuery(getAllCategories);

    useEffect(() => {
        // if (loading) {
        //     setCategories(<span>Loading...</span>)
        // } else if (error) {
        //     setCategories(<span>Error occurred loading categories...</span>)
        // } else {
        //     if (data && data.getAllCategories) {
        //         const cats = data.getAllCategories.map((cat: any) => {
        //             return (<li key={cat.id}>
        //                 <Link to={`/categorythreads/${cat.id}`}>{cat.name}</Link>
        //             </li>)
        //         });
        //         setCategories(<ul className="category">{cats}</ul>)
        //     }
        // }
        // getCategories().then((categories: Array<Category>) => {
        //     const cates = categories.map((item) => {
        //         return <li key={item.id}>{item.name}</li>
        //     })
        //     setCategories(<ul className="category">{cates}</ul>)

        // }).catch((err) => {
        //     console.log(err);
        //     return;
        // })

        if (categoriesState) {
            console.log(categoriesState);
            const cats = categoriesState.map((cat: Category) => {
                return (
                    <li key={cat.id}>
                        <Link to={`/categorythreads/${cat.id}`}>{cat.name}</Link>
                    </li>
                )

            })
            setCategories(<ul className="category">{cats}</ul>);
        }
    }, [categoriesState])

    if (width <= 768) {
        return null;
    }
    return (
        <div className="leftmenu">{categories}</div>


    );
}

export default LeftMenu;