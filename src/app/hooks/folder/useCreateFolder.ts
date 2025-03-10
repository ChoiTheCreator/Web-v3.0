import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFolder } from "@/app/api/folders";

export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });
};
