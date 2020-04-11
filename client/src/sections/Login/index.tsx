import React from "react";
import { Card, Layout, Typography } from "antd";

// Image Assets
import googleLogo from "./assets/google_logo.jpg";

const { Content } = Layout;
const { Text, Title } = Typography;

export const Login = () => {
    return (
        <Content className="log-in">
            <Card className="log-in-card">
                <div className="log-in-card__intro">
                    <Title level={3} className="log-in-car__intro-title">
                        <span role="img" aria-label="wave">
                        👋
                        </span>
                    </Title>
                    <Title level={3} className="log-in-car__intro-title">
                        Log in to Tiny House Advice!
                    </Title>
                    <Text>Sign in with Google to start booking available rentals!</Text>
                </div>
                <button className="log-in-card__google-button">
                    <img src={googleLogo} alt="Google Logo" className="log-in-card__google-button-logo"/>
                    <span className="log-in-card__google-button-text">Sign in with Google</span>
                </button>
                <Text type="secondary">
                    Note: by signing in, you'll be directed to the Google consent form to sign in with your Google account.
                </Text>
            </Card>
        </Content>
    )
}