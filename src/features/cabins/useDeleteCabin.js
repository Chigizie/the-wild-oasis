import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabins } from "../../services/apiCains";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabins(id),
    onSuccess: () => {
      toast.success("cabin has been successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, deleteCabin };
}
