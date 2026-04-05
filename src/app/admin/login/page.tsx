"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [showPw, setShowPw]   = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (result?.ok) router.push("/admin/dashboard");
    else setError("Invalid email or password");
  };

  return (
    <div
      className="min-h-screen grid place-items-center px-4"
      style={{
        background: "var(--adm-bg, #f4f6fb)",
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.18) 1px, transparent 0)",
        backgroundSize: "20px 20px",
      }}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl"
        style={{ border: "1.5px solid var(--adm-border, #e4e9f2)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="grid place-items-center rounded-xl text-white font-black text-sm"
            style={{
              width: 44, height: 44,
              background: "linear-gradient(135deg, var(--adm-primary,#4f46e5), var(--adm-accent,#0ea5e9))",
              boxShadow: "0 4px 12px rgba(79,70,229,0.3)",
            }}
          >
            DW
          </div>
          <div>
            <h1 style={{ fontSize: 19, fontWeight: 800, color: "var(--adm-text,#0f172a)", letterSpacing: -0.5 }}>
              Admin Login
            </h1>
            <p style={{ fontSize: 12.5, color: "var(--adm-text-muted,#94a3b8)" }}>Digi Web Crew Dashboard</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="adm-label block mb-1.5">Email address</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--adm-text-muted)" }} />
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@digiwebcrew.com" required
                className="adm-input h-11 pl-9"
              />
            </div>
          </div>

          <div>
            <label className="adm-label block mb-1.5">Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--adm-text-muted)" }} />
              <input
                type={showPw ? "text" : "password"} value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" required
                className="adm-input h-11 pl-9 pr-10"
              />
              <button
                type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: "var(--adm-text-muted)" }}
              >
                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-xl px-4 py-3 text-sm" style={{ background: "var(--adm-danger-dim)", color: "#991b1b", border: "1.5px solid #fca5a5" }}>
              {error}
            </div>
          )}

          <button
            type="submit" disabled={loading}
            className="adm-btn adm-btn-primary adm-btn-full mt-1 inline-flex items-center justify-center gap-2"
            style={{ height: 44 }}
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p style={{ fontSize: 11.5, color: "var(--adm-text-muted)", textAlign: "center", marginTop: 24 }}>
          Digi Web Crew · Admin Panel v3
        </p>
      </div>
    </div>
  );
}
