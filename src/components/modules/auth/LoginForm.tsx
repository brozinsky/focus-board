import { useEffect, useState } from "react";
import { Input } from "@/components/ui/inputs/Input";
import { supabaseClient } from "@/api/client";
import { useAuthStore } from "@/stores/zustand/auth/auth.store";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/buttons/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Required").email("Invalid format"),
  password: z.string().min(1, "Required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = ({ setPage }: { setPage: any }) => {
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleEmailLogin = async (data: LoginFormValues) => {
    try {
      const { data: response, error } =
        await supabaseClient.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

      if (error) {
        throw new Error(error.message);
      }

      if (response.user) {
        login(response.user);
        console.log("Login successful");
      }
    } catch (error: any) {
      console.error(error.message || "An error occurred during login");
    }
  };

  // const handleOAuthLogin = async (provider: "google" | "facebook") => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const { data, error } = await supabaseClient.auth.signInWithOAuth({
  //       provider,
  //     });
  //     if (error) {
  //       setError(error.message);
  //     } else {
  //       console.log(`${provider} login successful:`, data);
  //     }
  //   } catch (error: any) {
  //     setError(error.message || `An error occurred during ${provider} login`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className={"p-8 gap-6 flex flex-col "}>
      <div className="flex justify-between items-center">
        <h2 className="flex flex-row items-center text-xl gap-4 mx-auto text-center">
          Log in to your account
        </h2>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(handleEmailLogin)}>
        <div>
          <label className="block mb-2 items-end" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            className="w-full"
            type="email"
            autoComplete="off"
            disabled={isSubmitting}
            onInvalid={(e) => e.preventDefault()}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2 ml-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label className="block mb-2 items-end" htmlFor="password">
            Password
          </label>
          <Input
            id="password"
            className="w-full"
            type="password"
            autoComplete="off"
            disabled={isSubmitting}
            onInvalid={(e) => e.preventDefault()}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-2 ml-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => setPage("forgotPassword")}
            className={cn(
              "ml-auto text-sm text-foreground",
              isSubmitting ? "opacity-50" : "hover:underline"
            )}
          >
            Forgot password?
          </button>
        </div>
        <Button
          type="submit"
          variant="primary"
          size="md"
          width="full"
          isLoading={isSubmitting}
          className="mx-auto w-full"
        >
          Log in
        </Button>
        <p className="text-sm font-light text-foreground">
          Don’t have an account yet?{" "}
          <button
            type="button"
            onClick={() => setPage("register")}
            disabled={isSubmitting}
            className={cn(
              "font-medium text-primary-600",
              isSubmitting ? "opacity-50" : "hover:underline"
            )}
          >
            Sign up
          </button>
        </p>
      </form>
      {/* <div className="flex flex-row justify-center items-center">
        <div className="w-full h-[1px] bg-foreground-muted"></div>
        <div className="mx-4 text-foreground-muted">or</div>
        <div className="w-full h-[1px] bg-foreground-muted"></div>
      </div> */}
      {/* TODO - login with google */}
      {/* <ButtonLoginSocial
        onClick={() => handleOAuthLogin("google")}
        icon="google"
      >
        Continue with Google
      </ButtonLoginSocial> */}
      {/* <ButtonLoginSocial
        onClick={() => handleOAuthLogin("facebook")}
        icon="facebook"
      >
        Continue with Facebook
      </ButtonLoginSocial> */}
    </div>
  );
};

export default LoginForm;
