import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Avatar, Button, Icon, Menu } from "antd";
import { LOG_OUT } from "../../../../lib/graphql/mutations";
import { LogOut as LogOutData } from "../../../../lib/graphql/mutations/LogOut/__generated__/LogOut";
import { displaySuccessNotification, displayErrorMessage } from "../../../../lib/utils";
import { Viewer } from "../../../../lib/types";

interface Props {
    viewer: Viewer;
    setViewer: (viewer: Viewer) => void;
}

const { Item, SubMenu } = Menu;

export const MenuItems = ({ viewer, setViewer }: Props) => {
    const [logOut] = useMutation<LogOutData>(LOG_OUT, {
        onCompleted: data => {
            if (data && data.logOut) {
                setViewer(data.logOut);
                displaySuccessNotification("You've successfully logged out!");
            }
        },
        onError: data => {
            displayErrorMessage("Sorry! We weren't able to log out out. Please try again later!");
        }
    });

    const handleLogOut = () => {
        logOut();
    };

    const subMenuLogin = viewer.id && viewer.avatar ? (
        <SubMenu title={<Avatar src={viewer.avatar}/>}>
            <Item key="/user">
                <Link to={`/user/${viewer.id}`}>
                    <Icon type="user"/>
                    Profile
                </Link>
            </Item>
            <Item key="/logout">
                <div onClick={handleLogOut}>
                    <Icon type="logout"/>
                    Log out
                </div>
            </Item>
        </SubMenu>
    ) : (
        <Item>
                <Link to="/login">
                    <Button type="primary">Sign in</Button>
                </Link>
            </Item>
    );

    return (
        <Menu mode="horizontal" selectable={false} className="menu">
            <Item key="/host">
                <Link to="/host">
                    <Icon type="home"/>
                    Host
                </Link>
            </Item>
            {subMenuLogin}
        </Menu>
    )
}