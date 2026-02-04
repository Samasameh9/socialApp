import React, { useState } from "react";
import bg from "./../../assets/bg.png";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema } from "../../schema/SchemaSignup";
import SignUpApi from "../../services/SignUpApi";
export default function Register() {
  let [isLoading, setisLoading] = useState(false);
  let [ApiError, setApiError] = useState(null);
  let navigate = useNavigate();
  let {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(Schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });
  async function sumbitForm(userData) {
    setisLoading(true);
    console.log(userData);
    let response = await SignUpApi(userData);
    console.log(response);
    if (response.message == "success") {
      navigate("/");
    } else {
      setApiError(response.error);
    }
    setisLoading(false);
  }

  return (
    <>
      <div
        className=" flex justify-center items-center relative bg-cover bg-center  h-svh"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="w-20 absolute top-0 mt-14 ">
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
        <form onSubmit={handleSubmit(sumbitForm)}>
          <div className="flex min-w-sm  md:w-xl min-h-1/3 flex-col gap-4 shadow-2xl bg-white py-5  rounded-2xl px-3">
            <Input
              isInvalid={Boolean(errors.name && touchedFields.name)}
              errorMessage={errors.name?.message}
              {...register("name")}
              type="text"
              className="mt-5  "
              placeholder="Enter your name"
            />

            <Input
              isInvalid={Boolean(errors.email && touchedFields.email)}
              errorMessage={errors.email?.message}
              {...register("email")}
              placeholder="Enter your email"
              aria-label="email"
              type="email"
            />
            <Input
              isInvalid={Boolean(errors.password && touchedFields.password)}
              errorMessage={errors.password?.message}
              {...register("password")}
              placeholder="Enter your password"
              aria-label="password"
              type="password"
              name="password"
            />

            <Input
              isInvalid={Boolean(errors.rePassword && touchedFields.rePassword)}
              errorMessage={errors.rePassword?.message}
              {...register("rePassword")}
              placeholder="Enter your Repassword"
              aria-label="rePassword"
              type="password"
            />
            <div className="flex justify-between items-center gap-4 ">
              <Input
                isInvalid={Boolean(
                  errors.dateOfBirth && touchedFields.dateOfBirth,
                )}
                errorMessage={errors.dateOfBirth?.message}
                {...register("dateOfBirth")}
                aria-label="date"
                type="date"
              />
              <h2 className="text-green-700 ">Gender:</h2>
              <Select
                isInvalid={Boolean(errors.gender && touchedFields.gender)}
                errorMessage={errors.gender?.message}
                {...register("gender")}
                className="max-w-xs "
                label=""
              >
                <SelectItem key={"male"}>Male</SelectItem>
                <SelectItem key={"female"}>Female</SelectItem>
              </Select>
            </div>

            <Button
              isLoading={isLoading}
              type="submit"
              className="w-full my-4 border bg-green-200  border-green-200 rounded py-2 hover:bg-green-700  duration-200 "
            >
              Submit
            </Button>
            {ApiError ? (
              <p className="text-red-500 text-center text-xl">{ApiError}</p>
            ) : null}
            <p>
              Do you have account?{" "}
              <Link to="/" className="text-green-700 cursor-pointer">
                Signin
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
