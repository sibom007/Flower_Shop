import { signUpUser } from "@/action/AuthAction";
import { useMutation } from "@tanstack/react-query";

interface SignUpCredentials {
  email: string;
  password: string;
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
    mutationFn: (payload: SignUpCredentials) => {
      const res = signUpUser(payload);
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
export default useSignUp;
