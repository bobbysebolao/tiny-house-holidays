import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Button, Icon, Menu } from "antd";
import { Viewer } from "../../../../lib/types";

interface Props {
    viewer: Viewer;
}

const { Item, SubMenu } = Menu;

export const MenuItems = ({ viewer }: Props) => {

    const subMenuLogin = viewer.id && viewer.avatar ? (
        <SubMenu title={<Avatar src={viewer.avatar}/>}>
            <Item key="/user">
                <Icon type="user"/>
                Profile
            </Item>
            <Item key="/logout">
                <Icon type="logout"/>
                Log out
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