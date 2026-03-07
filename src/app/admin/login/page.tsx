"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/layout-primitives";
import { Lock, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (result?.ok) {
      router.push("/admin/leads");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-raly-subtle">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-raly-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-raly-accent/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <Container className="max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-raly-base/90 backdrop-blur-3xl border border-raly-primary/20 rounded-[3rem] p-12 shadow-2xl shadow-raly-primary/10"
        >
          <div className="flex flex-col items-center mb-10">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8, ease: "anticipate" }}
              className="w-16 h-16 bg-raly-primary text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-raly-primary/20"
            >
              <Lock size={28} />
            </motion.div>
            <h1 className="text-3xl font-black tracking-tighter">Secure Access</h1>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground mt-2">Digi Web Crew Command</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-raly-text ml-3">Terminal ID</label>
              <input
                type="email"
                className="w-full bg-raly-subtle border border-raly-primary/20 rounded-2xl h-14 px-6 font-bold text-sm focus:ring-4 focus:ring-raly-primary/10 focus:bg-raly-base outline-none transition-all placeholder:text-raly-text/30"
                placeholder="admin@digiwebcrew.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-raly-text ml-3">Access Key</label>
              <input
                type="password"
                className="w-full bg-raly-subtle border border-raly-primary/20 rounded-2xl h-14 px-6 font-bold text-sm focus:ring-4 focus:ring-raly-primary/10 focus:bg-raly-base outline-none transition-all placeholder:text-raly-text/30"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              disabled={loading}
              className="group w-full h-16 bg-raly-primary text-white font-black text-xs uppercase tracking-[0.2em] rounded-[1.5rem] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-raly-primary/25 disabled:opacity-50 mt-6 overflow-hidden relative"
            >
              <span className="relative z-10">
                {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Initialize Session"}
              </span>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
          </form>

          <p className="text-center text-[10px] text-raly-text mt-10 font-bold uppercase tracking-widest opacity-50">
            Authorized Personnel Only
          </p>
        </motion.div>
      </Container>
    </div>
  );
}
