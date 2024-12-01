import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface SignUpCredentials {
  email: string;
  password: string;
  username: string;
}

const useSignUp = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: unknown) => void;
}) => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (credentials: SignUpCredentials) => {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/api/signUp",
        credentials
      );

      if (!response.data) {
        const error = await response.data;
        throw new Error(error.message);
      }

      return response.data;
    },
    onSuccess: () => {
      onSuccess();
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      onError(errorMessage);
    },
  });
};
export default useSignUp;
