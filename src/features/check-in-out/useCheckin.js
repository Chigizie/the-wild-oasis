import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    // mutationFn: ({ bookinId, breakfast }) =>
    //   updateBooking(bookinId, {
    //     isPaid: true,
    //     status: "checked-in",
    //     ...breakfast,
    //   }),
    onSuccess: (data) => {
      toast.success(`booking #${data.id} successfully checked-in`);
      queryClient.invalidateQueries(data.id);
      navigate("/");
    },

    onError: () => toast.error("there was an error while checking in"),
  });

  return { checkin, isCheckingIn };
}
