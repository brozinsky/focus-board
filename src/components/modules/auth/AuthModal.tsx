import useWindowsStore from "@/stores/zustand/useWindowsStore";
import { motion } from "framer-motion";
import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import { cn } from "@/lib/utils";
import useThemeStore from "@/stores/zustand/useThemeStore";
import LoginForm from "./LoginForm";
import { useEffect, useState } from "react";
import RegisterForm from "./RegisterForm";
import { supabaseClient } from "@/api/client";
import ForgotPassword from "./ResetPassword";
import ResetPassword from "./ResetPassword";
import { useAuthStore } from "@/stores/zustand/auth/useAuthStore";
import Button from "@/components/ui/buttons/Button";

const AuthModal = () => {
  const { setIsOpen, isOpen } = useWindowsStore();
  const { themeStyle } = useThemeStore();
  const [page, setPage] = useState<"login" | "register" | "forgotPassword">(
    "login"
  );
  const { isLoggedIn, logout, user } = useAuthStore();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    logout();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      console.log("Logged out successfully");
    }
  };

  const testFN = async () => {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      console.error("No user is currently logged in.");
      return;
    }

    const { data, error } = await supabaseClient.from("profiles").select("*");

    if (error) {
      console.error("Error fetching profile data:", error.message);
    } else if (data.length === 0) {
      console.log("No profile found for this user.");
    } else {
      console.log("User profile data:", data);
    }
  };

  const testUPDATE = async () => {
    try {
      // Retrieve the user
      const { data: userData, error: userError } =
        await supabaseClient.auth.getUser();

      if (userError || !userData?.user) {
        console.error("Error retrieving user:", userError?.message);
        return;
      }

      const userId = userData.user.id;

      const { data, error } = await supabaseClient
        .from("profiles")
        .update({ audioSource: "spotify" })
        .eq("id", userId);

      if (error) {
        console.error("Error updating audio source:", error.message);
      } else {
        console.log("Audio source updated to Spotify:", data);
      }
    } catch (error) {
      console.error("Unexpected error updating audio source:", error);
    }
  };

  if (!isOpen.loginForm) return null;

  return (
    <div
      id="AuthModal"
      className={"modal"}
      onClick={() => setIsOpen("loginForm", false)}
    >
      <button className={"modal__close"}>
        <CloseIconSVG />
      </button>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "modal__card !max-w-md my-auto",
          themeStyle == "glass" && "modal__card--glass"
        )}
      >
        {!isLoggedIn && page === "login" && <LoginForm setPage={setPage} />}
        {!isLoggedIn && page === "register" && (
          <RegisterForm setPage={setPage} />
        )}
        {!isLoggedIn && page === "forgotPassword" && (
          <ResetPassword setPage={setPage} />
        )}
        {isLoggedIn && (
          <div className="flex flex-col gap-4 p-8 items-center justify-center">
            <div>
              <span className="mr-2 w-8 h-8 bg-primary text-foreground-primary rounded-full p-1 inline-flex items-center justify-center">
                {user?.email?.slice(0, 1).toUpperCase()}
              </span>
              {user?.email}
            </div>
            <Button onClick={handleLogout}>Log out</Button>
            <button onClick={() => testUPDATE()}>Tester</button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AuthModal;
