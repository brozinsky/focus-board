import { useState } from "react";
import { Input } from "@/components/ui/inputs/Input";
import ButtonLoginSocial from "@/components/ui/buttons/ButtonLoginSocial";
import Checkbox from "@/components/ui/inputs/Checkbox";
import { supabaseClient } from "@/api/client";

const RegisterForm = ({ setPage }: { setPage: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
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
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess(
          "Account created successfully! Please check your email to confirm your account."
        );
        setEmail("");
        setPassword("");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthRegister = async (provider: "google" | "facebook") => {
    try {
      const { error } = await supabaseClient.auth.signInWithOAuth({
        provider,
      });
      if (error) throw error;
      console.log(`${provider} sign-up successful`);
    } catch (error: any) {
      setError(`Error with ${provider} signup: ${error.message}`);
    }
  };

  return (
    <div className={"p-8 gap-6 flex flex-col "}>
      <div className="flex justify-between items-center">
        <h2 className="flex flex-row items-center text-xl gap-4 mx-auto text-center">
          Create an account
        </h2>
      </div>
      <form className="space-y-6" onSubmit={handleRegister}>
        <div>
          <label className="block mb-2 items-end" htmlFor="email">
            Email
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
        <div>
          <label className="block mb-2 items-end" htmlFor="password">
            Password
          </label>
          <Input
            id="password"
            className="w-full"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}
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
        <button
          type="submit"
          className="w-full border border-primary bg-primary text-foreground-primary font-medium glass-blur rounded-lg px-4 py-3 transition"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create an account"}
        </button>
        <p className="text-sm font-light text-foreground">
          Already have an account?{" "}
          <button
            onClick={() => setPage("login")}
            className="font-medium text-primary-600 hover:underline"
          >
            Login here
          </button>
        </p>
      </form>
      {/* <div className="flex flex-row justify-center items-center">
        <div className="w-full h-[1px] bg-foreground-muted"></div>
        <div className="mx-4 text-foreground-muted">or</div>
        <div className="w-full h-[1px] bg-foreground-muted"></div>
      </div> */}
      {/* TODO - register with google */}
      {/* <ButtonLoginSocial
        onClick={() => handleOAuthRegister("google")}
        icon="google"
      >
        Sign up with Google
      </ButtonLoginSocial> */}
      {/* <ButtonLoginSocial
        onClick={() => handleOAuthRegister("facebook")}
        icon="facebook"
      >
        Sign up with Facebook
      </ButtonLoginSocial> */}
    </div>
  );
};

export default RegisterForm;
