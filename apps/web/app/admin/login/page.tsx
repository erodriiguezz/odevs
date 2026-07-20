"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { adminLogin } from "@/lib/admin/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const ok = await adminLogin(password);

    if (ok) {
      router.push("/admin");
    } else {
      setError("Invalid password");
      setLoading(false);
    }
  }

  return (
    <section className="bg-background text-foreground py-16 lg:py-28 min-h-screen relative">
      <div
        className="absolute inset-0 pointer-events-none dark:block hidden"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 0%, rgba(91,79,233,0.12) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <PageHeader
          label="Admin"
          title="Sign in"
          description="Enter the admin password to review pending events."
        />
        <form onSubmit={handleSubmit} className="max-w-sm flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="bg-surface border border-border rounded-lg px-4 py-2.5 text-foreground"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading || password.length === 0}
            className="inline-block w-max rounded-full text-sm bg-primary hover:bg-primary-glow text-white px-7 py-3.5 font-bold disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </section>
  );
}
