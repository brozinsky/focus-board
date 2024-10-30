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

const AuthModal = () => {
  const { setIsOpen, isOpen } = useWindowsStore();
  const { themeStyle } = useThemeStore();
  const [page, setPage] = useState<"login" | "register" | "forgotPassword">("login");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    supabaseClient.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      console.log("Logged out successfully");
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
            <div>logged in! </div>
            <button onClick={handleLogout}>Log out</button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AuthModal;
