import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";
import toast from "react-hot-toast";

function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isLoading: isUpdatingSetting } = useMutation({
    mutationFn: updateSettingAPI,

    onSuccess: () => {
      toast.success(" Settings successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateSetting, isUpdatingSetting };
}

export default useUpdateSetting;
