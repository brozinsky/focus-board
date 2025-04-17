import useWindowsStore from "@/stores/zustand/global/windows.store";
import { motion } from "framer-motion";
import CloseIconSVG from "@/components/elements/svg/icons/interface/CloseIconSVG";
import { cn } from "@/lib/utils";
import useThemeStore from "@/stores/zustand/global/theme.store";
import LoginForm from "./LoginForm";
import { useEffect, useState } from "react";
import RegisterForm from "./RegisterForm";
import { supabaseClient } from "@/api/client";
import ForgotPassword from "./ResetPassword";
import ResetPassword from "./ResetPassword";
import { useAuthStore } from "@/stores/zustand/auth/auth.store";
import Button from "@/components/ui/buttons/Button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avaar/Avatar";

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
            <Avatar
              className={
                "w-20 h-20 bg-primary text-foreground-primary font-medium text-4xl"
              }
            >
              <AvatarImage src={""} alt={user?.email || "User"} />
              <AvatarFallback>
                {user?.email?.slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="gap-1 flex flex-col">
              <p className="text-sm text-center">{user?.email}</p>
              {user?.confirmed_at && (
                <p className="text-sm text-center">
                  Member since{" "}
                  {new Intl.DateTimeFormat("en-GB").format(
                    new Date(user.confirmed_at)
                  )}
                </p>
              )}
            </div>
            <Button onClick={handleLogout}>Log out</Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AuthModal;
