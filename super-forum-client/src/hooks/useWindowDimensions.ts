import { useState, useEffect } from "react"

export interface WindowDimension {
    height: number;
    width: number;
}

export const useWindowDimensions = (): WindowDimension => {
    const [dimension, setDimension] = useState<WindowDimension>({ height: 0, width: 0 });

    const handleResize = () => {
        setDimension({
            height: window.innerHeight,
            width: window.innerWidth,
        })
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize();

        // useEffect 依赖项变化的时候，会执行注册的钩子函数，执行之前会 先 执行钩子函数所返回的清理函数，再执行钩子函数
        // 组件卸载，也会引起清理函数的运行。
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    return dimension;
}