"use client";

import { useEffect, useState } from "react";
import getCurrentUser from "../utils/currentUser";
import { useRouter } from "next/navigation";
interface User {
  name?: string;
  role?: string;
  qrCode?: string;
  avatar?: string;
}

const Homepage = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = getCurrentUser();
        if (!userData) {
          router.push("/sign-in");
          return;
        }
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        router.push("/sign-in");
      }
    };

    fetchUser();
  }, [router]);

  useEffect(() => {
    if (!user) return;

    switch (user.role) {
      case "admin":
        router.push("/admin");
        break;
      case "teacher":
        router.push("/teacher");
        break;
      case "student":
        router.push("/student");
        break;
      case "parent":
        router.push("/parent");
        break;
      default:
        router.push("/sign-in");
        break;
    }
  }, [user, router]);

  return <div>Homepage</div>;
};

export default Homepage;
