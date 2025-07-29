'use client';
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <main>
      {session && session.user ? (
        <h1>Welcome back, {session.user.name}!</h1>
      ) : (
        <h1>Please sign in</h1>
      )}
    </main>
  );
}
