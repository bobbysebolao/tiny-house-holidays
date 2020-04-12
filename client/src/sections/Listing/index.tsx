import React, { useState } from 'react';
import { RouteComponentProps } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Col, Layout, Row } from "antd";
import { ErrorBanner, PageSkeleton } from "../../lib/components";
import { LISTING } from "../../lib/graphql/queries";
import { Listing as ListingData, ListingVariables } from "../../lib/graphql/queries/Listing/__generated__/Listing";
import { ListingDetails } from "./components";

interface MatchParams {
    id: string;
}

const { Content } = Layout;
const PAGE_LIMIT = 3;

export const Listing = ({ match}: RouteComponentProps<MatchParams>) => {
    const [bookingsPage, setBookingsPage] = useState(1);
    const { loading, data, error } = useQuery<ListingData, ListingVariables>(LISTING, {
        variables: {
            id: match.params.id,
            bookingsPage,
            limit: PAGE_LIMIT
        }
    });

    if (loading) {
        return (
            <Content className="listings">
                <PageSkeleton/>
            </Content>
        )
    }

    if (error) {
        return (
            <Content className="listings">
                <ErrorBanner description="This listing may not exist or we've encountered an error. Please try again soon."/>
                <PageSkeleton/>
            </Content>
        )
    }

    const listing = data ? data.listing : null;
    const listingBookings = listing ? listing.bookings : null;

    const listingDetailsElement = listing ? <ListingDetails listing={listing} /> : null;

    return (
        <Content className="listings">
            <Row gutter={24} type="flex" justify="space-between">
                <Col xs={24} lg={14}>
                    {listingDetailsElement}
                </Col>
            </Row>
        </Content>
    )
}