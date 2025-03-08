import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFolder } from "@/app/api/folders";

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });
};
