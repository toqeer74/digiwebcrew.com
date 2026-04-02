"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    if (result?.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-slate-50 px-4 [background-image:radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.22)_1px,transparent_0)] [background-size:20px_20px]">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white shadow-xl p-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white text-xs font-bold grid place-items-center">
            DWC
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
            <p className="text-sm text-slate-500">Digi Web Crew Dashboard</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Email address</label>
            <input
              type="email"
              className="mt-1 h-11 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="admin@digiwebcrew.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Password</label>
            <div className="mt-1 relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                className="h-11 w-full rounded-lg border border-slate-200 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error ? <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div> : null}

          <button
            disabled={loading}
            className="w-full h-11 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 inline-flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

