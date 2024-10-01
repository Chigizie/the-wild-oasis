import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log(data);
      toast.success("you have successfully signed in");
    },
  });

  return { signup, isLoading };
}
