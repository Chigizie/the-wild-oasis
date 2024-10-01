import styled from "styled-components";
import { useEffect, useState } from "react";

import Row from "../../ui/Row";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";

import useGetBooking from "../bookings/useGetBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useCheckin } from "./useCheckin";
import useGetSettings from "../settings/useGetSettings";
import { useDeleteBooking } from "../bookings/useDeleteooking";
import { useNavigate } from "react-router-dom";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { checkin, isCheckingIn } = useCheckin();
  const { isDeleting, deleteBookin } = useDeleteBooking();
  const { booking, isLoading } = useGetBooking();
  const [confirmedPaid, setConfirmedPaid] = useState(false);
  const [orderBreakfast, setOrderBreakfast] = useState(false);
  const { isLoading: isSetting, settings } = useGetSettings();
  const moveBack = useMoveBack();

  const navigate = useNavigate();

  useEffect(() => setConfirmedPaid(booking?.isPaid ?? false), [booking]);

  useEffect(
    () => setOrderBreakfast(() => booking?.hasBreakfast || false),
    [booking]
  );
  if (isLoading || isSetting || isCheckingIn || isDeleting) return <Spinner />;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;
  //breakfastPrice;
  function handleCheckin() {
    if (!confirmedPaid) return;
    if (orderBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
    //checkin(bookingId);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={orderBreakfast}
            disabled={orderBreakfast}
            onChange={() => {
              setOrderBreakfast((order) => !order);
              setConfirmedPaid(false);
            }}
            id="breakfast"
          >
            Do you want a breakfast for {formatCurrency(optionalBreakfastPrice)}
            ?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmedPaid}
          onChange={() => setConfirmedPaid((confirm) => !confirm)}
          disabled={confirmedPaid || isCheckingIn}
        >
          I confirm that {guests.fullName}has paid the total amount
          {!orderBreakfast
            ? formatCurrency(totalPrice + optionalBreakfastPrice) +
              ` (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmedPaid || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>

        <Button
          onClick={() => {
            deleteBookin(bookingId);
            navigate("/bookings");
          }}
          disabled={isDeleting}
        >
          Delete #{bookingId}
        </Button>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
