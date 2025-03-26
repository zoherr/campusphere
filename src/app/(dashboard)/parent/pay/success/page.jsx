"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
const Success = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/parent");
    }, 5000);
  }, []);

  return (
    <div>
      Payment successful. You are being redirected to the orders page. Please do
      not close the page
    </div>
  );
};

export default Success;
