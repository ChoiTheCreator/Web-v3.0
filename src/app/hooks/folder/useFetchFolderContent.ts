import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { getFoldersContent } from "@/app/api/folders";

export default function useFetchFolderContent(token: string | undefined, enabled = true) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["folders", token],
    queryFn: getFoldersContent,
    enabled: !!token && enabled,
  });

  return { data, isLoading, error };
}
