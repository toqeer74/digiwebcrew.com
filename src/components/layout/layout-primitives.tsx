import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div 
      className={cn("container", className)} 
      {...props}
    >
      {children}
    </div>
  );
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  container?: boolean;
}

export function Section({ children, className, container = true, ...props }: SectionProps) {
  return (
    <section 
      className={cn("py-20 md:py-24 lg:py-28 overflow-hidden", className)} 
      {...props}
    >
      {container ? <Container>{children}</Container> : children}
    </section>
  );
}

