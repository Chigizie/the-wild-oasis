import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      toast.success("You have been successfully logged in");
      navigate("/dashboard", { replace: true });
    },

    onError: (error) => {
      console.log(error);
      toast.error(" The email and password are not correct");
    },
  });

  return { login, isLoggingIn };
}

export default useLogin;
