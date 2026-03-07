import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Activity, Clock, User, AlertCircle, CheckCircle } from "lucide-react";
import { getAuditLogs } from "@/lib/audit";
import { cn } from "@/lib/utils";

export default async function AuditPage() {
  const logs = await getAuditLogs({ limit: 100 });

  const getIcon = (action: string) => {
    switch (action) {
      case "LOGIN_SUCCESS":
      case "LOGIN_FAILED":
        return Shield;
      case "RUN_AI_PROMPT":
      case "RUN_AI_WORKFLOW":
        return Activity;
      case "VIEW_DASHBOARD":
      case "VIEW_LEADS":
      case "VIEW_CHATS":
      case "VIEW_DRAFTS":
      case "VIEW_WORKFLOW_RUNS":
        return User;
      default:
        return Activity;
    }
  };

  const getActionColor = (action: string, success: boolean) => {
    if (!success) return "bg-rose-100 text-rose-800 border-rose-200";
    switch (action) {
      case "LOGIN_SUCCESS":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "LOGIN_FAILED":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "RUN_AI_PROMPT":
      case "RUN_AI_WORKFLOW":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "VIEW_DASHBOARD":
      case "VIEW_LEADS":
      case "VIEW_CHATS":
      case "VIEW_DRAFTS":
      case "VIEW_WORKFLOW_RUNS":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-purple-100 text-purple-800 border-purple-200";
    }
  };

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <p className="text-[10px] font-black text-muted-foreground/40 mb-1 uppercase tracking-[0.2em]">Operations Suite</p>
          <h1 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Audit: <span className="text-raly-accent">Activity</span></h1>
          <p className="text-sm text-muted-foreground/60 italic mt-1 font-medium">System <span className="text-raly-accent font-black">events</span> and security logs</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No audit logs found
              </p>
            ) : (
              logs.map((log: any, i) => {
                const Icon = getIcon(log.action);
                return (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="mt-1">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs",
                            getActionColor(log.action, log.success)
                          )}
                        >
                          {log.action.replace(/_/g, " ").toLowerCase()}
                        </Badge>
                        {log.success ? (
                          <CheckCircle className="h-3 w-3 text-emerald-500" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-rose-500" />
                        )}
                        <span className="text-xs text-muted-foreground">
                          {new Date(log.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm">
                        {log.userEmail && (
                          <p className="font-medium">{log.userEmail}</p>
                        )}
                        {log.resource && (
                          <p className="text-muted-foreground">
                            Resource: {log.resource}
                            {log.resourceId && ` (${log.resourceId})`}
                          </p>
                        )}
                        {log.error && (
                          <p className="text-rose-600 text-xs mt-1">{log.error}</p>
                        )}
                        {log.ip && (
                          <p className="text-xs text-muted-foreground mt-1">
                            IP: {log.ip}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
