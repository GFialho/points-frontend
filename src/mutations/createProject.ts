import { getSdkInstance } from "@/sdk";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useMutationCreateProject = (
  options: UseMutationOptions = {}
): any => {
  const sdk = getSdkInstance();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await sdk?.createProject(data.id);
      return response as any;
    },
    ...options,
  });
};
