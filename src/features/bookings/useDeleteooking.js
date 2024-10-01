import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";

import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBookin, isLoading: isDeleting } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: (data) => {
      toast.success(`booking has been successfully deleted`);
      queryClient.invalidateQueries("booking");
    },

    onError: () => toast.error(`there was an error deleting booking`),
  });

  return { deleteBookin, isDeleting };
}
