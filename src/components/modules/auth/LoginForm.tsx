import { useEffect, useState } from "react";
import { Input } from "@/components/ui/inputs/Input";
import ButtonLoginSocial from "@/components/ui/buttons/ButtonLoginSocial";
import { supabaseClient } from "@/api/client";
import LoadingSpinner from "@/components/ui/loaders/LoadingSpinner";

const LoginForm = ({ setPage }: { setPage: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        console.log("Login successful");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: "google" | "facebook") => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider,
      });
      if (error) {
        setError(error.message);
      } else {
        console.log(`${provider} login successful:`, data);
      }
    } catch (error: any) {
      setError(error.message || `An error occurred during ${provider} login`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={"p-8 gap-6 flex flex-col "}>
      <div className="flex justify-between items-center">
        <h2 className="flex flex-row items-center text-xl gap-4 mx-auto text-center">
          Log in to your account
        </h2>
      </div>
      <form className="space-y-6" onSubmit={handleEmailLogin}>
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
        <div className="flex items-center justify-between">
          <button
            onClick={() => setPage("forgotPassword")}
            className="ml-auto text-sm text-foreground hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <button
          type="submit"
          className="w-full border border-primary bg-primary text-foreground-primary font-medium glass-blur rounded-lg px-4 py-3 transition"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : "Log in"}
        </button>
        <p className="text-sm font-light text-foreground">
          Don’t have an account yet?{" "}
          <button
            onClick={() => setPage("register")}
            className="font-medium text-primary-600 hover:underline"
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
