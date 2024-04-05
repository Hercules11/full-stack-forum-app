import React, { useEffect } from "react"
import "./App.css"
import { Routes, Route } from "react-router-dom";
import Home from "./components/routes/Home";
import Thread from "./components/routes/thread/Thread";
import UserProfile from "./components/routes/userProfile/UserProfile";
import { useDispatch } from "react-redux";
// import { UserProfileSetType } from "./store/user/Reducer";
import { gql, useQuery } from "@apollo/client";
import { ThreadCategoriesType } from "./store/categories/Reducer";
import useRefreshReduxMe from "./hooks/useRefreshReduxMe";



const GetAllCategories = gql`
query getAllCategories {
  getAllCategories {
    id
    name
  }
}
`;

function App() {
  const { data: categoriesData } = useQuery(GetAllCategories);
  const { execMe, updateMe } = useRefreshReduxMe();
  const dispatch = useDispatch();


  // 从 graphql 中拿到数据
  useEffect(() => {
    execMe();
  }, [execMe]);

  // 跟新 redux 中的数据
  useEffect(() => {
    updateMe();
  }, [updateMe]);

  useEffect(() => {
    if (categoriesData && categoriesData.getAllCategories) {
      dispatch({
        type: ThreadCategoriesType,
        payload: categoriesData.getAllCategories,
      })
    }
  },[dispatch, categoriesData])
  const renderHome = (props: any) => <Home {...props} />;
  const renderThread = (props: any) => <Thread {...props} />;
  const renderUserProfile = (props: any) => <UserProfile {...props} />;


  return (
    <Routes>
      <Route path="/" Component={renderHome} />
      <Route path="/categorythreads/:categoryId" Component={renderHome} />
      {/* ？ allow the Thread route to load with no parameters */}
      <Route path="/thread/:id?" Component={renderThread} />
      <Route path="/userprofile/:id" Component={renderUserProfile} />
    </Routes>
  )
}

export default App;