"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/users"); // ✅ Now it runs after rendering
  }, [router]);

  return null; // No UI needed
}
