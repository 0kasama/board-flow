"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import BoardCard from "@/components/BoardCard";

export default function Home() {
  const router = useRouter();
  const accessToken = Cookies.get("accessToken");

  if (!accessToken) {
    router.push("/login");
  }

  return (
    <div className='mt-10'>
      <BoardCard />
    </div>
  );
}
