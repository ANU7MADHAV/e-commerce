"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const validationSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  password: z.string().min(6, { message: "valid password require" }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.error("Something happened");
    }
    if (res.ok) {
      const result = await res.json();
      console.log(result);
    }
  };

  return (
    <div className="mt-4 flex w-full flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-[400px] max-w-[300px] flex-col gap-y-2 rounded-md p-8 shadow-lg "
      >
        <label>Email</label>
        <input
          {...register("email")}
          name="email"
          className="rounded-md border"
        />
        {errors.email && (
          <p className="mt-2 text-xs italic text-red-500">
            {errors.email?.message}
          </p>
        )}

        <label>Password</label>
        <input
          {...register("password")}
          name="password"
          className="rounded-md border"
        />

        {errors.password && (
          <p className="mt-2 text-xs italic text-red-500">
            {errors.password?.message}
          </p>
        )}
        <div className="mt-4 flex justify-center">
          <input
            type="submit"
            className=" max-w-[150px] rounded-md bg-black px-4 text-white "
          />
        </div>
      </form>
    </div>
  );
}
