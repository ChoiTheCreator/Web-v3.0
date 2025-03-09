import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFolder } from "@/app/api/folders";

export const useUpdateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });
};
