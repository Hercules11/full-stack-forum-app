import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,  faRegistered, faSignInAlt, faSignOutAlt, } from "@fortawesome/free-solid-svg-icons";
import Login from "../../auth/Login"
import Logout from '../../auth/Logout';
import Registration from '../../auth/Registration';
import { Link } from "react-router-dom";

import "./SideBarMenus.css"
import { useSelector } from "react-redux";
import { AppState } from "../../../store/AppState";



const SideBarMenus = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false)
    const [showLogout, setShowLogout] = useState(false)

    const user = useSelector((state: AppState) => state.user);


    useEffect(() => {
        console.log("SideBar user", user);
    }, [user])

    const onClickToggleRegister = () => {
        setShowRegister(!showRegister);
    }
    const onClickToggleLogin = () => {
        setShowLogin(!showLogin);
    }
    const onClickToggleLogout = () => {
        setShowLogout(!showLogout);
    }

    return (
        <React.Fragment>
            <ul>
                {
                    user ? (
                        <li>
                            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                            <span className="menu-name">
                                <Link to={`/userprofile/${user?.id}`}>{user?.userName}</Link>
                            </span>
                        </li>
                    ) : null
                }
                {
                    user ? null : (
                        <li>
                            <FontAwesomeIcon icon={faRegistered}></FontAwesomeIcon>
                            <span onClick={onClickToggleRegister} className="menu-name">
                                register
                            </span>
                            <Registration isOpen={showRegister} onClickToggle={onClickToggleRegister} />
                        </li>
                    )
                }
                {
                    user ? null : (
                        <li>
                            <FontAwesomeIcon icon={faSignInAlt}></FontAwesomeIcon>
                            <span onClick={onClickToggleLogin} className="menu-name">
                                login
                            </span>
                            <Login isOpen={showLogin} onClickToggle={onClickToggleLogin}></Login>
                        </li>
                    )
                }
                {
                    user ? (
                        <li>
                            <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>
                            <span onClick={onClickToggleLogout} className="menu-name">
                                logout
                            </span>
                            <Logout isOpen={showLogout} onClickToggle={onClickToggleLogout}></Logout>
                        </li>
                    ) : null
                }
            </ul>

        </React.Fragment>
    )
}

export default SideBarMenus;