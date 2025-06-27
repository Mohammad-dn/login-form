"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "../../components/button/button";
import styles from "./Welcome.module.scss";
import { useAuthContext } from "@/context/AuthContext";
import cookie from "js-cookie";
export function Welcome() {
  const router = useRouter();

  const { logout } = useAuthContext();

  useEffect(() => {
    const userDetail = localStorage.getItem("userDetail");
    if (!userDetail) {
      router.push("/auth");
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("userDetail");
    cookie.remove("auth");
    logout();
    router.push("/auth");
  };
  return (
    <div className={styles.welcomeContainer}>
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <h1 className={styles.title}>خوش آمدید 👋</h1>
      </motion.div>
      <div
        style={{
          display: "flex",
          gap: 30,
          flexDirection: "column",
        }}
      >
        برای مشاهده صفحه ورود ابتدا باید خارج شوید
        <Button onClick={handleLogout} text="خروج" />
      </div>
    </div>
  );
}
