import React from "react";
import { Layout } from "antd";

import logo from "./assets/tiny-house-advice-logo.jpg";

const { Header } = Layout;

export const AppHeaderSkeleton = () => {
    return (
        <Header className="app-header">
            <div className="app-header__logo-search-section">
                <div className="app-header__logo">
                        <img src={logo} alt="App logo"/>
                </div>
            </div>
        </Header>
    )
}