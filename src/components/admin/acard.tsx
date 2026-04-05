import React from "react";

interface ACardProps { children: React.ReactNode; className?: string; style?: React.CSSProperties; hover?: boolean; }

export function ACard({ children, className="", style, hover }: ACardProps) {
  return (
    <div className={`admin-card${hover?" admin-card-hover":""} ${className}`} style={style}>
      {children}
    </div>
  );
}

export function ACardHeader({ children, className="", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`adm-card-header ${className}`} style={style}>
      {children}
    </div>
  );
}

export function ACardTitle({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="adm-card-title">
      {icon && <div className="admin-stat-icon adm-primary" style={{width:28,height:28}}>{icon}</div>}
      {children}
    </div>
  );
}

export function ACardBody({ children, className="", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`adm-card-body ${className}`} style={style}>
      {children}
    </div>
  );
}
