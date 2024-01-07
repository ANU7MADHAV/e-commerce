"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

const validationSchema = z
  .object({
    firstName: z.string().min(1, { message: "Firstname is required" }),
    lastName: z.string().min(1, { message: "Lastname is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

type ValidationSchema = z.infer<typeof validationSchema>;

const SignPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

  return (
    <form
      className="mb-4 flex w-full flex-col  items-center justify-center px-8 pb-8 pt-6 text-left"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-4 w-[400px]">
        <div className="mb-4 ">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            className={`w-full border px-3 py-2 text-sm leading-tight text-gray-700 ${
              errors.firstName && "border-red-500"
            } focus:shadow-outline appearance-none rounded focus:outline-none`}
            id="firstName"
            type="text"
            placeholder="First Name"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="mt-2 text-xs italic text-red-500">
              {errors.firstName?.message}
            </p>
          )}
        </div>
        <div>
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            className={`w-full border px-3 py-2 text-sm leading-tight text-gray-700 ${
              errors.lastName && "border-red-500"
            } focus:shadow-outline appearance-none rounded focus:outline-none`}
            id="lastName"
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="mt-2 text-xs italic text-red-500">
              {errors.lastName?.message}
            </p>
          )}
        </div>
      </div>
      <div className="mb-4 w-[400px]">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className={`w-full border px-3 py-2 text-sm leading-tight text-gray-700 ${
            errors.email && "border-red-500"
          } focus:shadow-outline appearance-none rounded focus:outline-none`}
          id="email"
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-2 text-xs italic text-red-500">
            {errors.email?.message}
          </p>
        )}
      </div>
      <div className="mb-4 flex flex-col items-center justify-center">
        <div className="mb-4 w-[400px]">
          <label
            className=" text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`w-full border px-3 py-2 text-sm leading-tight text-gray-700 ${
              errors.password && "border-red-500"
            } focus:shadow-outline appearance-none rounded focus:outline-none`}
            id="password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-2 text-xs italic text-red-500">
              {errors.password?.message}
            </p>
          )}
        </div>
        <div className=" w-[400px]">
          <label
            className=" text-sm font-bold text-gray-700"
            htmlFor="c_password"
          >
            Confirm Password
          </label>
          <input
            className={`w-full border px-3 py-2 text-sm leading-tight text-gray-700 ${
              errors.confirmPassword && "border-red-500"
            } focus:shadow-outline appearance-none rounded focus:outline-none`}
            id="c_password"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="mt-2 text-xs italic text-red-500">
              {errors.confirmPassword?.message}
            </p>
          )}
        </div>
      </div>

      <div className="mb-6 text-center">
        <button
          className="focus:shadow-outline w-full rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          type="submit"
        >
          Register Account
        </button>
      </div>
      <hr className="mb-6 border-t" />
      <div className="text-center">
        <a
          className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800"
          href="/auth/forgot"
        >
          Forgot Password?
        </a>
      </div>
      <div className="text-center">
        <Link
          className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800"
          href="/auth/login"
        >
          Already have an account? Login!
        </Link>
      </div>
    </form>
  );
};

export default SignPage;
