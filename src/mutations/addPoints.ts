import { getSdkInstance } from "@/sdk";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useMutationAddPoints = (options: UseMutationOptions = {}): any => {
  const sdk = getSdkInstance();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await sdk?.addPoints(
        data.address,
        data.amount,
        data.eventName,
        data.apiKey
      );
      return response as any;
    },
    ...options,
  });
};
