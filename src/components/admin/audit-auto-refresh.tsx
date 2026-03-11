"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuditAutoRefresh() {
  const router = useRouter();

  useEffect(() => {
    const id = window.setInterval(() => {
      router.refresh();
    }, 30000);

    return () => window.clearInterval(id);
  }, [router]);

  return null;
}
