import React from "react";
import { CardElement, injectStripe, ReactStripeElements } from "react-stripe-elements";
import { Button, Divider, Icon, Typography, Modal } from "antd";
import moment, { Moment } from "moment";
import { formatListingPrice } from "../../../../lib/utils";

interface Props {
    price: number;
    modalVisible: boolean;
    checkInDate: Moment;
    checkOutDate: Moment;
    setModalVisible: (modalVisible: boolean) => void;
}

const { Paragraph, Text, Title } = Typography;

export const ListingCreateBookingModal = ({ price, modalVisible, checkInDate, checkOutDate, setModalVisible, stripe }: Props & ReactStripeElements.InjectedStripeProps) => {

    const daysBooked = checkOutDate.diff(checkInDate, "days") + 1;
    const listingPrice = price * daysBooked;
    // const tinyHouseFee = 0.05 * listingPrice;
    // const totalPrice = listingPrice + tinyHouseFee;

    const handleCreateBooking = async () => {
        if (!stripe) {
            return;
        }

        let { token: stripeToken } = await stripe.createToken();
        console.log(stripeToken);
    }

    return (
        <Modal visible={modalVisible} centered footer={null} onCancel={() => setModalVisible(false)}>
            <div className="listing-booking-modal">
                <div className="listing-booking-modal__intro">
                <Title className="listing-booking-modal__intro-title">
                        <Icon type="key"></Icon>
                    </Title>
                    <Title level={3} className="listing-booking-modal__intro-title">
                        Book your trip
                    </Title>
                    <Paragraph>
                        Enter your payment information to book the listing from the dates between <Text mark strong>{moment(checkInDate).format("MMMM Do YYYY")}</Text>{" "}
                        and{" "}
                        <Text mark strong>{moment(checkOutDate).format("MMMM Do YYYY")}</Text>
                    </Paragraph>
                </div>
                <Divider />
                <div className="listing-booking-modal__charge-summary">
                    <Paragraph>
                        {formatListingPrice(price, false)} * {daysBooked} days = {" "}
                        <Text strong>{formatListingPrice(listingPrice, false)}</Text>
                    </Paragraph>
                    {/* <Paragraph>
                        Tiny House Advice Fee <sub>~ 5%</sub> ={" "}
                        <Text strong>{formatListingPrice(totalPrice)}</Text>
                    </Paragraph> */}
                    <Paragraph className="listing-booking-modal__charge-summary-total">
    Total = <Text mark>{formatListingPrice(listingPrice, false)}</Text>
                    </Paragraph>
                </div>
                <Divider />

                <div className="listing-booking-modal__stripe-card-section">
                    <CardElement hidePostalCode className="listing-booking-modal__stripe-card"/>
                    <Button size="large" type="primary" className="listing-booking-modal__cta" onClick={handleCreateBooking}>Book</Button>
                </div>
            </div>
        </Modal>
    )
}

export const WrappedListingCreateBookingModal = injectStripe(ListingCreateBookingModal);