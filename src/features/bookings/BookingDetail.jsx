import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import useGetBooking from "./useGetBooking";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { isCheckingOut, checkout } = useCheckout();
  const { booking, isLoading } = useGetBooking();
  const { isDeleting, deleteBookin } = useDeleteBooking();

  const moveBack = useMoveBack();

  if (isLoading || isDeleting) return <Spinner />;

  const { id, status } = booking;

  const statusToTagName = {
    "checked-in": "green",
    "checked-out": "silver",
    unconfirmed: "blue",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} isLoading={isLoading} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${id}`)}>Check in</Button>
        )}
        {status === "checked-in" && (
          <Button onClick={() => checkout(id)} disabled={isCheckingOut}>
            Check out
          </Button>
        )}

        <Button
          onClick={() => {
            deleteBookin(id);
            navigate("/");
          }}
          disabled={isDeleting}
        >
          Delete booking
        </Button>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
