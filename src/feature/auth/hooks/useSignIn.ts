import { signInUser } from "@/action/AuthAction";
import { useMutation } from "@tanstack/react-query";

interface SignInCredentials {
  email: string;
  password: string;
}

const useSignIn = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: unknown) => void;
}) => {
  return useMutation({
    mutationKey: ["signin"],
    mutationFn: async (payload: SignInCredentials) => {
      const res = await signInUser(payload);
      return res;
    },
    onSuccess: () => {
      onSuccess();
    },
    onError: (error: unknown) => {
      onError(error);
    },
  });
};
export default useSignIn;
