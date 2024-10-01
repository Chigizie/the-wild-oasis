import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEDitCabin } from "../../services/apiCains";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreatingCabin } = useMutation({
    mutationFn: createEDitCabin,

    onSuccess: () => {
      toast.success("new cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createCabin, isCreatingCabin };
}
