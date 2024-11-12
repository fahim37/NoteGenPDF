"use client";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import LandingPage from "./home/page";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      checkUser();
      router.push("/dashboard");
    }

  }, [user]);


  const checkUser = async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      imageUrl: user.imageUrl,
    });
  };
  return (
    <div>
      <LandingPage />
    </div>
  );
}
