import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserAccout } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdateUser() {
  const queryClient = useQueryClient();
  const {
    mutate: upadateAccout,
    isLoading: isUpdatingAccount,
    reset,
  } = useMutation({
    mutationFn: updateUserAccout,

    onSuccess: ({ user }) => {
      toast.success("user has been successfully updated");
      queryClient.invalidateQueries("user");
    },
  });
  return { upadateAccout, isUpdatingAccount, reset };
}

export default useUpdateUser;
