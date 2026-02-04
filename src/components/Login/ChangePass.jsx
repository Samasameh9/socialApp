import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { SchemaChangePass } from "../../schema/SchemaChangePass";
import { ChangePassword } from "../../services/loginApi";
import { useForm } from "react-hook-form";
import {  useState } from "react";
import bg from "./../../assets/bg.png";
import { Button, Link } from "@heroui/react";
import toast, { Toaster } from "react-hot-toast";


export default function ChangePass() {
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);
  let [apiError, setApiError] = useState(null);

  let {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
    },
    resolver: zodResolver(SchemaChangePass),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  async function submitForm(userData) {
    
      setIsLoading(true);

      console.log("submit", userData);

      let response = await ChangePassword(userData);

      if (response?.message === "success") {
        toast.success("Password changed");
        navigate("/home");
      } else {
        toast.error("Password unchanged, try again");
        setApiError(response?.error || "Something went wrong");
      }
  setIsLoading(false)
  }

  return (
    <>
      <Toaster />

      <div
        className="flex justify-center items-center relative bg-cover bg-center h-svh"
        style={{ backgroundImage: `url(${bg})` }}
      >
         <div className="w-20 absolute top-0 mt-47 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="bg-white rounded-2xl text-green-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="flex w-sm md:w-lg lg:w-xl min-h-1/3 flex-col gap-4 shadow-2xl bg-white py-5 rounded-2xl px-3">
            <input
              {...register("password")}
              placeholder="Enter your password"
              type="password"
              className="border rounded border-green-600 px-2 py-1 mt-5"
            />

            {errors.password && touchedFields.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
            <input
              {...register("newPassword")}
              placeholder="Enter your new password"
              type="password"
              className="border rounded border-green-600 px-2 py-1"
            />

            {errors.newPassword && touchedFields.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.newPassword.message}
              </p>
            )}

            {apiError && (
              <p className="text-red-500 text-center text-sm">
                {apiError}
              </p>
            )}
            <Button
              isLoading={isLoading}
              type="submit"
              className="border bg-green-200 border-green-200 rounded py-2 hover:bg-green-700 duration-200"
            >
              SUBMIT
            </Button>

          </div>
        </form>
      </div>
    </>
  );
}
