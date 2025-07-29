'use client';

import Logo from "@/components/Logo";
import Loader from "@/components/ui/Loader";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NoteForm from "@/components/notes/NoteForm";
import NotesList from "@/components/notes/NoteList";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <main className="w-full h-screen flex items-center justify-center">
        <Loader />
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main className="w-full h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl">You are not authenticated</h1>
        <Link
          href="/auth/signin"
          className="bg-blue-400 rounded-lg px-4 min-w-40 text-center text-white py-2"
        >
          Login
        </Link>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-slate-100 flex flex-col items-center gap-4">
      <nav className="w-full sticky top-0 py-4 bg-[#f1f5f96b] backdrop-blur-sm">
        <div className="flex mx-auto items-center justify-between gap-6 max-w-7xl w-[96%]">
          <div className="flex items-center gap-8">
            <Logo justLogo />
            <span className="font-medium text-2xl">Dashboard</span>
          </div>
          <button
            onClick={async () => {
              await signOut({ redirect: false });
              router.push("/auth/signin");
            }}
            className="cursor-pointer font-medium text-blue-500 px-4 py-2 rounded-md hover:text-blue-600 transition-colors underline underline-offset-2"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <div className="grid items-center grid-cols-1 md:grid-cols-2 w-[96%] max-w-7xl gap-6 bg-white rounded-xl p-6">
        <div className="flex flex-col gap-2">
          <h1 className="lg:text-3xl text-2xl font-semibold">Welcome, {session?.user?.name}!</h1>
          <p className="text-gray-500">Email: {session?.user?.email}</p>
        </div>
        <NoteForm />
      </div>

      <NotesList />
    </main>
  );
}