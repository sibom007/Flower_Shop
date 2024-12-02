import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface SignUpCredentials {
  email: string;
  password: string;
  username: string;
}

const useSignUpToDB = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (payload: SignUpCredentials) => {
      const res = await axios.post("/api/signUp", payload);
      return res;
    },
  });
};
export default useSignUpToDB;
