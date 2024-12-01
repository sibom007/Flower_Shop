"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { PiSpinnerBallLight } from "react-icons/pi";

import { FaRegEyeSlash } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

import { Dispatch, SetStateAction, useState } from "react";
import useSignUp from "../hooks/useSignUp";
import { toast } from "sonner";

interface SignUpPageProps {
  setIsSignUp: Dispatch<SetStateAction<boolean>>;
}

const SignUpPage = ({ setIsSignUp }: SignUpPageProps) => {
  useGSAP(() => {
    gsap.from("div", {
      opacity: 0,
      duration: 1,
      x: -100,
      ease: "power2.out",
    });
    gsap.from(".text-animation", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
      delay: 0.5,
    });
    gsap.from(".f1", {
      y: 500,
      duration: 7,
      ease: "power2.out",
    });
    gsap.to(".f1", {
      rotate: 360,
      delay: 0.5,
      duration: 7,
      repeat: -1, // This creates an infinite loop
      yoyo: true, // This makes the animation reverse back
    });
  });

  const { mutate, isPending } = useSignUp({
    onSuccess: () => {
      setIsSignUp(false);
      setIsLoading(false);
      toast.success("Sign up successfully");
      setEmail("");
      setPassword("");
      setUserName("");
    },
    onError: (error) => {
      setError("" + error);
      toast.error("Sign up failed");
    },
  });
  console.log("🚀 ~ SignUpPage ~ isPending:", isPending);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = () => {
    setError("");
    setIsLoading(true);

    const validateSignUp = () => {
      switch (true) {
        case !email || !password || !userName:
          return "All fields are required";

        case password.length < 6:
          return "Password must be at least 6 characters long";

        case userName.length < 3:
          return "Username must be at least 3 characters long";

        case !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/):
          return "Please enter a valid email address";

        default:
          return null;
      }
    };

    const validationError = validateSignUp();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }
    mutate({ email, password, username: userName });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src={
          "https://res.cloudinary.com/dwor90h8p/image/upload/v1733039217/original-6fdcf8bb41df8d54079a844a5ad292d5-removebg-preview_ybnerh.png"
        }
        alt="Logo"
        width={200}
        height={200}
        className="absolute top-4  right-4 f1"
      />

      <Image
        src={
          "https://res.cloudinary.com/dwor90h8p/image/upload/v1733039217/original-6fdcf8bb41df8d54079a844a5ad292d5-removebg-preview_ybnerh.png"
        }
        alt="Logo"
        width={200}
        height={200}
        className="absolute top-4 left-4 f1"
      />

      <div className="flex flex-col md:flex-row">
        <Image
          src="https://res.cloudinary.com/dwor90h8p/image/upload/v1733059782/Flower_with_man_bcogu6.png"
          alt="Logo"
          width={500}
          height={500}
          className="md:block hidden rounded-l-lg"
        />
        <div className="bg-white p-8 pt-10 shadow-md w-[500px] md:rounded-r-lg rounded-lg md:rounded-none">
          <h1 className="text-2xl font-semibold text-slate-700 text-center mb-4 text-animation">
            Continue To our Sign Up
          </h1>

          <div className="space-y-6 mt-10 relative">
            {isPending && (
              <p className=" absolute top-20 left-[184px] text-primary text-sm">
                <PiSpinnerBallLight className="animate-spin text-2xl size-14" />
              </p>
            )}
            <input
              type="text"
              placeholder="user name"
              className="w-full p-2  border-2 border-green-700/20 rounded-md bg-gray-200 focus:outline-none"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="w-full p-2  border-2 border-green-700/20 rounded-md bg-gray-200 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-2 border-2 border-green-700/20 rounded-md bg-gray-200 focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button
              variant={"primary"}
              className="p-2 rounded-md hover:bg-primary/90 duration-500"
              onClick={handleSignUp}
              disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
                  <span className="ml-2">Logging...</span>
                </div>
              ) : (
                "Continue"
              )}
            </Button>
          </div>
          <div className="mt-4 text-center flex  justify-center items-center gap-2">
            <div className="border-2 px-16 hover:bg-primary duration-500 border-green-800/40 p-2 rounded-lg font-semibold flex items-center justify-center gap-2">
              <FcGoogle size={20} />
              Google
            </div>
            <div className="border-2 px-16 hover:bg-primary group duration-500 border-green-800/40 p-2 rounded-lg font-semibold flex items-center justify-center gap-2">
              <FaFacebookSquare
                className="text-blue-700 group-hover:text-blue-300"
                size={20}
              />
              Facebook
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <span onClick={() => setIsSignUp(false)} className=" underline">
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
