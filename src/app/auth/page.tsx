"use client";
import SignInPage from "@/feature/auth/components/Sign-in";
import SignUpPage from "@/feature/auth/components/Sign-up";
import { useState } from "react";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div>
      {isSignUp ? (
        <SignUpPage setIsSignUp={setIsSignUp} />
      ) : (
        <SignInPage setIsSignUp={setIsSignUp} />
      )}
    </div>
  );
};

export default AuthPage;
