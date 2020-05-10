import React from "react";
import { Button, Card, DatePicker, Divider, Typography } from "antd";
import moment, { Moment } from "moment";
import { Listing as ListingData } from "../../../../lib/graphql/queries/Listing/__generated__/Listing";
import { displayErrorMessage, formatListingPrice } from "../../../../lib/utils";
import { Viewer } from "../../../../lib/types";
import { BookingsIndex } from "./types";

const { Paragraph, Text, Title } = Typography;

interface Props {
    viewer: Viewer;
    host: ListingData["listing"]["host"];
    price: number;
    bookingsIndex: ListingData["listing"]["bookingsIndex"];
    checkInDate: Moment | null;
    checkOutDate: Moment | null;
    setCheckInDate: (checkInDate: Moment | null) => void;
    setCheckOutDate: (checkOutDate: Moment | null) => void;
}

export const ListingCreateBooking = ({ viewer, host, price, bookingsIndex, checkInDate, checkOutDate, setCheckInDate, setCheckOutDate }: Props) => {
    const bookingsIndexJson: BookingsIndex = JSON.parse(bookingsIndex);

    const dateIsBooked = (currentDate: Moment) => {
        const year = moment(currentDate).year();
        const month = moment(currentDate).month();
        const day = moment(currentDate).date();

        if (bookingsIndexJson[year] && bookingsIndexJson[year][month]) {
            return Boolean(bookingsIndexJson[year][month][day]);
        } else {
            return false;
        }
    }

    // Potential source of errors?
    const disabledDate = (currentDate?: Moment | null) => {
        if (currentDate) {
            const now = moment();
            const dateIsBeforeEndOfDay = currentDate.isBefore(now.endOf('day'));
            const dateIsAfterOneYear = currentDate.isAfter(now.add(1, "year"));

            return dateIsBeforeEndOfDay || dateIsAfterOneYear || dateIsBooked(currentDate);
        } else {
            return false;
        }
    };

    const verifyAndSetCheckOutDate = (selectedCheckOutDate: Moment | null) => {
        if (checkInDate && selectedCheckOutDate) {
            if (moment(selectedCheckOutDate).isBefore(checkInDate, "days")) {
                return displayErrorMessage("You can't book date of check out to be prior to check in!");
            }

            let dateCursor = checkInDate;

            while (moment(dateCursor).isBefore(selectedCheckOutDate, "days")) {
                dateCursor = moment(dateCursor).add(1, "days");

                const year = moment(dateCursor).year();
                const month = moment(dateCursor).month();
                const day = moment(dateCursor).date();

                if (bookingsIndexJson[year] && bookingsIndexJson[year][month] && bookingsIndexJson[year][month][day]) {
                    return displayErrorMessage("You can't book a period of time that overlaps existing bookings. Please try again.");
                }
            }
        }
        setCheckOutDate(selectedCheckOutDate);
    }

    const viewerIsHost = viewer.id === host.id;
    const checkInInputDisabled = !viewer.id || viewerIsHost || !host.hasWallet;
    const checkOutInputDisabled = checkInInputDisabled || !checkInDate;
    const buttonDisabled = checkOutInputDisabled || !checkInDate || !checkOutDate;

    let buttonMessage = "You won't be charged yet";
    if (!viewer.id) {
        buttonMessage = "You have to be signed in to book a listing";
    } else if (viewerIsHost) {
        buttonMessage = "You can't book your own listing";
    } else if (!host.hasWallet) {
        buttonMessage = "The host has disconnected from Stripe and thus won't be able to receive payments";
    }

    return (
        <div className="listing-booking">
            <Card className="listing-booking__card">
                <div>
                    <Paragraph>
                        <Title level={2} className="listing-booking__card-title">
                            {formatListingPrice(price)}
                            <span>/day</span>
                        </Title>
                    </Paragraph>
                    <Divider />
                    <div className="listing-booking__card-date-picker">
                        <Paragraph strong>Check In</Paragraph>
                        <DatePicker 
                        value={checkInDate ? checkInDate : undefined} 
                        format={"YYYY/MM/DD"}
                        showToday={false}
                        disabled={checkInInputDisabled}
                        disabledDate={disabledDate}
                        onChange={dateValue => setCheckInDate(dateValue)}
                        onOpenChange={() => setCheckOutDate(null)}/>
                    </div>
                    <div className="listing-booking__card-date-picker">
                        <Paragraph strong>Check Out</Paragraph>
                        <DatePicker 
                        value={checkOutDate ? checkOutDate : undefined} 
                        format={"YYYY/MM/DD"}
                        showToday={false}
                        disabled={checkOutInputDisabled}
                        disabledDate={disabledDate}
                        onChange={dateValue => verifyAndSetCheckOutDate(dateValue)}/>
                    </div>
                </div>
                <Divider />
                <Button disabled={buttonDisabled} size="large" type="primary" className="listing-booking__card-cta">
                    Request to book!
                </Button>
                <Text type="secondary" mark>{buttonMessage}</Text>
            </Card>
        </div>
    );
};