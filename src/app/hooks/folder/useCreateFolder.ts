import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFolder } from "@/app/api/folders";
import toast from "react-hot-toast";

export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
    onError: () => {
      toast.error("폴더 조회를 실패하였습니다 ");
    },
  });
};
