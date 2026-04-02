import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { rateLimit } from "@/lib/rate-limit";
import { logAudit } from "@/lib/audit";
import { NextRequest } from "next/server";

export async function requireAdminSession(request?: NextRequest) {
  // AUTH DISABLED - Dashboard is now public
  // Return success without checking session
  return { success: true };

  /* ORIGINAL CODE - DISABLED FOR PUBLIC ACCESS
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    await logAudit({
      action: "LOGIN_FAILED",
      error: "No session",
      success: false,
    });
    return { error: "Unauthorized", status: 401 };
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (session.user.email !== adminEmail) {
    await logAudit({
      action: "LOGIN_FAILED",
      error: "Invalid admin email",
      success: false,
      userEmail: session.user.email,
    });
    return { error: "Forbidden", status: 403 };
  }

  // Rate limit admin API calls
  const rateLimitResult = await rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 60, // 60 requests per minute
    identifier: `admin:${session.user.email}`,
  });

  if (!rateLimitResult.success) {
    await logAudit({
      action: "LOGIN_FAILED",
      error: "Rate limit exceeded",
      success: false,
      userEmail: session.user.email,
    });
    return { error: "Too Many Requests", status: 429 };
  }

  await logAudit({
    action: "LOGIN_SUCCESS",
    userEmail: session.user.email,
    userId: session.user.email, // Use email as ID since NextAuth user doesn't have id by default
  });
  
  return { session, rateLimitResult };
  */
}


