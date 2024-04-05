import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter
} from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary"
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import ReactModal from 'react-modal';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  credentials: "include",
  cache: new InMemoryCache({
    resultCaching: false,
  })
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <BrowserRouter>
        {/**为什么需要这个组件，因为它可以使用浏览器的pushState API 管理 URI 逻辑；为子组件提供一个路由信息的 context, 便于组件共享路由信息；提供一个路由守卫的功能，可以在导航到特定页面的时候，进行一些逻辑判断，比如用户权限校验 */}
        <ApolloProvider client={client}>
          <ErrorBoundary>{[<App key="App" />]}</ErrorBoundary>
        </ApolloProvider>
      </BrowserRouter>
    </Provider>

  </React.StrictMode>
);


ReactModal.setAppElement("#root");
// ReactDOM.render( // 老式的写法
//   <React.StrictMode>
//     <App/>
//   </React.StrictMode>,
//   document.getElementById("root")
// )
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
