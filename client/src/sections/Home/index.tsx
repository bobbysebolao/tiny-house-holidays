import React from 'react';
import { Link, RouteComponentProps } from "react-router-dom";
import { Col, Row, Layout, Typography } from "antd";
import { displayErrorMessage } from "../../lib/utils";
import { HomeHero } from "./components";

import mapBackground from "./assets/map-background.jpg";
import sanFranciscoImage from "./assets/san-francisco.jpg";
import cancunImage from "./assets/cancun.jpg";

const { Content } = Layout;
const { Paragraph, Title } = Typography;

export const Home = ({ history }: RouteComponentProps) => {
    const onSearch = (value: string) => {
        // .trim() is a native JS method that removes whitespaces from the start and end of a string
        const trimmedValue = value.trim();

        if (trimmedValue) {
            history.push(`/listings/${trimmedValue}`)
        } else {
            displayErrorMessage("Please enter a valid search")
        }
    };

    return (
        <Content className="home" style={{ backgroundImage: `url(${mapBackground})`}}>
            <HomeHero onSearch={onSearch} />

            <div className="home__cta-section">
                <Title>
                    Your guide for all things rental
                </Title>
                <Paragraph>
                    Helping you make the best decisions in renting your las minute locations.
                </Paragraph>
                <Link to="/listings/united%20states" className="ant-btn ant-btn-primary ant-btn-lg home__cta-section-button">Popular listings in the United States</Link>
            </div>

            <div className="home__listings">
                <Title level={4} className="home__listings-title">
                    Listings of any kind
                </Title>
                <Row gutter={12}>
                    <Col xs={24} sm={12}>
                        <Link to="/listings/san%20francisco">
                            <div className="home__listings-img-cover">
                                <img src={sanFranciscoImage} alt="San Francisco"
                                className="home__listings-img" />
                            </div>
                        </Link>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Link to="/listings/cancún">
                            <div className="home__listings-img-cover">
                                <img src={cancunImage} alt="Cancún"
                                className="home__listings-img" />
                            </div>
                        </Link>
                    </Col>
                </Row>
            </div>
        </Content>
    )
}