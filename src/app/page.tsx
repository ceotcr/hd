'use client';
import Logo from "@/components/Logo";
import Loader from "@/components/ui/Loader";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <main className="w-full h-screen flex items-center justify-center">
        <Loader />
      </main>
    );
  }
  if (status === "unauthenticated") {
    return (
      <main className="w-full h-screen flex items-center justify-center">
        <h1 className="text-2xl">You are not authenticated</h1>
      </main>
    );
  }
  return (
    <main className="w-full min-h-screen flex flex-col items-center py-4">
      <div className="flex items-center justify-between gap-6 max-w-7xl w-[96%]">
        <div className="flex items-center gap-8">
          <Logo justLogo />
          <span className="font-medium text-2xl">Dashboard</span>
        </div>
        <button className="cursor-pointer font-medium text-blue-500 px-4 py-2 rounded-md hover:text-blue-600 transition-colors underline underline-offset-2">
          Sign Out
        </button>
      </div>
    </main>
  );
}
