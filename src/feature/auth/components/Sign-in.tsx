import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

interface SignInPageProps {
  setIsSignUp: Dispatch<SetStateAction<boolean>>;
}

const SignInPage = ({ setIsSignUp }: SignInPageProps) => {
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

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src={
          "https://res.cloudinary.com/dwor90h8p/image/upload/v1733060133/image_processing20231013-28803-2700w7-removebg-preview_evw89k.png"
        }
        alt="Logo"
        width={200}
        height={200}
        className="absolute top-4  right-4  f1"
      />

      <Image
        src={
          "https://res.cloudinary.com/dwor90h8p/image/upload/v1733060133/image_processing20231013-28803-2700w7-removebg-preview_evw89k.png"
        }
        alt="Logo"
        width={200}
        height={200}
        className="absolute top-4 left-4 f1"
      />

      <div className="flex flex-col md:flex-row">
        <Image
          src="https://res.cloudinary.com/dwor90h8p/image/upload/v1733037578/Flower_shopPhoto_bxkytx.jpg"
          alt="Logo"
          width={500}
          height={500}
          className="md:block hidden rounded-l-lg"
        />
        <div className="bg-white p-8 pt-10 shadow-md w-[500px] md:rounded-r-lg rounded-lg md:rounded-none">
          <h1 className="text-2xl font-semibold text-slate-700 text-center mb-4 text-animation">
            Continue To our Sign In
          </h1>

          <div className="space-y-6 mt-10">
            <input
              type="text"
              placeholder="user Name"
              className="w-full p-2  border-2 border-green-700/20 rounded-md bg-gray-200 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Email"
              className="w-full p-2  border-2 border-green-700/20 rounded-md bg-gray-200 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Password"
              className="w-full p-2  border-2 border-green-700/20 rounded-md bg-gray-200 focus:outline-none"
            />

            <Button
              variant={"primary"}
              className="p-2 rounded-md hover:bg-primary/90 duration-500">
              Continue
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
              have No account?
              <span onClick={() => setIsSignUp(true)} className=" underline">
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
