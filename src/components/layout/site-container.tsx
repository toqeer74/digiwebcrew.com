import { cn } from "@/lib/utils";

interface SiteContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fluid?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function SiteContainer({ 
  children, 
  className, 
  fluid = false, 
  size = "xl",
  ...props 
}: SiteContainerProps) {
  const sizeClasses = {
    sm: "max-w-4xl",
    md: "max-w-5xl", 
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-full"
  };

  return (
    <div 
      className={cn(
        "w-full mx-auto px-4 sm:px-6 lg:px-8",
        !fluid && sizeClasses[size],
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}

interface SiteWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function SiteWrapper({ children, className, ...props }: SiteWrapperProps) {
  return (
    <div 
      className={cn(
        "w-full min-h-screen bg-raly-base dark:bg-midnight-950",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}

