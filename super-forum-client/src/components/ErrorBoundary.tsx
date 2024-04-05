import React from "react";
import "./ErrorBoundary.css"

// Note that Error Boundaries still uses the older class style because we
// need the getDerivedStateFromError and componentDidCatch life cycle
// event handlers to catch errors.

interface ErrorBoundaryProps {
    children: React.ReactNode[];
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null; // 单竖线表示联合类型，而不是JavaScript里面的或位操作
    info: object;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: new Error(),
            info: { componentStack: "" }
        }
    }

    static getDerivedStateFromError = (error: Error) => {
        return {
            hasError: true,
        }
    }

    // Catches exceptions generated in descendant components. Unhandled exceptions will cause the entire component tree to unmount
    componentDidCatch(error: Error | null, info: object) {
        console.log("error: ", error);
        this.setState({ hasError: true, error, info });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-container">
                    <h2 style={{ padding: "2em"}}>
                        Something has gone wrong, Please reload your screen.
                    </h2>
                </div>
            )
        }

        // 如果错误边界的state 存储有错误信息，那么就返回预设的信息，否则返回原先的子组件。
        return this.props.children;
    }


}


export default ErrorBoundary;
// 错误边界不会处理 event handler, asynchronous code, server-side rendered react, also error boundary themselves, you must deal with those yourself using try catch.