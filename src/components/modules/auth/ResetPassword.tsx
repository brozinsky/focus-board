import Checkbox from "@/components/ui/inputs/Checkbox";
import { Input } from "@/components/ui/inputs/Input";
import React, { useState } from "react";
import { supabaseClient } from "@/api/client"; // Import Supabase client
import ArrowSmSVG from "@/components/elements/svg/icons/interface/ArrowSmSVG";
import LoadingSpinner from "@/components/ui/loaders/LoadingSpinner";

const ResetPassword = ({ setPage }: { setPage: any }) => {
  const [email, setEmail] = useState<string>("");
  const [terms, setTerms] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!terms) {
      setError("You must accept the Terms and Conditions.");
      setLoading(false);
      return;
    }

    try {
      const { data: users, error: userError } = await supabaseClient
        .from("users")
        .select("email")
        .eq("email", email)
        .single();

      if (userError || !users) {
        setError("No account found with this email address.");
        setLoading(false);
        return;
      }

      const { error } = await supabaseClient.auth.resetPasswordForEmail(email);
      if (error) {
        setError(error.message);
      } else {
        setSuccess("Password reset email sent! Please check your inbox.");
        setEmail("");
      }
    } catch (error: any) {
      setError(
        error.message || "An error occurred while resetting the password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={"p-8 gap-6 flex flex-col"}>
      <h2 className="flex flex-row items-center text-xl gap-4 mx-auto text-center">
        Forgot your password?
      </h2>
      <p className="font-light text-foreground text-center">
        Don't worry! Just type in your email and we will send you a code to
        reset your password.
      </p>
      <form
        className="space-y-4 lg:mt-5 md:space-y-5"
        onSubmit={handleResetPassword}
      >
        <div>
          <label className="block mb-2 items-end" htmlFor="email">
            Your email
          </label>
          <Input
            id="email"
            className="w-full"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}
        <div className="flex items-start">
          <Checkbox
            isDisabled={false}
            isSelected={terms}
            state={terms}
            onChange={setTerms}
          >
            I accept the{" "}
            <a
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              href="#"
            >
              Terms and Conditions
            </a>
          </Checkbox>
        </div>
        <button
          type="submit"
          className="w-full border border-primary bg-primary text-foreground-primary font-medium glass-blur rounded-lg px-4 py-3 transition"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : "Reset password"}
        </button>
        <button
          onClick={() => setPage("login")}
          className="text-left flex items-center gap-1"
        >
          <ArrowSmSVG
            pathClass="stroke-foreground"
            className="rotate-180 h-4"
          />
          Return to login
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
