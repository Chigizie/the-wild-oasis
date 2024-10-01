import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEDitCabin } from "../../services/apiCains";
import toast from "react-hot-toast";

function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditingCabin } = useMutation({
    mutationFn: ({ newcabinData, id }) => createEDitCabin(newcabinData, id),

    onSuccess: () => {
      toast.success(" cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editCabin, isEditingCabin };
}

export default useEditCabin;
